import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../CartContext';
import QRCode from 'qrcode.react';
import { Modal, Button } from 'react-bootstrap';
import './Payment.css';

export default function Payment() {
  const { finalPrice } = useContext(CartContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);

  useEffect(() => {
    const paymentInterval = setInterval(() => {
      checkPaymentStatus();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(paymentInterval);
  }, []);

  useEffect(() => {
    const retryInterval = setInterval(() => {
      setShowRetryModal(true);
    }, 5 * 60 * 1000); // Show retry modal every 5 minutes

    return () => clearInterval(retryInterval);
  }, []);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/check-payment-status', { // Ensure this URL matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          upiId: 'dheerya2809-1@okhdfcbank',
          amount: finalPrice.toFixed(2),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setShowRetryModal(false);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  return (
    <div className="payment-container">
        <div className="card card_payment">
            <h2 className="payment-title">Pay Here</h2>
                <h4 className="final-price">Payment Amount: {finalPrice.toFixed(2)} &#8377;</h4>
                <div className="payment-option">
                    <h4 className='text-secondary'>Scan QR Code</h4>
                    <QRCode value={`upi://pay?pa=dheerya2809-1@okhdfcbank&pn=Dheeraj Yadav&am=${finalPrice.toFixed(2)}&cu=INR`} className='qr_code'/>
                </div>
        </div>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Payment done successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRetryModal} onHide={() => setShowRetryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Timeout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Payment was not done within the time limit. Please retry.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRetryModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setShowRetryModal(false);
            checkPaymentStatus(); // Trigger payment check immediately
          }}>
            Retry
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
