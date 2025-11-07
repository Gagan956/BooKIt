const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');


// create booking
exports.createBooking = async (req, res) => {
  try {
    const { 
      experienceId, 
      user, 
      date, 
      time, 
      quantity, 
      promoCode,
      totalAmount 
    } = req.body;
    
    const bookingData = {
      bookingId: uuidv4(),
      experienceId: experienceId,
      userId: user.email,
      userDetails: {
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      },
      bookingDetails: {
        date,
        time,
        quantity,
        totalAmount: totalAmount || (experience.price * quantity) + 59
      },
      promoCode: promoCode || null,
      discountAmount: 0
    };

    const booking = new Booking(bookingData);
    await booking.save();
    
    res.status(201).json({
      bookingId: booking.bookingId,
      refId: booking.bookingId,
      ...booking.toObject()
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get user booking
exports.getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ 'userDetails.email': email })
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};