import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [branchList, setBranchList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [branch, setBranch] = useState('');
  const [driver, setDriver] = useState('');

  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const fetchTransactionByOrderId = async (transactionId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/transactions/${transactionId}`);
      return res.data;
    } catch (error) {
      console.warn('Transaction not found for ID:', transactionId);
      return null;
    }
  };

  const fetchOrdersWithCustomerData = async () => {
    try {
      const orderRes = await axios.get('http://localhost:8000/api/orders');
      const orderData = orderRes.data;

      const ordersWithDetails = await Promise.all(
        orderData.map(async (order) => {
          const customerRes = await axios
            .get(`http://localhost:8000/api/customers/${order.customerId}`)
            .catch(() => null);

          const transactionId = order.payment_id;
          const transaction = transactionId
            ? await fetchTransactionByOrderId(transactionId)
            : null;

          return {
            ...order,
            transactionId,
            customer: customerRes?.data || null,
            transaction: transaction || null,
          };
        })
      );

      setOrders(ordersWithDetails);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      setLoadingBranches(true);
      try {
        const res = await axios.get('http://localhost:8000/api/branch');
        setBranchList(res.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (!branch) {
      setDriverList([]);
      setDriver('');
      return;
    }
    const fetchDrivers = async () => {
      setLoadingDrivers(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/driver?branch=${encodeURIComponent(branch)}`);
        setDriverList(res.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setDriverList([]);
      } finally {
        setLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, [branch]);

  useEffect(() => {
    fetchOrdersWithCustomerData();
  }, []);

  const handleAssignClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
    setBranch('');
    setDriver('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBranch('');
    setDriver('');
  };

  const handleAssignSubmit = async () => {
    if (!branch || !driver) {
      alert('Please select both branch and driver');
      return;
    }
    setAssignLoading(true);
    try {
      await axios.post('http://localhost:8000/api/assign', {
        orderId: selectedOrderId,
        branch,
        driver,
      });
      alert(`Order ${selectedOrderId} assigned to branch ${branch} and driver ${driver}`);
      handleModalClose();
      fetchOrdersWithCustomerData();
    } catch (error) {
      console.error('Error assigning order:', error);
      alert('Failed to assign order, please try again');
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div className="px-8 py-6">
      <h3 className="text-center font-bold text-black mb-6"
        style={{ textShadow: '3px 3px 1px rgba(0,0,0,0.2)', fontSize: '50px', letterSpacing: '6px' }}>
        ORDER
      </h3>

      <div className="text-center mb-5">
        <button onClick={fetchOrdersWithCustomerData} className="fetch-button">
          Fetch New Orders
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-500 rounded-lg shadow-lg bg-white px-4 mt-5">
        <table className="w-full table-auto text-sm text-left text-black">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 border">Order ID</th>
              <th className="px-4 py-3 border">Customer Name</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">Road Name</th>
              <th className="px-4 py-3 border">Urban Village</th>
              <th className="px-4 py-3 border">District</th>
              <th className="px-4 py-3 border">City</th>
              <th className="px-4 py-3 border">Province</th>
              <th className="px-4 py-3 border">Pos Code</th>
              <th className="px-4 py-3 border">Address Notes</th>
              <th className="px-4 py-3 border">Allergy Notes</th>
              <th className="px-4 py-3 border">Package Type</th>
              <th className="px-4 py-3 border">Duration</th>
              <th className="px-4 py-3 border">Payment Status</th>
              <th className="px-4 py-3 border">Payment Amount</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-gray-50 transition duration-150">
                <td className="px-4 py-2 border">{order.orderId}</td>
                <td className="px-4 py-2 border">{order.customer?.customer_name || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.phone_number || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.road_name || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.urban_village || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.district || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.city || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.province || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.zip_code || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.address_notes || '-'}</td>
                <td className="px-4 py-2 border">{order.customer?.allergy_notes || '-'}</td>
                <td className="px-4 py-2 border">{order.transaction?.packageId || '-'}</td>
                <td className="px-4 py-2 border">{order.transaction?.periodId || '-'}</td>
                <td className="px-4 py-2 border">{order.transaction?.payment_status || '-'}</td>
                <td className="px-4 py-2 border">
                  {order.transaction?.gross_amount
                    ? `Rp ${parseInt(order.transaction.gross_amount).toLocaleString()}`
                    : '-'}
                </td>
                <td className="px-4 py-2 border">{order.createdAt?.slice(0, 10) || '-'}</td>
                <td className="px-4 py-2 border text-center">
                <Button
                  size="sm"
                  style={{ backgroundColor: '#748E57', borderColor: '#748E57' }}
                  onClick={() => handleAssignClick(order.orderId)}
                >
                  Assign
                </Button>

                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={17} className="text-center py-4 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <div style={{ backgroundColor: '#E7F1DB', borderRadius: '15px', overflow: 'hidden' }}>
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title className="w-100 text-center" style={{ color: '#000' }}>
              Assign Order
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <h5 className="mb-3" style={{ color: 'red' }}>
              Order ID : {selectedOrderId}
            </h5>
            <Form.Group controlId="formBranch" className="mb-3">
              <Form.Select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={loadingBranches}
              >
                <option value="">Select Branch</option>
                {branchList.map((b) => (
                  <option key={b.city} value={b.city}>
                    {b.city}
                  </option>
                ))}
              </Form.Select>
              {loadingBranches && <small>Loading branches...</small>}
            </Form.Group>
            <Form.Group controlId="formDriver">
              <Form.Select
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                disabled={!branch || loadingDrivers}
              >
                <option value="">Select Driver</option>
                {driverList.map((d) => (
                  <option key={d.driverID} value={d.driver_name}>
                    {d.driver_name}
                  </option>
                ))}
              </Form.Select>
              {loadingDrivers && <small>Loading drivers...</small>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              onClick={handleAssignSubmit}
              disabled={assignLoading}
              style={{ backgroundColor: '#748E57', border: 'none' }}
            >
              {assignLoading ? 'Assigning...' : 'Assign'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ViewOrders;
