/********************************************
* Objetivo: ARQUIVO esponsável manipulação de recebimento, tratamento e retorno de dados
* Autor: Gyovanne Martins
* Data: 06/10/2022
* Versão: 1.1.0.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulos/config.js')

//Função para gerar um novo aluno
const novoAluno = async function(alunoJson) {
    let aluno = alunoJson;

    //Validação de campos obrigatórios
    if(aluno.Nome == '' || aluno.Nome == undefined || aluno.Foto == '' || aluno.Foto == undefined || aluno.RG == '' || aluno.RG == undefined || aluno.CPF == '' || aluno.CPF == undefined || aluno.Email == '' || aluno.Email == undefined || aluno.Data_Nascimento == '' || aluno.Data_Nascimento == undefined){
        return {message: MESSAGE_ERROR.REQUIRED_FILDS, status: 400};
        //Verificação para ver se o E-mail é válido
    } else if(!aluno.Email.includes('@')){
        return {message: MESSAGE_ERROR.INVALID_EMAIL, status: 400};
    } else{
        //import da model de insertAluno
        const novoAluno = require('../model/DAO/aluno.js');
        //import a funtion para adicionar um aluno
        const result = await novoAluno.insertAluno(alunoJson);
        if(result){
            return {message: MESSAGE_SUCESS.SUCESS_CREATED, status: 201};
        } else {
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
        }
    }
}

//Função para atualizar um registtro
const atualizarAluno = async function(alunoJson) {
    let aluno = alunoJson;

    if(aluno.id == undefined || aluno.id == '' ){
        return {message: MESSAGE_ERROR.EMPTY_ID, status: 400};
    }
    //Validação de campos obrigatórios
    if(aluno.Nome == '' || aluno.Nome == undefined || aluno.Foto == '' || aluno.Foto == undefined || aluno.RG == '' || aluno.RG == undefined || aluno.CPF == '' || aluno.CPF == undefined || aluno.Email == '' || aluno.Email == undefined || aluno.Data_Nascimento == '' || aluno.Data_Nascimento == undefined){
        return {message: MESSAGE_ERROR.REQUIRED_FILDS, status: 400};
        //Verificação para ver se o E-mail é válido
    } else if(!aluno.Email.includes('@')){
        return {message: MESSAGE_ERROR.INVALID_EMAIL, status: 400};
    } else{
        //import da model de insertAluno
        const atualizarAluno = require('../model/DAO/aluno.js');
        //import a funtion para adicionar um aluno
        const result = await atualizarAluno.updateAluno(alunoJson);
        if(result){
            return {message: MESSAGE_SUCESS.SUCESS_UPDATED, status: 200};
        } else {
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
        } 
    }
}

//Função para excluir um registro
const deletarAluno = async function() {

}

//Função para retornar todos os registros
const listarAlunos = async function() {
    let dadosAlunosJson = {};
    const  { selectAllAlunos } = require ('../model/DAO/aluno.js');

    const dadosAlunos = await selectAllAlunos();

    if(dadosAlunos){
        {
        //Converção do tipo de dados BigInt para int(?????????????????????????????????????????????)
        //dadosAlunos.forEach(element => {
        //    element.id = Number(element.id)
        //});
        }
        dadosAlunosJson.alunos = dadosAlunos;
        return dadosAlunosJson;
    } else {
        return false
    }
}

module.exports = {
    listarAlunos, novoAluno, atualizarAluno
}