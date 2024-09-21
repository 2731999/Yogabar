import {React, useState} from "react";
import { Toaster } from "react-hot-toast";
import { FaSearch, FaRegUser, FaCartArrowDown } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Layout = ({ children, title, description, keywords, author }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  function CategoryCard({ title, image, to }) {
    return (
      <Link to={to} className="category-card" style={{ textDecoration: 'none' }}>
        <img src={image} alt='' className="category-image" />
        <p className="category-title">{title}</p>
      </Link>
    );
  }

  const handleCartClick = () => {
    navigate('/Cart')
  };

  return (
    <div>
      <div className="pink">
        <div className="pink-logo-container">
          <p className='pink-logo-text'><MdOutlineArrowOutward /></p>
          <p className="pink-logo-text" onClick={toggleMenu}>SHOP</p>
        </div>
        <div className='head-pink-logo'>
          <img src="logo.png" alt="" className="pink-logo" />
        </div>
        <nav className="pink-nav">
          <ul className="pink-nav-list">
            <li className="pink-nav-item" onClick={toggleSearch}><FaSearch /></li>
            <li className="pink-nav-item"><FaRegUser /></li>
            <li className="pink-nav-item">
              <button onClick={handleCartClick}>CART <FaCartArrowDown /></button>
            </li>
          </ul>
        </nav>
        {searchOpen && (
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button onClick={toggleSearch}>X</button>
          </div>
        )}
        {menuOpen && (
          <div className="pink-shop-menu">
            <div className='pink-shop-menu-left'>
              <p>Shop by category</p>
            </div>
            <div className="pink-shop-menu-category">
              <CategoryCard title="New Launches & Offers" image='' to="/product1" />
              <CategoryCard title="All Products" image='' to="/product2" />
              <CategoryCard title="Breakfast" image='' to="/product3" />
              <CategoryCard title="Protein" image='' to="/product4" />
              <CategoryCard title="Muesli" image='' to="//product5" />
              <CategoryCard title="Bars" image='' to="//product6" />
            </div>
          </div>
        )}
      </div>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <div className='section-left'>
            <div className="yogaBarInfo">
              <img src='' alt="Yoga Bar Logo" className="yogaBarLogo" />
              <p>We're a nutrition-led food company that prides itself in making lip-smacking food that's good for you. All without any artificial colours, chemicals or preservatives. IvyK, and if you don't, what are you waiting for? Go on and try some!</p>
            </div>
            <div className="footer-socialIcons">
              <a href="https://www.instagram.com"><img alt="" /><FaInstagramSquare /></a>
              <a href="https://www.linkedin.com"><img alt="" /><FaLinkedin /></a>
              <a href="https://www.facebook.com"><img alt="" /><FaFacebookSquare /></a>
            </div>
          </div>
          <div className='section-right'>
            <div className="footer-section">
              <h3>SHOP</h3>
              <ul>
                <li><a href="#">ALL PRODUCTS</a></li>
                <li><a href="#">NEW LAUNCHES & OFFERS</a></li>
                <li><a href="#">BREAKFAST</a></li>
                <li><a href="#">PROTEIN</a></li>
                <li><a href="#">MUESLI</a></li>
                <li><a href="#">BARS</a></li>
                <li><a href="#">YOGABABY</a></li>
                <li><a href="#">DRY FRUITS & SEEDS</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>QUICK LINKS</h3>
              <ul>
                <li><a href="#">SHIPPING & DELIVERY</a></li>
                <li><a href="#">TERMS AND CONDITIONS</a></li>
                <li><a href="#">PRIVACY POLICY</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>CONTACT US</h3>
              <p>PH: +919606030616</p>
              <p>WE ARE AVAILABLE MONDAY TO SATURDAY; 10 AM - 6:00 PM.</p>
              <p>EMAIL: HELLO@YOGABARS.IN</p>
              <p>WE TRY TO RESPOND WITHIN 48 HOURS.</p>
            </div>
          </div>
        </div>
        <hr className="hr" />
        <p className="footerText">Who needs a magic wand when you’ve got our protein bars? They’ll turn your cravings into happy little lettuce leaves. Poof!</p>
        <hr className="hr" />
        <p className="copyright">© 2024, YogaBar</p>
      </footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout;