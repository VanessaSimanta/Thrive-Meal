import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [packageId, setPackageId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packageId !== undefined) {
      setLoading(true);
      axios.get(`http://localhost:8000/api/menu/${packageId}`)
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

      <div className="menu-grid">
        {/* Tombol kategori */}
         {/* Package Id sesuain dulu nanti reset db biar mulai dari 1 kalo udh final  */}
        <div className="category-button" onClick={() => setPackageId(19)}>Weight Loss</div>
  
      </div>

      {/* Loading state */}
      {loading && <p>Loading menu...</p>}

      {/* Tampilkan menu hanya jika sudah pilih paket */}
      {!loading && packageId !== undefined && Array.isArray(menuItems) && menuItems.length > 0 && (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.menuId} className="menu-card">
              <img src={item.imageURL} alt={item.menu_name} />
              <h4>{item.menu_name}</h4>
              <p>Kalori: {item.detail_menu}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tombol Order muncul hanya jika sudah pilih paket */}
      {packageId !== undefined && (
        <div className="order-now-button">
          <button>Order Now</button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
