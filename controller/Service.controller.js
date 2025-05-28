const Service = require("../model/Services.Model");

// CREATE a new service
const createService = async (req, res) => {
  try {
    const { servicename, description, image } = req.body;

    // Check required fields
    if (!servicename || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate service
    const existing = await Service.findOne({ servicename });
    if (existing) {
      return res.status(400).json({ message: "Service already exists" });
    }

    const newService = new Service({ servicename, description, image });
    const savedService = await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      service: savedService,
    });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ updatedAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error("Get All Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET a single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Get By ID Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE a service by ID
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated", service: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE all services
const deleteAllServices = async (req, res) => {
  try {
    await Service.deleteMany();
    res.status(200).json({ message: "All services deleted" });
  } catch (error) {
    console.error("Delete All Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a single service by ID
// const deleteServiceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Service.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Service not found" });
//     }
//     res.status(200).json({ message: "Service deleted", data: deleted });
//   } catch (error) {
//     console.error("Delete By ID Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      message: 'Service deleted successfully',
      data: deletedService,
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteAllServices,
  deleteServiceById,
};
