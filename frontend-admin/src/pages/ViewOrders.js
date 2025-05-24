import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-8 py-6"> {/* ← Padding luar kiri-kanan */}
      {/* Title */}
      <h3
        className="text-center font-bold text-black mb-6"
        style={{
          textShadow: '3px 3px 1px rgba(0,0,0,0.2)',
          fontSize: '50px',
          letterSpacing: '6px',
        }}
      >
        ORDER
      </h3>

      {/* Fetch Button */}
      <div className="text-center mb-5">
        <button
          onClick={fetchOrders}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-md shadow-lg transition duration-200"
        >
          Fetching New Order
        </button>
      </div>

      {/* Table wrapper with scroll */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg bg-white px-4">
        <div className="min-w-[10px]"> {/* ← Scrollable container */}
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
                <th className="px-4 py-3 border min-w-[180px]">Address Notes</th>
                <th className="px-4 py-3 border min-w-[180px]">Allergy Notes</th>
                <th className="px-4 py-3 border min-w-[180px]">Package Type</th>
                <th className="px-4 py-3 border">Duration</th>
                <th className="px-4 py-3 border">Payment Status</th>
                <th className="px-4 py-3 border">Payment Amount</th>
                <th className="px-4 py-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-2 border">{order.orderId}</td>
                  <td className="px-4 py-2 border">{order.customerName || '-'}</td>
                  <td className="px-4 py-2 border">{order.phoneNumber || '-'}</td>
                  <td className="px-4 py-2 border">{order.roadName || '-'}</td>
                  <td className="px-4 py-2 border">{order.urbanVillage || '-'}</td>
                  <td className="px-4 py-2 border">{order.district || '-'}</td>
                  <td className="px-4 py-2 border">{order.city || '-'}</td>
                  <td className="px-4 py-2 border">{order.province || '-'}</td>
                  <td className="px-4 py-2 border">{order.zipCode || '-'}</td>
                  <td className="px-4 py-2 border">{order.addressNotes || '-'}</td>
                  <td className="px-4 py-2 border">{order.allergyNotes || '-'}</td>
                  <td className="px-4 py-2 border">{order.packageType || '-'}</td>
                  <td className="px-4 py-2 border">{order.duration || '-'}</td>
                  <td className="px-4 py-2 border">{order.paymentStatus || '-'}</td>
                  <td className="px-4 py-2 border">{order.paymentAmount || '-'}</td>
                  <td className="px-4 py-2 border">{order.date || '-'}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={16} className="text-center py-4 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
