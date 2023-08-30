"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Category"));
class CategoryController {
    async index({ view, request }) {
        const page = request.input('page', 1);
        const limit = 10;
        const categories = await Database_1.default.from('categories').paginate(page, limit);
        categories.baseUrl('/category-index');
        return view.render('admin.category.index', { categories: categories });
    }
    async create({ view }) {
        return view.render('admin.category.create');
    }
    async save({ response, request }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            description: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        var categories = new Category_1.default();
        categories.name = payload.name;
        categories.description = payload.description;
        await categories.save();
        return response.redirect('/category-index');
    }
    async edit({ params, view }) {
        const categories = await Category_1.default.find(params.id);
        return view.render('admin/category/edit', {
            category: categories
        });
    }
    async update({ response, request, params }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            description: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        const categories = await Category_1.default.findOrFail(params.id);
        categories.name = payload.name;
        categories.description = payload.description;
        await categories.save();
        return response.redirect('/category-index');
    }
    async delete({ params, response }) {
        const categories = await Category_1.default.findOrFail(params.id);
        await categories.delete();
        return response.redirect('/category-index');
    }
}
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map