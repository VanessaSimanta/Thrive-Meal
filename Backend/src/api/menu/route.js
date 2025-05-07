const express = require ('express');
const router = express.Router();
const { getPackageCtrl, postMenuCtrl, updateMenuCtrl, deleteMenuCtrl, getAllMenuByPackageIdCtrl } = require('./controller');
const upload = require('../../core/multer_config');


module.exports = (app) => {
    app.use(router);

    router.get('/package', getPackageCtrl);
    router.post('/menu', upload.single('imageURL'), postMenuCtrl);
    router.put('/menu/:menuId', upload.single('imageURL'), updateMenuCtrl);
    router.delete('/menu/:menuId', deleteMenuCtrl);
    router.get('/menu/:packageId', getAllMenuByPackageIdCtrl);
    
}