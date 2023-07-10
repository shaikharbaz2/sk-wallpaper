import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Package extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string | null

  @column()
  public descriptions: string | null

  @column()
  public amount: number | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
