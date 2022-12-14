/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados do endereço da pizzaria com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectEnderecoPizzaria = async function(){
    try {

        let sql = `select * from tbl_endereco_pizzaria order by id desc`

        const rsEndereco = await prisma.$queryRawUnsafe(sql)

        if(rsEndereco.length > 0){
            return rsEndereco
        }
        
    } catch (error) {
        return false
    }
}

const insertEnderecoPizzaria = async function(endereco){
    try {

        let sql = `insert into tbl_endereco_pizzaria(rua, numero, cep, uf, cidade)
                                                        values("${endereco.rua}", ${endereco.numero}, "${endereco.cep}", "${endereco.uf}", "${endereco.cidade}")`


        const rsEndereco = await prisma.$executeRawUnsafe(sql)


        if(rsEndereco){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdEndereco = async function(id){
    try {

        let sql = `select * from tbl_endereco_pizzaria where id = ${id}`

        const rsEndereco = await prisma.$queryRawUnsafe(sql)

        if(rsEndereco.length>0){
            return rsEndereco
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const deleteEndereco = async function(id){
    try {

        let sql = `delete from tbl_endereco_pizzaria where id = ${id}`

        const rsEndereco =await prisma.$queryRawUnsafe(sql)

        if(rsEndereco){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateEndereco = async function(endereco){
    try {
        let sql = `update tbl_endereco_pizzaria set rua = "${endereco.rua}", numero = ${endereco.numero}, cep = "${endereco.cep}", uf = "${endereco.uf}", cidade = "${endereco.cidade}" 
                   where id= ${endereco.id}`

        const rsEndereco = await prisma.$executeRawUnsafe(sql)

        if(rsEndereco){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectEnderecoPizzaria,
    updateEndereco,
    deleteEndereco,
    insertEnderecoPizzaria,
    selectByIdEndereco
}