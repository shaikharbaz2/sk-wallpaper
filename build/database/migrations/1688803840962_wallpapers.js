"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Wallpapers extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'wallpapers';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255).nullable();
            table.string('author', 255).nullable();
            table.string('category_id').nullable();
            table.text('image').nullable();
            table.text('thumbnail').nullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Wallpapers;
//# sourceMappingURL=1688803840962_wallpapers.js.map