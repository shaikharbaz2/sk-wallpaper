"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Transaction"));
const Package_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Package"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class TransactionsController {
    async payment({ request, auth, response, params }) {
        const payment_method = request.input("payment_method");
        const upi_address = request.input("upi_address");
        const packages = await Package_1.default.find(params.id);
        var package_name = packages?.title ?? "null";
        var package_amount = packages?.amount ?? 0;
        var userId = auth.user?.id ?? 2;
        const name = auth.user?.fname + " " + auth.user?.lname;
        const package_id = params.id;
        const transactions = new Transaction_1.default();
        transactions.payment_method = payment_method;
        transactions.package_id = package_id;
        transactions.user_id = userId;
        transactions.name = name;
        transactions.amount = package_amount;
        transactions.package_name = package_name;
        transactions.upi_address = upi_address;
        transactions.status = "pending";
        await transactions.save();
        return response.redirect('/dashboard');
    }
    async index({ view }) {
        const transaction = await Transaction_1.default.all();
        console.log(transaction);
        return view.render('user.transaction', {
            transactions: transaction
        });
    }
    async indexAdmin({ view, request }) {
        const page = request.input('page', 1);
        const limit = 50;
        const transaction = await Database_1.default.from('transactions').paginate(page, limit);
        transaction.baseUrl('/admin-transaction');
        return view.render('admin.transaction', {
            transactions: transaction
        });
    }
    async changeStatus({ response, request, params }) {
        var id = params.id;
        var status = request.input('status');
        var transactions = await Transaction_1.default.findOrFail(id);
        transactions.status = status;
        await transactions.save();
        return response.redirect('/admin-transaction');
    }
}
exports.default = TransactionsController;
//# sourceMappingURL=TransactionsController.js.map