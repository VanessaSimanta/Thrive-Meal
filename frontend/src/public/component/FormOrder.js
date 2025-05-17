import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Payment from './Payment';

function FormOrder({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', urbanVillage: '', province: '',
    city: '', district: '', zip: '', addressNote: '', allergyNote: '',
    package: '', subscription: ''
  });
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const mapPackageToId = (packageName) => {
    const packageIdMap = {
      'Weight Loss Program': 25,
      'Weight Maintenance Program': 26,
      'Diabet Cholesterol Program': 27,
      'Gluten Free Program': 28,
      'Gain Muscle Program': 29,
      'Vegetarian Program': 30,
    };
    return packageIdMap[packageName];
  };

  const mapSubscriptionToId = (subscriptionName) => {
    const periodIdMap = {
      '1 Week': 1,
      '1 Month': 2,
      '3 Month': 3,
      '6 Month': 4,
    };
    return periodIdMap[subscriptionName];
  };


  const handleSubmit = async () => {
    const {
      name, phone, address, urbanVillage, province,
      city, district, zip, addressNote, allergyNote, package: pack, subscription,
    } = formData;

    if (!name || !phone || !address || !urbanVillage ||
        !province || !city || !district || !zip || !pack || !subscription) {
      setError('Please complete all required fields before submitting the form');
      return;
    }

    if (province.trim().toLowerCase() !== 'dki jakarta') {
      setError('Sorry, we only serve the DKI Jakarta area');
      return;
    }

      const dataToSend = {
      fullName: name,
      phoneNumber: phone,
      roadName: address,
      urbanVillage,
      province,
      city,
      district,
      zipCode: zip,
      addressNotes: addressNote,
      allergyNotes: allergyNote,
      packageId: mapPackageToId(pack),
      periodId: mapSubscriptionToId(subscription),
    };

    try {
      const response = await fetch('http://localhost:8000/api/orders/full', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order submitted successfully:', result);
        setError('');
        setShowPayment(true); // Show payment modal
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('An unexpected error occurred');
    }
  };

  const closePaymentModal = () => {
    setShowPayment(false);
  };

  useEffect(() => {
    if (show) {
      setFormData({
        name: '', phone: '', address: '', urbanVillage: '', province: '',
        city: '', district: '', zip: '', addressNote: '', allergyNote: '',
        package: '', subscription: ''
      });
      setError('');
      setShowPayment(false);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#E7F1DB' }}>
          <Modal.Title className="w-100 text-center fw-bold" style={{ letterSpacing: '2px' }}>
            FORM ORDER THRIVE MEAL
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#E7F1DB', padding: '20px 30px' }}>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Street address" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>

            <Row>
              <Col>
                <Form.Control placeholder="Urban Village" name="urbanVillage" value={formData.urbanVillage} onChange={handleChange} className="mb-2" />
              </Col>
              <Col>
                <Form.Control placeholder="Province" name="province" value={formData.province} onChange={handleChange} className="mb-2" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control placeholder="City" name="city" value={formData.city} onChange={handleChange} className="mb-2" />
              </Col>
              <Col>
                <Form.Control placeholder="District" name="district" value={formData.district} onChange={handleChange} className="mb-2" />
              </Col>
            </Row>
            <Form.Control placeholder="Zip Code" name="zip" value={formData.zip} onChange={handleChange} className="mb-3" />

            <Form.Group className="mb-3">
              <Form.Label>Address Notes</Form.Label>
              <Form.Control placeholder="example: the house wall is green" name="addressNote" value={formData.addressNote} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Allergy Notes</Form.Label>
              <Form.Control placeholder="e.g. no shrimp, no nuts" name="allergyNote" value={formData.allergyNote} onChange={handleChange} />
            </Form.Group>

            <Row className="mb-3">
            <Col>
              <Form.Select name="package" value={formData.package} onChange={handleChange}>
                <option value="" disabled hidden>Select Your Package</option>
                <option value="Weight Loss Program">Weight Loss Program</option>
                <option value="Weight Maintenance Program">Weight Maintenance Program</option>
                <option value="Diabet Cholesterol Program">Diabet Cholesterol Program</option>
                <option value="Gluten Free Program">Gluten Free Program</option>
                <option value="Gain Muscle Program">Gain Muscle Program</option>
                <option value="Vegetarian Program">Vegetarian Program</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select name="subscription" value={formData.subscription} onChange={handleChange}>
                <option value="" disabled hidden>Subscription</option>
                <option value="1 Week">1 Week</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Month">3 Month</option>
                <option value="6 Month">6 Month</option>
              </Form.Select>
            </Col>
          </Row>


            <div className="text-center">
              <Button style={{ backgroundColor: '#748E57', borderRadius: '10px' }} onClick={handleSubmit}>
                Process Payment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Payment Modal */}
      <Payment show={showPayment} handleClose={closePaymentModal} />
    </>
  );
}

export default FormOrder;
