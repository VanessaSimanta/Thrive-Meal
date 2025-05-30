const db = require('../../core/db');
const { get } = require('../driver/route');

// get order data
const getOrder = async () => {
  const packageData = await db('orders').select('packageId','periodId');
  return packageData;
};

const getPackagePriceById = async (packageId) => {
  const packageData = await db('package').where({ packageId }).select('package_price');
  return packageData;
};

const getPeriodPriceById = async (periodId) => {
  const periodData = await db('period').where({ periodId }).select('period_price');
  return periodData;
};

// create transaction
const createTransaction = async ({
  transactionId,
  gross_amount,
  customerId,
  orderId,
  snap_token,
  snap_redirect_url
}) => {
  await db('transactions').insert({
    transactionId,
    customerId: customerId,
    orderId: orderId,
    gross_amount,
    snap_token,
    snap_redirect_url,
    payment_status: 'pending',
    created_at: db.fn.now(),
    updated_at: db.fn.now()
  });
};

const createTransactionItems = async ({
  transactionId,
  packageId,
  periodId
}) => {
  const [packageData] = await db('package')
    .where({ packageId })
    .select('package_price');

  const [periodData] = await db('period')
    .where({ periodId })
    .select('period_price');

  await db('transaction_items').insert([
    {
      transactionId,
      item_type: 'package',
      item_id: packageId,
      price: packageData?.package_price || 0,
      created_at: db.fn.now()
    },
    {
      transactionId,
      item_type: 'period',
      item_id: periodId,
      price: periodData?.period_price || 0,
      created_at: db.fn.now()
    }
  ]);
};

const cekPaymentId = async (transactionId) => {
  const payment = await db('transactions').where({ transactionId }).first();
  return payment;
}

const updatePaymentStatus = async (transactionId) => {
  const updated = await db('transactions')
  .where({ transactionId })
  .update({ payment_status: 'Success', updated_at: new Date() });

  console.log('Rows updated:', updated);
  return updated;
};

const updateOrderPayment = async (orderId, transactionId) => {
  return await db('orders')
    .where({ orderId })
    .update({
      transactionId: transactionId,
      updatedAt: new Date(),
    });
};

const getTransaction = async(transactionId) => {
  const transaction = await db('transactions').where({ transactionId }).first();
  return transaction;
}



module.exports = {
  getOrder,
  getPackagePriceById,
  getPeriodPriceById,
  createTransaction,
  createTransactionItems,
  updatePaymentStatus,
  cekPaymentId,
  updateOrderPayment,
  getTransaction
};