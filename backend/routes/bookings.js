const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/create', bookingsController.createBooking);
router.get('/user/:email', bookingsController.getUserBookings);
router.get('/:id', bookingsController.getBookingById);

module.exports = router;