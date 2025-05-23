const Booking = require('../model/Booking.model')

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { user, chef, bookingDate, status, notes } = req.body;

    if (!user || !chef || !bookingDate || !status || !notes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // create new booking
    const newBooking = new Booking({ user, chef, bookingDate, status, notes });
    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('chef');

    res.status(200).json({ message: "Bookings fetched successfully", data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('chef');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking fetched successfully", data: booking });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete all bookings
const deleteAllBookings = async (req, res) => {
  try {
    const result = await Booking.deleteMany({});
    res.status(200).json({ message: "All bookings deleted", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting all bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
createBooking,
getAllBookings,
getBookingById,
updateBookingById,
deleteAllBookings
}