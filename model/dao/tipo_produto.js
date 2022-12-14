/* 

- OBJETIVO: Arquivo responsável pela manipulação dos tipos das pizzas e das bebidas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllTiposPizzas = async function(){
    try {

        let sql = `select * from tbl_tipo_pizza order by id desc`

        const rsTipos = await prisma.$queryRawUnsafe(sql)

        if(rsTipos.length > 0){
            return rsTipos
        }
        
    } catch (error) {
        return false
    }
}

const insertTipoPizza = async function(nomeTipo){
    try {

        let sql = `insert into tbl_tipo_pizza(tipo)
                                    values("${nomeTipo.tipo}")`

        const rsTipo = await prisma.$executeRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteTipoPizza = async function(id){
    try {

        let sql = `delete from tbl_tipo_pizza where id = ${id}`

        const rsTipo =await prisma.$queryRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdTipoPizza = async function(id){
    try {

        let sql = `select * from tbl_tipo_pizza where id = ${id}`

        const rsTipo = await prisma.$queryRawUnsafe(sql)

        if(rsTipo.length>0){
            return rsTipo
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateTipoPizza = async function(tipo){
    try {
        let sql = `update tbl_tipo_pizza set tipo = "${tipo.tipo}" where id= ${tipo.id}`

        const rsTipo = await prisma.$executeRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

const selectAllTiposBebidas = async function(){
    try {

        let sql = `select * from tbl_tipo_bebida order by id desc`

        const rsTipos = await prisma.$queryRawUnsafe(sql)

        if(rsTipos.length > 0){
            return rsTipos
        }
        
    } catch (error) {
        return false
    }
}

const insertTipoBebida = async function(nomeTipo){
    try {

        let sql = `insert into tbl_tipo_bebida(tipo)
                                    values("${nomeTipo.tipo}")`

        const rsTipo = await prisma.$executeRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteTipoBebida = async function(id){
    try {

        let sql = `delete from tbl_tipo_bebida where id = ${id}`

        const rsTipo =await prisma.$queryRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdTipoBebida = async function(id){
    try {

        let sql = `select * from tbl_tipo_bebida where id = ${id}`

        const rsTipo = await prisma.$queryRawUnsafe(sql)

        if(rsTipo.length>0){
            return rsTipo
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateTipoBebida = async function(tipo){
    try {
        let sql = `update tbl_tipo_bebida set tipo = "${tipo.tipo}" where id= ${tipo.id}`

        const rsTipo = await prisma.$executeRawUnsafe(sql)

        if(rsTipo){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllTiposPizzas,
    insertTipoPizza,
    deleteTipoPizza,
    selectByIdTipoPizza,
    updateTipoPizza,
    selectAllTiposBebidas,
    insertTipoBebida,
    deleteTipoBebida,
    selectByIdTipoBebida,
    updateTipoBebida
}