/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados do contato/critica do cliente com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 06/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllMessages = async function(){
    try {

        let sql = `select tbl_contato.id as id_contato, tbl_contato.nome as nome_contato, tbl_contato.mensagem, tbl_contato.op_sugestao_critica, tbl_contato.email as email_contato
        from tbl_contato
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_contato.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
                
                order by tbl_contato.id desc`
        
        const rsMessages = await prisma.$queryRawUnsafe(sql)

        if(rsMessages.length > 0){
            return rsMessages
        }
        
    } catch (error) {
        return false
    }
}

const insertMessage = async function(contato){
    try {

        let sql = `insert into tbl_contato(nome, mensagem, op_sugestao_critica, email, id_pizzaria)
                    values("${contato.nome}", "${contato.mensagem}", ${contato.op_sugestao_critica}, "${contato.email}", 1)`

        const rsMessage = await prisma.$executeRawUnsafe(sql)

        if(rsMessage){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteMessage = async function(id){
    try {

        let sql = `delete from tbl_contato where id = ${id}`


        const rsContato =await prisma.$queryRawUnsafe(sql)

        if(rsContato){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdMessage = async function(id){
    try {

        let sql = `select tbl_contato.id as id_contato, tbl_contato.nome as nome_contato, tbl_contato.mensagem, tbl_contato.op_sugestao_critica, tbl_contato.email as email_contato
        from tbl_contato
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_contato.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
                
                where tbl_contato.id = ${id}`

        const rsContato = await prisma.$queryRawUnsafe(sql)

        if(rsContato.length>0){
            return rsContato
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateMessage = async function(contato){
    try {
        let sql = `update tbl_contato set nome = "${contato.nome}", mensagem = "${contato.mensagem}", op_sugestao_critica = ${contato.op_sugestao_critica}, email = "${contato.email}", id_pizzaria = 1  where id= ${contato.id}`

        const rsMessage = await prisma.$executeRawUnsafe(sql)

        if(rsMessage){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllMessages,
    insertMessage,
    deleteMessage,
    selectByIdMessage,
    updateMessage
}