/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model do usuário
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 08/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarUsuarios = async function(){
    let usuariosJSON = {}

    const{selectAllUsuarios} = require('../model/dao/usuario.js')

    const usuarios = await selectAllUsuarios()

    if(usuarios){

        usuariosJSON.usuarios = usuarios

        return usuariosJSON

    }
    
    else{
        return false
    }
}

const novoUsuario = async function(usuario){
    if(usuario.nome == undefined || usuario.nome == '' || usuario.login == undefined || usuario.login == '' || usuario.senha == undefined || usuario.senha == '' || usuario.nivel_permissao == undefined || usuario.nivel_permissao == ''){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const usuarioModel = require('../model/dao/usuario.js')

        const rsUsuario = await usuarioModel.insertUsuario(usuario)

        if(rsUsuario){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarUsuario = async function(idUsuario){
    if(idUsuario == '' || idUsuario == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar = require('../model/dao/usuario.js')

        const verificar = await deletar.selectByIdUsuario(idUsuario)

        if(verificar){
            const rsUsuario = await deletar.deleteUsuario(idUsuario)

            if(rsUsuario){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaUsuarioId = async function(idUsuario){
    let usuarioJSON = {}

    if(idUsuario == '' || idUsuario == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdUsuario} = require('../model/dao/usuario.js')

        const usuario = await selectByIdUsuario(idUsuario)

        if(usuario){
            usuarioJSON.usuario = usuario
            return usuarioJSON
        }else{
            return false
        }
    }
}

const atualizarUsuario = async function(usuario){
    if(usuario.id == '' || usuario.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(usuario.nome == undefined || usuario.nome == '' || usuario.login == undefined || usuario.login == '' || usuario.senha == undefined || usuario.senha == '' || usuario.nivel_permissao == undefined || usuario.nivel_permissao == ''){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizarUsuario = require('../model/dao/usuario.js')

        const verificar = await atualizarUsuario.selectByIdUsuario(usuario.id)

        if(verificar){
            const rsUsuario = await atualizarUsuario.updateUsuario(usuario)

            if(rsUsuario){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            } else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const autenticarUsuario = async function(usuario){
    if(usuario.login == undefined || usuario.login == '' || usuario.senha == '' || usuario.senha == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const autenticarUsuario = require('../model/dao/usuario.js')
        //import da biblioteca do jwt
        const jwt = require('../middleware/middlewareJWT.js')

        const autenticar = await autenticarUsuario.autenticateUserLoginEmail(usuario)

        if(autenticar){
            //gera o token pelo jwt usando o id do usuario
            let tokenUser = await jwt.createJWT(usuario.id)

            //add uma chave no json com o token do usuario
            autenticar[0].token =  tokenUser

            
            return {status:200, message: autenticar}
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

module.exports={
    novoUsuario,
    listarUsuarios,
    autenticarUsuario,
    buscaUsuarioId,
    deletarUsuario,
    atualizarUsuario
}