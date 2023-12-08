const Employee = require('../models/employee.schema');
const multer = require("multer");
const {uploadFileCreate,deleteFile} = require('../functions/uploadfilecreate');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
     //console.log(file.originalname);
  },
});

module.exports.Create = async (req, res) => {
    console.log(req.body);
    const id = req.params.id
    try {

    const employee = await Employee.findById(id);
    if(!employee){
      return res.status(200).send(`employee id ${id} not found`);
    }
    let upload = multer({ storage: storage }).array("signaturepic", 20);
    upload(req, res, async function (err) {
      const reqFiles = [];
      const result=[];

      if(err){
        return res.status(500).send(err);
      }

      if (!req.files) {
        res.status(200).send({ message: "มีบางอย่างผิดพลาด", status: false });
      } else {
        const url = req.protocol + "://" + req.get("host");
        for (var i = 0; i < req.files.length; i++) {
        const src =  await uploadFileCreate(req.files, res, { i, reqFiles });
            result.push(src);
        
          //   reqFiles.push(url + "/public/" + req.files[i].filename);

        }

        let edit = ""
        if(result){
          
          edit = await Employee.findByIdAndUpdate(id,{signature:reqFiles[0]},{returnOriginal:false})
        }

        res.status(201).send({
          message: "สร้างรูปภาพเสร็จเเล้ว",
          status: true,
          data: edit ,
          file: reqFiles,
          result:result
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: false });
  }
};

//delete
module.exports.Delete = async (req,res) =>{

  const id = req.params.id;
  const pictureid = req.params.pictureid;

  try {

    const employee = await Employee.findById(id);

    if(!employee){
      return res.status(200).send(`employee ${id} not found`);
    }

    await deleteFile(pictureid);
    const deleteimages= await Employee.findByIdAndUpdate(id,{signature:""},{returnOriginal:false})
    return res.status(200).send({message:true,data:deleteimages,message:"ลบภาพสำเร็จ"});
  } catch (error) {
    return res.status(500).send({ message: error.message, status: false });
  }
  
}

