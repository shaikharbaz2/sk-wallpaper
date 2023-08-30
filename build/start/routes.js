"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('dashboard', 'UsersController.index').middleware('auth');
Route_1.default.get('user-list', 'UsersController.userList').middleware('auth');
Route_1.default.get('/logout', 'UsersController.logout').middleware('auth');
Route_1.default.get('/category-index/', 'CategoryController.index').middleware('auth');
Route_1.default.get('/category-create/', 'CategoryController.create').middleware('auth');
Route_1.default.post('/category-save/', 'CategoryController.save').middleware('auth');
Route_1.default.get('/edit-category/:id', 'CategoryController.edit').middleware('auth');
Route_1.default.post('/update-category/:id', 'CategoryController.update').middleware('auth');
Route_1.default.get('/delete-category/:id', 'CategoryController.delete').middleware('auth');
Route_1.default.get('/wallpaper-index/', 'WallpapersController.index').middleware('auth');
Route_1.default.get('/wallpaper-create/', 'WallpapersController.create').middleware('auth');
Route_1.default.post('/wallpaper-save/', 'WallpapersController.save').middleware('auth');
Route_1.default.get('/edit-wallpaper/:id', 'WallpapersController.edit').middleware('auth');
Route_1.default.post('/update-wallpaper/:id', 'WallpapersController.update').middleware('auth');
Route_1.default.get('/delete-wallpaper/:id', 'WallpapersController.delete').middleware('auth');
Route_1.default.get('admin', 'UsersController.loginAdminPage');
Route_1.default.get('/', 'UsersController.loginAdminPage');
Route_1.default.get('signup', 'UsersController.sighupAdminPage');
Route_1.default.post('signup', 'UsersController.sighupAdmin');
Route_1.default.post('login', 'UsersController.loginUser');
Route_1.default.get('/all-wallpaper', 'WallpapersController.WallpaperListForApi');
//# sourceMappingURL=routes.js.map