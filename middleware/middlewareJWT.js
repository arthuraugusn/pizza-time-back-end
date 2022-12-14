 /*

- OBJETIVO: Implementação do token JWT no projeto
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araujo
- DATA DE CRIAÇÃO: 12/12/2022
- VERSÃO: 1.0

*/

//Import da biblioteca do jsonwebtoken
const jwt  = require('jsonwebtoken')

//Chave secreta para a criação do JWT
const secret = 'i05gf12aa30s09n2005'

//Tempo para validação do token JWT
const expires = 80

//Criação do JWT (retorna um token)
const createJWT = async (payLoad)=>{4
    //criação do token onde ele receberá o id/usuario, a chave secreta e o tempo para expirar este token
    //payload = id do usuario autenticado
    //secret = chava secreta criada
    //expiresIN = tempo de expiração do token
    const token = jwt.sign({userId: payLoad}, secret, {expiresIn: expires})

    return token

}

//Validação do JWT (recebe um token e verifica autenticidade)
const validateJWT = async (token)=>{
    let status
    //valida a autenticidade do token
    jwt.verify(token, secret, async function(err, decode){
        if(err){
            status = false
        }else{
            status = true
        }
    })

    return status
}

module.exports={
    createJWT,
    validateJWT
}