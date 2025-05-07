const db = require('../../core/db');

// get package
const getPackage = async () => {
  const packageData = await db('package').select('packageId','package_type');
  return packageData;
};

// post menu
const postMenu = async (menuData) => {
    try {
      const result = await db('menu').insert(menuData).returning('*');
      return result;
    } catch (err) {
      console.error('Error inserting menu:', err);
      throw err;
    }
};

module.exports = {
  getPackage,
  postMenu,
};
