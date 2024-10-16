import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../CartContext';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { db } from '../../firebase'; // Your Firebase config
import { addDoc, collection } from 'firebase/firestore';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const { finalPrice, setFinalPrice } = useContext(CartContext);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showRetryModal, setShowRetryModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const userEmail = Cookies.get("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userEmail) {
            navigate('/'); // Redirect to login page if userEmail is not present
        }
    }, [userEmail, navigate]);

    // Initialize finalPrice from cookie
    useEffect(() => {
        const storedPrice = Cookies.get('finalPrice');
        if (storedPrice) {
            setFinalPrice(parseFloat(storedPrice));
        }
    }, [setFinalPrice]);

    // Function to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle payment logic
    const handlePayment = async () => {
        if (paymentMethod === 'razorpay') {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                alert('Failed to load Razorpay SDK. Please try again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: finalPrice,
                        currency: 'INR',
                    }),
                });

                const orderData = await response.json();

                const options = {
                    key: 'rzp_test_hkH2soEeee2cn1',
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: 'Gamergear',
                    description: 'Test Transaction',
                    order_id: orderData.id,
                    handler: async function (response) {
                        if (response.razorpay_payment_id) {
                            const paymentData = {
                                email: userEmail,
                                amount: finalPrice, // Record the actual final price
                                method: 'Razorpay',
                                date: new Date().toISOString(),
                                status: 'Completed',
                            };

                            try {
                                await addDoc(collection(db, 'payments'), paymentData);
                                console.log('Payment recorded successfully.');

                                // Reset final price to 0 after successful payment
                                setFinalPrice(0);
                                Cookies.set('finalPrice', 0); // Update cookie as well
                            } catch (error) {
                                console.error('Error adding payment document: ', error);
                            }

                            setShowSuccessModal(true);
                            setTimeout(() => {
                                navigate('/HomePage'); // Redirect to Home Page after payment success
                            }, 2000); // Delay for 2 seconds to show the success modal
                        }
                    },
                    prefill: {
                        name: 'Your Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error('Error in Razorpay payment:', error);
                setShowRetryModal(true);
            }
        } else {
            // Handle Pay on Delivery
            const paymentData = {
                email: userEmail,
                amount: finalPrice, // Record the correct amount for COD
                method: 'Cash on Delivery',
                date: new Date().toISOString(),
                status: 'Completed',
            };

            try {
                await addDoc(collection(db, 'payments'), paymentData);
                console.log('Payment recorded successfully for COD.');

                // Reset final price to 0
                setFinalPrice(0);
                Cookies.set('finalPrice', 0); // Update cookie as well
            } catch (error) {
                console.error('Error adding payment document: ', error);
            }

            setShowSuccessModal(true);
            setTimeout(() => {
                navigate('/'); // Redirect to Home Page after payment success
            }, 2000); // Delay for 2 seconds to show the success modal
        }
    };

    // Update cookie whenever finalPrice changes
    useEffect(() => {
        if (finalPrice) {
            Cookies.set('finalPrice', finalPrice);
        }
    }, [finalPrice]);

    return (
        <div className="payment-container">
            <div className="card card_payment">
                <h2 className="payment-title">Pay Here</h2>
                <h4 className="final-price">Payment Amount: {finalPrice.toFixed(2)} &#8377;</h4>

                <div className="payment-methods">
                    <label>
                        <input
                            type="radio"
                            value="razorpay"
                            checked={paymentMethod === 'razorpay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Pay with Razorpay
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Cash on Delivery
                    </label>
                </div>

                <Button className="btn btn-primary1" onClick={handlePayment}>
                    Proceed to Pay
                </Button>
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
                    <Modal.Title>Payment Failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Payment could not be completed. Please retry.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRetryModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setShowRetryModal(false);
                        handlePayment(); // Retry payment
                    }}>
                        Retry
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
