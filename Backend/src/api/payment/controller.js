
const paymentRepo = require('./repository.js');
const { MIDTRANS_APP_URL, MIDTRANS_SERVER_KEY, PENDING_PAYMENT } = require('../../utils/constant.js');
const { errorResponder, errorTypes } = require('../../core/errors');
const fetch = require('node-fetch'); 
const getNanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid;
};


const createTransaction = async (req, res) => {
    const { customerId, orderId, packageId, periodId } = req.body;

    try {
        const nanoid = await getNanoid();
        const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;

        const packageResult = await paymentRepo.getPackagePriceById(packageId);
        const periodResult = await paymentRepo.getPeriodPriceById(periodId);

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
            paymentRepo.createTransaction({
                transactionId,
                gross_amount,
                customerId,
                orderId,
                snap_token: data.token,
                snap_redirect_url: data.redirect_url
            }),
            paymentRepo.createTransactionItems({
                transactionId,
                packageId,
                periodId
            })
        ]);

        res.json({
            status: 'success',
            data: {
                id: transactionId,
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

module.exports = {
    createTransaction
};
