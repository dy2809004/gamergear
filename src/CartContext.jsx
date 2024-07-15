import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const updateQuantity = (id, quantity) => {
        if (quantity > 0) {
            setCart(cart.map(item =>
                item.id === id ? { ...item, quantity: quantity } : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== id));
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
