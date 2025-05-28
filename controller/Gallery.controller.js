const Gallery = require('../model/Gallery.Model');

// Get all gallery items
const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new gallery item
const addGalleryItem = async (req, res) => {
  try {
    const { name, content, Galleryimage } = req.body;

    if (!name || !content) {
      return res.status(400).json({ message: 'Name and content are required' });
    }

    const newGallery = new Gallery({
      name,
      content,
      Galleryimage: Galleryimage || []
    });

    await newGallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    console.error('Error adding gallery:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete all gallery items
const deleteAllGalleryItems = async (req, res) => {
  try {
    await Gallery.deleteMany({});
    res.json({ message: 'All gallery items deleted' });
  } catch (error) {
    console.error('Error deleting galleries:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a gallery item by ID
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    updateData.updatedAt = Date.now();

    const updatedGallery = await Gallery.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedGallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(updatedGallery);
  } catch (error) {
    console.error('Error updating gallery:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllGallery,
  addGalleryItem,
  deleteAllGalleryItems,
  updateGallery,
};
