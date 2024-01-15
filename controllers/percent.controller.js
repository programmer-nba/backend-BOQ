const Percent = require("../models/percent.schema")


module.exports.add = async (req, res) => {
    try {    
        const data = new Percent({
            percent:req.body.percent
        })
        const add = await data.save()
        res.status(200).send({status:true,message:"เพิ่มข้อมูลสำเร็จเรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};

//ดึงข้อมูลทั้งหมด
module.exports.getall = async (req,res) =>{
    try{    
        const percentdata = await Percent.find()
        if(!percentdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:percentdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const percentdata = await Percent.findOne({_id:req.params.id})
        if(!percentdata){
            return res.status(404).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        return res.status(200).send({status:true,data:percentdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูล admin
module.exports.edit = async (req,res) =>{
    try{    
        const data ={
            percent:req.body.percent
        }
        const edit = await Percent.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูล admin
module.exports.delete = async (req,res) =>{
    try{    
        const percentdata = await Percent.findOne({_id:req.params.id})
        if(!percentdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูล admin"})
        }
        const deleteadmin = await Percent.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deleteadmin})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

module.exports.exportjson = async (req,res) =>{
    try {
        const files = req.body.file;

        // เปลี่ยนแปลงข้อมูลจาก JSON เป็น instances ของ model
        const adminInstances = files.map(file => new Percent(file));

        // บันทึก instances ลงใน MongoDB
        const add = await Percent.insertMany(adminInstances);

        return res.status(200).send({ status: true, message: "บันทึกข้อมูลสำเร็จ", data: add });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }

}