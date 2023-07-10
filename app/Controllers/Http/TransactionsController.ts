 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Transaction from "App/Models/Transaction";
 import Package from "App/Models/Package";
 import Database from '@ioc:Adonis/Lucid/Database'



export default class TransactionsController {


    public async payment({request,auth,response,params}: HttpContextContract) {
        const payment_method = request.input("payment_method");
        const upi_address = request.input("upi_address");
        const packages = await Package.find(params.id);
        var package_name = packages?.title??"null";
        var package_amount = packages?.amount ?? 0;
        var userId = auth.user?.id?? 2;
        const name = auth.user?.fname +" "+ auth.user?.lname;
        const package_id = params.id;
        const transactions = new Transaction();
        transactions.payment_method = payment_method;
        transactions.package_id = package_id;
        transactions.user_id = userId;
        transactions.name = name;
        transactions.amount = package_amount;
        transactions.package_name =package_name;
        transactions.upi_address = upi_address;
        transactions.status = "pending";
        await transactions.save();  
        return response.redirect('/dashboard');
  
        }
  

        public async index({view})
        {
            const transaction = await Transaction.all()

               console.log(transaction);
               return view.render('user.transaction',{
                   transactions:transaction
               })

        }

        public async indexAdmin({view,request})
        {
           
            const page = request.input('page', 1)
            const limit = 50
        
            const transaction = await Database.from('transactions').paginate(page, limit)
        
            // Changes the baseURL for the pagination links
            transaction.baseUrl('/admin-transaction')
        
               return view.render('admin.transaction',{
                   transactions:transaction
               })

        }


        public async changeStatus({response,request,params})
        {
            var id = params.id;
            var status = request.input('status');

            var  transactions = await Transaction.findOrFail(id)
                 transactions.status = status;
                 await  transactions.save(); 
                 return response.redirect('/admin-transaction');
        }

}
