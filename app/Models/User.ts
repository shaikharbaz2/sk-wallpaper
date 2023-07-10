import { DateTime } from 'luxon'

import Hash from '@ioc:Adonis/Core/Hash'
import Transaction from 'App/Models/Transaction'
import Package from 'App/Models/Package'


import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile_Url: string | null
  
  @column()
  public type: string | null

  @column()
  public fname: string | null

  @column()
  public lname: string | null

  @column()
  public contact: string | null

  @column()
  public alt_contact: string | null
  
  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>


  @hasMany(() => Package)
  public packages: HasMany<typeof Package>

}
