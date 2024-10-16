import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import google_icon from '../../Images/google.svg';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import bg from '../../Images/bg.mp4';

function Forgot() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // State to hold success or error message
    const navigate = useNavigate();

    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent successfully."); // Show alert popup

            // Redirect to the login page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirect after 2 seconds

            setEmail(""); // Clear the email input field
        } catch (error) {
            console.log(error);
            setMessage("Error sending password reset email. Please try again."); // Set error message
        }
    };

    return (
        <>
            <div className="background_video">
                <video id="myVideo" autoPlay muted loop>
                    <source src={bg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="LoginPage">
                <div className="bg"></div>
                <div className="Login-Main">
                    <div className="Login_title">Password Reset</div>
                    <form className="form_login" onSubmit={handlesubmit}>
                        <label className="label_form">Email: </label><br />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="input_form"
                            placeholder="example123@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="submit" value="Submit" className="submit_btn" />
                    </form>
                    {message && <p style={{ color: 'red' }}>{message}</p>} {/* Show error message */}
                    <Link to='/'>
                        <div className="user_new_old"><span className="change_form"> Go Back</span></div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Forgot;
