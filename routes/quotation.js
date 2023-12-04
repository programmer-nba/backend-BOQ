var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const employeeAuth = require('../authentication/employeeAuth')
const quotation = require('../controllers/quotation.controller')

//สร้างรหัส quotation
router.post('/',employeeAuth.all,quotation.add)
//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,quotation.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,quotation.getbyid)
// แก้ไขข้อมูล quotation  
router.put('/:id',employeeAuth.all,quotation.edit)
// ลบข้อมูล quotation 
router.delete('/:id',employeeAuth.all,quotation.delete)

module.exports = router;