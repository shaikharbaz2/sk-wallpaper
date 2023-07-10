import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Package from "App/Models/Package";
import Database from '@ioc:Adonis/Lucid/Database'


export default class PackagesController {

  public async index({ view, request }: HttpContextContract) {

    const page = request.input('page', 1)
    const limit = 10

    const packages = await Database.from('packages').paginate(page, limit)

    // Changes the baseURL for the pagination links
    packages.baseUrl('/package-index')

    return view.render('admin.Package.index', { packages: packages });
  }

  public async create({ view }: HttpContextContract) {

    return view.render('admin.Package.create')
  }


  public async save({ response, request }: HttpContextContract) {
    const newPostSchema = schema.create({
      title: schema.string(),
      amount: schema.number(),
      descriptions: schema.string(),
    })

    const payload = await request.validate({ schema: newPostSchema })
    var packages = new Package();
    packages.title = payload.title;
    packages.amount = payload.amount;
    packages.descriptions = payload.descriptions;
    await packages.save();
    return response.redirect('/package-index');

  }


  public async edit({ params, view }: HttpContextContract) {
    const Packages = await Package.find(params.id)
    return view.render('admin/Package/edit', {
      package: Packages
    });
  }



  public async update({ response, request, params }: HttpContextContract) {
    const newPostSchema = schema.create({
      title: schema.string(),
      amount: schema.number(),
      descriptions: schema.string(),
    })

    const payload = await request.validate({ schema: newPostSchema })

    const packages = await Package.findOrFail(params.id)
    packages.title = payload.title;
    packages.amount = payload.amount;
    packages.descriptions = payload.descriptions;
    await packages.save();
    return response.redirect('/package-index');

  }


  public async delete({ params, response }: HttpContextContract) {
    const Packages = await Package.findOrFail(params.id)
    await Packages.delete()
    return response.redirect('/package-index');

  }



}
