const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Address: { type: String, required: true },
  profilepic: { type: String },
  city: { type: String, require: true },
  state: { type: String, require: true },
  area: { type: String, require: true },
  country: { type: String, require: true },
  pincode: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  experience: { type: String, require: true },
  updateAt: { type: Date, default: Date.now },
});

ChefSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Chef", ChefSchema);
