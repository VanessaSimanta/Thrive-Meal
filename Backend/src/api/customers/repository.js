const db = require('../../core/db');

exports.createCustomer = async (data) => {
  return db('customers').insert(data).returning('*');
};

exports.getAllCustomers = async () => {
  return db('customers').select('*');
};

exports.getCustomerById = async (id) => {
  return db('customers').where({ customerId: id }).first();
};
