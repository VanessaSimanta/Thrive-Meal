/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menu', function(table) {
      table.increments('menuId').primary();
      table.integer('packageId').unsigned().notNullable();
      table.string('menu_name', 100).notNullable();
      table.string('menu_type', 100).notNullable();
      table.string('detail_menu', 1000).notNullable();
      table.string('imageURL', 500).notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updateAt').notNullable().defaultTo(knex.fn.now());
  
      table.foreign('packageId').references('package.packageId').onDelete('CASCADE');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('menu');
  };