// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controller/Payment.controller');

// router.post('/create-payment-link', paymentController.createPaymentLink);

// // Webhook endpoint to receive payment status updates from Cashfree
// router.post('/payment/webhook', paymentController.handlePaymentWebhook);
// module.exports = router;
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/Payment.controller');

router.post('/create-payment-link', paymentController.createPaymentLink);

module.exports = router;
