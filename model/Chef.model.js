const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Address: { type: String, required: true },
    profilepic: { type: String },
    default_cook_image: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    verified: { type: Boolean, default: false },
    starRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    language: [{ type: String }], // e.g., ["Hin"]
    veg: { type: Boolean, default: false },
    nonVeg: { type: Boolean, default: false },
    aboutCook: { type: String },
    cuisineRatings: [{
        cuisine: { type: String },
        rating: { type: Number }
    }],
    availableLocations: [{ type: String }], 
    availability: [{
        start: { type: String }, 
        end: { type: String }  
    }],
    housesServed: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update the updatedAt field before saving
ChefSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Chef', ChefSchema);