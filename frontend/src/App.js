import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import MenuPage from './public/component/MenuPage';
import FormOrder from './public/component/FormOrder';
import logoImage from './public/images/logo.png';
import foodImage1 from './public/images/food1.jpg';
import foodImage2 from './public/images/food2.jpg';
import foodImage3 from './public/images/food3.jpg';
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

// ---------- COMPONENTS ----------
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Thrive Meal Logo" className="logo-image" />
      </div>
      <ul>
        <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
        <li><NavLink to="/menu" className={({ isActive }) => isActive ? 'active-link' : ''}>Menu</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
        <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'active-link' : ''}>FAQ</NavLink></li>
        <li><NavLink to="/article" className={({ isActive }) => isActive ? 'active-link' : ''}>Article</NavLink></li>
      </ul>
      </ul>
    </nav>
  );
}

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* Hero Section */}
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

      {/* Modal Order Form */}
      <FormOrder show={showModal} handleClose={handleClose} />

      {/* Slogan */}
      <div className="slogan">
        Thrive Meal – Sajian Sehat, Hidup Lebih Berkembang.
      </div>

      {/* Diet Programs */}
      <section className="programs">
        <h2>Our Diet Programs</h2>
        <div className="cards">
          <div className="card">
            <img src={foodImage1} alt="Weight Loss" />
            <h3>Weight Loss Program</h3>
            <p>Menurunkan berat badan dengan asupan bergizi dan porsi yang sesuai.</p>
          </div>
          <div className="card">
            <img src={foodImage2} alt="Balanced Wellness" />
            <h3>Balanced Wellness</h3>
            <p>Menu seimbang untuk menjaga energi dan kesehatan sepanjang hari.</p>
          </div>
          <div className="card">
            <img src={foodImage3} alt="Muscle Gain" />
            <h3>Muscle Gain</h3>
            <p>Meningkatkan massa otot dengan porsi protein dan karbohidrat yang cukup.</p>
          </div>
        </div>
      </section>

      {/* Why Thrive Meal */}
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
    <section className="about-section">
      <h2>About Us</h2>
      <p>Thrive Meal adalah layanan katering sehat yang memberikan solusi makan praktis dan bernutrisi untuk gaya hidup aktif dan sehat.</p>
    </section>
  );
}

function FaqPage() {
  return (
    <section className="faq-section">
      <h2>FAQ</h2>
      <p><strong>Q:</strong> Apakah bisa custom menu?</p>
      <p><strong>A:</strong> Bisa, kami menyediakan opsi menu fleksibel.</p>
    </section>
  );
}

function ArticlePage() {
  return (
    <section className="article-section">
      <h2>Article</h2>
      <p>Baca berbagai artikel seputar hidup sehat dan diet.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Thrive Meal. All Rights Reserved.</p>
      <p className="find-us">FIND US !</p>
      <div className="social-icons">
        <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
        <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link> | <Link to="/menu">Menu</Link> | <Link to="/about">About</Link> | <Link to="/faq">FAQ</Link> | <Link to="/article">Article</Link>
      </div>
    </footer>
  );
}

// ---------- MAIN APP ----------
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
        <Footer />

        {/* Floating WhatsApp Button */}
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
      </div>
    </Router>
  );
}

export default App;
