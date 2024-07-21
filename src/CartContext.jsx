import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);

    const updateQuantity = (id, quantity) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, setCart, updateQuantity, finalPrice, setFinalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
