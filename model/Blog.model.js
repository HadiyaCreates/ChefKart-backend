const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    
    category: {
        type: String,
        enum: ['Partner', 'Must Read', 'Trending', 'Food Recipe'],
        required: true
    },
    image: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
