const express = require ('express');
const router = express.Router();
const { getPackageCtrl, postMenuCtrl } = require('./controller');
const upload = require('../../core/multer_config');


module.exports = (app) => {
    app.use(router);

    router.get('/package', getPackageCtrl);
    router.post('/menu', upload.single('imageURL'), postMenuCtrl);
    
}