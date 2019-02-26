
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Contribuinte = require('../models/contribuinte');

const router = express.Router();

router.get('/',(req,res,next) => {
    var path = require('path');
    res.sendFile(path.resolve('html/relatorios.html'));
});

module.exports = router;