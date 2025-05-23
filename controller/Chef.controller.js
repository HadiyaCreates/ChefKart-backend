const { cloudinary } = require('../config/cloudinary');
const Chef = require('../model/Chef.model')

// Create a new chef
const createChef = async (req, res) => {
  try {
    const {
      name, Address, profilepic, city, state, area,
      country, pincode, email, phone, experience
    } = req.body;

    if (
      !name || !Address || !city || !state || !area ||
      !country || !pincode || !email || !phone || !experience
    ) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const existingChef = await Chef.findOne({email:email});
    if(existingChef){
        return res.status(400).json({message:"Chef already exists"})
    }
    const newChef = new Chef({
      name,
      Address,
      profilepic,
      city,
      state,
      area,
      country,
      pincode,
      email,
      phone,
      experience
    });

    await newChef.save();

    res.status(201).json({
      message: "Chef created successfully",
      data: newChef,
    });
  } catch (error) {
    console.error("Error creating chef:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all chefs
const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();

    if (!chefs.length) {
      return res.status(404).json({ message: "No chefs found" });
    }

    res.status(200).json({
      message: "Chefs fetched successfully",
      data: chefs,
    });
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get chef by ID
const getChefById = async (req, res) => {
  try {
    const { id } = req.params;

    const chef = await Chef.findById(id);

    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.status(200).json({
      message: "Chef fetched successfully",
      data: chef,
    });
  } catch (error) {
    console.error("Error fetching chef by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateChefById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedChef = await Chef.findByIdAndUpdate(id, updateData, {
      new: true, // returns the updated document
      runValidators: true,
    });

    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.status(200).json({
      message: "Chef updated successfully",
      data: updatedChef,
    });
  } catch (error) {
    console.error("Error updating chef:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteChefById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedChef = await Chef.findByIdAndDelete(id);

    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.status(200).json({
      message: "Chef deleted successfully",
      data: deletedChef,
    });
  } catch (error) {
    console.error("Error deleting chef:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteAllChefs = async (req, res) => {
  try {
    const result = await Chef.deleteMany({});

    res.status(200).json({
      message: "All chefs deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all chefs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
createChef,
getAllChefs,
getChefById,
updateChefById,
deleteChefById,
deleteAllChefs
}