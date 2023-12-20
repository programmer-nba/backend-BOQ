var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const employeeAuth = require('../authentication/employeeAuth')
const product = require('../controllers/product.controller')

//สร้างรหัส product  
router.post('/',employeeAuth.all,product.add)
//ดึงข้อมูลทั้งหมด
router.get('/',employeeAuth.all,product.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',employeeAuth.all,product.getbyid)
// แก้ไขข้อมูล product  
router.put('/:id',employeeAuth.all,product.edit)
// ลบข้อมูล product 
router.delete('/:id',employeeAuth.all,product.delete)

module.exports = router;