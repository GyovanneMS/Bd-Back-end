/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete)
* Autor: Gyovanne Martins Sabará
* Data criação: 06/10/2022
* Versão: 1.1.0.0
********************************************/

//Função para inserir um novo registro no banco de dados
const insertAluno = async function(aluno) {
    
    try{
        let alunoJson = aluno;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `insert into tbl_aluno (
            Nome,
            Foto,
            RG,
            CPF,
            Email,
            Data_Nascimento,
            Telefone,
            Celular,
            Sexo)
            values(
            '${aluno.Nome}',
            '${aluno.Foto}',
            '${aluno.RG}',
            '${aluno.CPF}',
            '${aluno.Email}',
            '${aluno.Data_Nascimento}',
            '${aluno.Telefone}',
            '${aluno.Celular}',
            '${aluno.Sexo}'
            )`;

        //Executa o script sql no bd, obs: Esse comando permite encaminhar uma variavel contendo o script
        const result = await prisma.$executeRawUnsafe(sql);    

        if(result){
            return true;
        } else {
            return false;
        }
    } catch(error) {
        return false
    }

}

//Função para inserir um novo registro no BD
const updateAluno = async function(aluno) {

        let student = aluno;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `update tbl_aluno set
            Nome = '${student.Nome}',
            Foto = '${student.Foto}',
            RG = '${student.RG}',
            CPF = '${student.CPF}',
            Email = '${student.Email}',
            Data_Nascimento = '${student.Data_Nascimento}',
            Telefone = '${student.Telefone}',
            Celular = '${student.Celular}',
            Sexo = '${student.Sexo}'

            where id = ${student.id}`

        try{    

        const result = await prisma.$executeRawUnsafe(sql);

        if(result){
            return true;
        } else {
            return false;
        }
    } catch{
        return false;
    }
    
}

//Função para retornar todos os registros do BD
const selectAllAlunos = async function() {

    //Import da classe prismaClient que é responsável pelas alterações com o BD
    const {PrismaClient} = require("@prisma/client");

    //Instância da classe PrismaClient  
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo Record Set (rsAlunos) para receber od dados do BD através de um Script SQL (select)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, Nome, Foto, Sexo, RG, CPF, Email, Telefone, Celular, Data_Nascimento from tbl_aluno ORDER BY id DESC`;

    //
    if(rsAlunos.length > 0){
        return rsAlunos;
    } else{
        return false;
    }

}

//Deletar ou excluír um registro de dados
const deleteAluno = async function(id) {
    let 
}

module.exports = {
    selectAllAlunos,insertAluno,updateAluno
}