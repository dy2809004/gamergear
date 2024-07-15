import React, { useState } from 'react';
import '../FreshVegetables.css';

const HomePageProducts = ({ product, onAddToCart, showNotification }) => {
    const [quantity, setQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleRemove = (e) => {
        e.stopPropagation();
        setQuantity(quantity => (quantity <= 0 ? 0 : quantity - 1));
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        setQuantity(quantity => quantity + 1);
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value) || 0);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (quantity > 0) {
            const newData = {
                id: product.id,
                name: product.name,
                quantity,
                category: product.category,
                real_price: product.real_price,
                discount_price: product.discount_price,
            };
            onAddToCart(newData);
            setAddedToCart(true);
            showNotification();
            setQuantity(quantity => 0);
        } else {
            alert('Please select a quantity greater than 0.');
        }
    };

    return (
        <div className={`card ${addedToCart ? 'added-to-cart' : ''}`}>
            <div className="card_product_image"></div>
            <div className="card_section_1">
                <div className="card_product_category">{product.category}</div>
                <div className="card_product_name">{product.name} - Fresh From Farm</div>
            </div>
            <div className="card_section_2">
                <div className="card_product_real_price">Rs. {product.real_price}</div>
                <div className="card_product_discount_price">{product.discount_price} Rs/Kg</div>
            </div>
            <div className="card_section_3">
                <div className="product_quantity">
                    <button className="quantity_btn quantity_btn_remove" onClick={handleRemove}>-</button>
                    <input type='number' className="quantity_choosen" value={quantity} onChange={handleQuantityChange} />
                    <button className="quantity_btn quantity_btn_add" onClick={handleAdd}>+</button>
                </div>
                <button className='add_to_cart_btn' onClick={handleAddToCart} value={quantity}>Add to cart</button>
            </div>
        </div>
    );
}

export default HomePageProducts;
