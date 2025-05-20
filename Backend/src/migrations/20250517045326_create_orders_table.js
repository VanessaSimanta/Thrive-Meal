/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
      table.increments('orderId').primary(); // PK
      table.integer('customerId').notNullable(); // FK1
      table.integer('packageId').notNullable(); // F
      table.integer('periodId').notNullable(); // FK3
      table.integer('transactionId');              // FK4 (nullable)
      table.integer('branchID');               // FK5 (nullable)
      table.integer('driverID');               // FK6 (nullable)
      table.integer('adminId');                // FK7 (nullable)
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
  
      // Optional: add foreign key constraints
      table.foreign('customerId').references('customerId').inTable('customers');
      table.foreign('packageId').references('packageId').inTable('package');
      table.foreign('periodId').references('periodId').inTable('period');
      table.foreign('branchID').references('branchID').inTable('branch');
      table.foreign('driverID').references('driverID').inTable('driver');
      table.foreign('adminId').references('adminId').inTable('admin');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };