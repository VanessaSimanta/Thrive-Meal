/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('period').del()
  await knex('period').insert([
    {
      period_type: '1 minggu',
      period_price: '1', 
    },
    {
      period_type: '1 bulan',
      period_price: '4',
    },
    {
      period_type: '3 bulan',
      period_price: '11',
    },
    {
      period_type: '6 bulan',
      period_price: '21', 
    },
  ]);
};
