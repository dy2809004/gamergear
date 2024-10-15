import React, { useState } from "react";
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import google_icon from '../../Images/google.svg';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import bg from '../../Images/bg.mp4';  
import Cookies from 'js-cookie';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

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

    const handleLogin = async (event) => {
        event.preventDefault();

        const validationError = validatePassword(password);
        if (validationError) {
            setPasswordError(validationError);
            return;
        } else {
            setPasswordError('');
        }

        if (email === "admin@gmail.com" && password === "Hariom@9") {
            Cookies.set('userEmail', email); // Set cookie for admin
            localStorage.setItem('userEmail', email);
            navigate('/Admin');
            return;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user session in local storage and set cookie
            Cookies.set('userEmail', user.email); // Set cookie
            localStorage.setItem('userEmail', user.email);

            navigate('/HomePage');
        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Save user session in local storage and set cookie
            Cookies.set('userEmail', user.email); // Set cookie
            localStorage.setItem('userEmail', user.email);

            navigate('/HomePage');
        } catch (error) {
            console.error("Error logging in with Google:", error);
            alert(error.message);
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
                    <div className="Login_title">Log In</div>
                    <form className="form_login" onSubmit={handleLogin}>
                        <label className="label_form">Email: </label><br />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="input_form"
                            placeholder="example123@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
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
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        <br />
                        <label className="label_form">Forgot Password? <Link to='/forgot'>Click Here</Link> </label><br />
                        <input type="submit" value="Log In" className="submit_btn" />
                    </form>
                    <div className="or_sec">----------- OR -----------</div>
                    <div className="Google_SignIn" onClick={handleGoogleLogin}>
                        <div className="Google_SignIn_part1">
                            <img src={google_icon} alt="Google Icon" height="100%" width="100%" />
                        </div>
                        <div className="Google_SignIn_part2">Log in with Google</div>
                    </div>
                    <Link to='/SignUpPage'>
                        <div className="user_new_old">Don’t have an account?<span className="change_form"> Sign Up </span></div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default LoginPage;