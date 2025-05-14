const bcrypt = require('bcrypt');
const { getAdminByEmail, updatePassword } = require('./repository');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirmation do not match' });
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    await updatePassword(email, newPassword);
    return res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginAdmin,
  changePassword
};
