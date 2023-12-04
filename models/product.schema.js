const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const productSchema = new mongoose.Schema(
  {
    productname:{type: String, required: true}, //(ชื่อสินค้า)
    type_id :{type: mongoose.Schema.Types.ObjectId,ref:'type',required:true} , //(รหัสประเภท)  // join กับ type 
    unit_id : {type: mongoose.Schema.Types.ObjectId,ref:'unit',required:true} //(หน่วย) // join กับ unit 
  },
  {timestamps: true}
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
