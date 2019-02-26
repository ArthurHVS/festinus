
//Segurança tá zero aqui, tem que ver como melhorar isso...
const MONGO_HTML = 'mongodb://CasaDaCrianca:#vaidarcerto2019@megaadmin-shard-00-00-fynrt.mongodb.net:27017,megaadmin-shard-00-01-fynrt.mongodb.net:27017,megaadmin-shard-00-02-fynrt.mongodb.net:27017/test?ssl=true&replicaSet=MegaAdmin-shard-0&authSource=admin&retryWrites=true'

// Requires das dependências
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();

// Requires das rotas
const cadastroRoutes = require('./api/routes/cadastro');
const consultaRoutes = require('./api/routes/consulta');
const baixasRoutes = require('./api/routes/baixas');
const relatoriosRoutes = require('./api/routes/relatorios');

// Requires dos modelos
const Contribuinte = require('./api/models/contribuinte');

// Conexão com o MongoDB
var connected = false;
mongoose.connect(MONGO_HTML, { useNewUrlParser : true })
    .then(doc => {
        connected = true;
    })
    .catch(err => {
        res.status(500).write('Código 500: Não conectou o Mongo...')
    });

// Handlebars Engine
app.use(bodyParser.urlencoded( {extended : false} ));
app.use(bodyParser.json());

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Uses para mascarar as urls
app.use('/cadastro', cadastroRoutes);
app.use('/consulta', consultaRoutes);
app.use('/baixas', baixasRoutes);
app.use('/relatorios', relatoriosRoutes);

// Render do Index
app.get('/', (req,res,next) => {
    res.render('index', {title: 'Festinus Index v.1.0.0', name: 'Festinus 1.0.0', mainbhelper: 'has-background-grey-light', state: connected});
});

// Renders do Erro
app.use((req,res,next)=>{
    error = new Error('Essa página não existe...');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app;