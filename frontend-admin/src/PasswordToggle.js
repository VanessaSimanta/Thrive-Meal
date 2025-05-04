// src/PasswordToggle.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <button onClick={togglePasswordVisibility}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default PasswordToggle;
