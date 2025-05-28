
const axios = require('axios');

exports.createPaymentLink = async (req, res) => {
  try {
    const { bookingId, userId, amount, link_purpose } = req.body;

    if (!bookingId || !userId || !amount) {
      return res.status(400).json({ error: 'bookingId, userId and amount are required' });
    }

    // Generate a short unique link_id (max 50 chars)
    const shortBookingId = bookingId.slice(0, 6);
    const shortUserId = userId.slice(0, 6);
    const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
    const linkId = `${shortBookingId}_${shortUserId}_${timestamp}`; // ~18 chars

    const data = {
      customer_details: {
        customer_phone: '9999999999',  // Valid dummy phone number
        customer_email: '',            // Optional
      },
      link_notify: {
        send_sms: false,
        send_email: false,
      },
      link_id: linkId,
      link_amount: amount,
      link_currency: 'INR',
      link_purpose: link_purpose || 'Payment for booking',
    };

    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/links',
      data,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        },
      }
    );

    // Respond with payment link URL
    return res.status(200).json({ paymentLink: response.data.link_url });

  } catch (error) {
    console.error('Create Payment Link Error:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Webhook handler example (for later use)
exports.handlePaymentWebhook = async (req, res) => {
  const event = req.body;

  if (event.event_type === 'PAYMENT_LINK_PAID') {
    const { link_id, payment_id, payment_status } = event.data;

    // TODO: Update your Booking model to mark payment as done
    // Example:
    // await Booking.findOneAndUpdate(
    //   { paymentLinkId: link_id },
    //   {
    //     paymentStatus: 'PAID',
    //     paymentId: payment_id,
    //     paidAt: new Date(),
    //   }
    // );

    console.log('Payment Verified:', link_id, payment_status);
    return res.status(200).json({ success: true });
  }

  res.status(400).json({ error: 'Unhandled event type' });
};

