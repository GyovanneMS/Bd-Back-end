/********************************************
* Objetivo: Arquivo responsável pela configuração pelas mensagens, variantrs, constantes no sistema
* Autor: Gyovanne Martins
* Data: 13/10/2022
* Versão: 1.0.0.0
********************************************/

const MESSAGE_ERROR = {
    REQUIRED_FILDS: 'Há campos que são obrigatórios, alguns campos estão vazios.',
    CONTENT_TYPE: 'O cabeçalho da requisição não possui content-type válido.',
    INVALID_EMAIL: 'O e-mail informado não é válido.',
    EMPTY_BODY: 'O conteúdo body não pode estar vazio.',
    EMPTY_DB: 'Item não encontrado no banco de dados.',
    ERROR_CREATED: 'Item não criado.',
    INTERNAL_ERROR_DB: 'Não foi possível realizar a operação com o Banco de dados'
};

const MESSAGE_SUCESS = {
    SUCESS_CREATED: 'Item criado com sucesso.',
    SUCESS_DELETED: 'Item deletado com sucesso.',
    SUCESS_UPDATED: 'Item atualizado com sucesso.',
    SUCESS_SELECTED: 'Item selecionado com sucesso.'
};

module.exports = {
    MESSAGE_ERROR, MESSAGE_SUCESS
}