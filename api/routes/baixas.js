
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Contribuinte = require('../models/contribuinte');

const router = express.Router();

router.get('/',(req,res,) => {
    var path = require('path');
    res.sendFile(path.resolve('html/baixas.html'));
});

router.post('/',(req,res) => {

});

router.get('/posted',(req,res) => {

});

module.exports = router;