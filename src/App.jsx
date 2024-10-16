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
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import UserProfile from './Component/UserProfile/UserProfile';
import UserDashboard from './Component/UserDashboard/UserDashboard';
import SearchResults from './Component/SearchResults/SearchResults';
import HelpPage from './Component/HelpPage/HelpPage';
import AboutUs from './Component/AboutUs/AboutUs';

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
                    <Route path='/ProtectedRoute' element={<ProtectedRoute />} />
                    <Route path='/UserProfile' element={<UserProfile />} />
                    <Route path='/UserDashboard' element={<UserDashboard />} />
                    <Route path='/SearchResults' element={<SearchResults />} />
                    <Route path='/HelpPage' element={<HelpPage />} />
                    <Route path='/AboutUs' element={<AboutUs />} />

                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
