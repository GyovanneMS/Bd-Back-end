/********************************************************
Objetivo: API  responsável pela manipulação de dados do Back-end (GET, POST, PUT, DELETE)
Autor: Gyovanne Martins
Data: 10/10
Versão: 1.1.0.0
npm install express --save
npm install cors --save
npm install body-parser --save
-->   Para manipular o acesso ao BD podemos utilizar o Prisma, para instalar o prisma, devemos rodaros seguintes comandos: 
npm install prisma --save
npx prisma
npx prisma init
npm install @prisma/client
********************************************************/


//import das bibliotecas

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('./modulos/config.js')

const app = express();

//Configuração do cors para liberar o Acesso a API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//Criamos um objeto permite receber um json nas requisições no budy das requisições
const jsonParser = bodyParser.json();

//Rotas para CRUD de alunos
//Data: 10/10/2022

//EndPoint para listar todos os Alunos
app.get('/alunos', cors(), async function(request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerAluno
    const controllerAluno = require('./controler/controllerAluno.js');
    
    //Retorna todos os alunos existentesno BD
    const dadosAlunos = await controllerAluno.listarAlunos();

    //Valida se existe retorne de dados
    if(dadosAlunos){
        statusCode = 200;
        message = dadosAlunos;
    } else{
        statusCode = 404;
        message = MESSAGE_ERROR.EMPTY_DB;
    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

//EndPoint para inserir um novo aluno
app.post('/aluno', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe um tipo de content-type que foi enviado no header da requisição
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar o content-type
    if(headerContentType == 'application/json'){
        //recebe do corpo da mensagem, o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar um json vazio
        if(JSON.stringify(dadosBody) != '{}'){
            const controllerAluno = require('./controler/controllerAluno.js');

            //Chama a função novoAluno da controller e encminha os dados do dadosBody
            const novoAluno = await controllerAluno.novoAluno(dadosBody)

            statusCode = novoAluno.status;
            message = novoAluno.message;

        } else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }
    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
});

app.put('/aluno', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe um tipo de content-type que foi enviado no header da requisição
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar o content-type
    if(headerContentType == 'application/json'){
        //recebe do corpo da mensagem, o conteúdo
        let dadosBody = request.body;

        //realiza um processo de conversão de dados para conseguir comparar um json vazio
        if(JSON.stringify(dadosBody) != '{}'){
            const controllerAluno = require('./controler/controllerAluno.js');

            //Chama a função novoAluno da controller e encminha os dados do dadosBody
            const novoAluno = await controllerAluno.atualizarAluno(dadosBody)

            statusCode = novoAluno.status;
            message = novoAluno.message;

        } else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }
    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
});

app.listen(3030, function(){
    console.log('Servidor aguardando requisições...')
})