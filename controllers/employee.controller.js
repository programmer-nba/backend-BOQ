const Employee = require('../models/employee.schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {uploadFileCreate,deleteFile} = require('../functions/uploadfilecreate');
//เรียกใช้ function เช็คชื่อซ้ำ
const checkalluser = require("../functions/check-alluser")
//สร้างไอดี Employee
module.exports.add = async (req, res) => {
    try {
        if(req.body.username=== undefined || req.body.username ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.password=== undefined || req.body.password === '')
        {
            res.status(400).send({status:false,message:"กรุณากรอก password"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอก name"});
        }
        const Check = await checkalluser.Checkusername(req.body.username).then((status)=>{
            return status
        })
        if(Check === true){
            return res.status(400).send({status:false,message:`username ${req.body.username} ซ้ำ กรุณาเปลี่ยนใหม่`})
        }
        const data = new Employee({
            username:req.body.username,
            password:bcrypt.hashSync(req.body.password, 10),
            name:req.body.name
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างไอดี Employee เรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const employeedata = await Employee.find()
        if(!employeedata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล Employee"})
        }
        return res.status(200).send({status:true,data:employeedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const employeedata = await Employee.findOne({_id:req.params.id})
        if(!employeedata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล Employee"})
        }
        return res.status(200).send({status:true,data:employeedata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล Employee
module.exports.edit = async (req,res) =>{
    try{    
        if(req.body.username=== undefined || req.body.username ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอก username"});
        }
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอก name"});
        }
        if(req.params.id === undefined || req.params.id ==='')
        {
            res.status(400).send({status:false,message:"กรุณาส่ง id มาใน paramsด้วย"});
        }
        const employee = await Employee.findOne({_id:req.params.id})
        if(!employee)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล Employee"})
        }
        const changesignature = (req.body.changesignature!= undefined && req.body.changesignature!=""? req.body.changesignature:false)
        if(changesignature === true)
        { 
            if(employee.signature!='')
            {
                await deleteFile(employee.signature);  
                const deletesignature =await Employee.findByIdAndUpdate(req.params.id,{signature:""})
            }
        }

        const data ={
            username: req.body.username,
            password: ( req.body.password!= undefined && req.body.password!= ""? bcrypt.hashSync(req.body.password, 10):employee.password),
            name:req.body.name
        }
        const edit = await Employee.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูล employee
module.exports.delete = async (req,res) =>{
    try{    
        const employeedata = await Employee.findOne({_id:req.params.id})
        if(!employeedata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล Employee"})
        }
        if(employeedata.signature!='')
        {
            await deleteFile(employeedata.signature);
        }
        const deleteemployee = await Employee.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteemployee})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}