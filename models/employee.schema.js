const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const employeeSchema = new mongoose.Schema(
  {
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    signature:{type:[String]}  // ลายเซ็นต์
  },
  {timestamps: true}
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
