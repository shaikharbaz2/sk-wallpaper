"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Transactions extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'transactions';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('package_id')
                .unsigned()
                .references('packages.id')
                .onDelete('CASCADE');
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .onDelete('CASCADE');
            table.string('upi_address', 255).nullable();
            table.string('name', 255).nullable();
            table.string('amount', 255).nullable();
            table.string('package_name', 255).nullable();
            table.string('payment_method', 255).nullable();
            table.string('status', 255).nullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Transactions;
//# sourceMappingURL=1626589301497_transactions.js.map