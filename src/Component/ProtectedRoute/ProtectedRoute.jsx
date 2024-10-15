import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('userEmail');

    return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
