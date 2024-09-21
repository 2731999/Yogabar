import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';

const ProductItems = ({ name, statement, price, userId, addToCart, showQuantitySelector, quantity, incrementQuantity, decrementQuantity, cartCount, setCartCount }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = async () => {
        try {
            const response = await axios.post('/api/v1/cart/add-to-cart', {
                name: name, // Pass the name of the product
                statement: statement, // Pass the statement of the product
                price: price, // Pass the price of the product
                userId: userId // Pass the user ID
            });

            // Handle success response
            console.log(response.data);

            setClicked(true);
            setCartCount(prevCount => prevCount + 1);
            toast.success(`Item added to cart!`);
        } catch (error) {
            // Handle error
            console.error(error);
            toast.error(`Failed to add item to cart`);
        }
    }



    return (
        <div className='complete-product'>
            <div className='product-container'>
                {/* Your product container content */}
            </div>
            <h2 className="product-name">{name}</h2>
            <p className="statement">{statement}</p>
            <h3 className="price">{price}</h3>
            {showQuantitySelector ? (
                <div className='add-to-cart-after'>
                    <button className='add-to-cart-after-dec' onClick={decrementQuantity}>-</button>
                    <span className='add-to-cart-after-span'>{quantity}</span>
                    <button className='add-to-cart-after-inc' onClick={incrementQuantity}>+</button>
                </div>
            ) : (
                <button className={clicked ? "add-to-cart-after" : "add-to-cart"} onClick={handleClick}>
                    {clicked ? "Added" : "Add to Cart"}
                </button>
            )}
        </div>
    );
}

export default ProductItems;
