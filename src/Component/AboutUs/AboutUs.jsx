import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        Welcome to GamerGearHub! We are passionate about gaming and dedicated to providing gamers with the best gear and equipment available.
      </p>
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          At GamerGearHub, our mission is to enhance your gaming experience by offering top-quality gaming equipment at competitive prices. We strive to be your go-to destination for all things gaming.
        </p>
      </div>
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded by a group of gaming enthusiasts, GamerGearHub started with a simple idea: to create a platform where gamers can find everything they need in one place. Over the years, we have grown into a trusted name in the gaming community, thanks to our commitment to quality and customer service.
        </p>
      </div>
      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul className="about-list">
          <li>Wide selection of gaming equipment and accessories.</li>
          <li>Competitive pricing and exclusive deals.</li>
          <li>Exceptional customer service and support.</li>
          <li>Fast and reliable shipping options.</li>
        </ul>
      </div>
      <div className="about-section">
        <h2>Join Our Community</h2>
        <p>
          We invite you to join our community of gamers! Follow us on social media and stay updated on the latest products, promotions, and gaming news.
        </p>
      </div>
    </div>
  );
};

export default About;
