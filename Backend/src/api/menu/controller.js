const { errorResponder, errorTypes } = require('../../core/errors');
const { getPackage, postMenu, updateMenu, getMenuById, deleteMenu} = require('./repository');
const path = require('path');
const fs = require('fs');

// Get package 
const getPackageCtrl = async (req, res) => {
    try {
        const packageData = await getPackage();
        res.status(200).json(packageData);
    } catch (error) {
        return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
    }
};

// Post Menu
const postMenuCtrl = async (req, res) => {
    try {
      const { packageId, menu_name, menu_type, detail_menu } = req.body;
      const imageURL = `/image-upload/${req.file.filename}`;
  
      const menu = await postMenu({ packageId, menu_name, menu_type, detail_menu, imageURL });
      res.status(200).json({ message: "Inputed Successfully", menu });
  
    } catch (error) {}
      return res.status(500).json(errorResponder(errorTypes.BAD_REQUEST, error.message));
    };

// Update Menu 
const updateMenuCtrl = async (req, res) => {
    try {
      const { menuId } = req.params;
      const { packageId, menu_name, menu_type, detail_menu } = req.body;
      const menuData = {};
  
      // Ambil data lama
      const oldMenu = await getMenuById(menuId);
      console.log("test")
      if (!oldMenu) {
        throw errorResponder(errorTypes.NOT_FOUND, 'Menu not found');
      }
      console.log("test2")
      if (packageId) menuData.packageId = packageId;
      if (menu_name) menuData.menu_name = menu_name;
      if (menu_type) menuData.menu_type = menu_type;
      if (detail_menu) menuData.detail_menu = detail_menu;
  
      // hapus file image sebelumnya
      if (req.file) {
        if (oldMenu.imageURL) {
          const oldImagePath = path.join(__dirname, '../../../', oldMenu.imageURL);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); 
          }
        }
        menuData.imageURL = `/image_upload/${req.file.filename}`;
      }
  
      if (Object.keys(menuData).length === 0) {
        throw errorResponder(errorTypes.EMPTY_BODY, 'No fields provided for update');
      }
  
      const result = await updateMenu(menuId, menuData);
  
      res.status(200).json({ message: 'Update successful', result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
          statusCode: status,
          error: error.code || 'UNKNOWN_ERROR',
          description: error.description || 'Unknown error',
          message: error.message || 'An error occurred',
        });
    }
  };

// Delete Menu
const deleteMenuCtrl = async (req, res) => {
    try {
        const { menuId } = req.params;  

        // cek menu
        const cekMenu = await getMenuById(menuId);
        if (!cekMenu) {
            throw errorResponder(errorTypes.NOT_FOUND, 'Menu not found');
        }

        const result = await deleteMenu(menuId);

        res.status(200).json({ message: 'Menu deleted successfully', result });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            statusCode: status,
            error: error.code || 'UNKNOWN_ERROR',
            description: error.description || 'Unknown error',
            message: error.message || 'An error occurred',
        });
    }
}

module.exports = {
    getPackageCtrl,
    postMenuCtrl,
    updateMenuCtrl,
    deleteMenuCtrl
};