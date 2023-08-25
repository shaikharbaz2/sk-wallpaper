"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Package_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Package"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class PackagesController {
    async index({ view, request }) {
        const page = request.input('page', 1);
        const limit = 10;
        const packages = await Database_1.default.from('packages').paginate(page, limit);
        packages.baseUrl('/package-index');
        return view.render('admin.Package.index', { packages: packages });
    }
    async create({ view }) {
        return view.render('admin.Package.create');
    }
    async save({ response, request }) {
        const newPostSchema = Validator_1.schema.create({
            title: Validator_1.schema.string(),
            amount: Validator_1.schema.number(),
            descriptions: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        var packages = new Package_1.default();
        packages.title = payload.title;
        packages.amount = payload.amount;
        packages.descriptions = payload.descriptions;
        await packages.save();
        return response.redirect('/package-index');
    }
    async edit({ params, view }) {
        const Packages = await Package_1.default.find(params.id);
        return view.render('admin/Package/edit', {
            package: Packages
        });
    }
    async update({ response, request, params }) {
        const newPostSchema = Validator_1.schema.create({
            title: Validator_1.schema.string(),
            amount: Validator_1.schema.number(),
            descriptions: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        const packages = await Package_1.default.findOrFail(params.id);
        packages.title = payload.title;
        packages.amount = payload.amount;
        packages.descriptions = payload.descriptions;
        await packages.save();
        return response.redirect('/package-index');
    }
    async delete({ params, response }) {
        const Packages = await Package_1.default.findOrFail(params.id);
        await Packages.delete();
        return response.redirect('/package-index');
    }
}
exports.default = PackagesController;
//# sourceMappingURL=PackagesController.js.map