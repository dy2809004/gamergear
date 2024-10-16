// UserProfile.js

import { React, useEffect, useState } from "react";
import { db } from '../../firebase'; // Your Firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
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

    const onLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            Cookies.remove("userEmail");
            navigate('/');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate form fields
        if (!name || !phone || !address || !gender) {
            setError("All fields are required.");
            return;
        }

        // Validate phone number (must be 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setError("Phone number must be a valid 10-digit number.");
            return;
        }

        setError(''); // Clear any existing errors

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
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form_group">
                    <label>Phone:</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form_group">
                    <label>Address:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form_group">
                    <label>Gender:</label>
                    <select 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}

            {/* Go to Dashboard Button */}
            <button 
                className="small-button" 
                onClick={() => navigate('/UserDashboard')}
            >
                Go to Dashboard
            </button>

            {/* Back to Home Button */}
            <button 
                className="small-button" 
                onClick={() => navigate('/HomePage')}
            >
                Back to Home
            </button>

            <button 
                className="logout_btn" 
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;
