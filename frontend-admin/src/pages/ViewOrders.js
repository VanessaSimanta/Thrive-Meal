import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACK_END_URL } from '../utils/const';
import { InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [branchList, setBranchList] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [branchID, setBranchID] = useState('');
  const [driver, setDriver] = useState('');

  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');


  // Package type mapping
  const packageTypes = {
    25: "Weight Loss Program",
    26: "Weight Maintenance Program",
    27: "Diabet Cholesterol Program",
    28: "Gluten Free Program",
    29: "Gain Muscle Program",
    30: "Vegetarian Program"
  };

  // Period mapping
  const periods = {
    1: "1 minggu",
    2: "1 bulan",
    3: "3 bulan",
    4: "6 bulan"
  };

  const fetchTransactionByOrderId = async (transactionId) => {
    try {
      const res = await axios.get(`${BACK_END_URL}/api/transactions/${transactionId}`);
      return res.data;
    } catch (error) {
      console.warn('Transaction not found for ID:', transactionId);
      return null;
    }
  };

  const fetchOrdersWithCustomerData = async (page = 1, sort = 'desc') => {
    try {
      // Tambahkan sort di query param
      const orderRes = await axios.get(`${BACK_END_URL}/api/orders`, {
        params: {
          page,
          sort,
        },
      });

      const { data: orderData, currentPage, lastPage } = orderRes.data;
      setCurrentPage(currentPage);
      setLastPage(lastPage);

      const ordersWithDetails = await Promise.all(
        orderData.map(async (order) => {
          const customerRes = await axios.get(`${BACK_END_URL}/api/customers/${order.customerId}`).catch(() => null);

          // Gunakan payment_id atau transactionId untuk ambil data transaksi
          const transactionId = order.payment_id || order.transactionId;
          const transaction = transactionId ? await fetchTransactionByOrderId(transactionId) : null;

          return {
            ...order,
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
        const res = await axios.get(`${BACK_END_URL}/api/branch`);
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
    fetchOrdersWithCustomerData(currentPage, sortOrder);
  });


  useEffect(() => {
    if (!branchID) {
      setDrivers([]);
      setDriver('');
      return;
    }

    const fetchDriversByBranch = async () => {
      setLoadingDrivers(true);
      try {
        const res = await axios.get(`${BACK_END_URL}/api/driver?branchId=${branchID}`);
        setDrivers(res.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setDrivers([]);
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchDriversByBranch();
  }, [branchID]);

  useEffect(() => {
    fetchOrdersWithCustomerData(1);
  }, []);

  const handleAssignClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
    setBranchID('');
    setDriver('');
    setShowAlert(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBranchID('');
    setDriver('');
    setShowAlert(false);
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleAssignSubmit = async () => {
    if (!branchID || !driver) {
      showAlertMessage('Please select both branch and driver', 'danger');
      return;
    }
    setAssignLoading(true);
    try {
      // First, assign the branch
      await axios.put(`${BACK_END_URL}/api/orders/assign-branch/${selectedOrderId}`, {
        branchID,
      });

      // Then, assign the driver
      await axios.put(`${BACK_END_URL}/api/orders/assign-driver/${selectedOrderId}`, {
        driverID: driver,
      });

      // Assign admin
      const token = localStorage.getItem('token');
      await axios.put(
        `${BACK_END_URL}/api/orders/assign-admin/${selectedOrderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showAlertMessage(`Order ${selectedOrderId} assigned to branch ${branchID} and driver ${driver}, and you as admin`, 'success');
      setTimeout(() => {
        handleModalClose();
        fetchOrdersWithCustomerData(currentPage);
      }, 1500);
    } catch (error) {
      console.error('Error assigning order:', error);
      showAlertMessage('Failed to assign order, please try again', 'danger');
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div className="px-8 py-6">
      <h3 className="text-center font-bold text-black mb-6" style={{ textShadow: '3px 3px 1px rgba(0,0,0,0.2)', fontSize: '50px', letterSpacing: '6px' }}>
        ORDER
      </h3>

      <div className="text-center mb-5">
        <button onClick={() => fetchOrdersWithCustomerData(currentPage)} className="fetch-button">
          Fetch New Orders
        </button>
      </div>

      {/* Search Bar */}
      <div className="d-flex mb-4 px-3">
        <InputGroup className="w-100" style={{ maxWidth: '500px' }}>
          {/* Search Icon */}
          <InputGroup.Text style={{ backgroundColor: '#E7F1DB', border: '1px solid #ced4da' }}>
            <FaSearch color="#748E57" />
          </InputGroup.Text>

          {/* Input Field */}
          <Form.Control
            type="text"
            placeholder="Search by name or phone number..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{
              borderLeft: 'none',
              padding: '10px 15px',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}
          />

          {/* Clear Button */}
          {searchKeyword && (
            <Button
              variant="outline-secondary"
              onClick={() => setSearchKeyword('')}
              style={{
                borderLeft: 'none',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                backgroundColor: '#ffffff',
                borderColor: '#ced4da',
              }}
            >
              <FaTimes color="#C1282E" />
            </Button>
          )}
        </InputGroup>
      </div>

      <div className="d-flex mb-4">
        <label htmlFor="sortOrderSelect" className="form-label mt-2 me-3 fw-semibold">
          Sort Orders:
        </label>
        <select
          id="sortOrderSelect"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="form-select w-auto"
          style={{ minWidth: '200px' }}
        >
          <option value="desc">Sort by ID (Newest First)</option>
          <option value="asc">Sort by ID (Oldest First)</option>
        </select>
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={17} className="text-center py-4 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders
                .filter((order) => {
                  const keyword = searchKeyword.toLowerCase();
                  const name = order.customer?.customer_name?.toLowerCase() || '';
                  const phone = order.customer?.phone_number || '';
                  return name.includes(keyword) || phone.includes(keyword);
                })
                .map((order) => {
                  const isAssigned = order.branchID && order.driverID;
                  return (
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
                      <td className="px-4 py-2 border">{packageTypes[order.packageId] || order.packageId || '-'}</td>
                      <td className="px-4 py-2 border">{periods[order.periodId] || order.periodId || '-'}</td>
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
                          style={{
                            backgroundColor: isAssigned ? '#6c757d' : '#748E57',
                            borderColor: isAssigned ? '#6c757d' : '#748E57'
                          }}
                          onClick={() => handleAssignClick(order.orderId)}
                          disabled={isAssigned}
                        >
                          {isAssigned ? 'Assigned' : 'Assign'}
                        </Button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>

        <div className="text-center my-4 space-x-4">
          <button
            className="fetch-button m-3"
            onClick={() => {
              const prevPage = currentPage - 1;
              if (prevPage >= 1) {
                fetchOrdersWithCustomerData(prevPage);
              }
            }}
            disabled={currentPage <= 1}
          >
            Previous Page
          </button>

          <button
            className="fetch-button m-3"
            onClick={() => {
              const nextPage = currentPage + 1;
              if (nextPage <= lastPage) {
                fetchOrdersWithCustomerData(nextPage);
              }
            }}
            disabled={currentPage >= lastPage}
          >
            Next Page
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <div
          style={{
            backgroundColor: '#E7F1DB',
            borderRadius: '10px',
            padding: '20px 30px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '510px',
            margin: 'auto',
          }}
        >
          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="link"
              onClick={handleModalClose}
              style={{ textDecoration: 'none', fontSize: '1.5rem', color: 'black' }}
            >
              ×
            </Button>
          </div>
          {/* Title */}
          <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Assign Order</h5>
          <h4 style={{ color: '#C1282E', fontWeight: 'bold', marginBottom: '25px' }}>
            Order ID : {selectedOrderId}
          </h4>

          <Form>
            {/* Branch Label */}
            <div style={{ textAlign: 'left', fontWeight: '500', marginBottom: '5px' }}>
              Branch ID | Branch Name
            </div>
            <Form.Group className="mb-3" controlId="branchSelect">
              <Form.Select
                value={branchID}
                onChange={(e) => setBranchID(e.target.value)}
                disabled={loadingBranches || assignLoading}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  borderColor: '#ccc',
                  marginBottom: '20px',
                }}
              >
                <option value="" disabled hidden>
                  Select Branch
                </option>
                {branchList.map((branchItem) => (
                  <option key={branchItem.branchID} value={branchItem.branchID}>
                    {branchItem.branchID} | {branchItem.city}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Driver Label */}
            <div style={{ textAlign: 'left', fontWeight: '500', marginBottom: '5px' }}>
              Branch ID | Driver Name
            </div>
            <Form.Group className="mb-3" controlId="driverSelect">
              <Form.Select
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                disabled={!branchID || loadingDrivers || assignLoading}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  borderColor: '#ccc',
                  marginBottom: '25px',
                }}
              >
                <option value="" disabled hidden>
                  Select Driver
                </option>
                {drivers.map((driver) => (
                  <option key={driver.driverID} value={driver.driverID}>
                    {driver.branchID} | {driver.driver_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Assign Button */}
            <Button
              onClick={handleAssignSubmit}
              disabled={assignLoading || !branchID || !driver}
              style={{
                backgroundColor: '#6C8759',
                borderColor: '#6C8759',
                color: 'white',
                padding: '10px 30px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {assignLoading ? 'Assigning...' : 'Assign'}
            </Button>

            {/* Alert Component moved below the button */}
            {showAlert && (
              <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible style={{ marginTop: '15px' }}>
                {alertMessage}
              </Alert>
            )}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ViewOrders;
