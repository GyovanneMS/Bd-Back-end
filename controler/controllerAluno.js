/********************************************
* Objetivo: ARQUIVO esponsável manipulação de recebimento, tratamento e retorno de dados
* Autor: Gyovanne Martins
* Data: 06/10/2022
* Versão: 1.1.0.0
********************************************/

//Função para gerar um novo aluno
const novoAluno = async function(alunoJson) {
    let aluno = alunoJson;

    //Validação de campos obrigatórios
    if(aluno.Nome == '' || aluno.Nome == undefined || aluno.Foto == '' || aluno.Foto == undefined || aluno.RG == '' || aluno.RG == undefined || aluno.CPF == '' || aluno.CPF == undefined || aluno.Email == '' || aluno.Email == undefined || aluno.Data_Nascimento == '' || aluno.Data_Nascimento == undefined){
        return false;
        //Verificação para ver se o E-mail é válido
    } else if(!aluno.Email.includes('@')){
        return false;
    } else{
        //import da model de insertAluno
        const novoAluno = require('../model/DAO/aluno.js');

        //import a funtion para adicionar um aluno
        const result = novoAluno.insertAluno(alunoJson);
        
        if(result){
            return true
        } else {
            return false
        }
    }
}

//Função para atualizar um registtro
const atualizarAluno = async function() {

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
        dadosAlunos.forEach(element => {
            element.id = Number(element.id)
        });
        }
        dadosAlunosJson.alunos = dadosAlunos;
        return dadosAlunosJson;
    } else {
        return false
    }
}

module.exports = {
    listarAlunos, novoAluno
}