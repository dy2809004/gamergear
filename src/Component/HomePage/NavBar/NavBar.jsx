import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import GamerGear_Logo from '../../../Images/GamerGear_Logo.png'
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Profile_Photo from '../../../Images/Profile_Photo.png'

function NavBar() {
  return (
    <div className="NavBar">
      <Link to={`/HomePage`}>
          <div className="logo">
            <img src={GamerGear_Logo} alt="" height="100%" width="100%" />
          </div>
      </Link>
      <div className="search_sec">
        <input type="text" placeholder='Search Equipments here' />
        <button className="search_btn">
          <IoIosSearch className="search_icon" />
        </button>
      </div>
      <div className="navbar_right">
        <Link to={`/CartPage`}>
          <button className="cart_btn">
            <FaShoppingCart className="cart_icon" />
          </button>
        </Link>
        <div className="profile_sec">
          <button className="profile_photo"> <img src={Profile_Photo} className="profile_icon" alt='P' height="100%" width="100%" /> </button>
          <div className="profile_name">dheerajyadav6155@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
