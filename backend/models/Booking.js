const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  experienceId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String
  },
  bookingDetails: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'confirmed'
  },
  promoCode: String,
  discountAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);