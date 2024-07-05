import React from 'react'
import './NavBar.css'
import F2F_Logo from '../../../Images/F2F_Logo.png'
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        {" "}
        <img src={F2F_Logo} alt="" height="100%" width="100%" />{" "}
      </div>
      <div className="search_sec">
        <input type="text" placeholder='Search Vegetables here' />
        <button className="search_btn">
          <IoIosSearch className="search_icon" />
        </button>
      </div>
      <div className="navbar_right">
        <button className="cart_btn">
          <FaShoppingCart className="cart_icon" />
        </button>
        <div className="profile_sec">
          <button className="profile_photo"> <FaRegUser className="profile_icon" /> </button>
          <div className="profile_name">aryanmehta2649@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
