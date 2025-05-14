/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
    await knex.schema.createTable('driver', (table) => {
      table.integer('driverID').primary();
      table.integer('branchID').notNullable();
      table.string('driver_name', 100).notNullable();
      table.string('driver_dob', 100).notNullable();
      table.string('road_name', 100).notNullable();
      table.string('urban_village', 100).notNullable();
      table.string('district', 100).notNullable();
      table.string('phone_number', 100).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
  
      table.foreign('branchID').references('branchID').inTable('branch').onDelete('CASCADE');
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('driver');
  };
  
