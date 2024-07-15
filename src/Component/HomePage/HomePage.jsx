import React from "react"
import NavBar from "./NavBar/NavBar"
import Poster from "./Poster/Poster"
import FreshVegetables from "./FreshVegetables/FreshVegetables"

function HomePage() {
    return(
        <>
            <NavBar />
            <Poster />
            <FreshVegetables />
        </> 
    )
}

export default HomePage