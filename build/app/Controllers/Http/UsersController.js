"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class UsersController {
    async save({ request, response }) {
        const email = request.input("email");
        const password = request.input("password");
        const fname = request.input("fname");
        const lname = request.input("lname");
        const contact = request.input("contact");
        const alt_contact = request.input("alt_contact");
        const coverImage = request.file('cover_image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif'],
        });
        if (!coverImage) {
            return coverImage;
        }
        const fileName = `${Helpers_1.cuid()}.${coverImage.extname}`;
        await coverImage.move(Application_1.default.publicPath('upload'), {
            name: fileName,
            overwrite: true,
        });
        const newUser = new User_1.default();
        newUser.email = email;
        newUser.lname = lname;
        newUser.fname = fname;
        newUser.contact = contact;
        newUser.alt_contact = alt_contact;
        newUser.type = "user";
        newUser.profile_Url = fileName;
        newUser.password = password;
        await newUser.save();
        return response.redirect('/dashboard');
    }
    async index({ view, auth }) {
        if (auth.user?.type == "user") {
            return view.render('index');
        }
        return view.render('admin.index');
    }
    async login({ view }) {
        return view.render('login');
    }
    async loginAdminPage({ view }) {
        return view.render('admin-login');
    }
    async loginUser({ request, auth, response }) {
        var email = request.input("email");
        var password = request.input("password");
        try {
            await auth.use('web').attempt(email, password);
            response.redirect('/dashboard');
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
    }
    async loginAdmin({ request, auth, response }) {
        var email = request.input("email");
        var password = request.input("password");
        try {
            await auth.use('web').attempt(email, password);
            response.redirect('/dashboard');
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
    }
    async userList({ request, view }) {
        const page = request.input('page', 1);
        const limit = 10;
        const users = await Database_1.default.from('users').paginate(page, limit);
        users.baseUrl('/user-list');
        return view.render('admin.user', { data: users });
    }
    async editUser({ params, view }) {
        const user = await User_1.default.find(params.id);
        return view.render('admin/edit', {
            user: user
        });
    }
    async updateUser({ params, request, response }) {
        const email = request.input("email");
        const fname = request.input("fname");
        const lname = request.input("lname");
        const contact = request.input("contact");
        const alt_contact = request.input("alt_contact");
        const user = await User_1.default.findOrFail(params.id);
        user.email = email;
        user.lname = lname;
        user.fname = fname;
        user.contact = contact;
        user.alt_contact = alt_contact;
        await user.save();
        response.redirect('/user-list');
    }
    async profile({ view }) {
        return view.render('user.profile');
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        response.redirect('/admin');
    }
    async viewUser({ params, view }) {
        const user = await User_1.default.find(params.id);
        return view.render('admin/view', {
            user: user
        });
    }
    async sighupAdminPage({ view }) {
        return view.render('admin-sighup');
    }
    async sighupAdmin({ request, response }) {
        const email = request.input("email");
        const password = request.input("password");
        const fname = request.input("fname");
        const lname = request.input("lname");
        const newUser = new User_1.default();
        newUser.email = email;
        newUser.lname = lname;
        newUser.fname = fname;
        newUser.type = "admin";
        newUser.password = password;
        await newUser.save();
        return response.redirect('/admin');
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map