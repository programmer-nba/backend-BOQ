const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const typeSchema = new mongoose.Schema(
  {
    name:{type: String, required: true}, //(ชื่อประเภท) 
  },
  {timestamps: true}
);

const Type = mongoose.model("type", typeSchema);

module.exports = Type;