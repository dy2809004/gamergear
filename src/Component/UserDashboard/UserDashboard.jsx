import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Your Firebase config
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';
import './UserDashboard.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userEmail = Cookies.get("userEmail");

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
                        purchaseList.push(...doc.data().products);
                    });
                    setPurchases(purchaseList);
                } catch (error) {
                    console.error("Error fetching purchases: ", error);
                    setError("Error fetching purchases.");
                }
            }
        };

        const fetchData = async () => {
            await fetchUserData();
            await fetchUserPurchases();
            setLoading(false);
        };

        fetchData();
    }, [userEmail]);

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
                                    {product.name} - ${product.price} on {product.date}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No purchase history available.</p>
                    )}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default UserDashboard;
