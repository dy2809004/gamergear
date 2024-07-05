import React from 'react'
import './Poster.css'
import Poster_image from '../../../Images/Poster_image.png'

function Poster() {
  return (
    <div className="Poster">
        <div className="Poster_bg"></div>
        <div className="Poster_body">
            <div className="Poster_body_part_1">
                <div className='Poster_header'>Farm-Fresh Goodness,<br /> Delivered to Your Doorstep</div>
                <div className="Poster_info">Explore our curated marketplace, connecting you with passionate farmers dedicated to quality.</div>
                <button className='btn_explore'>Explore Products</button>
            </div>
            <div className="Poster_body_part_2"> <img src={Poster_image} alt="" height="100%"  /> </div>
        </div>
        
    </div>
  )
}

export default Poster