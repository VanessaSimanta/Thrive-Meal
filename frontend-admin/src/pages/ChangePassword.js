import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { BACK_END_URL } from '../utils/const';

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // state untuk toggle visibility password
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [alert, setAlert] = useState({ message: '', variant: '' });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: '', variant: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // fungsi toggle visibility password per field
  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = form;
    const token = localStorage.getItem('token');

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setAlert({ message: 'All fields are required.', variant: 'danger' });
    }
    if (newPassword !== confirmPassword) {
      return setAlert({ message: 'New password and confirmation do not match.', variant: 'danger' });
    }
    if (!token) {
      return setAlert({ message: 'You must be logged in.', variant: 'danger' });
    }

    try {
      const res = await axios.put(
        `${BACK_END_URL}/api/admin/change-password`,
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlert({ message: res.data.message, variant: 'success' });
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || 'Terjadi kesalahan saat mengganti password.',
        variant: 'danger',
      });
    }
  };

  return (
    <Container className="py-5">
      <h3 className="fw-bold mb-5 text-center" style={{ fontSize: '50px', letterSpacing: '6px' }}>
        CHANGE PASSWORD
      </h3>

      {alert.message && <Alert variant={alert.variant} className="text-center">{alert.message}</Alert>}

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Form onSubmit={handleSubmit}>

                {/* Old Password */}
                <Form.Group className="mb-3" controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword.oldPassword ? 'text' : 'password'}
                      name="oldPassword"
                      value={form.oldPassword}
                      onChange={handleChange}
                      placeholder="Enter old password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => toggleShowPassword('oldPassword')}
                      tabIndex={-1}
                    >
                      {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* New Password */}
                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword.newPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => toggleShowPassword('newPassword')}
                      tabIndex={-1}
                    >
                      {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => toggleShowPassword('confirmPassword')}
                      tabIndex={-1}
                    >
                      {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-center gap-3 mt-4">
                 <Button
                 type="submit"
                 className="px-4 fw-semibold"
                 style={{ backgroundColor: '#CADCB5', border: 'none', color: '#000' }}
                 >
                    Change Password
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
