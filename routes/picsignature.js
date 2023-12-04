var express = require('express');
var router = express.Router();
const Picsignature = require('../controllers/picsignature.controller')

//picture management routes  
router.post('/signature/:id',Picsignature.Create)
router.delete('/signature/:id/:pictureid',Picsignature.Delete)

module.exports = router;