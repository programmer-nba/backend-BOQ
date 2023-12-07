const Product = require('../models/product.schema')
const Type =require('../models/type.schema')
const Unit = require('../models/unit.schema')
//สร้างประเภทสินค้า
module.exports.add = async (req, res) => {
    try {
        if(req.body.productname=== undefined || req.body.productname ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อสินค้า"});
        }
        const type = await Type.findById(req.body.type_id)
        if(!type)
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อประเภทสินค้า หรือ หาไม่เจอ"});
        }
        const data = new Product({
            productname:req.body.productname,// (ชื่อสินค้า)
            type_id:req.body.type_id, // (รหัสประเภท)  // join กับ type 
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างสินค้าเรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const productdata = await Product.find().populate('type_id')
        if(!productdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลสินค้า"})
        }
        return res.status(200).send({status:true,data:productdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const productdata = await Product.findOne({_id:req.params.id}).populate('type_id')
        if(!productdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลสินค้า"})
        }
        return res.status(200).send({status:true,data:productdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

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
        const product = await Product.findOne({_id:req.params.id})
        if(!product)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลสินค้า"})
        }
        const data ={
            productname:req.body.name,// (ชื่อสินค้า)
            type_id:req.body.type_id, // (รหัสประเภท)  // join กับ type 
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
