const express = require ('express');
const router = express.Router();
const { createTransaction } = require('./controller');
const upload = require('../../core/multer_config');


module.exports = (app) => {
    app.use(router);

    router.post('/transaction', createTransaction);
}