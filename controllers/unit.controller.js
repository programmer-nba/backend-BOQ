const Unit  = require('../models/unit.schema')
//สร้างประเภทสินค้า Unit 
module.exports.add = async (req, res) => {
    try {
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อหน่วยสินค้า"});
        }
        const data = new Unit({
            name:req.body.name
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างหน่วยสินค้าเรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const unitdata = await Unit.find()
        if(!unitdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลหน่วยนี้"})
        }
        return res.status(200).send({status:true,data:unitdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const unitdata = await Unit.findOne({_id:req.params.id})
        if(!unitdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลหน่วยนี้"})
        }
        return res.status(200).send({status:true,data:unitdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล Unit
module.exports.edit = async (req,res) =>{
    try{    
       
        if(req.body.name=== undefined || req.body.name ==='')
        {
            res.status(400).send({status:false,message:"กรุณากรอกชื่อห"});
        }
        const unit = await Unit.findOne({_id:req.params.id})
        if(!unit)
        {
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลหน่วยนี้"})
        }
        const data ={
            name:req.body.name
        }
        const edit = await Unit.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูลประเภทสินค้า
module.exports.delete = async (req,res) =>{
    try{    
        const unitdata = await Unit.findOne({_id:req.params.id})
        if(!unitdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูลประเภทสินค้า"})
        }
        const deleteUnit = await Unit.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteUnit})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
