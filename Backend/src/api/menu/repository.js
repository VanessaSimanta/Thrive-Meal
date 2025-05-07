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
    } catch (err) {
      console.error('Error inserting menu:', err);
      throw err;
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

const getMenuById = async (menuId) => {
return db('menu').where({ menuId: menuId }).first();
};

module.exports = {
  getPackage,
  postMenu,
  updateMenu,
  getMenuById,
};
