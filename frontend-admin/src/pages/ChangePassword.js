import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BACK_END_URL } from '../utils/const';

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = form;
    const token = localStorage.getItem('token');

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setAlert({ message: 'Semua kolom harus diisi.', variant: 'danger' });
    }
    if (newPassword !== confirmPassword) {
      return setAlert({ message: 'Password baru dan konfirmasi tidak cocok.', variant: 'danger' });
    }
    if (!token) {
      return setAlert({ message: 'Anda harus login terlebih dahulu.', variant: 'danger' });
    }

    try {
      // Hanya kirim password saja, email diambil dari token backend
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
                <Form.Group className="mb-3" controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter old password"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button variant="success" type="submit" className="px-4 fw-semibold">
                    Change Password
                  </Button>
                  <Button
                    variant="secondary"
                    className="px-4 fw-semibold"
                    onClick={() => setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })}
                  >
                    Cancel
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
