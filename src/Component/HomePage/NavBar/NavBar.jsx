import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import GamerGear_Logo from '../../../Images/GamerGear_Logo.png';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Profile_Photo from '../../../Images/Profile_Photo.png';
import logo from '../../../Images/logo.png';
import Cookies from 'js-cookie';

function NavBar() {
  const email = Cookies.get("userEmail");

  return (
    <div className="NavBar">
      <Link to="/HomePage">
          <div className="logo">
            <img src={logo} alt="" height="100%" width="100%" />
          </div>
      </Link>
      <div className="InputContainer">
        <input
          placeholder="Search"
          id="input"
          className="input"
          name="text"
          type="text"
        />
        <label className="labelforsearch" htmlFor="input">
          <svg className="searchIcon" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </label>
      </div>
      <div className="navbar_right">
        <Link to="/CartPage">
          <button className="cart_btn">
            <FaShoppingCart className="cart_icon" />
          </button>
        </Link>
        <div className="profile_sec">
          <Link to="/UserProfile"> {/* Link to UserProfile */}
            <button className="profile_photo">
              <img src={Profile_Photo} className="profile_icon" alt='P' height="100%" width="100%" />
            </button>
          </Link>
          <div className="profile_name">{email}</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;