import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [packageId, setPackageId] = useState(1); // Default packageId
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/menu/${packageId}`) // Ganti dengan base URL backend kamu
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Gagal ambil data menu:', error);
        setLoading(false);
      });
  }, [packageId]);

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-banner-overlay">
          <h1 className="menu-title">OUR MENU</h1>
        </div>
      </div>

      <div className="menu-grid">
        {/* Tombol kategori */}
        <div className="category-button" onClick={() => setPackageId(7)}>Weight Loss</div>
        <div className="category-button" onClick={() => setPackageId(8)}>Balanced Wellness</div>
        <div className="category-button" onClick={() => setPackageId(9)}>Muscle Gain</div>

        {/* Loading State */}
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={`http://localhost:8000${item.imageURL}`} alt={item.menu_name} />
              <h4>{item.menu_name}</h4>
              <p>Kalori: {item.detail_menu}</p>
            </div>
          ))
        )}
      </div>

      <div className="order-now-button">
        <button>Order Now</button>
      </div>
    </div>
  );
}

export default MenuPage;
