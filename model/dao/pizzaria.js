/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados da pizzaria com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllInfosPizzarias = async function(){
    try {

        let sql = `select tbl_pizzaria.id as id_pizzaria, tbl_pizzaria.nome as nome_pizzaria, tbl_pizzaria.cnpj, tbl_pizzaria.telefone as telefone_pizzaria, tbl_pizzaria.celular as celular_pizzaria, tbl_endereco_pizzaria.rua as rua_pizzaria, tbl_endereco_pizzaria.numero as numero_pizzaria, tbl_endereco_pizzaria.cep, tbl_endereco_pizzaria.uf, tbl_endereco_pizzaria.cidade, tbl_pizzaria.id_endereco_pizzaria
                   from tbl_pizzaria
                   inner join tbl_endereco_pizzaria on
                        tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria order by tbl_pizzaria.id desc`

        const rsPizzaria = await prisma.$queryRawUnsafe(sql)

        if(rsPizzaria.length > 0){
            return rsPizzaria
        }
        
    } catch (error) {
        return false
    }
}

const insertInfosPizzaria = async function(pizzaria){
    try {

        let sql = `insert into tbl_pizzaria(nome, cnpj, telefone, celular, id_endereco_pizzaria)
                    values('${pizzaria.nome}', '${pizzaria.cnpj}', '${pizzaria.telefone}', '${pizzaria.celular}', ${pizzaria.id_endereco_pizzaria})`

        const rsPizzaria = await prisma.$executeRawUnsafe(sql)

        if(rsPizzaria){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteInfosPizzaria = async function(id){
    try {

        let sql = `delete from tbl_pizzaria where id = ${id}`

        const rsPizzaria =await prisma.$queryRawUnsafe(sql)

        if(rsPizzaria){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdInfosPizzaria = async function(id){
    try {

        let sql = `select tbl_pizzaria.id as id_pizzaria, tbl_pizzaria.nome as nome_pizzaria, tbl_pizzaria.cnpj, tbl_pizzaria.telefone as telefone_pizzaria, tbl_pizzaria.celular as celular_pizzaria, tbl_endereco_pizzaria.rua as rua_pizzaria, tbl_endereco_pizzaria.numero as numero_pizzaria, tbl_endereco_pizzaria.cep, tbl_endereco_pizzaria.uf, tbl_endereco_pizzaria.cidade, tbl_pizzaria.id_endereco_pizzaria
                    from tbl_pizzaria
                    inner join tbl_endereco_pizzaria on
                        tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
                    where tbl_pizzaria.id = ${id};`

        const rsPizzaria = await prisma.$queryRawUnsafe(sql)

        if(rsPizzaria.length>0){
            return rsPizzaria
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateInfosPizzaria = async function(pizzaria){
    try {
        let sql = `update tbl_pizzaria set nome = '${pizzaria.nome}', cnpj = '${pizzaria.cnpj}', telefone = '${pizzaria.telefone}', celular = '${pizzaria.celular}', id_endereco_pizzaria = ${pizzaria.id_endereco_pizzaria}
                    where id= ${pizzaria.id}`

        const rsPizzaria = await prisma.$executeRawUnsafe(sql)

        if(rsPizzaria){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllInfosPizzarias,
    insertInfosPizzaria,
    deleteInfosPizzaria,
    selectByIdInfosPizzaria,
    updateInfosPizzaria
}