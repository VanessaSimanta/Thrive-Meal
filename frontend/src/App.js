import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
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

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Thrive Meal Logo" className="logo-image" />
        <span>thrive meal</span>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/article">Article</Link></li>
      </ul>
    </nav>
  );
}

function HomePage() {
  return (
    <>
      {/* Home Section */}
      <section className="hero" id="home">
        <div className="hero-text">
          <h1>Makan Sehat, Hidup Lebih Fit</h1>
          <p className="fat-loss">99% FAT LOSS</p>
          <div className="icons">
            <span><img src={calorieIcon} alt="Calorie Control" />Calorie Control</span>
            <span><img src={dietPlanIcon} alt="Smart Diet Plan" />Smart Diet Plan</span>
            <span><img src={happyIcon} alt="Healthy & Happy" />Healthy & Happy</span>
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="cta">Order Now</a>
        </div>
        <div className="hero-image">
          <img src={foodImage1} alt="Meal Plan" />
        </div>
      </section>

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

function MenuPage() {
  return (
    <section className="menu-section">
      <h2>Our Menu</h2>
      <ul>
        <li>Ayam Panggang + Nasi Merah + Sayur Kukus</li>
        <li>Salmon Salad + Quinoa</li>
        <li>Oatmeal + Buah Segar</li>
        <li>Tempe Orek + Tumis Sayur + Nasi Jagung</li>
      </ul>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="about-section">
      <h2>About Us</h2>
      <p>Thrive Meal adalah layanan katering sehat...</p>
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
        <Link to="/">Home</Link> |
        <Link to="/menu">Menu</Link> |
        <Link to="/about">About</Link> |
        <Link to="/faq">FAQ</Link> |
        <Link to="/article">Article</Link>
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
