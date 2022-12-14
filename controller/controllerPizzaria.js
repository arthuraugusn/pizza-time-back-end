/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarPizzaria = async function(){
    let pizzariaJSON = {}

    const{selectAllInfosPizzarias} = require('../model/dao/pizzaria.js')

    const dadosPizzaria = await selectAllInfosPizzarias()

    if(dadosPizzaria){

        pizzariaJSON.pizzaria = dadosPizzaria

        return pizzariaJSON

    }
    
    else{
        return false
    }
}

const novosDadosPizzaria = async function(pizzaria){
    if(pizzaria.nome =='' || pizzaria.nome == undefined || pizzaria.cnpj =='' || pizzaria.cnpj == undefined|| pizzaria.telefone =='' || pizzaria.telefone == undefined||pizzaria.celular =='' || pizzaria.celular == undefined||pizzaria.id_endereco_pizzaria =='' || pizzaria.id_endereco_pizzaria == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novosDadosPizzaria = require('../model/dao/pizzaria.js')

        const rsDadosPizzaria = await novosDadosPizzaria.insertInfosPizzaria(pizzaria)

        if(rsDadosPizzaria){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarDadosPizzaria = async function(idPizzaria){
    if(idPizzaria == '' || idPizzaria == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar = require('../model/dao/pizzaria.js')

        const verificar = await deletar.selectByIdInfosPizzaria(idPizzaria)

        if(verificar){
            const rsDadosPizzaria = await deletar.deleteInfosPizzaria(idPizzaria)

            if(rsDadosPizzaria){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaDadosPizzariaId = async function(idPizzaria){
    let pizzariaJSON = {}

    if(idPizzaria == '' || idPizzaria == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdInfosPizzaria} = require('../model/dao/pizzaria.js')

        const pizzaria = await selectByIdInfosPizzaria(idPizzaria)

        if(pizzaria){
            pizzariaJSON.pizzaria = pizzaria
            return pizzariaJSON
        }else{
            return false
        }
    }
}

const atualizarDadosPizzaria = async function(pizzaria){
    if(pizzaria.id == '' || pizzaria.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(pizzaria.nome =='' || pizzaria.nome == undefined || pizzaria.cnpj =='' || pizzaria.cnpj == undefined|| pizzaria.telefone =='' || pizzaria.telefone == undefined||pizzaria.celular =='' || pizzaria.celular == undefined||pizzaria.id_endereco_pizzaria =='' || pizzaria.id_endereco_pizzaria == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizarPizzaria = require('../model/dao/pizzaria.js')

        const verificar = await atualizarPizzaria.selectByIdInfosPizzaria(pizzaria.id)

        if(verificar){
            const rsDadosPizzaria = await atualizarPizzaria.updateInfosPizzaria(pizzaria)

            if(rsDadosPizzaria){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            } else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

module.exports={
    listarPizzaria,
    novosDadosPizzaria,
    deletarDadosPizzaria,
    buscaDadosPizzariaId,
    atualizarDadosPizzaria
}