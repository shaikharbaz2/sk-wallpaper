import { DateTime } from 'luxon'
import { BaseModel, column,  HasMany,
  hasMany, } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Package from './Package'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public package_id: number | null

  @column()
  public upi_address: string | null


  @column()
  public payment_method: string | null
  
  @column()
  public user_id: number | null

  @column()
  public status: string | null

  @column()
  public package_name: string | null

  @column()
  public name: string | null

  @column()
  public amount: number | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => User)
  public transactions: HasMany<typeof User>


  @hasMany(() => Package)
  public packages: HasMany<typeof Package>


}
