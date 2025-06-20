import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MenuPage from './public/component/MenuPage';
import FormOrder from './public/component/FormOrder';
import logoImage from './public/images/logo.png';
import foodImage1 from './public/images/food1.jpg';
import foodImage2 from './public/images/food2.jpg';
import foodImage3 from './public/images/food3.jpg';
import foodImage4 from './public/images/gluten.jpg';
import foodImage5 from './public/images/diabet.jpg';
import foodImage6 from './public/images/vege.jpg';
import calorieIcon from './public/icons/calorie.jpg';
import dietPlanIcon from './public/icons/dietplan.jpg';
import happyIcon from './public/icons/happy.jpg';
import consultIcon from './public/icons/consult.jpg';
import flexibleIcon from './public/icons/flexible.jpg';
import expertIcon from './public/icons/expert.jpg';
import chefIcon from './public/icons/chef.jpg';
import menuIcon from './public/icons/menu.jpg';
import scheduleIcon from './public/icons/schedule.jpg';
import whatsappIcon from './public/icons/whatsapp.png';
import instagramIcon from './public/icons/instagram.png';
import facebookIcon from './public/icons/facebook.png';
import aboutUsImage from './public/images/aboutUs.jpg';
import aboutUs1Image from './public/images/aboutUs1.jpg';
import aboutUs2Image from './public/images/about2.jpg';
import ArticlePage from './public/component/articlePage';
import FaqPage from './public/component/FaqPage';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Thrive Meal Logo" className="logo-image" />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'active-link' : ''}>Menu</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'active-link' : ''}>FAQ</NavLink>
        </li>
        <li>
          <NavLink to="/article" className={({ isActive }) => isActive ? 'active-link' : ''}>Article</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const goToMenu = (packageId) => {
    navigate(`/menu/${packageId}`);
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-text">
          <h1>Makan Sehat, Hidup Lebih Fit</h1>
          <p className="fat-loss">99% FAT LOSS</p>
          <div className="icons">
            <span><img src={calorieIcon} alt="Calorie Control" />Calorie Control</span>
            <span><img src={dietPlanIcon} alt="Smart Diet Plan" />Smart Diet Plan</span>
            <span><img src={happyIcon} alt="Healthy & Happy" />Healthy & Happy</span>
          </div>
          <button className="cta" onClick={handleOpen}>Order Now</button>
        </div>
        <div className="hero-image">
          <img src={foodImage1} alt="Meal Plan" />
        </div>
      </section>

      <FormOrder show={showModal} handleClose={handleClose} />

      <div className="slogan">
        Thrive Meal – Sajian Sehat, Hidup Lebih Berkembang.
      </div>

      <section className="programs">
  <h2>Our Diet Programs</h2>
  <div className="cards">
    <div className="card" onClick={() => goToMenu(7)}>
      <img src={foodImage1} alt="Weight Loss" />
      <h3>Weight Loss Program</h3>
      <p>Menurunkan berat badan dengan asupan bergizi dan porsi yang sesuai.</p>
    </div>
    <div className="card" onClick={() => goToMenu(8)}>
      <img src={foodImage2} alt="Balanced Wellness" />
      <h3>Balanced Wellness</h3>
      <p>Menu seimbang untuk menjaga energi dan kesehatan sepanjang hari.</p>
    </div>
    <div className="card" onClick={() => goToMenu(9)}>
      <img src={foodImage3} alt="Muscle Gain" />
      <h3>Muscle Gain</h3>
      <p>Meningkatkan massa otot dengan porsi protein dan karbohidrat yang cukup.</p>
    </div>
    <div className="card" onClick={() => goToMenu(10)}>
      <img src={foodImage4} alt="Gluten Free" />
      <h3>Gluten Free Program</h3>
      <p>Menu bebas gluten untuk mendukung pencernaan yang lebih baik dan menghindari alergi.</p>
    </div>
    <div className="card" onClick={() => goToMenu(11)}>
      <img src={foodImage5} alt="Diabet & Cholesterol" />
      <h3>Diabet & Cholesterol Program</h3>
      <p>Kontrol gula darah dan kolesterol melalui menu rendah gula dan lemak jenuh.</p>
    </div>
    <div className="card" onClick={() => goToMenu(12)}>
      <img src={foodImage6} alt="Vegetarian Program" />
      <h3>Vegetarian Program</h3>
      <p>Menu berbasis tumbuhan kaya nutrisi tanpa produk hewani.</p>
    </div>
  </div>
</section>

      <section className="why-thrive">
        <h2>Kenapa Harus Thrive Meal?</h2>
        <div className="benefits">
          <div className="benefit"><img src={consultIcon} alt="Gratis Konsultasi" /><p>Gratis Konsultasi Gizi</p></div>
          <div className="benefit"><img src={flexibleIcon} alt="Menu Fleksibel" /><p>Menu Harian Fleksibel</p></div>
          <div className="benefit"><img src={expertIcon} alt="Ahli Gizi" /><p>Dipantau Ahli Gizi</p></div>
          <div className="benefit"><img src={chefIcon} alt="Chef" /><p>Dimasak Chef Berlangganan</p></div>
          <div className="benefit"><img src={menuIcon} alt="Menu Beragam" /><p>Menu Beragam 30 Hari</p></div>
          <div className="benefit"><img src={scheduleIcon} alt="Fleksibel Waktu" /><p>Fleksibel Atur Waktu Berlangganan</p></div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <div className="about-page-wrapper" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* SECTION: About Us */}
      <section className="about-header-section py-5 position-relative text-white">
        <div className="angled-top-right"></div>
        <div className="container position-relative z-1">
          <h2 className="fw-bold mb-4">About Us</h2>
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="lead">
                At Thrive Meal, we believe that healthy living starts from the plate.
                We craft delicious, nutritious meals — designed by nutritionists, cooked by 5-star chefs,
                and delivered fresh to your door.
              </p>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
              <img
                src={aboutUsImage}
                alt="Chef Cooking"
                className="img-thumbnail me-2"
                style={{ width: "100px", borderRadius: "12px" }}
              />
              <img
                src={aboutUs1Image}
                alt="Healthy Dish"
                className="img-thumbnail"
                style={{ width: "100px", borderRadius: "12px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Our Vision */}
      <section className="text-center my-5">
        <div className="position-relative mx-auto" style={{ maxWidth: '900px' }}>
          <div
            className="position-absolute top-0 start-50 translate-middle fw-semibold text-dark px-4 py-2 vision-button"
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: '10px',
              fontSize: '1.25rem',
            }}
          >
            Our Vision
          </div>
          <div
            className="p-5 rounded-4 shadow-sm"
            style={{
              backgroundColor: '#E7F1DB',
              paddingTop: '4rem',
              fontSize: '1.1rem',
            }}
          >
            <p className="mb-0 text-dark">
              To inspire a healthier lifestyle by making nutritious, balanced meals accessible,
              delicious, and part of everyday living. We believe that eating well should be simple,
              satisfying, and sustainable.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-5">
  <div className="row align-items-center justify-content-center text-center text-md-start">
    <div className="col-md-5 d-flex justify-content-center">
      <img
        src={aboutUs2Image}
        alt="Meal Box"
        className="img-fluid"
        style={{
          maxWidth: '320px',
          borderRadius: '20px',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
        }}
      />
    </div>
    <div className="col-md-5">
      <p className="lead fw-semibold m-0">
        <span className="text-success">"Your Healthy </span>
        <span className="text-info">Habit </span>
        <span className="text-danger">Starts Here."</span>
      </p>
    </div>
  </div>
</section>


      {/* SECTION: Our Mission */}
      <section className="text-center mb-5">
        <div className="position-relative mx-auto" style={{ maxWidth: '900px' }}>
          <div
            className="position-absolute top-0 start-50 translate-middle fw-semibold text-dark px-4 py-2 vision-button"
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: '10px',
              fontSize: '1.25rem',
            }}
          >
            Our Mission
          </div>
          <div
            className="p-5 rounded-4 shadow-sm"
            style={{
              backgroundColor: '#E7F1DB',
              paddingTop: '4rem',
              fontSize: '1.1rem',
            }}
          >
            <p className="mb-0 text-dark">
              To deliver thoughtfully crafted meals that support your wellness goals —
              combining expert nutrition, chef-quality taste, and seamless service.
              We’re here to make healthy eating effortless, flexible, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}



function Footer() {
  return (
    <footer className="footer">
      <p className="find-us">FIND US !</p>
      <div className="social-icons">
        <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
        <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
        <p>© 2025 Thrive Meal. All Rights Reserved.</p>
      </div>
      <div className="footer-links">
        <NavLink to="/">Home</NavLink> | <NavLink to="/menu">Menu</NavLink> | <NavLink to="/about">About</NavLink> | <NavLink to="/faq">FAQ</NavLink> | <NavLink to="/article">Article</NavLink>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:packageId" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element ={<FaqPage />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
        <Footer />
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
      </div>
    </Router>
  );
}

export default App;
