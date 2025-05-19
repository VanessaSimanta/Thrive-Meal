import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

function Payment({ show, handleClose, snapToken, snapPay }) {
  useEffect(() => {
    if (show && snapToken) {
      snapPay(snapToken, 'midtrans-container', {});
    }
  }, [show, snapToken, snapPay]);

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Body>
        <div id="midtrans-container" />
      </Modal.Body>
    </Modal>
  );
}

export default Payment;
