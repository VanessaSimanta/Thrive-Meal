const db = require('../../core/db');

// Get  orders
const getAllOrders = async (limit, offset, sort = 'desc') => {
  try {
    const orders = await db('orders')
      .select('*')
      .orderBy('orderId', sort)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('orders').count('* as count');

    return {
      orders,
      total: parseInt(count),
    };
  } catch (error) {
    throw new Error('Failed to get orders: ' + error.message);
  }
};


// Get order by ID
const getOrderById = async (orderId) => {
  try {
    const order = await db('orders').where({ orderId }).first();
    return order;
  } catch (error) {
    throw new Error('Failed to get order by ID: ' + error.message);
  }
};

// Create new order
const createOrder = async (orderData) => {
  try {
    const result = await db('orders').insert(orderData).returning('*');
    return result[0];
  } catch (error) {
    throw new Error('Failed to create order: ' + error.message);
  }
};

const createOrderInDb = async ({
  customerId,
  packageId,
  periodId,
}) => {
  const [newOrder] = await db('orders')
    .insert({
      customerId: customerId,
      packageId: packageId,
      periodId: periodId,
    })
    .returning('*');

  return newOrder;
};

const createCustomerInDb = async ({
  fullName,
  phoneNumber,
  email,
  roadName,          // ganti address -> roadName
  urbanVillage,
  province,
  city,
  district,
  zipCode,
  addressNotes,
  allergyNotes,
}) => {
  const [newCustomer] = await db('customers')
    .insert({
      customer_name: fullName,
      phone_number: phoneNumber,
      customer_email: email,
      road_name: roadName,
      urban_village: urbanVillage,
      province,
      city,
      district,
      zip_code: zipCode,
      address_notes: addressNotes,
      allergy_notes: allergyNotes,
    })
    .returning('*');

  return newCustomer;
};

// Update existing order
const updateOrder = async (orderId) => {
  try {
    await db('orders')
      .where({ orderId })
      .update({
        pa,
        updated_at: db.fn.now(),
      });
    return { message: 'Order updated successfully' };
  } catch (error) {
    throw new Error('Failed to update order: ' + error.message);
  }
};

// Delete order
const deleteOrder = async (orderId) => {
  try {
    const deleted = await db('orders').where({ orderId }).del();
    return deleted;
  } catch (error) {
    throw new Error('Failed to delete order: ' + error.message);
  }
};

// assign branch to order
const assignBranch = async (orderId, branchID) => {
  try {
    await db('orders')
      .where({ orderId })
      .update({
        branchID,
        updatedAt: db.fn.now(),
      });
      console.log("updateddd")
    return { message: 'Order updated successfully' };
  } catch (error) {
    throw new Error('Failed to update order: ' + error.message);
  }
};

//asign driver
const assignDriver = async (orderId, driverID) => {
  try {
    await db('orders')
      .where({ orderId })
      .update({
        driverID,
        updatedAt: db.fn.now(),
      });
    return { message: 'Order updated successfully' };
  } catch (error) {
    throw new Error('Failed to update order: ' + error.message);
  }
}

const assignAdmin = async (orderId, adminId) => {
  const updatedOrder = await db('orders')
    .where({ orderId })
    .update({ adminId })
    .returning('*'); // PostgreSQL only

  return updatedOrder[0];
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderInDb,
  createCustomerInDb,
  assignBranch,
  assignDriver,
  assignAdmin
};
