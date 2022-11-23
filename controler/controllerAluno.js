/********************************************
* Objetivo: ARQUIVO esponsável manipulação de recebimento, tratamento e retorno de dados
* Autor: Gyovanne Martins
* Data: 06/10/2022
* Versão: 1.1.0.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulos/config.js');

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
        //import da model de de aluno e de aluno-curso 
        const novoAluno = require('../model/DAO/aluno.js');
        const novoAlunoCurso = require('../model/DAO/aluno_curso.js')
        //import a funtion para adicionar um aluno
        const resultNovoAluno = await novoAluno.insertAluno(alunoJson);
        //verifica se o novo aluno foi adicionado
        if(resultNovoAluno){
            //Chama a função do que verifica qual o id que foi criado para o novo aluno
            let idNovoAluno = await novoAluno.selectLastId();
            if(idNovoAluno > 0){
                let alunoCurso = {};
                //Retorna o ano corrente
                let anoMatricula = new Date().getFullYear();
                //Criando a matricula
                let numero_matricula = `${idNovoAluno}${aluno.curso[0].id_curso}${anoMatricula}`;
                alunoCurso.id_aluno = idNovoAluno;
                alunoCurso.id_curso = aluno.curso[0].id_curso;
                alunoCurso.Matricula = numero_matricula;
                alunoCurso.status_aluno = 'C';

                //Chama a função para inserir as coisas na tabela intermediária
                const novoAluno_Curso = await novoAlunoCurso.insertAlunoCurso(alunoCurso);

                if(novoAluno_Curso){
                    return {message: MESSAGE_SUCESS.SUCESS_CREATED, status: 201}
                } else {
                    //Caso aconteça um erro neste processo, obrigatoriamente deverá ser excluido do BD o registro do aluno.
                    await deletarAluno(idNovoAluno)
                    return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
                }
            } else {
                //Caso aconteça um erro neste processo, obrigatoriamente deverá ser excluido do BD o registro do aluno.
                await deletarAluno(idNovoAluno)
                return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500};
            }
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
const deletarAluno = async function(idAluno) {
    let id = idAluno;

    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.EMPTY_ID, status: 400};
    } else{

        const buscarAluno = await mostrarAluno(id);

        if(buscarAluno){

            //import da model de insertAluno
            const delAluno = require('../model/DAO/aluno.js');
            //import a funtion para adicionar um aluno

                const result = await delAluno.deleteAluno(id);

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

//Função para retornar todos os registros
const listarAlunos = async function() {
    let dadosAlunosJson = {};
    //import da model aluno e alunoCurso
    const  { selectAllAlunos } = require ('../model/DAO/aluno.js');
    const  { selectAlunoCursoByIdAluno } = require ('../model/DAO/aluno_curso.js');

    //Busca todos os alunos
    const dadosAlunos = await selectAllAlunos();
    if(dadosAlunos){

        const alunosCursoArray = dadosAlunos.map(async element => {

            const dadosAlunoCurso = await selectAlunoCursoByIdAluno(element.id);
            element.curso = dadosAlunoCurso

            //Adiciona no array todos os alunos com seu curso
            //alunosCursoArray.push(element);

            return element
        });
        //console.log(await Promise.all(alunosCursoArray));
        dadosAlunosJson.alunos = await Promise.all(alunosCursoArray);
        return dadosAlunosJson;
    } else {
        return false
    }
}

//Função para retornar um aluno pelo Id
const mostrarAluno = async function(idAluno) {
    let dadosAlunoJson = {};
    let id = idAluno
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.EMPTY_ID, status: 400};
    } else{
        const  { selectByIdAluno } = require ('../model/DAO/aluno.js');
        const { selectAlunoCursoByIdAluno } = require ('../model/DAO/aluno_curso.js');

        const dadosAluno = await selectByIdAluno(id);

        if(dadosAluno){
            
            const dadosAlunoCurso = await selectAlunoCursoByIdAluno(id);
            if(dadosAlunoCurso){
                dadosAluno[0].curso = dadosAlunoCurso;
                return dadosAluno;
            }   
        } else {
            dadosAlunoJson.aluno = dadosAluno;
            return dadosAlunoJson;
        }
    }
}

module.exports = {
    listarAlunos, novoAluno, atualizarAluno, deletarAluno, mostrarAluno
}