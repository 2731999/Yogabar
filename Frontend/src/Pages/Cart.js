import { React, useState, useEffect } from 'react';
import '../index.css';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch, FaRegUser, FaCartArrowDown } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const location = useLocation();
    const cartData = location.state?.cartData;
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = location.state?.isLoggedIn;
    const loggedInAuth = location.state?.loggedInAuth;

    function CategoryCard({ title, image, to }) {
        return (
            <Link to={to} className="category-card" style={{ textDecoration: 'none' }}>
                <img src={image} alt='' className="category-image" />
                <p className="category-title">{title}</p>
            </Link>
        );
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    useEffect(() => {
        console.log("Cart Data:", cartData);
    }, []);

    useEffect(() => {
        console.log("Logged in auth in Cart:", loggedInAuth);
    }, [loggedInAuth]);

    return (
        <div>
            <div className="purple">
                <div className="purple-content">
                    <p>Save ₹100 on your first order of ₹499 or more.</p>
                    <p>Use code <span className="purple-highlight">NEW100</span> at checkout.</p>
                </div>
            </div>
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
                        <li className="pink-nav-item"><FaSearch /></li>
                        <li className="pink-nav-item"><FaRegUser /></li>
                        <li className="pink-nav-item">CART <FaCartArrowDown /></li>
                    </ul>
                </nav>
                {menuOpen && (
                    <div className="pink-shop-menu">
                        <div className='pink-shop-menu-left'>
                            <p>Shop by category</p>
                        </div>
                        <div className="pink-shop-menu-category">
                            <CategoryCard title="New Launches & Offers" to="/product1" />
                            <CategoryCard title="All Products" image='' to="/product2" />
                            <CategoryCard title="Breakfast" image='' to="/product3" />
                            <CategoryCard title="Protein" image='' to="/product4" />
                            <CategoryCard title="Muesli" image='' to="//product5" />
                            <CategoryCard title="Bars" image='' to="//product6" />
                        </div>
                    </div>
                )}
            </div>
            <div className="cart-content">
                {isLoggedIn ? (
                    // Render cart content if user is logged in
                    <div>
                        {/* Your cart content rendering logic here */}
                        <h2>Cart Content Goes Here</h2>
                    </div>
                ) : (
                    // Render login prompt if user is not logged in
                    <div>
                        <h2>Please log in to view your cart.</h2>
                        <button onClick={() => navigate('/Login')}>Log In</button>
                    </div>
                )}
            </div>
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
}

export default Cart;


