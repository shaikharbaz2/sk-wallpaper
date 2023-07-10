import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('package_id')
      .unsigned()
      .references('packages.id')
      .onDelete('CASCADE') 

      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') 

      table.string('upi_address', 255).nullable()
      table.string('name', 255).nullable()
      table.string('amount', 255).nullable()
      table.string('package_name', 255).nullable()
      table.string('payment_method', 255).nullable()
      table.string('status', 255).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
