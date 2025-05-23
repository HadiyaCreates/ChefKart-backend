const { createBooking , getAllBookings, getBookingById, updateBookingById, deleteAllBookings} = require('../controller/Booking.controller');
const { verifyToken } = require('../middleware/AuthMiddleware');


const router = require('express').Router();

router.post('/createBook' ,  createBooking , verifyToken);
router.get('/get' , getAllBookings);
router.get('/get/:id' ,getBookingById);
router.put('/update/:id', updateBookingById)
router.delete('/delete', deleteAllBookings);

module.exports = router;