/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete)
* Autor: Gyovanne Martins Sabará
* Data criação: 31/10/2022
* Versão: 1.0.0.0
********************************************/

const insertAlunoCurso = async function(alunoCurso) {
    
    try{
        let ids = alunoCurso;

        //Import da classe prismaClient que é responsável pelas alterações com o BD
        const {PrismaClient} = require("@prisma/client");

        //Instância da classe PrismaClient  
        const prisma = new PrismaClient();

        let sql = `insert into tbl_aluno_curso (id_aluno, id_curso)
                                    values(
                                    '${ids.id_aluno}',
                                    '${ids.id_curso}'
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