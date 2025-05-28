// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   chef: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Chef',
//     required: true,
//   },
//   bookingDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['booked', 'non-booked'],
//     default: 'non-booked',
//   },
//   notes: {
//     type: String,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Optional: auto-update `updatedAt` on save
// BookingSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('Booking', BookingSchema);
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'non-booked'],
    default: 'non-booked',
  },
  notes: {
    type: String,
  },
  paymentLinkId: {
    type: String, // Unique ID used when creating the Cashfree link
  },
  paymentStatus: {
    type: String, // Example values: 'PAID', 'PENDING', 'FAILED'
  },
  paymentId: {
    type: String, // Cashfree Payment ID after successful payment
  },
  paidAt: {
    type: Date, // Time when payment was confirmed
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: auto-update `updatedAt` on save
BookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
