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
app.get('/vs1/alunos', cors(), async function(request, response) {

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

app.get('/vs1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id

            //Validação do Id
    if(id != '' && id != undefined && id != false){   

        //import do arquivo controllerAluno
        const controllerAluno = require('./controler/controllerAluno.js');
        //const controllerAluno = require('./controler/controllerCursos.js');
        //Retorna todos os alunos existentesno BD
        const dadosAluno = {}
        dadosAluno.Aluno = await controllerAluno.mostrarAluno(id);
        dadosAluno.Curso = await controllerAluno.mostrarAluno(dadosAluno.Aluno.id);

        //Valida se existe retorne de dados
        if(dadosAluno){
            statusCode = 200;
            message = dadosAluno;
        } else{
            statusCode = 404;
            message = MESSAGE_ERROR.EMPTY_DB;
        }
    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_ID;
    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

//EndPoint para inserir um novo aluno
app.post('/vs1/aluno', cors(), jsonParser, async function(request, response){
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


//Endpoit para atualizar um aluno existente
app.put('/vs1/aluno/:id', cors(), jsonParser, async function(request, response){
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

            //Recebe o id mandado pela requisição
            let id = request.params.id

            //Validação do Id
            if(id != '' && id != undefined && id != false){
                //Adiciona o id no json no corpo da requisição
                dadosBody.id = id;    

                const controllerAluno = require('./controler/controllerAluno.js');

                //Chama a função atualizarAluno da controller e encminha os dados do dadosBody
                const atualizarAluno = await controllerAluno.atualizarAluno(dadosBody)

                statusCode = atualizarAluno.status;
                message = atualizarAluno.message;
            } else {
            statusCode = 400;
            message = MESSAGE_ERROR.REQUIRED_FILDS
            }

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

app.delete('/vs1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

        //Recebe o id mandado pela requisição
        let id = request.params.id

        //Validação do Id
        if(id != '' && id != undefined && id != false){
            const controllerAluno = require('./controler/controllerAluno.js');
            
            const delAluno = await controllerAluno.deletarAluno(id)

            statusCode = delAluno.status;
            message = delAluno.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_ID
        }
    response.status(statusCode);
    response.json(message);

        
});

//=========================================================================================================================
/*
    Objetivo: Crud para cursos
    Data: 31/10/2022
*/

app.get('/vs1/cursos', cors(), async function(request, response) {
    let statusCode;
    let message;

    //import do arquivo controllerAluno
    const controllerCurso = require('./controler/controllerCursos.js');
    
    //Retorna todos os alunos existentesno BD
    const dadosCurso = await controllerCurso.listarCursos();

    //Valida se existe retorne de dados
    if(dadosCurso){
        statusCode = 200;
        message = dadosCurso;
    } else{
        statusCode = 404;
        message = MESSAGE_ERROR.EMPTY_DB;
    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

app.get('/vs1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id

            //Validação do Id
    if(id != '' && id != undefined && id != false){   

        //import do arquivo controllerCurso
        const controllerCurso = require('./controler/controllerCursos.js');
        
        //Retorna todos os Cursos existentesno BD
        const dadosCurso = await controllerCurso.mostrarCurso(id);

        //Valida se existe retorne de dados
        if(dadosCurso){
            statusCode = 200;
            message = dadosCurso;
        } else{
            statusCode = 404;
            message = MESSAGE_ERROR.EMPTY_DB;
        }
    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_ID;
    }

    //retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

//EndPoint para inserir um novo curso
app.post('/vs1/curso', cors(), jsonParser, async function(request, response){
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
            const controllerCurso = require('./controler/controllerCursos.js');

            //Chama a função novoCurso da controller e encminha os dados do dadosBody
            const novoCurso = await controllerCurso.novoCurso(dadosBody)

            statusCode = novoCurso.status;
            message = novoCurso.message;

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

//Endpoit para atualizar um curso existente
app.put('/vs1/curso/:id', cors(), jsonParser, async function(request, response){
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

            //Recebe o id mandado pela requisição
            let id = request.params.id

            //Validação do Id
            if(id != '' && id != undefined && id != false){
                //Adiciona o id no json no corpo da requisição
                dadosBody.id = id;    

                const controllerCurso = require('./controler/controllerCursos.js');

                //Chama a função atualizarCurso da controller e encminha os dados do dadosBody
                const atualizarCurso = await controllerCurso.atualizarCurso(dadosBody)

                statusCode = atualizarCurso.status;
                message = atualizarCurso.message;
            } else {
            statusCode = 400;
            message = MESSAGE_ERROR.REQUIRED_FILDS
            }

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

app.delete('/vs1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

        //Recebe o id mandado pela requisição
        let id = request.params.id

        //Validação do Id
        if(id != '' && id != undefined && id != false){
            const controllerCurso = require('./controler/controllerCursos.js');
            
            const delCurso = await controllerCurso.deletarCurso(id)

            statusCode = delCurso.status;
            message = delCurso.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_ID
        }
    response.status(statusCode);
    response.json(message);

        
});

app.listen(3030, function(){
    console.log('Servidor aguardando requisições...')
})