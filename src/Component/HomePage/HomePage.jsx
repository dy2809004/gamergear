import {React, useEffect} from "react"
import NavBar from "./NavBar/NavBar"
import Poster from "./Poster/Poster"
import Products from "./HomePageProducts/Products"
import Footer from "../Footer/Footer"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const userEmail = Cookies.get("userEmail");
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!userEmail) {
            navigate('/'); // Redirect to login page if userEmail is not present
        }
    }, [userEmail, navigate]);

    return(
        <>
            <NavBar />
            <Poster />
            <Products />
            <Footer/>
        </> 
    )
}

export default HomePage