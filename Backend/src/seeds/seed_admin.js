/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// bcrypt untuk hashing password
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('admin').del(); // hapus data lama (opsional)

  const hashedPassword = await bcrypt.hash('admin123', 10); // ganti password sesuai keinginan

  await knex('admin').insert([
    {
      email: 'admin@thrive.com',
      password: hashedPassword,
    },
  ]);
};
