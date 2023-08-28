"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Category"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const aws_sdk_1 = require("aws-sdk");
const buffer_1 = require("buffer");
const Wallpaper_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Wallpaper"));
class WallpapersController {
    async index({ view, request }) {
        const page = request.input('page', 1);
        const limit = 10;
        const wallpapers = await Database_1.default.from('wallpapers')
            .select('*')
            .join('categories', 'wallpapers.category_id', 'categories.id')
            .paginate(page, limit);
        console.log(wallpapers);
        wallpapers.baseUrl('/wallpaper-index');
        return view.render('admin.wallpaper.index', { wallpapers: wallpapers });
    }
    async create({ view }) {
        const categories = await Category_1.default.all();
        return view.render('admin.wallpaper.create', { categories: categories });
    }
    async save({ response, request }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            author: Validator_1.schema.string(),
            category_id: Validator_1.schema.number(),
        });
        const coverImage = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        });
        const thumbnailImage = request.file('thumbnail', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        });
        if (!coverImage) {
            return coverImage;
        }
        if (!thumbnailImage) {
            return coverImage;
        }
        var image_link = await this.uploadImage(coverImage);
        var thumbnail_link = await this.uploadImage(thumbnailImage);
        const payload = await request.validate({ schema: newPostSchema });
        var wallpaper = new Wallpaper_1.default();
        wallpaper.name = payload.name;
        wallpaper.image = image_link;
        wallpaper.thumbnail = thumbnail_link;
        wallpaper.author = payload.author;
        wallpaper.category_id = payload.category_id;
        await wallpaper.save();
        return response.redirect('/wallpaper-index');
    }
    async edit({ params, view }) {
        const wallpaper = await Wallpaper_1.default.find(params.id);
        return view.render('admin/wallpaper/edit', {
            wallpaper: wallpaper
        });
    }
    async update({ response, request, params }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            image: Validator_1.schema.string(),
            author: Validator_1.schema.string(),
            category_id: Validator_1.schema.number(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        const wallpaper = await Wallpaper_1.default.findOrFail(params.id);
        wallpaper.name = payload.name;
        wallpaper.image = payload.image;
        wallpaper.author = payload.author;
        wallpaper.category_id = payload.category_id;
        await wallpaper.save();
        return response.redirect('/wallpaper-index');
    }
    async delete({ params, response }) {
        const wallpaper = await Wallpaper_1.default.findOrFail(params.id);
        await wallpaper.delete();
        return response.redirect('/wallpaper-index');
    }
    async uploadImage(file) {
        const region = 'us-east-1';
        const bucketName = "wallpapers-test";
        const accessKeyId = "AKIA3OBPZDHWVIEIYJBK";
        const secretAccessKey = "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";
        const s3 = new aws_sdk_1.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
        });
        const key = `${Helpers_1.cuid()}.${file.extname}`;
        const buffer = buffer_1.Buffer.from(JSON.stringify(file), 'utf-8');
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ACL: 'public-read',
        };
        try {
            const result = await s3.upload(params).promise();
            console.log(result.Location);
            return result.Location;
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}
exports.default = WallpapersController;
//# sourceMappingURL=WallpapersController.js.map