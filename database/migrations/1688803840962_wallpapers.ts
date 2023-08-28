import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wallpapers extends BaseSchema {
  protected tableName = 'wallpapers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).nullable()
      table.string('author', 255).nullable()
      table.string('category_id').nullable()
      table.text('image').nullable()
      table.text('thumbnail').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
