const { cloudinary } = require('../config/cloudinary'); // ✅ Destructure correctly
const Testimonial = require('../model/Testimonial');

// Create a testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, content, profileimage } = req.body;

    if (!name || !content) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newTestimonial = new Testimonial({
      name,
      content,
      profileimage,
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial successfully created",
      data: newTestimonial,
    });

  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get all testimonials
const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials.length) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json({
      message: "Testimonials fetched successfully",
      data: testimonials
    });

  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get a single testimonial by ID
const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID" });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial fetched successfully",
      data: testimonial,
    });

  } catch (error) {
    console.error("Error fetching testimonial:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update a testimonial by ID
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, profileimage } = req.body;

    let imageUrl = profileimage;

    // Upload new image if provided
    if (profileimage && profileimage.startsWith('data:image/')) {
      const result = await cloudinary.uploader.upload(profileimage, {
        folder: "testimonials",
      });
      imageUrl = result.secure_url;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, content, profileimage: imageUrl },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully",
      data: updatedTestimonial
    });

  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID" });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial
};
