/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete)
* Autor: Gyovanne Martins Sabará
* Data criação: 06/10/2022
* Versão: 1.1.0.0
********************************************/

//Função para inserir um novo registro no banco de dados
const insertCurso = async function(curso) {
    
    try{
        let cursoJson = curso;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `insert into tbl_curso (
            Nome,
            Carga_horaria,
            Icone,
            Sigla)
            values(
            '${curso.Nome}',
            ${curso.Carga_Horaria},
            '${curso.Icone}',
            '${curso.Sigla}')`;

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
const updateCurso = async function(curso) {

        let course = curso;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `update tbl_curso set
            Nome = '${course.Nome}',
            Carga_horaria = ${course.Carga_Horaria},
            Icone = '${course.Icone}',
            Sigla = '${course.Sigla}'

            where id = ${course.id}`;

        const result = await prisma.$executeRawUnsafe(sql);

        try{    

        if(result || result == 0){
            return true;
        } else {
            return false;
        }
    } catch{
        return false;
    }
    
}

//Função para retornar todos os registros do BD
const selectAllCursos = async function() {

    //Import da classe prismaClient que é responsável pelas alterações com o BD
    const {PrismaClient} = require("@prisma/client");

    //Instância da classe PrismaClient  
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo Record Set (rscursos) para receber od dados do BD através de um Script SQL (select)
    const rscursos = await prisma.$queryRaw `select cast(id as float) as id, Nome, Carga_horaria, Icone, Sigla from tbl_curso ORDER BY id DESC`;

    //
    if(rscursos.length > 0){
        return rscursos;
    } else{
        return false;
    }

}

const selectByIdCurso = async function(id) {

    //Import da classe prismaClient que é responsável pelas alterações com o BD
    const {PrismaClient} = require("@prisma/client");

    //Instância da classe PrismaClient  
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo Record Set (rscursos) para receber od dados do BD através de um Script SQL (select)
    let sql = `select cast(id as float) as id, 
                Nome, 
                Carga_horaria, 
                Icone, 
                Sigla 

                from tbl_curso where id = ${id}`;

    try{

        const rscurso = await prisma.$queryRawUnsafe(sql);

        if(rscurso.length > 0){
            return rscurso;
        } else{
            return false;
        }
    }catch(error){
        return false
    }

}

//Deletar ou excluír um registro de dados    
const deleteCurso = async function(idcurso) {
    let id = idcurso;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();
    
        //Criamos um objeto do tipo Record Set (rscursos) para receber od dados do BD através de um Script SQL (select)
        let sql = `delete from tbl_curso where id = ${id}`;
        try{    

            const result = await prisma.$executeRawUnsafe(sql);
    
            if(result || result == 0){
                return true;
            } else {
                return false;
            }
        } catch{ 
            return false;
        }
}

module.exports = {
    selectAllCursos, insertCurso,updateCurso,deleteCurso,selectByIdCurso
}