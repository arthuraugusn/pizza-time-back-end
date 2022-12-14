/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos produtos, das pizzas e das bebidas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllInfosProdutos = async function(){
    try {

        let sql = `select * from tbl_produto order by id desc`

        const rsProdutos = await prisma.$queryRawUnsafe(sql)

        if(rsProdutos.length > 0){
            return rsProdutos
        }
        
    } catch (error) {
        return false
    }
}

const insertDadosProduto = async function(produto){
    try {

        let sql = `insert into tbl_produto(preco, foto, nome, promocao, descricao, id_pizzaria)
                    values(${produto.preco}, "${produto.foto}", "${produto.nome}", ${produto.promocao}, "${produto.descricao}", 1)`

        const rsProdutos = await prisma.$executeRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteProduto = async function(id){
    try {

        let sql = `delete from tbl_produto where id = ${id}`

        const rsProdutos =await prisma.$queryRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdProduto = async function(id){
    try {

        let sql = `select * from tbl_produto
                    where tbl_produto.id = ${id}`

        const rsProdutos = await prisma.$queryRawUnsafe(sql)

        if(rsProdutos.length>0){
            return rsProdutos
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateProduto = async function(produto){
    try {
        let sql = `update tbl_produto set preco = ${produto.preco}, foto = "${produto.foto}", promocao = ${produto.promocao}, descricao = "${produto.descricao}", 1
                    where id= ${produto.id}`

        const rsProdutos = await prisma.$executeRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

const selectLastIdProduto = async function(){
    try {
        const sql = `select id from tbl_produto order by id desc limit 1`

        const rsProduto = await prisma.$queryRawUnsafe(sql)

        if(rsProduto){
            return rsProduto[0].id
        }else{
            return false
        }
    } catch (error) {
        return false
    }
    
}      

const selectAllPizzas = async function(){
    try {

        let sql = `select tbl_pizza.id as id_pizza,tbl_pizza.favorito as qntde_favorito, tbl_produto.nome as nome_pizza,tbl_produto.foto, tbl_produto.preco,tbl_tipo_pizza.id as id_tipo_pizza, tbl_tipo_pizza.tipo as tipo_pizza,tbl_tamanho_pizza.id as id_tamanho_pizza, tbl_tamanho_pizza.tamanho as tamanho_pizza
        from tbl_pizza
            inner join tbl_tamanho_pizza on
                tbl_tamanho_pizza.id = tbl_pizza.id_tamanho_pizza
            inner join tbl_tipo_pizza on
                tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
            inner join tbl_produto on
                tbl_produto.id = tbl_pizza.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria 
                
        order by tbl_pizza.id desc`



        const rsPizzas = await prisma.$queryRawUnsafe(sql)

        if(rsPizzas.length > 0){
            return rsPizzas
        }
        
    } catch (error) {
        return false
    }
}

const insertPizza = async function(pizza){
    try {

        let sql = `insert into tbl_pizza(id_tipo_pizza, id_tamanho_pizza, id_produto, favorito)
                    values(${pizza.id_tipo_pizza}, ${pizza.id_tamanho_pizza}, ${pizza.id_produto}, ${pizza.favorito})`

        const rsPizza = await prisma.$executeRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deletePizza = async function(id){
    try {

        let sql = `delete from tbl_pizza where id = ${id}`

        const rsPizza =await prisma.$queryRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdPizza = async function(id){
    try {

        let sql = `select tbl_pizza.id as id_pizza,tbl_pizza.favorito as qntde_favorito, tbl_produto.nome as nome_pizza, tbl_produto.preco, tbl_tipo_pizza.tipo as tipo_pizza, tbl_tamanho_pizza.tamanho as tamanho_pizza
        from tbl_pizza
            inner join tbl_tamanho_pizza on
                tbl_tamanho_pizza.id = tbl_pizza.id_tamanho_pizza
            inner join tbl_tipo_pizza on
                tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
            inner join tbl_produto on
                tbl_produto.id = tbl_pizza.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria 
        
        where tbl_pizza.id = ${id}        `

        const rsPizza = await prisma.$queryRawUnsafe(sql)

        if(rsPizza.length>0){
            return rsPizza
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updatePizza = async function(pizza){
    try {
        let sql = `update tbl_pizza set id_tipo_pizza = ${pizza.id_tipo_pizza}, id_tamanho_pizza = ${pizza.id_tamanho_pizza},id_produto = ${pizza.id_produto}, favorito = ${pizza.favorito}  where id= ${pizza.id}`

        const rsPizza = await prisma.$executeRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

const selectAllBebidas = async function(){
    try {

        let sql = `select tbl_bebida.id as id_bebida,tbl_produto.foto, tbl_bebida.ml as mililitros_bebida, tbl_produto.nome as nome_bebida, tbl_produto.preco, tbl_produto.descricao, tbl_tamanho_bebida.tamanho as tamanho_bebida, tbl_tipo_bebida.tipo as tipo_bebida
                    from tbl_bebida
                        inner join tbl_tamanho_bebida on
                            tbl_tamanho_bebida.id = tbl_bebida.id_tamanho_bebida
                        inner join tbl_tipo_bebida on
                            tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
                        inner join tbl_produto on
                            tbl_produto.id = tbl_bebida.id_produto
                        inner join tbl_pizzaria on
                            tbl_pizzaria.id = tbl_produto.id_pizzaria
                        inner join tbl_endereco_pizzaria on
                            tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
                            
                    order by tbl_bebida.id desc`

        const rsBebidas = await prisma.$queryRawUnsafe(sql)

        if(rsBebidas.length > 0){
            return rsBebidas
        }
        
    } catch (error) {
        return false
    }
}

const insertBebida = async function(bebida){
    try {

        let sql = `insert into tbl_bebida(ml, id_produto, id_tamanho_bebida, id_tipo_bebida)
                    values(${bebida.ml}, ${bebida.id_produto}, ${bebida.id_tamanho_bebida}, ${bebida.id_tipo_bebida})`

        const rsBebida = await prisma.$executeRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteBebida = async function(id){
    try {

        let sql = `delete from tbl_bebida where id = ${id}`

        const rsBebida =await prisma.$queryRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdBebida = async function(id){
    try {

        let sql = `select tbl_bebida.id as id_bebida, tbl_bebida.ml as mililitros_bebida, tbl_produto.nome as nome_bebida, tbl_produto.preco, tbl_produto.descricao, tbl_tamanho_bebida.tamanho as tamanho_bebida, tbl_tipo_bebida.tipo as tipo_bebida
        from tbl_bebida
            inner join tbl_tamanho_bebida on
                tbl_tamanho_bebida.id = tbl_bebida.id_tamanho_bebida
            inner join tbl_tipo_bebida on
                tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
            inner join tbl_produto on
                tbl_produto.id = tbl_bebida.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
            
            where tbl_bebida.id = ${id}    `

        const rsBebida = await prisma.$queryRawUnsafe(sql)

        if(rsBebida.length>0){
            return rsBebida
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateBebida = async function(bebida){
    try {
        let sql = `update tbl_bebida set ml = ${bebida.ml},id_produto = ${bebida.id_produto}, id_tamanho_bebida = ${bebida.id_tamanho_bebida}, id_tipo_bebida = ${bebida.id_tipo_bebida}  where id= ${bebida.id}`

        const rsBebida = await prisma.$executeRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}


module.exports={
    selectAllInfosProdutos,
    insertDadosProduto,
    selectByIdProduto,
    deleteProduto,
    updateProduto,
    selectLastIdProduto,
    selectAllPizzas,
    insertPizza,
    deletePizza,
    selectByIdPizza,
    updatePizza,
    selectAllBebidas,
    insertBebida,
    deleteBebida,
    selectByIdBebida,
    updateBebida
}