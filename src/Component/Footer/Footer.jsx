import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import the brand icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <ul>
              <li>
                <Link to="/SignUpPage">SignUp</Link> {/* Redirect to SignUp page */}
              </li>
              <li>
                <Link to="/">Login</Link> {/* Redirect to Login page */}
              </li>
              <li>
                <Link to="/HelpPage">Help</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <ul>
              <li><Link to="/AboutUs">About-Us</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow us</h3>
            <ul className="social-icons">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            <Link to="#">Terms of Service</Link> | 
            <Link to="#">Privacy Policy</Link> | 
            <Link to="#">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
