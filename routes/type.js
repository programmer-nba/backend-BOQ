var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const employeeAuth = require('../authentication/employeeAuth')
const type = require('../controllers/type.controller')

//สร้างรหัส type  
router.post('/',employeeAuth.all,type.add)
//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,type.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,type.getbyid)
// แก้ไขข้อมูล type  
router.put('/:id',employeeAuth.all,type.edit)
// ลบข้อมูล type 
router.delete('/:id',employeeAuth.all,type.delete)

router.post("/export/",type.exportjson)
module.exports = router;