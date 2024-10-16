const cors = require('cors');
const express = require('express');
const Razorpay = require('razorpay');

const app = express();

// Enable CORS for all routes
app.use(cors());

const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_hkH2soEeee2cn1',
  key_secret: 'VaOJ7VYPNGO0wwyl2exlRfut',
});

app.use(express.json());

app.post('/api/create-order', async (req, res) => {
    const { amount, currency } = req.body;
  
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };
  
    console.log('Creating order with options:', options); // Log the options
  
    try {
      const order = await razorpayInstance.orders.create(options);
      console.log('Order created successfully:', order); // Log the order
      res.json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error); // Log the error
      res.status(500).json({ error: 'Error creating Razorpay order' });
    }
  });
  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
