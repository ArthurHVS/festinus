
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

const Contribuinte = require('../models/contribuinte');

const router = express.Router();

router.get('/',(req,res) => {
    var path = require('path');

    var cond_consulta = false;

    let busca_id = req.query.chave_id;
    let busca_nome = req.query.chave_nome;
    let busca_tel = req.query.chave_tel;

    if (!req.query.chave_id && !req.query.chave_nome && !req.query.chave_tel) {
        res.render('consulta', {title: 'Consulta ao Cadastro de Contribuintes', name: 'Consulta por id:', mainbhelper: 'has-background-warning', typhohelper1: 'has-text-grey is-size-1', typhohelper2: 'has-text-light is-size-4', cond_consulta: false});
    } else if(!req.query.chave_nome && !req.query.chave_tel) {
        const documento = mongoose.model('Contribuinte').findOne({numero : busca_id})
        .select('-__v')
        .populate('Contribuinte')
        .exec()
        .then(doc => {
            res.render('usuario',doc);
        })
        .catch(err => console.log(err));
    } else if (!req.query.chave_id && !req.query.chave_tel) {
        const documento = mongoose.model('Contribuinte').findOne({nome : busca_nome})
        .select('-__v')
        .populate('Contribuinte')
        .exec()
        .then(doc => {
            res.render('usuario',doc);
        })
        .catch(err => console.log(err));
    } else if (!req.query.chave_id && !req.query.chave_nome) {
        const documento = mongoose.model('Contribuinte').findOne({telefone : busca_tel})
        .select('-__v')
        .populate('Contribuinte')
        .exec()
        .then(doc => {
            res.render('usuario',doc);
        })
        .catch(err => console.log(err));
    }
});

module.exports = router;