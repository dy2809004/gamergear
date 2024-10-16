import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../LoginPage/LoginPage.css';
import google_icon from '../../Images/google.svg';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import bg from '../../Images/bg.mp4';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to the library
library.add(faEye, faEyeSlash);

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    // Function to validate email format
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) {
            return 'Password must be at least 8 characters long.';
        } else if (!upperCase.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        } else if (!lowerCase.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        } else if (!number.test(password)) {
            return 'Password must contain at least one number.';
        } else if (!specialChar.test(password)) {
            return 'Password must contain at least one special character.';
        } else {
            return '';
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        // Validate email format
        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            return;
        } else {
            setEmailError('');
        }

        // Validate password before checking confirm password
        const validationError = validatePassword(password);
        if (validationError) {
            setPasswordError(validationError);
            return;
        } else {
            setPasswordError(''); // Clear error if password is valid
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigate('/HomePage'); // Navigate to the HomePage after successful sign-up
        } catch (error) {
            console.error("Error signing up:", error);
            setError(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            navigate('/HomePage');
        } catch (error) {
            console.error("Error signing up with Google:", error);
            setError(error.message);
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
            <div className="Login-Main">
                <div className="Login_title">Sign Up</div>
                {error && <div className="error_message">{error}</div>}
                <form className="form_login" onSubmit={handleSignUp}>
                    <label className="label_form">Email: </label><br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="input_form"
                        placeholder="example123@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p style={{ color: 'red', marginTop: '5px' }}>{emailError}</p>} {/* Display email error */}
                    <br />
                    <label className="label_form">Password: </label><br />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className="input_form"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="mt-3"/>
                        </button>
                    </div>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    <label className="label_form">Confirm Password: </label><br />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showCPassword ? 'text' : 'password'}
                            name="password"
                            id="confirmPassword"
                            className="input_form"
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <FontAwesomeIcon icon={showCPassword ? faEye : faEyeSlash} className="mt-3"/>
                        </button>
                    </div>
                    <input type="submit" value="Sign Up" className="submit_btn" />
                </form>
                <div className="or_sec"> ----------- OR -----------</div>
                <div className="Google_SignIn" onClick={handleGoogleSignUp}>
                    <div className="Google_SignIn_part1">
                        <img src={google_icon} alt="Google Icon" height="100%" width="100%" />
                    </div>
                    <div className="Google_SignIn_part2">Sign Up with Google</div>
                </div>
                <Link to={`/`}>
                    <div className="user_new_old">Already have an account?<span className="change_form"> Log In </span></div>
                </Link>
            </div>
        </div>
    </>
    );
}

export default SignUpPage;
