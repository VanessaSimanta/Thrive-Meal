const db = require('../../core/db');

// get package
const getPackage = async () => {
  const packageData = await db('package').select('packageId','package_type');
  return packageData;
};

// add menu
const postMenu = async (menuData) => {
    try {
        const result = await db('menu').insert(menuData).returning('*');
        return result;
    } catch (error) {
        throw new Error('Failed to add menu: ' + error.message);
    }
};

// edit menu
const updateMenu = async (menuId, menuData) => {
    try {
        await db('menu')
            .where({ menuId }) 
            .update({
            ...menuData,
            updateAt: db.fn.now(), //timestamp 
            });
    
        return { message: 'Menu updated successfully' };
    } catch (error) {
        throw new Error('Failed to update menu: ' + error.message);
    }
  };

// get menu by id
const getMenuById = async (menuId) => {
   return db('menu').where({ menuId: menuId }).first();
};

//delete menu
const deleteMenu = async (menuId) => {
    try {
        return db('menu').where({ menuId: menuId }).del();
    }
    catch(error) {
        throw new error('Failed to delete menu: ' + error.message);
    }  
}
//get All menu by packageId
const getAllMenuByPackageId = async (packageId) => {
    try {
        return db('menu').where({ packageId: packageId });
    }
    catch(error) {
        throw new error('Failed to get menu: ' + error.message);
    }  
}

module.exports = {
  getPackage,
  postMenu,
  updateMenu,
  getMenuById,
  deleteMenu,
  getAllMenuByPackageId
};
