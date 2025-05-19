const express = require ('express');
const router = express.Router();
const { createTransaction, updatePaymentCtrl } = require('./controller');
const upload = require('../../core/multer_config');


module.exports = (app) => {
    app.use(router);

    router.post('/transaction', createTransaction);
    //update payment status
    //update di tabel order payment id
    router.put('/paymentSuccess/:transactionId', updatePaymentCtrl);
}