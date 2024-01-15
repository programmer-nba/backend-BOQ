var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Admin = require('../controllers/admin.controller')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const employeeAuth = require('../authentication/employeeAuth')
//สร้างรหัส admin 
router.post('/',employeeAuth.all,Admin.add)

//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,Admin.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,Admin.getbyid)
// แก้ไขข้อมูล admin 
router.put('/:id',employeeAuth.all,Admin.edit)
// ลบข้อมูล admin
router.delete('/:id',employeeAuth.all,Admin.delete)

router.post("/export/",Admin.exportjson)
module.exports = router;