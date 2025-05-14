/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
    await knex.schema.createTable('branch', (table) => {
      table.increments('branchID').primary();
      table.string('road_name', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('province', 100).notNullable();
      table.string('phone_number', 100).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now()); 
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('branch');
  };
  
  
