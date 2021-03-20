import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()

      table.string('zipcode')
      table.string('street')
      table.string('number')
      table.string('city')
      table.string('uf')
      table.string('description')

      table.string('is_deleted').defaultTo('false')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
