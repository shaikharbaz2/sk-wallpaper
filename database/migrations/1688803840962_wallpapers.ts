import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wallpapers extends BaseSchema {
  protected tableName = 'wallpapers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('author', 255).notNullable()
      table.string('category_id').notNullable()
      table.text('image').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
