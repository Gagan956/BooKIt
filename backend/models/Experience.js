const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '2-3 hours'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Difficult'],
    default: 'Moderate'
  },
  availableDates: [{
    date: Date,
    availableSlots: [String]
  }],
  rating: {
    type: Number,
    min: 0,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  includes: [String],
  requirements: [String],
  refId: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);