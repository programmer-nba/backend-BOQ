var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cor = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

process.env.TZ='UTC'
var app = express();
//เชื่ิอมdatabase
const urldatabase =process.env.ATLAS_MONGODB
mongoose.Promise = global.Promise
mongoose.connect(urldatabase).then(()=>console.log("connect")).catch((err)=>console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cor())
//router
const prefix = '/v1/Backend-BOQ'
app.use(prefix+'/', require('./routes/index'));
//ข้อมูล admin
app.use(prefix+'/admin',require('./routes/admin'));
//ข้อมูลพนักงาน
app.use(prefix+'/employee',require('./routes/employee'));
//เพิ่มรูป
app.use(prefix+'/pic',require('./routes/picsignature'));
//เพิ่มประเภทสินค้า
app.use(prefix+'/type',require('./routes/type'));
//เพิ่มหน่วยของสินค้า
app.use(prefix+'/unit',require('./routes/unit'));
//เพิ่มสินค้า
app.use(prefix+'/product',require('./routes/product'));
//เพิ่มใบประมาณสินค้า
app.use(prefix+'/quotation',require('./routes/quotation'));
////
app.use(prefix+'/login', require('./routes/login'))
////
app.use(prefix+'/percent', require('./routes/percent'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // หรือกำหนด origin ที่เฉพาะเจาะจง
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
const port = process.env.PORT || 4444;
app.listen(port, console.log(`Listening on port ${port}`));
