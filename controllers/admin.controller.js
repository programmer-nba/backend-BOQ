const Admin = require('../models/admin.schema')

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
        const data = new Admin({
            username:req.body.username,
            password:req.body.password,
            name:req.body.name
        })
        const add = data.save()
        res.status(200).send({status:true,message:"คุณได้สร้างไอดี admin เรียบร้อย",data:add});
      } catch (error) {
        return res.status(500).send({status:false,error:error.message});
      }    
};
  