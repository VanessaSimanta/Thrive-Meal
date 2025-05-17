/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table) {
    table.string('transactionId').primary();

    table.integer('customerId').notNullable();
    table.integer('orderId').notNullable();

    table.integer('gross_amount').notNullable();
    table.string('snap_token').notNullable();
    table.string('snap_redirect_url').notNullable();
    table.string('payment_status', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('customerId').references('customerId').inTable('customers').onDelete('CASCADE');
    table.foreign('orderId').references('orderId').inTable('orders').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
