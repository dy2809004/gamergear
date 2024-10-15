import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Your Firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const handleSubmit = async (event) => {
    event.preventDefault();
    const userRef = doc(db, 'users', userEmail);
    try {
        await setDoc(userRef, {
            name,
            phone,
            address,
            gender,
            email: userEmail
        }, { merge: true });
        setMessage("User details updated successfully!");
        navigate('/UserDashboard'); // Change this line
    } catch (error) {
        console.error("Error updating document: ", error);
        setMessage("Error updating user details.");
    }
};

const UserProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    const userEmail = Cookies.get("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (userEmail) {
                const docRef = doc(db, 'users', userEmail);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || '');
                    setPhone(data.phone || '');
                    setAddress(data.address || '');
                    setGender(data.gender || '');
                } else {
                    setMessage("No user data found.");
                }
            }
        };
        fetchUserData();
    }, [userEmail]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = doc(db, 'users', userEmail);
        try {
            await setDoc(userRef, {
                name,
                phone,
                address,
                gender,
                email: userEmail
            }, { merge: true });
            setMessage("User details updated successfully!");
            navigate('/UserDashboard');
        } catch (error) {
            console.error("Error updating document: ", error);
            setMessage("Error updating user details.");
        }
    };

    return (
        <div className="UserProfile">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form_group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form_group">
                    <label>Phone:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form_group">
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form_group">
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UserProfile;
