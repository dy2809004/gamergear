import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import LoginPage from './Component/LoginPage/LoginPage';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/HomePage/HomePage';
import Footer from './Component/Footer/Footer';
import Admin from './Component/AdminPage/Admin';
import CartPage from './Component/CartPage/CartPage';
import Payment from './Component/Payment/Payment';
import Forgot from './Component/Forgot/Forgot';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/SignUpPage' element={<SignUpPage />} />
                    <Route path='/HomePage' element={<HomePage />} />
                    <Route path='/Footer' element={<Footer />} />
                    <Route path='/SignUpPage/HomePage' element={<HomePage />} />
                    <Route path='/CartPage' element={<CartPage />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/Payment' element={<Payment />} />
                    <Route path='/Forgot' element={<Forgot />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
