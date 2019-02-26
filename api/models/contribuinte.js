
const express = require('express');
const mongoose = require('mongoose');

const contribSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id',
        required : true
    },

    numero : {
        type : mongoose.Schema.Types.Number,
        ref : 'MyID',
        required : true
    },

    nome : {
        type : mongoose.Schema.Types.String, 
        ref : 'Nome',
        required : true
    },

    recado : { 
        type : mongoose.Schema.Types.String,
        ref : 'Recado'
    },

    telefone : {
        type : mongoose.Schema.Types.String,
        ref : 'Telefone',
        validate: {
            isAsync: true,
            validator: function(v, cb) {
            setTimeout(function() {
                    var phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{4})\2([0-9]{4})/;;
                    var msg = v + ' Esse não é um número de telefone válido!';
                    cb(phoneRegex.test(v), msg);
                }, 5);
            }
        },
        required: [true, 'Número de telefone é obrigatório!']
    },

    celular : {
        type : mongoose.Schema.Types.String,
        ref : 'Celular',
        validate : {
            isAsync: true,
            validator: function(v, cb) {
            setTimeout(function() {
                    var phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{5})\2([0-9]{4})/;
                    var msg = v + ' Esse não é um número de celular válido!';
                    cb(phoneRegex.test(v), msg);
                }, 5);
            }
        }
    },

    email : {
        type : mongoose.Schema.Types.String,
        ref : 'Email',
    },

    endereco : {
        type : mongoose.Schema.Types.String,
        ref : 'Endereço',
        validate : {
            isAsync : true,
            validator : function(v, cb) {
                setTimeout(function() {
                    var addressRegex = /\w.+, \d.+$/;
                    var msg = v + ' Não é um endereço válido!';
                    cb(addressRegex.test(v),msg);
                },5);
            }
        },
        required : true
    },

    cep : {
        type : mongoose.Schema.Types.String,
        ref : 'CEP',
        validate : {
            isAsync : true,
            validator : function(v, cb) {
                setTimeout(function() {
                    var addressRegex = /\d{5}-\d{3}/;
                    var msg = v + 'Não é um CEP válido!';
                    cb(addressRegex.test(v),msg);
                },5);
            }
        },
        required : true
    },

    complemento : {
        type : mongoose.Schema.Types.String,
        ref : 'Complemento',
    },

    cidade : {
        type : mongoose.Schema.Types.String,
        ref : 'Cidade',
        required : true
    },

    primeiro : {
        type : mongoose.Schema.Types.Date,
        ref : 'Primeiro',
        required : true
    },

    num_parcelas : {
        type : mongoose.Schema.Types.Number,
        ref : 'NumParcelas',
        required : true
    },

    parcelas :{
        type :  [{
                pagou : mongoose.Schema.Types.Boolean, 
                na_data : mongoose.Schema.Types.Date,
            }],
    },

    forma : {
        type : mongoose.Schema.Types.String,
        ref : 'Forma',
        required : true
    },

    quantia : {
        type : mongoose.Schema.Types.Number,
        ref : 'Quantia',
        required : true
    }
});

module.exports = mongoose.model('Contribuinte', contribSchema);