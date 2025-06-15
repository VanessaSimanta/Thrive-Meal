const { errorResponder, errorTypes } = require('../../core/errors');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createCustomerInDb,
  createOrderInDb,
  assignBranch,
  assignDriver,
  assignAdmin,
  getOrders
} = require('./repository');

// Get orders
const getAllOrdersCtrl = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sort = req.query.sort === 'asc' ? 'asc' : 'desc'; 

    const { orders, total } = await getAllOrders(limit, offset, sort);
    const lastPage = Math.ceil(total / limit);

    res.status(200).json({
      data: orders,
      currentPage: page,
      lastPage,
      totalPages: lastPage,
      totalData: total,
    });
  } catch (error) {
    return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
  }
};

//Get all order without pagination
const getOrdersCtrl = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
  }
};


// Get order by ID
const getOrderByIdCtrl = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    if (!order) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Order not found');
    }
    res.status(200).json(order);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      statusCode: status,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error occurred',
    });
  }
};

// Create new order
const createOrderCtrl = async (req, res) => {
  try {
    const {
      customerId,
      packageId,
      periodId,
    } = req.body;

    const newOrder = await createOrder({
      customer_id: customerId,
      package_id: packageId,
      period_id: periodId,
    });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      statusCode: status,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error occurred',
    });
  }
};

const createFullOrderCtrl = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email, 
      roadName,         // sesuaikan dengan migration
      urbanVillage,
      province,
      city,
      district,
      zipCode,
      addressNotes,
      allergyNotes,
      packageId,
      periodId,
      start_date
    } = req.body;

    // Validasi input wajib
    if (!fullName || !phoneNumber || !email || !roadName || !packageId || !periodId || !start_date) {
      throw errorResponder(errorTypes.INVALID_PAYLOAD, 'Required fields are missing');
    }

    // Step 1: Masukkan customer ke DB
    const customer = await createCustomerInDb({
      fullName,
      phoneNumber,
      email,
      roadName,
      urbanVillage,
      province,
      city,
      district,
      zipCode,
      addressNotes,
      allergyNotes
    });

    const customerId = customer.customerId;  // sesuai migration

    // Step 2: Buat order
    const order = await createOrderInDb({
      customerId,
      packageId,
      periodId,
      start_date
    });

    res.status(201).json({
      message: 'Customer and Order created successfully',
      customerId,
      order,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      statusCode: status,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error occurred',
    });
  }
};

// Update order
const updateOrderCtrl = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      customerId,
      packageId,
      periodId,
      transactionId,
      branchId,
      driverId,
      adminId,
    } = req.body;

    const updateData = {};

    if (customerId !== undefined) updateData.customer_id = customerId;
    if (packageId !== undefined) updateData.package_id = packageId;
    if (periodId !== undefined) updateData.period_id = periodId;
    if (transactionId !== undefined) updateData.payment_id = transactionId;
    if (branchId !== undefined) updateData.branch_id = branchId;
    if (driverId !== undefined) updateData.driver_id = driverId;
    if (adminId !== undefined) updateData.admin_id = adminId;

    if (Object.keys(updateData).length === 0) {
      throw errorResponder(errorTypes.EMPTY_BODY, 'No fields provided for update');
    }

    const updated = await updateOrder(orderId, updateData);

    res.status(200).json({ message: 'Order updated successfully', result: updated });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      statusCode: status,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error occurred',
    });
  }
};

// Delete order
const deleteOrderCtrl = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deleted = await deleteOrder(orderId);

    res.status(200).json({ message: 'Order deleted successfully', result: deleted });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      statusCode: status,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error occurred',
    });
  }
};

// assign branch
const assignBranchCtrl = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { branchID } = req.body;
    const updated = await assignBranch(orderId, branchID);
    

    res.status(200).json({ message: 'Order updated successfully', result: updated });
  } catch (error) {
      console.error('assignBranchCtrl ERROR:', error); 
  return res.status(500).json({ message: error.message });
  }
}

//assign driver 
const assignDriverCtrl = async (req, res) => {
  try {
    const {orderId} = req.params;
    const {driverID} = req.body;
    const updated = await assignDriver(orderId, driverID);
    res.status(200).json({ message: 'Order updated successfully', result: updated });
  } catch (error) {
    console.error('assignDriverCtrl ERROR:', error); 
  return res.status(500).json({ message: error.message });
  }
}

const assignAdminCtrl = async (req, res) => {
  const { orderId } = req.params;
  const adminId = req.user.adminId;

  try {
    const order = await assignAdmin(orderId, adminId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order successfully assigned', order });
  } catch (error) {
    console.error('Error assigning order:', error);
    res.status(500).json({ message: 'Database error while assigning order' });
  }
};

module.exports = {
  getAllOrdersCtrl,
  getOrderByIdCtrl,
  createOrderCtrl,
  createFullOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
  assignBranchCtrl,
  assignDriverCtrl,
  assignAdminCtrl,
  getOrdersCtrl
};
