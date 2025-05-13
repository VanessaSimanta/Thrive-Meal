import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function FormOrder({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style = {{ backgroundColor: '#E7F1DB',  }}>
        <Modal.Title className="w-100 text-center fw-bold" style= {{ letterSpacing: '2px' }}>FORM ORDER THRIVE MEAL</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#E7F1DB',  padding: '20px 30px' }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Street address" />
          </Form.Group>

          <Row>
            <Col><Form.Control placeholder="Urban Village" className="mb-2" /></Col>
            <Col><Form.Control placeholder="Province" className="mb-2" /></Col>
          </Row>
          <Row>
            <Col><Form.Control placeholder="City" className="mb-2" /></Col>
            <Col><Form.Control placeholder="District" className="mb-2" /></Col>
          </Row>
          <Form.Control placeholder="Zip Code" className="mb-3" />

          <Form.Group className="mb-3">
            <Form.Label>Address Notes</Form.Label>
            <Form.Control placeholder="example: the house wall is green" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Allergy Notes</Form.Label>
            <Form.Control placeholder="e.g. no shrimp, no nuts" />
          </Form.Group>

       <Row className="mb-3">
        <Col>
            <Form.Select defaultValue="" required>
            <option value="" disabled hidden>Select Your Package</option>
            <option>Weight Loss Program</option>
            <option>Weight Maintenance Program</option>
            <option>Diabet Cholesterol Program</option>
            <option>Gluten Free Program</option>
            <option>Gain Muscle Program</option>
            <option>Vegetarian Program</option>
            </Form.Select>
        </Col>
        <Col>
            <Form.Select defaultValue="" required>
            <option value="" disabled hidden>Subscription</option>
            <option>1 Week</option>
            <option>1 Month</option>
            <option>3 Month</option>
            <option>6 Month</option>
            </Form.Select>
        </Col>
        </Row>

          <div className="text-center">
            <Button style={{ backgroundColor: '#748E57', borderRadius: '10px'}}>
              Process Payment
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FormOrder;
