import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('name').notNullable()
      table.string('username').notNullable()
      table.string('email').notNullable()
      table.string('password_hash').notNullable()

      table
        .uuid('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()

      table.boolean('registration_completed').defaultTo(false)
      table.boolean('is_activated').defaultTo(true)
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
