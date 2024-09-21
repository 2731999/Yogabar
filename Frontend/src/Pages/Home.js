import { React, useState, useEffect } from 'react';
import '../index.css';
// import yogaBarLogo from '../path/to/your/image';
import Yoga1 from '../Assets/Yoga1.jpg'
import choco2 from '../Assets/choco2.jpg';
import HealthyFood1 from '../Assets/HealthyFood1.jpg';
import { FaSearch, FaRegUser, FaCartArrowDown } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import YogaBarPic1 from '../Assets/YogaBarPic1.png'
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, Route } from 'react-router-dom';
import ProductItems from '../Components/ProductItems';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCart, CartProvider } from '../Context/CartContext';
import toast from "react-hot-toast";
import { Badge } from 'antd';


function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [showQuantitySelector, setShowQuantitySelector] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [productStates, setProductStates] = useState([
        { showQuantitySelector: false, quantity: 1 },
        { showQuantitySelector: false, quantity: 1 },
        { showQuantitySelector: false, quantity: 1 },
        { showQuantitySelector: false, quantity: 1 }
    ]);
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const [loggedInAuth, setLoggedInAuth] = useState(null);
    const [cart, setCart] = useCart();
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        if (location.state && location.state.username) {
            setLoggedInUsername(location.state.username);
        }
    }, [location.state]);

    useEffect(() => {
        if (loggedInUsername) {
            console.log("Logged in username in home:", loggedInUsername);
        }
    }, [loggedInUsername]);


    useEffect(() => {
        if (location.state && location.state.auth) {
            setLoggedInAuth(location.state.auth);
        }
    }, [location.state]);

    useEffect(() => {
        if (loggedInAuth) {
            console.log("Logged in auth in home:", loggedInAuth);
            console.log('User ID:', loggedInAuth.user.userId);
        }
    }, [loggedInAuth]);


    const handleLogout = () => {
        setLoggedInUsername(null); // Clear the logged-in user data
        navigate('/Login'); // Redirect to the login page
    };

    function ProductCard({ title, description, image }) {
        return (
            <div className="dark-pink-product-card">
                <img src={image} alt={title} className="dark-pink-product-image" />
                <div className="dark-pink-product-details">
                    <h4 className="dark-pink-product-title">{title}</h4>
                    <p className="dark-pink-product-description">{description}</p>
                    <button className="dark-pink-explore-button">Let's Explore!</button>
                </div>
            </div>
        );
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };


    const addToCart = (index, name, statement, price) => {
        const product = {
            name: name,
            statement: statement,
            price: price,
            quantity: productStates[index].quantity
        };
        console.log("Product added to cart:", product);
        setProductStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = { showQuantitySelector: true, quantity: 1 };
            return newStates;
        });
    };


    const incrementQuantity = (index) => {
        setProductStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = { ...newStates[index], quantity: newStates[index].quantity + 1 };
            return newStates;
        });
    };

    const decrementQuantity = (index) => {
        setProductStates(prevStates => {
            const newStates = [...prevStates];
            if (newStates[index].quantity > 1) {
                newStates[index] = { ...newStates[index], quantity: newStates[index].quantity - 1 };
            }
            return newStates;
        });
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
        navigate("/Cart", { state: { loggedInAuth: loggedInAuth } });
    };

    const handleRegisterClick = () => {
        navigate('/Register')
    };

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
                    {loggedInUsername ? (
                        <li className="pink-nav-username">
                            <p>Welcome, {loggedInUsername}</p>
                        </li>
                    ) : null}
                </div>
                <div className='head-pink-logo'>
                    <img src="logo.png" alt="" className="pink-logo" />
                </div>
                <nav className="pink-nav">
                    <ul className="pink-nav-list">
                        <li className="pink-nav-item" onClick={toggleSearch}><FaSearch /></li>
                        {loggedInUsername ? (
                            <>
                                <li className="pink-nav-item" onClick={handleLogout}>Logout</li>
                            </>
                        ) : (
                            <li className="pink-nav-item" onClick={handleRegisterClick}><FaRegUser /></li>
                        )}
                        <Badge count={cartCount} showZero style={{ marginRight: '20px', }}>
                            <li className="pink-nav-item">
                                <button onClick={handleCartClick} >CART<FaCartArrowDown /></button>
                            </li>
                        </Badge>
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
            <div className='yellow'>
                <img src={YogaBarPic1} alt="" />
            </div>
            <div className="blue">
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    All Products
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    New Launches
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Protein
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Breakfast
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Muesli
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Bars
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    YogaBaby
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Dry Fruits & Seeds
                </div>
                <div className="blue-items">
                    <div className='blue-items-img'>
                        <img src="all_products_image.jpg" alt="" />
                    </div>
                    Oats and Quinoa
                </div>
            </div>
            <div className="grey">
                <div className="grey-text">
                    <p className="grey-running-text">🧘‍♀️ OM NOM NOM YUM FALL IN LOVE WITH THE YOGA WAY OF LIFE 🧘‍♀️ PRACTICE YUM-ASANA EVERY DAY 🧘 All ABOARD THE YUM EXPRESS 🧘‍♂️</p>
                </div>
            </div>
            <div className='white1-products'>
                <div className="white1">
                    <header className="white1-head">
                        <h1>A DISCOGRAPHY of YUMMINESS</h1>
                        <p>From crunch rock (crunchy corn flakes) to smooth jazz (silky peanut butter), discover lip-smacking food that'll make your taste buds sing!</p>
                    </header>
                    <div className="white1-features">
                        <div className="white1-feature">
                            <span role="img" aria-label="Gluten Free">🌾</span>
                            <p>Gluten Free</p>
                        </div>
                        <div className="white1-feature">
                            <span role="img" aria-label="Nutritionally Balanced">⚖️</span>
                            <p>Nutritionally Balanced</p>
                        </div>
                        <div className="white1-feature">
                            <span role="img" aria-label="No Chemicals">🌿</span>
                            <p>No Chemicals</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="products-container">
                    <ProductItems
                        name="Dark Chocolate Pancake Mix, 150g"
                        statement="Who says you can't eat chocolate every day?"
                        price="Rs 150.00"
                        userId={loggedInAuth ? loggedInAuth.user.userId.toString() : null} // Convert userId to string
                        addToCart={(name, statement, price, userId) => addToCart(0, name, statement, price, userId)}
                        showQuantitySelector={productStates[0].showQuantitySelector}
                        quantity={productStates[0].quantity}
                        incrementQuantity={() => incrementQuantity(0)}
                        decrementQuantity={() => decrementQuantity(0)}
                        cartCount={cartCount}
                        setCartCount={setCartCount}
                    />
                    <ProductItems
                        name="Dark Chocolate Pancake Mix, 140g"
                        statement="Who says you can't eat chocolate every day?"
                        price="Rs 150.00"
                        addToCart={(name, statement, price) => addToCart(1, name, statement, price)}
                        showQuantitySelector={productStates[1].showQuantitySelector}
                        quantity={productStates[1].quantity}
                        incrementQuantity={() => incrementQuantity(1)}
                        decrementQuantity={() => decrementQuantity(1)}
                        cartCount={cartCount}
                        setCartCount={setCartCount}
                    />
                    <ProductItems
                        name="Dark Chocolate Pancake Mix, 130g"
                        statement="Who says you can't eat chocolate every day?"
                        price="Rs 150.00"
                        addToCart={(name, statement, price) => addToCart(2, name, statement, price)}
                        showQuantitySelector={productStates[2].showQuantitySelector}
                        quantity={productStates[2].quantity}
                        incrementQuantity={() => incrementQuantity(2)}
                        decrementQuantity={() => decrementQuantity(2)}
                        cartCount={cartCount}
                        setCartCount={setCartCount}
                    />
                    <ProductItems
                        name="Dark Chocolate Pancake Mix, 120g"
                        statement="Who says you can't eat chocolate every day?"
                        price="Rs 150.00"
                        addToCart={(name, statement, price) => addToCart(3, name, statement, price)}
                        showQuantitySelector={productStates[3].showQuantitySelector}
                        quantity={productStates[3].quantity}
                        incrementQuantity={() => incrementQuantity(3)}
                        decrementQuantity={() => decrementQuantity(3)}
                        cartCount={cartCount}
                        setCartCount={setCartCount}
                    />
                </div>
            </div>
            <div className="dark-pink-App">
                <p className="dark-pink-title">You'll definitely love this!</p>
                <div className="dark-pink-product-grid">
                    <ProductCard
                        title="Bars"
                        description="Balanced, wholesome, and made with the cleanest ingredients - they're (probably) the most advanced bars in town!"
                        image={choco2}
                    />
                    <ProductCard
                        title="Muesli"
                        description="Packed with abundance of nuts, berries and seeds, a bowlful of any of these will surely satisfy all your breakfast needs"
                        image={choco2}
                    />
                    <ProductCard
                        title="Li'l Ones"
                        description="We took the most nutritious ancient grains and turned them into the most wholesome treats for your li'l ones! Now, that's 'babylicious'"
                        image={choco2}
                    />
                    <ProductCard
                        title="Protein"
                        description="High in protein. Loaded with flavour. 'Cause we love treating your tastebuds to deliciousness while making sure you reach your fitness goals"
                        image={choco2}
                    />
                </div>
            </div>
            <div className='product-containers-2'>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 250g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart" onClick={() => {
                            setCartCount(cartCount + 1); // Increment cart count
                            toast.success("Item added to cart");
                        }}>
                            Add to Cart
                        </button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className='green-photo-containers'>
                <div className="green-photo-heading">Simple Ideology. Bold Flavours.</div>
                <div className="green-photo-container">
                    <div className="green-photo-card">
                        <img src={Yoga1} alt="Yoga" className="green-photo-image" />
                        <div className="green-photo-content">
                            <div className="green-photo-description">Influenced by Yoga. Made by Experts.</div>
                        </div>
                    </div>
                    <div className="green-photo-card">
                        <img src={Yoga1} alt="Yoga" className="green-photo-image" />
                        <div className="green-photo-content">
                            <div className="green-photo-description">Influenced by Yoga. Made by Experts.</div>
                        </div>
                    </div>
                    <div className="green-photo-card">
                        <img src={Yoga1} alt="Yoga" className="green-photo-image" />
                        <div className="green-photo-content">
                            <div className="green-photo-description">Influenced by Yoga. Made by Experts.</div>
                        </div>
                    </div>
                    <div className="green-photo-card">
                        <img src={Yoga1} alt="Yoga" className="green-photo-image" />
                        <div className="green-photo-content">
                            <div className="green-photo-description">Influenced by Yoga. Made by Experts.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product-containers-3'>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className='healthy-photo-containers'>
                <div className="healthy-photo-heading">Let’s make something healthier together</div>
                <div className="healthy-photo-container">
                    <div className="healthy-photo-card">
                        <img src={HealthyFood1} alt="Stuffed Baked Apple" className="healthy-photo-image" />
                        <div className="healthy-photo-content">
                            <div className="heading">Stuffed Baked Apple</div>
                            <div className="stars">
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                            </div>
                            <button className="view-recipe-btn">View recipe</button>
                        </div>
                    </div>
                    <div className="healthy-photo-card">
                        <img src={HealthyFood1} alt="Stuffed Baked Apple" className="healthy-photo-image" />
                        <div className="healthy-photo-content">
                            <div className="heading">Stuffed Baked Apple</div>
                            <div className="stars">
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                            </div>
                            <button className="view-recipe-btn">View recipe</button>
                        </div>
                    </div>
                    <div className="healthy-photo-card">
                        <img src={HealthyFood1} alt="Stuffed Baked Apple" className="healthy-photo-image" />
                        <div className="healthy-photo-content">
                            <div className="heading">Stuffed Baked Apple</div>
                            <div className="stars">
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                            </div>
                            <button className="view-recipe-btn">View recipe</button>
                        </div>
                    </div>
                    <div className="healthy-photo-card">
                        <img src={HealthyFood1} alt="Stuffed Baked Apple" className="healthy-photo-image" />
                        <div className="healthy-photo-content">
                            <div className="heading">Stuffed Baked Apple</div>
                            <div className="stars">
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                                <span role="img" aria-label="star">⭐</span>
                            </div>
                            <button className="view-recipe-btn">View recipe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product-containers-4'>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div className="products-container">
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Dark Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Who says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 150.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">No one ays you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 130.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">most light Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Anyone says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 140.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className='complete-product'>
                        <div className='product-container'>

                        </div>
                        <h2 className="product-name">Darkest Chocolate Pancake Mix, 150g</h2>
                        <p className="statement">Says you can't eat chocolate everyday?</p>
                        <h3 className="price">Rs 160.00</h3>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="running-white">
                <div className="running-white-text">
                    <p className="white-running-text">🧘‍♀️ OM NOM NOM YUM FALL IN LOVE WITH THE YOGA WAY OF LIFE 🧘‍♀️ PRACTICE YUM-ASANA EVERY DAY 🧘 All ABOARD THE YUM EXPRESS 🧘‍♂️</p>
                </div>
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
            <div className="grey">
                <div className="grey-text">
                    <p className="grey-running-text">🧘‍♀️ OM NOM NOM YUM FALL IN LOVE WITH THE YOGA WAY OF LIFE 🧘‍♀️ PRACTICE YUM-ASANA EVERY DAY 🧘 All ABOARD THE YUM EXPRESS 🧘‍♂️</p>
                </div>
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <CartProvider>
            <App />
        </CartProvider>
    );
}