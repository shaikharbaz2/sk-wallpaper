"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Package_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Package"));
class UserHomesController {
    async package({ view }) {
        const Packages = await Package_1.default.all();
        return view.render('user.package', {
            packages: Packages
        });
    }
    async checkout({ view, params }) {
        const Packages = await Package_1.default.find(params.id);
        return view.render('user.checkout', {
            packages: Packages
        });
    }
    async MarketCapital({ view }) {
        return view.render('user.market-capital');
    }
    async newsFeed({ view }) {
        return view.render('user.news');
    }
}
exports.default = UserHomesController;
//# sourceMappingURL=UserHomesController.js.map