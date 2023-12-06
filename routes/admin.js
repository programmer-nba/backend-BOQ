var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Admin = require('../controllers/admin.controller')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//สร้างรหัส admin 
router.post('/',adminAuth,Admin.add)

//ดึงข้อมูลทั้งหมด
router.get('/',adminAuth,Admin.getall)
//ดึงข้อมูล by id
router.get('/byid/:id',adminAuth,Admin.getbyid)
// แก้ไขข้อมูล admin 
router.put('/:id',adminAuth,Admin.edit)
// ลบข้อมูล admin
router.delete('/:id',adminAuth,Admin.delete)

module.exports = router;