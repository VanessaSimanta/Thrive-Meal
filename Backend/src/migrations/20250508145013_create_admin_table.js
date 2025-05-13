/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
      table.increments('adminId').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updateAt').defaultTo(knex.fn.now()).notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admin');
  };
  