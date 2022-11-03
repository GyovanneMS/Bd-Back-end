/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete)
* Autor: Gyovanne Martins Sabará
* Data criação: 31/10/2022
* Versão: 1.0.0.0
********************************************/

const insertAlunoCurso = async function(alunoCurso) {
    

        let ids = alunoCurso;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `insert into tbl_aluno_curso (id_aluno, id_curso, Matricula, status_aluno)
                                    values(
                                    ${ids.id_aluno},
                                    ${ids.id_curso},
                                    ${ids.Matricula},
                                    '${ids.status_aluno}'
                                    );`;


        //Executa o script sql no bd, obs: Esse comando permite encaminhar uma variavel contendo o script
        try{

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

const selectAlunoCursoByIdAluno = async function (id) {
        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();
    
        //Criamos um objeto do tipo Record Set (rsAlunos) para receber od dados do BD através de um Script SQL (select)
        let sql = `select cast(tbl_curso.id as float) as id_curso, tbl_curso.Nome as nome_curso, tbl_curso.Carga_horaria, tbl_curso.Sigla as sigla_curso,
                        tbl_aluno_curso.Matricula, tbl_aluno_curso.status_aluno as status_aluno
                         from tbl_aluno 
                         inner join tbl_aluno_curso on tbl_aluno.id = tbl_aluno_curso.id_aluno
                         inner join tbl_curso on tbl_curso.id = tbl_aluno_curso.id_curso
                         where tbl_aluno.id = ${id};`;
    
        try{
    
            const rsAlunoCurso = await prisma.$queryRawUnsafe(sql);
    
            if(rsAlunoCurso.length > 0){
                return rsAlunoCurso;
            } else{
                return false;
            }
        }catch(error){
            return false
        }
}

module.exports = {
    insertAlunoCurso, selectAlunoCursoByIdAluno
}