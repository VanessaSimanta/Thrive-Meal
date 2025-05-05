import React from 'react';
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


function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
  <div className="logo">
    <img src={logoImage} alt="Thrive Meal Logo" className="logo-image" />
    <span>thrive meal</span>
  </div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#menu">Menu</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#article">Article</a></li>
  </ul>
</nav>


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
      <section className="programs" id="menu">
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
      <section className="why-thrive" id="about">
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

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Thrive Meal. All Rights Reserved.</p>
        <p className="find-us">FIND US !</p>
        <div className="social-icons">
          <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
          <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a> |
          <a href="#menu">Menu</a> |
          <a href="#about">About</a> |
          <a href="#faq">FAQ</a> |
          <a href="#article">Article</a>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;
