/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// default data for package
exports.seed = async function(knex) {
  // Menghapus data lama (optional, jika ingin reset)
  await knex('package').del();

  // Insert data baru
  await knex('package').insert([
    {
      package_type: 'Weight Loss Program',
      package_price: '450000', //harga per 1 minggu
    },
    {
      package_type: 'Weight Maintenance Program',
      package_price: '400000',
    },
    {
      package_type: 'Diabet Cholesterol Program',
      package_price: '500000',
    },
    {
      package_type: 'Gluten Free Program',
      package_price: '500000', 
    },
    {
      package_type: 'Gain Muscle Program',
      package_price: '600000',
    },
    {
      package_type: 'Vegetarian Program',
      package_price: '400000',
    }
  ]);
};
