import { DateTime } from 'luxon'
import Category from './Category'
import {
  BaseModel, column, BelongsTo,
  belongsTo,
} from '@ioc:Adonis/Lucid/Orm'

export default class Wallpaper extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number | null

  @column()
  public name: string | null

  @column()
  public author: string | null

  @column()
  public image: string | null

  @column()
  public thumbnail: string | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
