 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Package from "App/Models/Package";

export default class UserHomesController {


    public async package({view}: HttpContextContract) {
        const Packages = await Package.all()
            return view.render('user.package',{
              packages:Packages
            });
       
     
        }

        public async checkout({view,params}: HttpContextContract) {
          const Packages = await Package.find(params.id)
              return view.render('user.checkout',{
                packages:Packages
              });
       
          }


          public async MarketCapital({view}: HttpContextContract) {
                return view.render('user.market-capital');
            }

            public async newsFeed({view}: HttpContextContract) {
              return view.render('user.news');
          }
  
}
