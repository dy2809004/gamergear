import React from "react"
import NavBar from "./NavBar/NavBar"
import Poster from "./Poster/Poster"
import Products from "./HomePageProducts/Products"
import Footer from "../Footer/Footer"

function HomePage() {
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