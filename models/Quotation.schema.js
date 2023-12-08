const mongoose = require("mongoose");

// Define the schema for the HotelUser entity
const QuotationSchema = new mongoose.Schema(
  {
    projectname:{type:String,required: true}, //(ชื่อโครงการ)
    projectowner:{type:String,required: true},// (เจ้าของโครงการ)
    constructionsite:{type:String,required: true},//(สถานที่ก่อสร้าง)
    datequotation:{type:Date,required: true}, //(วันที่ออก)
    listproduct: {
        type:[
            {
              type_id:{type:mongoose.Schema.Types.ObjectId,ref:'type'},
              type_name:{type:String},
              product:[{
                product_id:{type: mongoose.Schema.Types.ObjectId,ref:'product'},
                productname:{type:String},
                quantity:{type:Number},// จำนวน
                unit_id:{type:mongoose.Schema.Types.ObjectId,ref:'unit'}, //หน่วย
                unit_name:{type:String},
                materialprice:{type:Number}, // ราคาต่อชิ้น (สินค้า)
                materialamount:{type:Number}, // ราคารวม (สินค้า)
                wageprice : {type:Number},// ราคาค่าแรงต่อจำนวน
                wageamount :{type:Number}, // ราคาค่าแรงรวม 
                totalcost: {type:Number},// รวมค่าวัสดุและค่าแรงงาน
                note :{type:Number}// หมายเหตุ
              }]
            }
        ]}, //(รายการสินค้า) (ข้อมูล array)
    materialcostandwage : {type:Number},// (ค่าวัสดุ + ค่าแรง)
    admincost :{type:Number}, // (ค่าดำเนินการ)
    total:{type:Number},//(ราคารวมทั้งหมด)
    employee_id :{type: mongoose.Schema.Types.ObjectId,ref:'employee',required:true} // (รหัสพนักงาน)
  },
  {timestamps: true}
);

const Quotation = mongoose.model("quotation", QuotationSchema);

module.exports = Quotation;