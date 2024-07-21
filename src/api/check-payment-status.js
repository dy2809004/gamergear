import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors()); // Add CORS middleware

app.post('/api/check-payment-status', async (req, res) => {
  const { upiId, amount } = req.body;

  // Simulate payment verification logic
  // Replace this with actual verification logic
  const paymentSuccessful = Math.random() < 0.5; // Random success for testing

  if (paymentSuccessful) {
    res.json({ status: 'SUCCESS' });
  } else {
    res.json({ status: 'FAILURE', message: 'Payment not received yet.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
