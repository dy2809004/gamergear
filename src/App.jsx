import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from './CartContext';
import LoginPage from './Component/LoginPage/LoginPage';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/HomePage/HomePage';
import Admin from './Component/AdminPage/Admin';
import CartPage from './Component/CartPage/CartPage';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/SignUpPage' element={<SignUpPage />} />
                    <Route path='/HomePage' element={<HomePage />} />
                    <Route path='SignUpPage/HomePage' element={<HomePage />} />
                    <Route path='/CartPage' element={<CartPage />} />
                    <Route path='/Admin' element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
