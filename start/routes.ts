/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/form', async ({ view }) => {
  return view.render('form')
})

Route.get('package', 'UserHomesController.package').middleware('auth')
Route.get('checkout/:id', 'UserHomesController.checkout').middleware('auth')
Route.get('market-capital', 'UserHomesController.MarketCapital').middleware('auth')
Route.get('news', 'UserHomesController.newsFeed').middleware('auth')


Route.post('payment/:id', 'TransactionsController.payment').middleware('auth')
Route.get('transaction', 'TransactionsController.index').middleware('auth')
Route.get('admin-transaction', 'TransactionsController.indexAdmin').middleware('auth')
Route.post('transaction-status/:id', 'TransactionsController.changeStatus').middleware('auth')

Route.post('save', 'UsersController.save')
Route.get('dashboard', 'UsersController.index').middleware('auth')
Route.get('user-list', 'UsersController.userList').middleware('auth')
Route.get('/edit-user/:id', 'UsersController.editUser').middleware('auth')
Route.get('/view-user/:id', 'UsersController.viewUser').middleware('auth')
Route.post('/update-user/:id', 'UsersController.updateUser').middleware('auth')
Route.get('/profile', 'UsersController.profile').middleware('auth')
Route.get('/logout', 'UsersController.logout').middleware('auth')




Route.get('/package-index/', 'PackagesController.index').middleware('auth')
Route.get('/package-create/', 'PackagesController.create').middleware('auth')
Route.post('/package-save/', 'PackagesController.save').middleware('auth')
Route.get('/edit-package/:id', 'PackagesController.edit').middleware('auth')
Route.post('/update-package/:id', 'PackagesController.update').middleware('auth')
Route.get('/delete-package/:id', 'PackagesController.delete').middleware('auth')


Route.get('/category-index/', 'CategoryController.index').middleware('auth')
Route.get('/category-create/', 'CategoryController.create').middleware('auth')
Route.post('/category-save/', 'CategoryController.save').middleware('auth')
Route.get('/edit-category/:id', 'CategoryController.edit').middleware('auth')
Route.post('/update-category/:id', 'CategoryController.update').middleware('auth')
Route.get('/delete-category/:id', 'CategoryController.delete').middleware('auth')

Route.get('/wallpaper-index/', 'WallpapersController.index').middleware('auth')
Route.get('/wallpaper-create/', 'WallpapersController.create').middleware('auth')
Route.post('/wallpaper-save/', 'WallpapersController.save').middleware('auth')
Route.get('/edit-wallpaper/:id', 'WallpapersController.edit').middleware('auth')
Route.post('/update-wallpaper/:id', 'WallpapersController.update').middleware('auth')
Route.get('/delete-wallpaper/:id', 'WallpapersController.delete').middleware('auth')




Route.get('login', 'UsersController.login')
Route.get('admin', 'UsersController.loginAdminPage')
Route.get('signup', 'UsersController.sighupAdminPage')
Route.post('signup', 'UsersController.sighupAdmin')



Route.post('login', 'UsersController.loginUser')



