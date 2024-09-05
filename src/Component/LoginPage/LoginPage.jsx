import React, { useState } from "react";
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import google_icon from '../../Images/google.svg';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie'; // Import js-cookie

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            Cookies.set('userEmail', user.email, { expires: 7 }); 
            
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
            
           
            Cookies.set('userEmail', user.email, { expires: 7 });
            
            navigate('/HomePage'); 
        } catch (error) {
            console.error("Error logging in with Google:", error);
            alert(error.message);
        }
    };

    return (
        <div className="LoginPage">
            <div className="Login-Main">
                <div className="Login_title">Log In</div>
                <form action="" className="form_login" onSubmit={handleLogin}>
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
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="input_form"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <input type="submit" value="Log In" className="submit_btn" />
                </form>
                <div className="or_sec">----------- OR -----------</div>
                <div className="Google_SignIn" onClick={handleGoogleLogin}>
                    <div className="Google_SignIn_part1">
                        <img src={google_icon} alt="" height="100%" width="100%" />
                    </div>
                    <div className="Google_SignIn_part2">Log in with Google</div>
                </div>
                <Link to={`/SignUpPage`}>
                    <div className="user_new_old">Don’t have an account?<span className="change_form"> Sign Up </span></div>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
