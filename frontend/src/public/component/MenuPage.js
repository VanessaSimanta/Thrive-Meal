import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACK_END_URL } from '../../utils/const';
import FormOrder from './FormOrder';

function MenuPage() {
  const { packageId: paramId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [packageId, setPackageId] = useState(paramId ? parseInt(paramId) : undefined);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    if (packageId !== undefined) {
      setLoading(true);
      axios
        .get(`${BACK_END_URL}/api/menu/${packageId}`) 
        .then((response) => {
          setMenuItems(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('❌ Gagal ambil data menu:', error);
          setLoading(false);
        });
    }
  }, [packageId]);

  // Function to chunk the menu items into groups of 3 for each day
  const chunkMenuItems = (items, size) => {
    const chunked = [];
    for (let i = 0; i < items.length; i += size) {
      chunked.push(items.slice(i, i + size));
    }
    return chunked;
  };

  const menuDays = chunkMenuItems(menuItems, 3);

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-banner-overlay">
          <h1 className="menu-title">OUR MENU</h1>
        </div>
      </div>

      <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
        <div className="menu-grid">
          <div className="category-button" onClick={() => setPackageId(25)}>Weight Loss Program</div>
          <div className="category-button" onClick={() => setPackageId(26)}>Weight Maintenance Program</div>
          <div className="category-button" onClick={() => setPackageId(27)}>Gain Muscle Program</div>
          <div className="category-button" onClick={() => setPackageId(28)}>Gluten Free Program</div>
          <div className="category-button" onClick={() => setPackageId(29)}>Diabet Cholesterol Program</div>
          <div className="category-button" onClick={() => setPackageId(30)}>Vegetarian Program</div>
        </div>

        {loading && <p>Loading menu...</p>}

        {!loading && packageId !== undefined && menuItems.length > 0 && (
          <div className="menu-days-container">
            {menuDays.map((dayMenus, dayIndex) => (
              <div key={`day-${dayIndex + 1}`} className="day-menu-section">
                <h2 className="day-header">Day {dayIndex + 1} Meal Plan</h2>
                <div className="menu-grid mt-2">
                  {dayMenus.map((item) => (
                    <div key={item.menuId} className="menu-card">
                      <img src={item.imageURL} alt={item.menu_name} className="menu-image" />
                      <h4 className="menu-title">{item.menu_name}</h4>
                      <p className="menu-type">Jenis Menu: {item.menu_type}</p>
                      <p className="menu-detail">Detail Menu: {item.detail_menu}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {packageId !== undefined && menuItems.length > 0 && (
          <div className="order-now-button mt-4">
            <button onClick={() => setShowModal(true)}>Order Now</button>
          </div>
        )}
      </div>

      <FormOrder show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
}

export default MenuPage;