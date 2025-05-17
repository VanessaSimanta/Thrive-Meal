/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('payment', function(table) {
      table.increments('paymentId').primary().notNullable();
      table.string('amount', 100).notNullable();
      table.enu('payment_status', ['PENDING', 'SUCCESS', 'FAILED']).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payment');
  };
  