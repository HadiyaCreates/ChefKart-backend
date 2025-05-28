
const { cloudinary } = require("../config/cloudinary");
const Blog = require("../model/Blog.model");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    let { title, content, category, image } = req.body;

    // Input validation
    if (!title || !content || !category || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Normalize the title to avoid duplicate variations
    title = title.trim().toLowerCase();

    const existingData = await Blog.findOne({ title });
    if (existingData) {
      return res.status(400).json({ message: "This blog already exists" });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      image,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog is successfully created",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Blog title already exists" });
    }
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all blogs
const getallBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs.length) {
      return res.status(404).json({ message: "No blog posts found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, content, category, image } = req.body;

    let imageUrl = "";

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
    }

    const updatedData = {
      title: title?.trim().toLowerCase(),
      content,
      category,
    };

    if (imageUrl) {
      updatedData.image = imageUrl;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog is successfully updated",
      updatedBlog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Blog title already exists" });
    }
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog is successfully deleted",
      deletedBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBlog,
  getallBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
