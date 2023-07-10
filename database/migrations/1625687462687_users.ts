import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).nullable()
      table.string('profile_url', 255).nullable()
      table.string('fname', 255).nullable()
      table.string('lname', 255).nullable()
      table.string('contact', 255).nullable()
      table.string('type', 255).nullable()
      table.string('alt_contact', 255).nullable()
      table.string('password', 180).nullable()
      table.string('remember_me_token').nullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
