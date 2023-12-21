var express = require('express');
var router = express.Router();
const Percent = require("../controllers/percent.controller")
const employeeAuth = require('../authentication/employeeAuth')
 
router.post('/',employeeAuth.all,Percent.add)

//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,Percent.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,Percent.getbyid)
// แก้ไขข้อมูล admin 
router.put('/:id',employeeAuth.all,Percent.edit)
// ลบข้อมูล admin
router.delete('/:id',employeeAuth.all,Percent.delete)

module.exports = router;

