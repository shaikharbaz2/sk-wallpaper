import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category';
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { S3 } from 'aws-sdk';
import Wallpaper from 'App/Models/Wallpaper';
import fs from 'fs';

export default class WallpapersController {

    public async index({ view, request }: HttpContextContract) {

        const page = request.input('page', 1)
        const limit = 10

        const wallpapers = await Database.from('wallpapers')
            .select('*')
            .join('categories', 'wallpapers.category_id', 'categories.id')
            .paginate(page, limit);
        console.log(wallpapers);

        // Changes the baseURL for the pagination links
        wallpapers.baseUrl('/wallpaper-index')

        return view.render('admin.wallpaper.index', { wallpapers: wallpapers });
    }

    public async create({ view }: HttpContextContract) {
        const categories = await Category.all()

        return view.render('admin.wallpaper.create', { categories: categories })
    }


    public async save({ response, request }: HttpContextContract) {
        const newPostSchema = schema.create({
            name: schema.string(),
            author: schema.string(),
            category_id: schema.number(),
        })
        const coverImage = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        })
        const thumbnailImage = request.file('thumbnail', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        })

        if (!coverImage) {
            return coverImage;
        }
        if(!thumbnailImage) {
            return coverImage;
        }
        // const fileName = `${cuid()}.${coverImage.extname}`
        // await coverImage.move(Application.publicPath('upload'), {
        //     name: fileName,
        //     overwrite: true,
        // })

        var image_link = await this.uploadImage(coverImage);
        var thumbnail_link = await this.uploadImage(thumbnailImage);


        const payload = await request.validate({ schema: newPostSchema })
        var wallpaper = new Wallpaper();
        wallpaper.name = payload.name;
        wallpaper.image = image_link;
        wallpaper.thumbnail = thumbnail_link;
        wallpaper.author = payload.author;
        wallpaper.category_id = payload.category_id;
        await wallpaper.save();
        return response.redirect('/wallpaper-index');

    }


    public async edit({ params, view }: HttpContextContract) {
        const wallpaper = await Wallpaper.find(params.id)
        return view.render('admin/wallpaper/edit', {
            wallpaper: wallpaper
        });
    }



    public async update({ response, request, params }: HttpContextContract) {
        const newPostSchema = schema.create({
            name: schema.string(),
            image: schema.string(),
            author: schema.string(),
            category_id: schema.number(),
        })

        const payload = await request.validate({ schema: newPostSchema })

        const wallpaper = await Wallpaper.findOrFail(params.id)
        wallpaper.name = payload.name;
        wallpaper.image = payload.image;
        wallpaper.author = payload.author;
        wallpaper.category_id = payload.category_id;
        await wallpaper.save();
        return response.redirect('/wallpaper-index');

    }


    public async delete({ params, response }: HttpContextContract) {
        const wallpaper = await Wallpaper.findOrFail(params.id)
        await wallpaper.delete()
        return response.redirect('/wallpaper-index');

    }



    public async uploadImage(file) {
        
        const region = 'us-east-1';
        const bucketName = "wallpapers-test";
        const accessKeyId = "AKIA3OBPZDHWVIEIYJBK";
        const secretAccessKey = "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";

        const s3 = new S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
        });
        const key = `${cuid()}.${file.extname}`
        const buffer = fs.readFileSync(file.tmpPath)
        const params: S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ACL: 'public-read', // Set appropriate ACL based on your requirements
        };

        try {
            const result = await s3.upload(params).promise();
            console.log(result.Location);
            return result.Location;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }



}
