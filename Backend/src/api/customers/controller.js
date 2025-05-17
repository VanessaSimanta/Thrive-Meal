const customerRepository = require('./repository');

exports.createCustomerHandler = async (req, res, next) => {
  try {
    const newCustomer = await customerRepository.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCustomersHandler = async (req, res, next) => {
  try {
    const customers = await customerRepository.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerByIdHandler = async (req, res, next) => {
  try {
    const customer = await customerRepository.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    console.error('Get customer by ID error:', error);
    res.status(500).json({ error: error.message });
  }
};
