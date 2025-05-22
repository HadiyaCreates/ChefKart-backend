

const {cloudinary} = require('../config/cloudinary');
const Crousel = require('../model/Crousel.model');

// Create a new crousel item
const createCrousel = async (req, res) => {
  try {
    const { title, content, image, action } = req.body;

    if (!title || !content || !image) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder: "crousel" });

    const newCrousel = new Crousel({
      title,
      content,
      image: result.secure_url,
      action,
    });

    await newCrousel.save();

    res.status(201).json({
      message: "Crousel item successfully created",
      data: newCrousel,
    });
  } catch (error) {
    console.error("Error creating crousel item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all crousel items
const getAllCrousel = async (req, res) => {
  try {
    const crousels = await Crousel.find();
    if (!crousels.length) {
      return res.status(404).json({ message: "No crousel items found" });
    }
    res.status(200).json({ message: "Crousel items fetched successfully", data: crousels });
  } catch (error) {
    console.error("Error fetching crousel items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single crousel item by ID
const getCrouselById = async (req, res) => {
  try {
    const crousel = await Crousel.findById(req.params.id);
    if (!crousel) {
      return res.status(404).json({ message: "Crousel item not found" });
    }
    res.status(200).json({ message: "Crousel item fetched successfully", data: crousel });
  } catch (error) {
    console.error("Error fetching crousel by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update crousel item by ID
// const updateCrouselById = async (req, res) => {
//   try {
//     const { title, content, image, action } = req.body;

//     let updatedFields = {
//       title,
//       content,
//       action,
//       updatedAt: Date.now(),
//     };

//     if (image) {
//       const result = await cloudinary.uploader.upload(image, { folder: "crousel" });
//       updatedFields.image = result.secure_url;
//     }

//     const updatedCrousel = await Crousel.findByIdAndUpdate(req.params.id, updatedFields, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedCrousel) {
//       return res.status(404).json({ message: "Crousel item not found" });
//     }

//     res.status(200).json({ message: "Crousel item updated successfully", data: updatedCrousel });
//   } catch (error) {
//     console.error("Error updating crousel:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// Update crousel item by ID
const updateCrouselById = async (req, res) => {
  try {
    const { title, content, image, action } = req.body;

    let updatedFields = {
      title,
      content,
      action,
      updatedAt: Date.now(),
    };

    // ✅ If image is provided, upload to Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "crousel",
      });
      updatedFields.image = result.secure_url;
    }

    const updatedCrousel = await Crousel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedCrousel) {
      return res.status(404).json({ message: "Crousel item not found" });
    }

    res.status(200).json({
      message: "Crousel item updated successfully",
      data: updatedCrousel,
    });
  } catch (error) {
    console.error("Error updating crousel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// Delete a single crousel item by ID
const deleteCrouselById = async (req, res) => {
  try {
    const deletedCrousel = await Crousel.findByIdAndDelete(req.params.id);
    if (!deletedCrousel) {
      return res.status(404).json({ message: "Crousel item not found" });
    }
    res.status(200).json({ message: "Crousel item deleted successfully", data: deletedCrousel });
  } catch (error) {
    console.error("Error deleting crousel item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete all crousel items
const deleteAllCrousel = async (req, res) => {
  try {
    const result = await Crousel.deleteMany({});
    res.status(200).json({
      message: "All crousel items deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting crousel items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCrousel,
  getAllCrousel,
  getCrouselById,
  updateCrouselById,
  deleteCrouselById,
  deleteAllCrousel,
};
