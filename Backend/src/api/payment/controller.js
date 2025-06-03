
const { createTransaction, createTransactionItems, updatePaymentStatus, cekPaymentId, updateOrderPayment, getPackagePriceById, getPeriodPriceById, getTransaction } = require('./repository.js');
const { MIDTRANS_APP_URL, MIDTRANS_SERVER_KEY, PENDING_PAYMENT } = require('../../utils/constant.js');
const { errorResponder, errorTypes } = require('../../core/errors');
const fetch = require('node-fetch');
const { get } = require('../driver/route.js');
const { sendEmail } = require('../../utils/mailer.js');

const getNanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid;
};


const createTransactionCtrl = async (req, res) => {
  console.log("Incoming transaction payload:", req.body);
  const { customerId, orderId, packageId, periodId } = req.body;

  try {
    const nanoid = await getNanoid();
    const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;

    const packageResult = await getPackagePriceById(packageId);
    const periodResult = await getPeriodPriceById(periodId);

    const packagePrice = packageResult?.[0]?.package_price;
    const periodPrice = periodResult?.[0]?.period_price;

    if (!packagePrice || !periodPrice) {
      return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
    }
    console.log('Package ID:', packageId, 'Price:', packagePrice);
    console.log('Period ID:', periodId, 'Price:', periodPrice);
    const gross_amount = Number(packagePrice) * Number(periodPrice);
    console.log('Gross amount:', gross_amount);
    const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');

    //data payload midtrans
    const payload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount
      },
      item_details: [
        {
          id: `${packageId}-${periodId}`,
          price: gross_amount,
          quantity: 1,
          name: `Custom Package #${packageId} (Period ${periodPrice} weeks)`
        }
      ],
      customer_details: {
        customerId,
        orderId
      },
      callbacks: {
        finish: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transactionId}`,
        cancel: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transactionId}`,
        pending: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transactionId}`,
      }
    };

    const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status !== 201) {
      console.log("error not ok")
      return res.status(500).json(errorResponder(errorTypes.INTERNAL_SERVER));
    }

    await Promise.all([
      createTransaction({
        transactionId,
        gross_amount,
        customerId,
        orderId,
        snap_token: data.token,
        snap_redirect_url: data.redirect_url
      }),
      createTransactionItems({
        transactionId,
        packageId,
        periodId
      })
    ]);

    res.json({
      status: 'success',
      data: {
        transactionId,
        status: PENDING_PAYMENT,
        customerId,
        orderId,
        packageId,
        periodId,
        gross_amount,
        snap_token: data.token,
        snap_redirect_url: data.redirect_url,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponder(errorTypes.INTERNAL_SERVER));
  }
};

const updatePaymentCtrl = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Update payment status di table transactions
    const updated = await updatePaymentStatus(transactionId);
    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Ambil data transaksi untuk dapat orderId
    const trxArr = await cekPaymentId(transactionId);
    if (!trxArr || trxArr.length === 0) {
      return res.status(404).json({ message: 'Transaction data not found' });
    }
    const trx = trxArr[0];  

    await updateOrderPayment(trx.orderId, trx.transactionId);

    // === Kirim Email Setelah Pembayaran ===
    const { customer_email, package_type, period_type, gross_amount } = trx;

    const html = `
      <h2>Pembayaran Anda Berhasil</h2>
      <p>Terima kasih telah memesan di Thrive Meal. Berikut rincian order Anda:</p>
      <ul>
        <li><strong>ID Transaksi:</strong> ${transactionId}</li>
        <li><strong>Paket:</strong> ${package_type}</li>
        <li><strong>Periode:</strong> ${period_type}</li>
        <li><strong>Total:</strong> Rp ${gross_amount.toLocaleString('id-ID')}</li>
      </ul>
      <p>Salam,<br>Tim Layanan</p>
    `;

    await sendEmail(customer_email, 'Pembayaran Berhasil - Rincian Pesanan', html);

    return res.status(200).json({ message: 'Payment status updated and email sent.' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const handleCallback = async (req, res) => {
  const { order_id, transaction_status } = req.body;

  try {
    // Cek jika pembayaran sukses
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      await updatePaymentStatus(order_id);

      return res.status(200).json({ message: 'Payment success & updated.' });
    }

    res.status(200).json({ message: 'Payment not completed yet.' });
  } catch (err) {
    console.error('Error in Midtrans webhook:', err);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
};

const getTransactionCtrl = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await getTransaction(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  createTransactionCtrl,
  updatePaymentCtrl,
  handleCallback,
  getTransactionCtrl
};
