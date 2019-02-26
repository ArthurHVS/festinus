
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const luxon = require('luxon');

let DateTime = luxon.DateTime;

const Contribuinte = require('../models/contribuinte');

const router = express.Router();

var idglobal = -1;
router.get('/',(req,res) => {
    var path = require('path');
    res.render('formulario', {title: 'Sistema de Controle das Contribuições', name: 'Cadastro de Contribuinte', mainbhelper: 'has-background-primary', typhohelper1: 'has-text-white', typhohelper2: 'has-text-light', typhohelper3: 'has-text-info', sizehelper1:  'is-size-1', sizehelper2:  'is-size-4', fieldhelper: 'field tile'});
});

router.post('/',(req,res) => {
    
    // Leitura do id interno (Mudar de posição?)

    var path = require('path');
    var jsonData = fs.readFileSync(path.resolve('last.json'));
    var jsonParsed = JSON.parse(jsonData);
    
    idglobal = jsonParsed.lastid + 1;
    
    var jsonwrite = fs.writeFileSync(path.resolve('last.json'),'{"lastid" : ' + idglobal + '}');
    
    const cadastrado = new Contribuinte({
        _id : new mongoose.Types.ObjectId(),
        numero : idglobal,
        nome : req.body.nome,
        recado : req.body.recado,
        telefone : req.body.telefone,
        celular : req.body.celular,
        email : req.body.email,
        endereco : req.body.endereco,
        cep : req.body.cep,
        complemento : req.body.complemento,
        cidade : req.body.cidade,
        primeiro : req.body.primeiro,
        num_parcelas : req.body.parcelas,
        forma : req.body.forma,
        quantia : req.body.quantia
    });
    var dbase = DateTime.fromJSDate(cadastrado.primeiro);

    // Laços População das Datas de Baixa

    for (var i = 0; i < cadastrado.num_parcelas; i++) {
        cadastrado.parcelas.push({pagou: 'false', na_data: dbase});
    }

    for (var j = 1; j < cadastrado.num_parcelas; j++) {
        cadastrado.parcelas[j].na_data = new DateTime(dbase.plus({days : 30*j}));
    }

    // Promises Mongoose para salvar a instância cadastrada do contribuinte

    cadastrado
    .save()
    .then(result => {  
        res.status(201).end(req.body.nome + ' cadastrado com sucesso!' + '\nId MongoDB: ' + cadastrado._id + '\nId Interno: ' + cadastrado.numero);
    })
    .catch(err => {
        console.log(err);
        var jsonData = fs.readFileSync(path.resolve('last.json'));
        var jsonParsed = JSON.parse(jsonData);
        idglobal = jsonParsed.lastid - 1;
        var jsonWrite = fs.writeFileSync(path.resolve('last.json'),'{"lastid" : ' + idglobal + '}');
        res.status(500).end('Código 500: Cadastro não adicionado ao Mongo...' + idglobal);
    });
});

module.exports = router;