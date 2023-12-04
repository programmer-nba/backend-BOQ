const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const adminSchema = new mongoose.Schema(
  {
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
  },
  {timestamps: true}
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
