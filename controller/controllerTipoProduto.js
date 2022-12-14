/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de tipos de bebidas e pizzas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarTiposBebidas = async function(){
    let tiposJSON = {}

    const{selectAllTiposBebidas} = require('../model/dao/tipo_produto.js')

    const tipos = await selectAllTiposBebidas()

    if(tipos){

        tiposJSON.tipos_bebidas = tipos

        return tiposJSON

    }
    
    else{
        return false
    }
}

const novoTipoBebida = async function(nomeTipo){
    if(nomeTipo =='' || nomeTipo == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoTipo = require('../model/dao/tipo_produto.js')

        const rsNovoTipo = await novoTipo.insertTipoBebida(nomeTipo)

        if(rsNovoTipo){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarTipoBebida = async function(idTipo){
    if(idTipo == '' || idTipo == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletarTipo= require('../model/dao/tipo_produto.js')

        const verificar = await deletarTipo.selectByIdTipoBebida(idTipo)

        if(verificar){
            const rsTipo = await deletarTipo.deleteTipoBebida(idTipo)

            if(rsTipo){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaTipoIdBebida = async function(idTipo){
    let tipoJSON = {}

    if(idTipo == '' || idTipo == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdTipoBebida} = require('../model/dao/tipo_produto')

        const tipo = await selectByIdTipoBebida(idTipo)

        if(tipo){
            tipoJSON.tipo = tipo
            return tipoJSON
        }else{
            return false
        }
    }
}

const atualizarTipoBebida = async function(tipoBebida){
    if(tipoBebida.id == '' || tipoBebida.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(tipoBebida.tipo == '' || tipoBebida.tipo ==  undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizarTipo = require('../model/dao/tipo_produto.js')

        const verificar = await atualizarTipo.selectByIdTipoBebida(tipoBebida.id)

        if(verificar){
            const rsTipo = await atualizarTipo.updateTipoBebida(tipoBebida)

            if(rsTipo){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            } else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const listarTiposPizzas = async function(){
    let tiposJSON = {}

    const{selectAllTiposPizzas} = require('../model/dao/tipo_produto.js')

    const tipos = await selectAllTiposPizzas()

    if(tipos){

        tiposJSON.tipos_pizzas = tipos

        return tiposJSON

    }
    
    else{
        return false
    }
}

const novoTipoPizza = async function(nomeTipo){
    if(nomeTipo =='' || nomeTipo == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoTipo = require('../model/dao/tipo_produto.js')

        const rsNovoTipo = await novoTipo.insertTipoPizza(nomeTipo)

        if(rsNovoTipo){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarTipoPizza = async function(idTipo){
    if(idTipo == '' || idTipo == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletarTipo= require('../model/dao/tipo_produto.js')

        const verificar = await deletarTipo.selectByIdTipoPizza(idTipo)

        if(verificar){
            const rsTipo = await deletarTipo.deleteTipoPizza(idTipo)

            if(rsTipo){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaTipoIdPizza = async function(idTipo){
    let tipoJSON = {}

    if(idTipo == '' || idTipo == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdTipoPizza} = require('../model/dao/tipo_produto.js')

        const tipo = await selectByIdTipoPizza(idTipo)

        if(tipo){
            tipoJSON.tipo = tipo
            return tipoJSON
        }else{
            return false
        }
    }
}

const atualizarTipoPizza = async function(tipoPizza){
    if(tipoPizza.id == '' || tipoPizza.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(tipoPizza.tipo == '' || tipoPizza.tipo ==  undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizarTipo = require('../model/dao/tipo_produto.js')

        const verificar = await atualizarTipo.selectByIdTipoPizza(tipoPizza.id)

        if(verificar){
            const rsTipo = await atualizarTipo.updateTipoPizza(tipoPizza)

            if(rsTipo){
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
    listarTiposBebidas,
    novoTipoBebida,
    deletarTipoBebida,
    buscaTipoIdBebida,
    atualizarTipoBebida,
    listarTiposPizzas,
    novoTipoPizza,
    deletarTipoPizza,
    buscaTipoIdPizza,
    atualizarTipoPizza
}