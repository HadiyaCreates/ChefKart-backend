const mongoose = require('mongoose');

const CrouselSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['For Singles', 'For Families' , 'For Students' , 'For Couples'],
        required: true
    },
    image: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

CrouselSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Crousel', CrouselSchema);
