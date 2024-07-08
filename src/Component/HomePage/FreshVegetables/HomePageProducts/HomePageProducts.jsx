// src/components/HomePageProducts.jsx
import React, { useState } from 'react';
import '../FreshVegetables.css';
import { Link } from 'react-router-dom';

const HomePageProducts = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    
    const handleRemove = () => {
        setQuantity(quantity => (quantity <= 0 ? 0 : quantity - 1));
    };

    const handleAdd = () => {
        setQuantity(quantity => quantity + 1);
    };

    const add_to_cart = () => {
        console.log(quantity);
        alert(`Added ${quantity} kg of ${product.name} to the cart.`);
    };

    return (
        <Link to={`/ProductInfo`} className='linkto'>
            <div className="card">
                <div className="card_product_image"></div>
                <div className="card_section_1">
                    <div className="card_product_category">{product.category}</div>
                    <div className="card_product_name">{product.name}</div>
                </div>
                <div className="card_section_2">
                    <div className="card_product_real_price">Rs. {product.real_price}</div>
                    <div className="card_product_discount_price">{product.discount_price} Rs/Kg</div>
                </div>
                <div className="card_section_3">
                    <div className="product_quantity">
                        <button className="quantity_btn quantity_btn_remove" onClick={handleRemove}>-</button>
                        <input type='text' className="quantity_choosen" value={quantity} readOnly />
                        <button className="quantity_btn quantity_btn_add" onClick={handleAdd}>+</button>
                    </div>
                    <button className='add_to_cart_btn' onClick={add_to_cart}>Add to cart</button>
                </div>
            </div>

        </Link>
    );
}

export default HomePageProducts;
