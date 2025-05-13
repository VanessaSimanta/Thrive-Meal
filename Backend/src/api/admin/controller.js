const { getAdminByEmail } = require('./repository');
const bcrypt = require('bcrypt');
const { errorResponder, errorTypes } = require('../../core/errors');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      throw errorResponder(errorTypes.INVALID_REQUEST, 'Email and password are required');
    }

    // Cari admin di database
    const admin = await getAdminByEmail(email);
    if (!admin) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'Invalid email or password');
    }

    // Cek password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'Invalid email or password');
    }

    // Berhasil login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    const status = error.status || 401;
    res.status(status).json({
      error: error.code || 'LOGIN_FAILED',
      message: error.message || 'Invalid credentials',
    });
  }
};

module.exports = {
  loginAdmin,
};
