const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const percentSchema = new mongoose.Schema(
  {
    percent:{type:Number,required:true}
  },
  {timestamps: true}
);

const Percent = mongoose.model("percent", percentSchema);

module.exports = Percent;