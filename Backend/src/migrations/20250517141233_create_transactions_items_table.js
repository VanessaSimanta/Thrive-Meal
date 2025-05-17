// migrations/xxxx_create_transaction_items_table.js
exports.up = function(knex) {
  return knex.schema.createTable('transaction_items', function(table) {
    table.increments('itemsId').primary();
    table.string('transactionId').notNullable();
    table.enum('item_type', ['package', 'period']).notNullable();
    table.integer('item_id').notNullable();
    table.integer('price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('transactionId').references('transactionId').inTable('transactions').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transaction_items');
};
