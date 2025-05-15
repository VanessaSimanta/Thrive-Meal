import React from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';

function Payment({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ backgroundColor: '#F4F8EC', borderRadius: '12px', padding: '30px' }}>
        <h5 className="text-center mb-2">Amount</h5>
        <h3 className="text-center text-success fw-bold mb-4">-</h3>

        <p className="text-center fw-semibold">Select Your Payment Method</p>
        <Row className="text-center mb-3">
          <Col xs={6} className="mb-3">
            <Image src="/images/bca.png" width={80} />
            <p className="mb-0">Virtual Account</p>
          </Col>
          <Col xs={6} className="mb-3">
            <Image src="/images/mandiri.png" width={80} />
            <p className="mb-0">Virtual Account</p>
          </Col>
          <Col xs={6}>
            <Image src="/images/qris.png" width={80} />
            <p className="mb-0">Scan QR</p>
          </Col>
          <Col xs={6}>
            <Image src="/images/bri.png" width={80} />
            <p className="mb-0">Virtual Account</p>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="secondary" className="me-3" onClick={handleClose}>
            Back to Form
          </Button>
          <Button style={{ backgroundColor: '#748E57', border: 'none' }}>
            Process Payment
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Payment;
