import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category';


export default class CategoryController {

    public async index({ view, request }: HttpContextContract) {

        const page = request.input('page', 1)
        const limit = 10

        const categories = await Database.from('categories').paginate(page, limit)

        // Changes the baseURL for the pagination links
        categories.baseUrl('/category-index')

        return view.render('admin.category.index', { categories: categories });
    }

    public async create({ view }: HttpContextContract) {

        return view.render('admin.category.create')
    }


    public async save({ response, request }: HttpContextContract) {
        const newPostSchema = schema.create({
            name: schema.string(),
            description: schema.string(),
        })
        const payload = await request.validate({ schema: newPostSchema })
        var categories = new Category();
        categories.name = payload.name;
        categories.description = payload.description;
        await categories.save();
        return response.redirect('/category-index');

    }


    public async edit({ params, view }: HttpContextContract) {
        const categories = await Category.find(params.id)
        return view.render('admin/category/edit', {
            Category: categories
        });
    }



    public async update({ response, request, params }: HttpContextContract) {
        const newPostSchema = schema.create({
            name: schema.string(),
            description: schema.string(),
        })

        const payload = await request.validate({ schema: newPostSchema })

        const categories = await Category.findOrFail(params.id)
        categories.name = payload.name;
        categories.description = payload.description;
        await categories.save();
        return response.redirect('/category-index');

    }


    public async delete({ params, response }: HttpContextContract) {
        const categories = await Category.findOrFail(params.id)
        await categories.delete()
        return response.redirect('/category-index');

    }



}
