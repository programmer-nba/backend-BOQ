const Type  = require('../models/type.schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
//สร้างประเภทสินค้า Type 
module.exports.add = async (req, res) => {
    try {
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอกชื่อประเภทสินค้า"});
        }
        const data = new Type({
            name:req.body.name
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างประเภทสินค้าเรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const typedata = await Type.find()
        if(!typedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลประเภทนี้"})
        }
        return res.status(200).send({status:true,data:typedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const typedata = await Type.findOne({_id:req.params.id})
        if(!typedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลประเภทนี้"})
        }
        return res.status(200).send({status:true,data:typedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล type
module.exports.edit = async (req,res) =>{
    try{    
       
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอกชื่อประเภท"});
        }
        const type = await Type.findOne({_id:req.params.id})
        if(!type)
        {
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลชื่อประเภท"})
        }
        const data ={
            name:req.body.name
        }
        const edit = await Type.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูลประเภทสินค้า
module.exports.delete = async (req,res) =>{
    try{    
        const typedata = await Type.findOne({_id:req.params.id})
        if(!typedata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลประเภทสินค้า"})
        }
        const deletetype = await Type.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deletetype})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

module.exports.exportjson = async (req,res) =>{
    try {
        const files = req.body.file;

        // เปลี่ยนแปลงข้อมูลจาก JSON เป็น instances ของ model
        const adminInstances = files.map(file => new Type({
            _id:file._id.$oid,
            name:file.name,
            createdAt:file.createdAt.$oid,
            updatedAt:file.updatedAt.$oid,
        }));

        // บันทึก instances ลงใน MongoDB
        const add = await Type.insertMany(adminInstances);

        return res.status(200).send({ status: true, message: "บันทึกข้อมูลสำเร็จ", data: add });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }

}