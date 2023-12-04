var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Admin = require('../controllers/admin.controller')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//สร้างรหัส admin 
router.post('/',Admin.add)

module.exports = router;