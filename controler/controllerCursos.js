/********************************************
* Objetivo: ARQUIVO esponsável manipulação de recebimento, tratamento e retorno de dados
* Autor: Gyovanne Martins
* Data: 06/10/2022
* Versão: 1.1.0.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulos/config.js');

const novoCurso = async function(cursoJson){
    let curso = cursoJson;

    //Validação de campos obrigatórios
    if(curso.Nome == '' || curso.Nome == undefined || curso.Carga_Horaria == 0 || curso.Carga_Horaria == undefined || curso.Icone == ''|| curso.Icone == undefined || curso.Sigla == '' || curso.Sigla == undefined){
        return {message: MESSAGE_ERROR.REQUIRED_FILDS, status: 400};
        //Verificação para ver se o E-mail é válido
    } else{
        //import da model de insertcurso
        const novoCurso = require('../model/DAO/curso.js');
        //import a funtion para adicionar um curso
        const result = await novoCurso.insertCurso(curso);
        if(result){
            return {message: MESSAGE_SUCESS.SUCESS_CREATED, status: 201};
        } else {
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
        }
    }
}

const atualizarCurso = async function(cursoJson){
    let curso = cursoJson;

    //Validação de campos obrigatórios
    if(curso.Nome == '' || curso.Nome == undefined || curso.Carga_Horaria ==  0 || curso.Carga_Horaria == undefined || curso.Icone == '' || curso.Icone == undefined || curso.Sigla == '' || curso.Sigla == undefined){
        return {message: MESSAGE_ERROR.REQUIRED_FILDS, status: 400};
        //Verificação para ver se o E-mail é válido
    } else{
        //import da model de insertcurso
        const atualizarCurso = require('../model/DAO/curso.js');
        //import a funtion para adicionar um curso
        const result = await atualizarCurso.updateCurso(curso);
        if(result){
            return {message: MESSAGE_SUCESS.SUCESS_UPDATED, status: 201};
        } else {
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
        }
    }
}

const deletarCurso = async function(idCurso){
    let id = idCurso;

    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.EMPTY_ID, status: 400};
    } else{

        const buscarCurso = await mostrarCurso(id);

        if(buscarCurso){

            //import da model de insertCurso
            const delCurso = require('../model/DAO/curso.js');
            //import a funtion para adicionar um Curso

            const result = await delCurso.deleteCurso(id);

            if(result){
                return {message: MESSAGE_SUCESS.SUCESS_DELETED, status: 200};
            } else {
                return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
            }
        } else {
            return {message: MESSAGE_ERROR.EMPTY_DB, status: 404}
        }
    } 
}

const listarCursos = async function(){
    let dadosCursoJson = {};
    const  { selectAllCursos } = require ('../model/DAO/curso.js');

    const dadosCurso = await selectAllCursos();

    if(dadosCurso){
        dadosCursoJson.Cursos = dadosCurso;
        return dadosCursoJson;
    } else {
        return false
    }  
}

const mostrarCurso = async function(idCurso){
    let dadosCursoJson = {};
    let id = idCurso
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.EMPTY_ID, status: 400};
    } else{
        const  { selectByIdCurso } = require ('../model/DAO/curso.js');

        const dadosCurso = await selectByIdCurso(id);

        if(dadosCurso){
    
            dadosCursoJson.Curso = dadosCurso;
            return dadosCursoJson;
        } else {
            return false
        }
    }
}

module.exports = {
    novoCurso, atualizarCurso, deletarCurso, listarCursos, mostrarCurso
}