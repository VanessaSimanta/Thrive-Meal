exports.up = function(knex) {
  return knex.schema.alterTable('orders', function(table) {
    table.string('transactionId').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders', function(table) {
    table.integer('transactionId').alter(); 
  });
};
