const Product = require('../models/product.schema')
const Type =require('../models/type.schema')
const Unit = require('../models/unit.schema')
const Quotation = require('../models/Quotation.schema')
//สร้างใบประมาณราคา
module.exports.add = async (req, res) => {
    try {
        const data = new Quotation({
            projectname:req.body.projectname, //(ชื่อโครงการ)
            projectowner:req.body.projectowner, //(เจ้าของโครงการ)
            constructionsite:req.body.constructionsite,//(สถานที่ก่อสร้าง)
            datequotation:req.body.datequotation, //(วันที่ออก)
            materialcostandwage: req.body.materialcostandwage, // (ค่าวัสดุ + ค่าแรง)
            admincost : req.body.admincost,// (ค่าดำเนินการ)
            total: req.body.total,//(ราคารวมทั้งหมด)
            employee_id: req.body.employee_id, // (รหัสพนักงาน)
            listproduct: req.body.listproduct
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างใบประมาณราคาเรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const quotationdata = await Quotation.find().populate('employee_id').populate({ 
            path: "listproduct.product_id", 
            populate: [
              { path: "unit_id" },
              { path: "type_id" } 
            ]
          });
        if(!quotationdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลใบประมาณราคา"})
        }
        return res.status(200).send({status:true,data:quotationdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const quotationdata = await Quotation.findOne({_id:req.params.id}).populate({ 
            path: "listproduct.product_id", 
            populate: [
              { path: "unit_id" },
              { path: "type_id" } 
            ]
          });
        if(!quotationdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลใบประมาณราคา"})
        }
        return res.status(200).send({status:true,data:quotationdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
//ยังไม่ได้ทำ
//แก้ไขข้อมูล product
module.exports.edit = async (req,res) =>{
    try{    
       
        if(req.body.productname=== undefined || req.body.productname ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อสินค้า"});
        }
        const type = await Type.findById(req.body.type_id)
        if(!type)
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อประเภทสินค้า หรือ หาไม่เจอ"});
        }
        const unit = await Unit.findById(req.body.unit_id)
        if(!unit)
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อหน่วยสินค้า หรือ หาไม่เจอ"});
        }
        const product = await Product.findOne({_id:req.params.id})
        if(!product)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลสินค้า"})
        }
        const data ={
            productname:req.body.name,// (ชื่อสินค้า)
            type_id:req.body.type_id, // (รหัสประเภท)  // join กับ type 
            unit_id: req.body.unit_id //(หน่วย) // join กับ unit 
        }
        const edit = await Product.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูลสินค้า
module.exports.delete = async (req,res) =>{
    try{    
        const productdata = await Product.findOne({_id:req.params.id})
        if(!productdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลสินค้า"})
        }
        const deleteproduct = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteproduct})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
 