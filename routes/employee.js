var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const EmployeeAuth = require('../authentication/employeeAuth')
const Employee = require('../controllers/employee.controller')


//สร้างรหัส Employee 
router.post('/',adminAuth,Employee.add)
//ดึงข้อมูลทั้งหมด
router.get('/',EmployeeAuth.all,Employee.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',EmployeeAuth.all,Employee.getbyid)
// แก้ไขข้อมูล Employee 
router.put('/:id',EmployeeAuth.all,Employee.edit)
// ลบข้อมูล Employee
router.delete('/:id',EmployeeAuth.all,Employee.delete)

module.exports = router;