const express = require ('express');
const router = express.Router();
const { createTransactionCtrl, updatePaymentCtrl, handleCallback } = require('./controller');
const upload = require('../../core/multer_config');


module.exports = (app) => {
    app.use(router);

    router.post('/transaction', createTransactionCtrl);
    router.put('/paymentSuccess/:transactionId', updatePaymentCtrl);
    router.post('/midtrans/callback', handleCallback);
}