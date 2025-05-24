import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [packageId, setPackageId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packageId !== undefined) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/menu/${packageId}`)
        .then((response) => {
          console.log("🔥 Full response data:", response.data);
          setMenuItems(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('❌ Gagal ambil data menu:', error);
          setLoading(false);
        });
    }
  }, [packageId]);

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-banner-overlay">
          <h1 className="menu-title">OUR MENU</h1>
        </div>
      </div>

      <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>

        <div className="menu-grid">
          <div className="category-button" onClick={() => setPackageId(7)}>Weight Loss Program</div>
          <div className="category-button" onClick={() => setPackageId(8)}>Weight Maintenance Program</div>
          <div className="category-button" onClick={() => setPackageId(9)}>Gain Muscle Program</div>
          <div className="category-button" onClick={() => setPackageId(10)}>Gluten Free Program</div>
          <div className="category-button" onClick={() => setPackageId(11)}>Diabet Cholesterol Program</div>
          <div className="category-button" onClick={() => setPackageId(12)}>Vegetarian Program</div>
        </div>

        {loading && <p>Loading menu...</p>}

        {!loading && packageId !== undefined && Array.isArray(menuItems) && menuItems.length > 0 && (
          <div className="menu-grid mt-4">
            {menuItems.map((item) => (
              <div key={item.menuId} className="menu-card">
                <img src={item.imageURL} alt={item.menu_name} className="menu-image" />
                <h4 className="menu-title">{item.menu_name}</h4>
                <p className="menu-type">Jenis Menu: {item.menu_type}</p>
                <p className="menu-detail">Detail Menu: {item.detail_menu}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tombol Order */}
        {packageId !== undefined && menuItems.length > 0 && (
          <div className="order-now-button mt-4">
            <button>Order Now</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuPage;
