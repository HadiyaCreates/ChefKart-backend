const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content:{ type: String, required: true },
    profileimage: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

TestimonialSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
