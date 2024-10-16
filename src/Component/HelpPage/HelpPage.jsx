import React from 'react';
import './HelpPage.css'; // Import the CSS file for styling

const Help = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help Center</h1>
      <p className="help-intro">We're here to assist you! If you need help, explore our FAQs, customer support options, and more.</p>

      <div className="help-section">
        <h2 className="section-title">1. Frequently Asked Questions (FAQs)</h2>
        <ul className="faq-list">
          <li>
            <strong>Q: What types of gaming equipment do you sell?</strong>
            <p>A: We offer a wide range of gaming equipment, including consoles, peripherals (keyboards, mice, headsets), chairs, and accessories.</p>
          </li>
          <li>
            <strong>Q: How can I place an order?</strong>
            <p>A: Browse our categories, select the products you wish to purchase, and click "Add to Cart". Proceed to checkout to complete your order.</p>
          </li>
          <li>
            <strong>Q: What payment methods do you accept?</strong>
            <p>A: We accept credit/debit cards, Razorpay, and other secure online payment options.</p>
          </li>
          <li>
            <strong>Q: How do I track my order?</strong>
            <p>A: After shipping, you will receive an email with tracking information. Log in to your account to view your order history for details.</p>
          </li>
          <li>
            <strong>Q: What is your return policy?</strong>
            <p>A: We offer a 30-day return policy on most items. If unsatisfied, contact our support team to initiate a return.</p>
          </li>
        </ul>
      </div>

      <div className="help-section">
        <h2 className="section-title">2. Customer Support</h2>
        <p>If you need assistance or have inquiries, please reach out to our customer support:</p>
        <ul className="support-list">
          <li>Email: <a href="mailto:support@gamergearhub.com">support@gamergearhub.com</a></li>
          <li>Phone: 9316381105</li>
        </ul>
      </div>

      <div className="help-section">
        <h2 className="section-title">3. Shipping Information</h2>
        <p>We offer various shipping methods:</p>
        <ul className="shipping-list">
          <li>Standard shipping (3-5 business days).</li>
          <li>Express shipping for quicker delivery.</li>
          <li>International shipping available, with times and fees varying by location.</li>
        </ul>
      </div>

      <div className="help-section">
        <h2 className="section-title">4. Account Management</h2>
        <p>To create an account, click on the “Sign Up” button at the top right corner of our website. You’ll receive a confirmation email.</p>
        <p>If you forget your password, click on “Forgot Password?” on the login page, enter your email address, and follow the instructions.</p>
      </div>

      <div className="help-section">
        <h2 className="section-title">5. Tips for Choosing Gaming Equipment</h2>
        <ul className="tips-list">
          <li>Consider Your Gaming Style: Different games may require specific equipment.</li>
          <li>Read Reviews: Check product reviews before making a purchase.</li>
          <li>Budget Wisely: Choose quality gear without overspending.</li>
        </ul>
      </div>

      <div className="help-section">
        <h2 className="section-title">6. Feedback and Suggestions</h2>
        <p>We value your feedback! If you have suggestions or ideas for our website or products, please share them at <a href="mailto:feedback@gamergearhub.com">feedback@gamergearhub.com</a>.</p>
      </div>

      <h2 className="section-title">Closing Statement</h2>
      <p>At GamerGearHub, our goal is to ensure you have the best gaming experience. If you have any questions not covered here, feel free to reach out. Happy gaming!</p>
    </div>
  );
};

export default Help;
