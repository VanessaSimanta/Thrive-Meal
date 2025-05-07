const { errorResponder, errorTypes } = require('../../core/errors');
const { getPackage, postMenu } = require('./repository');

// Get package untuk menampilkan package di edit menu
const getPackageCtrl = async (req, res) => {
    try {
        const packageData = await getPackage();
        res.status(200).json(packageData);
    } catch (error) {
        return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
    }
};

// Post Menu untuk menambahkan menu
const postMenuCtrl = async (req, res) => {
    try {
        const { packageId, menu_name, menu_type, detail_menu } = req.body;
        const imageURL = `/uploads/${req.file.filename}`;
        const menu = await postMenu({ packageId, menu_name, menu_type, detail_menu, imageURL });
        res.status(200).json({message : "Inputed Sucessfuly", menu});
    } catch (error) {
        return res.status(400).json(errorResponder(errorTypes.EMPTY_BODY));
    }
}

module.exports = {
    getPackageCtrl,
    postMenuCtrl,
};