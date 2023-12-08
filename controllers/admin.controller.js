const Admin = require('../models/admin.schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
//เรียกใช้ function เช็คชื่อซ้ำ
const checkalluser = require("../functions/check-alluser")
//สร้างไอดี admin
module.exports.add = async (req, res) => {
    try {
        if(req.body.username=== undefined || req.body.username ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.password=== undefined || req.body.password === '')
        {
            res.status(200).send({status:false,message:"กรุณากรอก password"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอก name"});
        }

         //เช็คชื่อซ้ำ
        const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
            return status
        })
        if(Check === true){
            return res.status(200).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
        }
        
        const data = new Admin({
            username:req.body.username,
            password:bcrypt.hashSync(req.body.password, 10),
            name:req.body.name
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างไอดี admin เรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const admindata = await Admin.find()
        if(!admindata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:admindata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const admindata = await Admin.findOne({_id:req.params.id})
        if(!admindata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:admindata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล admin
module.exports.edit = async (req,res) =>{
    try{    
        if(req.body.username=== undefined || req.body.username ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(200).send({status:false,message:"กรุณากรอก name"});
        }
        if(req.params.id === undefined || req.params.id ==='')
        {
            res.status(200).send({status:false,message:"กรุณาส่ง id มาใน paramsด้วย"});
        }
        const admin = await Admin.findOne({_id:req.params.id})
        if(!admin)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        const data ={
            username: req.body.username,
            password: ( req.body.password!= undefined && req.body.password!= ""? bcrypt.hashSync(req.body.password, 10):admin.password),
            name:req.body.name
        }
        const edit = await Admin.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูล admin
module.exports.delete = async (req,res) =>{
    try{    
        const admindata = await Admin.findOne({_id:req.params.id})
        if(!admindata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        const deleteadmin = await Admin.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteadmin})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}