const Product = require('../models/product.schema')
const Type =require('../models/type.schema')
const Unit = require('../models/unit.schema')
const Quotation = require('../models/Quotation.schema');

function generateRandomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // เลขสุ่ม 0-9
    }
    return result;
  }
//สร้างใบประมาณราคา
module.exports.add = async (req, res) => {
    try {
        
        // const startDate = new Date();
        // // สร้างวันที่ของวันถัดไป
        // const endDate = new Date();
        // endDate.setDate(endDate.getDate() + 1);
        // // ปรับเวลาให้เป็นเริ่มต้นของวัน
        // startDate.setHours(0, 0, 0, 0);
        // endDate.setHours(0, 0, 0, 0);
        // const quotationdata = await Quotation.find({
        //     createdAt: {
        //       $gte: startDate,
        //       $lt: endDate
        //     }
        //   });
        // const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        // const referenceNumber = String(quotationdata.length).padStart(5, '0')
        // const invoiceNo = `${currentDate}${referenceNumber}`
        // console.log(invoiceNo)


       
        // let loop = true
        // let invoiceNo = generateRandomNumber(13)
        // let num = 0
        // while(loop ===true)
        // {
        //     const quantitydata = await Quotation.findOne({invoiceNo:invoiceNo})
        //     if(quantitydata)
        //     {
        //         invoiceNo = generateRandomNumber(13)
        //     }else{
        //         loop = false
        //     }
        //     num = num + 1
        //     if(num == 100)
        //     {
        //         loop = false
        //     }
        // }
        
        const quotationdata = await Quotation.find()
        const invoiceNo = String(quotationdata.length+1).padStart(5, '0')
        const data = new Quotation({
            invoiceNo: invoiceNo,
            projectname:req.body.projectname, //(ชื่อโครงการ)
            projectowner:req.body.projectowner, //(เจ้าของโครงการ)
            constructionsite:req.body.constructionsite,//(สถานที่ก่อสร้าง)
            datequotation:req.body.datequotation, //(วันที่ออก)
            materialcostandwage: parseFloat(req.body.materialcostandwage.toFixed(2)), // (ค่าวัสดุ + ค่าแรง)
            admincost : parseFloat(req.body.admincost.toFixed(2)) ,// (ค่าดำเนินการ)
            total: parseFloat(req.body.total.toFixed(2)),//(ราคารวมทั้งหมด)
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
        const quotationdata = await Quotation.find().populate('employee_id')
        if(!quotationdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบประมาณราคา"})
        }
        
        
        return res.status(200).send({status:true,data:quotationdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ดึงข้อมูล by id
module.exports.getbyid = async (req,res) =>{
    try{    
        const quotationdata = await Quotation.findOne({_id:req.params.id}).populate('employee_id')
        if(!quotationdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบประมาณราคา"})
        }
        return res.status(200).send({status:true,data:quotationdata})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//แก้ไขข้อมูลใบประมาณราคา
module.exports.edit = async (req,res) =>{
    try{    
        if(!req.params.id ||req.params.id ===''||req.params.id === undefined)
        {
            return res.status(200).send({status:false,message:"กรุณาส่ง id มาด้วย"})
        }
        const quotation = await Quotation.findOne({_id:req.params.id})
        if(!quotation)
        {
            return res.status(200).send({status:false,message:"ไม่มี id นี้ในฐานข้อมูล"})
        }
        const data ={
            projectname:req.body.projectname, //(ชื่อโครงการ)
            projectowner:req.body.projectowner, //(เจ้าของโครงการ)
            constructionsite:req.body.constructionsite,//(สถานที่ก่อสร้าง)
            materialcostandwage: parseFloat(req.body.materialcostandwage.toFixed(2)), // (ค่าวัสดุ + ค่าแรง)
            admincost : parseFloat(req.body.admincost.toFixed(2)) ,// (ค่าดำเนินการ)
            total: parseFloat(req.body.total.toFixed(2)),//(ราคารวมทั้งหมด)
            listproduct: req.body.listproduct
        }
        const edit = await Quotation.findByIdAndUpdate(req.params.id,data,{new:true})
        return res.status(200).send({status:true,data:edit,message:"แก้ไขข้อมูลสำเร็จ"})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}

//ลบข้อมูลสินค้า
module.exports.delete = async (req,res) =>{
    try{    
        const quotationdata = await Quotation.findOne({_id:req.params.id})
        if(!quotationdata){
            return res.status(200).send({status:false,message:"ไม่มีข้อมูลใบประมาณราคา"})
        }
        const deletequotation = await Quotation.findByIdAndDelete(req.params.id)
        return res.status(200).send({status:true,message:"ลบข้อมูลสำเร็จ",data:deletequotation})
    }catch (error) {
        return res.status(500).send({status:false,error:error.message});
    }
}
 