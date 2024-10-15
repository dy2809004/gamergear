import React from 'react'
import './Poster.css'
// import Poster_image from '../../../Images/Poster_image.png'

function Poster() {
  return (
    <div className="Poster">
        <div className="Poster_bg"></div>
        <div className="Poster_body">
            <div className="Poster_body_part_1">
                <div className='Poster_header'>Level Up Your Game with Elite Gear</div>
                <div className="Poster_info">Discover top-tier gaming accessories designed to enhance every aspect of your play..</div>
                <button className='btn_explore'>Explore New Gadgets</button>
            </div>
            <div className="Poster_body_part_2"> </div>
        </div>
        
    </div>
  )
}

export default Poster