var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const employeeAuth = require('../authentication/employeeAuth')
const unit = require('../controllers/unit.controller')

//สร้างรหัส unit  
router.post('/',adminAuth,unit.add)
//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,unit.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,unit.getbyid)
// แก้ไขข้อมูล unit  
router.put('/:id',adminAuth,unit.edit)
// ลบข้อมูล unit 
router.delete('/:id',adminAuth,unit.delete)

module.exports = router;