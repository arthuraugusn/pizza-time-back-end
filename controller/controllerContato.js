/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de contato
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 06/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarMensagens = async function(){
    let mensagensJSON = {}

    const{selectAllMessages} = require('../model/dao/contato.js')

    const mensagens = await selectAllMessages()

    if(mensagens){

        mensagensJSON.mensagens = mensagens

        return mensagensJSON

    }
    else{
        return false
    }
}

const novaMensagem = async function(contato){
    if(contato.mensagem == ''||contato.mensagem == undefined|| contato.op_sugestao_critica==''||contato.op_sugestao_critica== undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else if(contato.op_sugestao_critica > 2 || contato.op_sugestao_critica < 1 ){
        return {status:400, message: MESSAGE_ERROR.MAX_CHARACTERS_EXCEEDED}
    }else{
        const novaMensagem = require('../model/dao/contato.js')

        const rsNovaMensagem = await novaMensagem.insertMessage(contato)

        if(rsNovaMensagem){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarMensagem = async function(idContato){
    if(idContato == '' || idContato == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar= require('../model/dao/contato.js')

        const verificar = await deletar.selectByIdMessage(idContato)

        if(verificar){
            const rsContato = await deletar.deleteMessage(idContato)

            if(rsContato){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaIdMensagem = async function(idContato){
    let mensagemJSON = {}

    if(idContato == '' || idContato == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdMessage} = require('../model/dao/contato.js')

        const mensagem = await selectByIdMessage(idContato)

        if(mensagem){
            mensagemJSON.mensagem = mensagem
            return mensagemJSON
        }else{
            return false
        }
    }
}

const atualizarMensagem = async function(contato){
    if(contato.id == '' || contato.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(contato.mensagem == ''||contato.mensagem == undefined|| contato.op_sugestao_critica==''||contato.op_sugestao_critica== undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else if(contato.op_sugestao_critica > 2 || contato.op_sugestao_critica < 1 ){
        return {status:400, message: MESSAGE_ERROR.MAX_CHARACTERS_EXCEEDED}
    }else{
        const atualizar = require('../model/dao/contato.js')

        const verificar = await atualizar.selectByIdMessage(contato.id)

        if(verificar){
            const rsContato = await atualizar.updateMessage(contato)
    
            if(rsContato){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            }else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }  
    }
}

module.exports={
    listarMensagens,
    novaMensagem,
    deletarMensagem,
    buscaIdMensagem,
    atualizarMensagem
}