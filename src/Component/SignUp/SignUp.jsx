import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../LoginPage/LoginPage.css';
import google_icon from '../../Images/google.svg';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigate('./HomePage')
            // Optionally update profile with username
        } catch (error) {
            console.error("Error signing up:", error);
            alert(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Signed up with Google as:", result.user);
            navigate('/HomePage')
        } catch (error) {
            console.error("Error signing up with Google:", error);
            setError(error.message);
        }
    };

    return (
        <div className="SignUpPage">
            <div className="Login-Main">
                <div className="Login_title">Sign Up</div>
                {error && <div className="error_message">{error}</div>}
                <form action="" className="form_login" onSubmit={handleSignUp}>
                    <label className="label_form">Email: </label><br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="input_form"
                        placeholder="example123@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <label className="label_form">Password: </label><br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="input_form"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <label className="label_form">Confirm Password: </label><br />
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="input_form"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    /><br />
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
    );
}

export default SignUpPage;
