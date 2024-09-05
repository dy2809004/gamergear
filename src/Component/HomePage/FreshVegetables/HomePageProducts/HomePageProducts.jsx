import React, { useState, useContext } from 'react';
import '../FreshVegetables.css';
import { CartContext } from '../../../../CartContext';

const HomePageProducts = ({ product, showNotification }) => {
    const { cart, setCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleRemove = (e) => {
        e.stopPropagation();
        setQuantity(quantity <= 0 ? 0 : quantity - 1);
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        setQuantity(quantity + 1);
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
            setCart((prevCart) => {
                const itemIndex = prevCart.findIndex((item) => item.id === newData.id);
                if (itemIndex > -1) {
                    // Update the quantity of the existing item
                    const updatedCart = [...prevCart];
                    updatedCart[itemIndex].quantity += newData.quantity;
                    return updatedCart;
                } else {
                    // Add new item to the cart
                    return [...prevCart, newData];
                }
            });
            setAddedToCart(true);
            showNotification();
            setQuantity(quantity => 0)
        } else {
            alert('Please select a quantity greater than 0.');
        }
    };

    return (
        <div className={`card ${addedToCart ? 'added-to-cart' : ''}`}>
            <div className="card_product_image">
                <img src={product.imageUrl} alt={product.name} className="card_product_image" height="100%" width="100%" />
            </div>
            <div className="card_section_1">
                <div className="card_product_category">{product.category}</div>
                <div className="card_product_name">{product.name} </div>
            </div>
            <div className="card_section_2">
                <div className="card_product_real_price">Rs. {product.real_price}</div>
                <div className="card_product_discount_price">{product.discount_price}Rs</div>
            </div>
            <div className="card_section_3">
                <div className="product_quantity">
                    <button className="quantity_btn quantity_btn_remove" onClick={handleRemove}>-</button>
                    <input type="number" className="quantity_choosen" value={quantity} onChange={handleQuantityChange} readOnly/>
                    <button className="quantity_btn quantity_btn_add" onClick={handleAdd}>+</button>
                </div>
                <button className="add_to_cart_btn" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default HomePageProducts;
