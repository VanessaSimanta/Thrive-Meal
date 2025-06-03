/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customers', (table) => {
      table.increments('customerId').primary();
      table.string('customer_name', 100).notNullable();
      table.string('road_name', 300).notNullable();
      table.string('urban_village', 100).notNullable();
      table.string('district', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('province', 100).notNullable();
      table.integer('zip_code').notNullable();
      table.string('address_notes', 300);
      table.string('phone_number', 100).notNullable();
      table.string('allergy_notes', 300);
      table.string('customer_email', 255).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('customers');
  };
  