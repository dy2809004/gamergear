// UserDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Your Firebase config
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';
import './UserDashboard.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userEmail = Cookies.get("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userEmail) {
            navigate('/'); // Redirect to login page if userEmail is not present
        }
    }, [userEmail, navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userEmail) {
                const docRef = doc(db, 'users', userEmail);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        setError("No user data found.");
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                    setError("Error fetching user data.");
                }
            } else {
                setError("User not authenticated.");
            }
        };

        const fetchUserPurchases = async () => {
            if (userEmail) {
                const purchasesRef = collection(db, 'purchases');
                const q = query(purchasesRef, where("email", "==", userEmail));
                try {
                    const querySnapshot = await getDocs(q);
                    const purchaseList = [];
                    querySnapshot.forEach((doc) => {
                        purchaseList.push(...doc.data().products); // Extracting products from purchase data
                    });
                    setPurchases(purchaseList);
                } catch (error) {
                    console.error("Error fetching purchases: ", error);
                    setError("Error fetching purchases.");
                }
            }
        };

        const fetchPaymentHistory = async () => {
            if (userEmail) {
                const paymentsRef = collection(db, 'payments');
                const q = query(paymentsRef, where("email", "==", userEmail));
                try {
                    const querySnapshot = await getDocs(q);
                    const paymentList = [];
                    querySnapshot.forEach((doc) => {
                        paymentList.push(doc.data());
                    });
                    setPaymentHistory(paymentList);
                } catch (error) {
                    console.error("Error fetching payment history: ", error);
                    setError("Error fetching payment history.");
                }
            }
        };

        const fetchData = async () => {
            await fetchUserData();
            await fetchUserPurchases();
            await fetchPaymentHistory();
            setLoading(false);
        };

        fetchData();
    }, [userEmail]);

    const handleBackToHome = () => {
        navigate('/HomePage'); // Redirect to the HomePage
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="UserDashboard">
            <h2>User Dashboard</h2>
            {userData ? (
                <div>
                    <h3>User Information</h3>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    
                    <h3>Purchase History</h3>
                    {purchases.length > 0 ? (
                        <ul>
                            {purchases.map((product, index) => (
                                <li key={index}>
                                    {product.name} - ₹{product.price} on {new Date(product.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No purchase history available.</p>
                    )}

                    <h3>Payment History</h3>
                    {paymentHistory.length > 0 ? (
                        <ul>
                            {paymentHistory.map((payment, index) => (
                                <li key={index}>
                                    {payment.method} - ₹{payment.amount} on {new Date(payment.date).toLocaleDateString()} (Status: {payment.status})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No payment history available.</p>
                    )}
                </div>
            ) : (
                <p>No user data available.</p>
            )}

            {/* Back to Home Button */}
            <button 
                className="back-to-home-btn" 
                onClick={handleBackToHome}
            >
                Back to Home
            </button>
        </div>
    );
};

export default UserDashboard;
