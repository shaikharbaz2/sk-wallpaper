import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from "App/Models/User";
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {

    public async save({request,response}: HttpContextContract) {
      const email = request.input("email");
      const password = request.input("password");
      const fname = request.input("fname");
      const lname = request.input("lname");
      const contact = request.input("contact");
      const alt_contact = request.input("alt_contact");


      const coverImage = request.file('cover_image', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })
      
      if (!coverImage) {
        return coverImage;
      }
      
      const fileName = `${cuid()}.${coverImage.extname}`
      
      await coverImage.move(Application.publicPath('upload'),{
        name: fileName,
        overwrite: true,
      })
      const newUser = new User();
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

      public async index({view,auth}: HttpContextContract) {
        if(auth.user?.type=="user")
        {
          return view.render('index')
        }
        return view.render('admin.index')
        }
        public async login({view}: HttpContextContract) {
          return view.render('login')
          }

          public async loginAdminPage({view}: HttpContextContract) {
            return view.render('admin-login')
            }

      public async loginUser({request,auth,response}: HttpContextContract) {
        var email = request.input("email")
        var password = request.input("password")      
          try {
          await auth.use('web').attempt(email, password)
          response.redirect('/dashboard')
        } catch {
          return response.badRequest('Invalid credentials')
        }
      
     }
     public async loginAdmin({request,auth,response}: HttpContextContract) {
      var email = request.input("email")
      var password = request.input("password")      
        try {
        await auth.use('web').attempt(email, password)
        response.redirect('/dashboard')
      } catch {
        return response.badRequest('Invalid credentials')
      }
    
   }

   public async userList({request,view}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const users = await Database.from('users').paginate(page, limit)

    // Changes the baseURL for the pagination links
    users.baseUrl('/user-list')

    return view.render('admin.user',{data:users});
    }

    public async editUser({params,view}: HttpContextContract) {
      const user = await User.find(params.id)
      return view.render('admin/edit',{
        user:user
      });
      }

      public async updateUser({params,request,response}: HttpContextContract) {
      const email       = request.input("email");
      const fname       = request.input("fname");
      const lname       = request.input("lname");
      const contact     = request.input("contact");
      const alt_contact = request.input("alt_contact");
      const user        = await User.findOrFail(params.id)
      user.email        = email;
      user.lname        = lname;
      user.fname        = fname;
      user.contact      = contact;
      user.alt_contact = alt_contact;
      await user.save()
      response.redirect('/user-list')

      }


      public async profile({view}: HttpContextContract) {
        return view.render('user.profile');
        }

        public async logout({auth,response}: HttpContextContract) {
          await auth.use('web').logout()
          response.redirect('/login')
          }


          public async viewUser({params,view}: HttpContextContract) {
            const user = await User.find(params.id)
            return view.render('admin/view',{
              user:user
            });
            }


            public async sighupAdminPage({view}: HttpContextContract) {
              return view.render('admin-sighup')
              }


              public async sighupAdmin({request,response}: HttpContextContract) {
                const email = request.input("email");
                const password = request.input("password");
                const fname = request.input("fname");
                const lname = request.input("lname");
               const newUser = new User();
                newUser.email = email;
                newUser.lname = lname;
                newUser.fname = fname;
                newUser.type = "admin";
                newUser.password = password;
                await newUser.save();  
                return response.redirect('/admin');
          
                }
          
}
