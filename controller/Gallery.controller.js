
const { cloudinary } = require('../config/cloudinary');

// Create a new gallery item
const createGallery = async (req, res) => {
  try {
    const { name, content, Galleryimage } = req.body;

    if (!name || !content || !Galleryimage) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    // Optionally, you can upload the image to cloudinary here if Galleryimage is a base64 or url
    // Example:
    // const uploadResult = await cloudinary.uploader.upload(Galleryimage, { folder: "Gallery" });
    // const imageUrl = uploadResult.secure_url;

    // But here you use the received Galleryimage directly:
    const newGallery = new Gallery({
      name,
      content,
      Galleryimage, // ideally a URL string
    });

    await newGallery.save();

    res.status(201).json({
      message: "Gallery item successfully created",
      data: newGallery,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all gallery items
const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();

    if (!galleries.length) {
      return res.status(404).json({ message: "No gallery items found" });
    }

    res.status(200).json({
      message: "Gallery items fetched successfully",
      data: galleries,
    });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete all gallery items
const deleteAllGallery = async (req, res) => {
  try {
    const result = await Gallery.deleteMany({}); // Deletes all documents

    res.status(200).json({
      message: "All gallery items deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createGallery,
  getAllGallery,
  deleteAllGallery,
};
