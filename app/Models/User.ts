import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeFind,
  beforeSave,
  column,
  manyToMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

import Role from 'App/Models/Role'
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({})
  public name: string

  @column({})
  public username: string

  @column({})
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public role_id: string

  @column({ serializeAs: null })
  public registration_completed: boolean = false

  @column({ serializeAs: null })
  public is_activated: boolean = true

  @column({ serializeAs: null })
  public is_deleted: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'roles_users',
  })
  public roles: ManyToMany<typeof Role>

  /* --------------------------------- HOOKS --------------------------------- */

  @beforeSave()
  public static async hashPassword(user: User): Promise<void> {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async setUserRoleAsDefault(user: User): Promise<void> {
    if (user.$dirty.role_id === undefined && user.$dirty.email !== Env.get('SEED_EMAIL')) {
      const [{ id }] = await Database.query().select('id').from('roles').where('name', 'user')
      user.role_id = id
    }
  }

  @beforeFind()
  public static async ignoreDeleted(query: ModelQueryBuilderContract<typeof User>): Promise<void> {
    query.whereNot('is_deleted', true)
  }

  @afterCreate()
  public static async attachRole(user: User): Promise<void> {
    await user.related('roles').attach([user.role_id])
  }
}
