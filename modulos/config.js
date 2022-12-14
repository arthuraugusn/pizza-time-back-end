/*

- OBJETIVO: Arquivo responsável pela configuração de variáveis, constantes e mensagens do sistema
- AUTOR: Arthur Augusto da Silva Nunes
- DATA DE CRIAÇÃO: 13/10/2022
- VERSÃO: 1.0

*/

const MESSAGE_ERROR = {
    REQUIRED_FIELD:          'Existe(m) campo(s) obrigatório(s) que deve(m) ser preenchido(s)',
    INVALID_EMAIL:           'O e-mail informado não é válido',
    CONTENT_TYPE:            'O cabeçalho da requisição não possue um Content-Type válido',
    EMPTY_BODY:              'O Body da requisição deve haver um conteúdo',
    NOT_FOUND_DB:            'Não foram encontrados registros no Banco de Dados',
    INTERNAL_ERROR_DB:       'Não foi possível realizar a operação com o Banco de Dados',
    REQUIRED_ID:             'O id do registro é obrigatório neste tipo de requisição',
    NOT_FOUND_COURSE:        'Nenhum curso matriculado',
    MAX_CHARACTERS_EXCEEDED: 'O número máximo de caracteres foi ultrapassado',
    NOT_FOUND_ID_PRODUTO:    'O id do último produto cadastrado não pode ser encontrado',
    NOT_FOUND_TOKEN:         'O token de autenticação não foi encontrado/inserido'
}

const MESSAGE_SUCCESS={
    INSERT_ITEM:        'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM:        'Item adicionado com sucesso no Banco de Dados',
    DELETE_ITEM:        'Item excluido com sucesso no Banco de Dados'
}

module.exports={
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}