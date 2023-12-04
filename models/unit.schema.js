const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const unitSchema = new mongoose.Schema(
  {
    name:{type: String, required: true}, //(ชื่อประเภท) 
  },
  {timestamps: true}
);

const Unit = mongoose.model("unit", unitSchema);

module.exports = Unit;