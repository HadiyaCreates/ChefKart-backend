const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    content:{ type: String, required: true },
    Galleryimage:[ { type: String }],
    updatedAt: { type: Date, default: Date.now }
});

GallerySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Gallery', GallerySchema);
