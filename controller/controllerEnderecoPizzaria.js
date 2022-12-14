/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de endereço da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarEnderecoPizzaria = async function(){
    let enderecoJSON = {}

    const{selectEnderecoPizzaria} = require('../model/dao/endereco_pizzaria.js')

    const dadosEndereco = await selectEnderecoPizzaria()

    if(dadosEndereco){

        enderecoJSON.endereco = dadosEndereco

        return enderecoJSON

    }
    
    else{
        return false
    }
}

const novoEndereco = async function(endereco){
    if(endereco.rua =='' || endereco.rua == undefined || endereco.numero =='' || endereco.numero == undefined|| endereco.cep =='' || endereco.cep == undefined||endereco.uf =='' || endereco.uf == undefined||endereco.cidade =='' || endereco.cidade == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoEndereco = require('../model/dao/endereco_pizzaria.js')

        const rsNovoEndereco = await novoEndereco.insertEnderecoPizzaria(endereco)

        if(rsNovoEndereco){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarEndereco = async function(idEndereco){
    if(idEndereco == '' || idEndereco == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletarEndereco = require('../model/dao/endereco_pizzaria.js')

        const verificar = await deletarEndereco.selectByIdEndereco(idEndereco)

        if(verificar){
            const rsEndereco = await deletarEndereco.deleteEndereco(idEndereco)

            if(rsEndereco){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaEnderecoId = async function(idEndereco){
    let enderecoJSON = {}

    if(idEndereco == '' || idEndereco == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdEndereco} = require('../model/dao/endereco_pizzaria.js')

        const endereco = await selectByIdEndereco(idEndereco)

        if(endereco){
            enderecoJSON.endereco = endereco
            return enderecoJSON
        }else{
            return false
        }
    }
}

const atualizarEndereco = async function(endereco){
    if(endereco.id == '' || endereco.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(endereco.rua =='' || endereco.rua == undefined || endereco.numero =='' || endereco.numero == undefined|| endereco.cep =='' || endereco.cep == undefined||endereco.uf =='' || endereco.uf == undefined||endereco.cidade =='' || endereco.cidade == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizarEndereco = require('../model/dao/endereco_pizzaria.js')

        const verificar = await atualizarEndereco.selectByIdEndereco(endereco.id)

        if(verificar){
            const rsEndereco = await atualizarEndereco.updateEndereco(endereco)

            if(rsEndereco){
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
    listarEnderecoPizzaria,
    novoEndereco,
    deletarEndereco,
    buscaEnderecoId,
    atualizarEndereco
}