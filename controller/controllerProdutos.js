/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model dos produtos, pizzas e bebidas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarPizzaria = async function(){
    let produtosJSON = {}

    const{selectAllInfosProdutos} = require('../model/dao/produto.js')

    const dadosProdutos = await selectAllInfosProdutos()

    if(dadosProdutos){

        produtosJSON.produtos = dadosProdutos

        return produtosJSON

    }
    
    else{
        return false
    }
}

const novoProduto = async function(produto){
    if(produto.preco =='' || produto.preco == undefined || produto.foto =='' || produto.foto == undefined|| produto.nome =='' || produto.nome == undefined ||produto.descricao =='' || produto.descricao == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoProduto = require('../model/dao/produto.js')

        if(produto.promocao == ''|| produto.promocao == undefined){
            produto.promocao = 0

            const rsProduto = await novoProduto.insertDadosProduto(produto)
    
            if(rsProduto){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            const rsProduto = await novoProduto.insertDadosProduto(produto)
    
            if(rsProduto){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    }
}

const deletarProduto = async function(idProduto){
    if(idProduto == '' || idProduto == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar = require('../model/dao/produto.js')

        const verificar = await deletar.selectByIdProduto(idProduto)

        if(verificar){
            const rsDadosProduto = await deletar.deleteProduto(idProduto)

            if(rsDadosProduto){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaDadosPizzariaId = async function(idProduto){
    let produtoJSON = {}

    if(idProduto == '' || idProduto == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdProduto} = require('../model/dao/produto.js')

        const produto = await selectByIdProduto(idProduto)

        if(produto){
            produtoJSON.produto = produto
            return produtoJSON
        }else{
            return false
        }
    }
}

const atualizarProduto = async function(produto){
    if(produto.id == '' || produto.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(produto.preco =='' || produto.preco == undefined || produto.foto =='' || produto.foto == undefined|| produto.nome =='' || produto.nome == undefined ||produto.descricao =='' || produto.descricao == undefined || produto.id_pizzaria =='' || produto.id_pizzaria == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/produto.js')

        const verificar = await atualizar.selectByIdProduto(produto.id)

        if(produto.promocao == '' || produto.promocao == undefined){
            produto.promocao = 0
            if(verificar){
                const rsProduto = await atualizar.updateProduto(produto)
    
                if(rsProduto){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }else{
            if(verificar){
                const rsProduto = await atualizar.updateProduto(produto)
    
                if(rsProduto){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }        
    }
}

const listarPizzas = async function(){
    let pizzasJSON = {}

    const{selectAllPizzas} = require('../model/dao/produto.js')

    const pizzas = await selectAllPizzas()

    if(pizzas){

        pizzasJSON.pizzas = pizzas

        return pizzasJSON

    }
    
    else{
        return false
    }
}

const novaPizza = async function(pizza){

    const lastId = require('../model/dao/produto.js')
    
    const idProduto = await lastId.selectLastIdProduto()

    if(idProduto>0){
        pizza.id_produto = idProduto
        if(pizza.id_tipo_pizza =='' || pizza.id_tipo_pizza == undefined || pizza.id_tamanho_pizza =='' || pizza.id_tamanho_pizza == undefined || pizza.id_produto =='' || pizza.id_produto == undefined){
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
        }else{
            const novaPizza = require('../model/dao/produto.js')
    
            if(pizza.favorito =='' || pizza.favorito == undefined || pizza.favorito != 0){
                pizza.favorito = 0
    
                const rsnovaPizza = await novaPizza.insertPizza(pizza)
    
                if(rsnovaPizza){
                    return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
                }else{
                    return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                const rsnovaPizza = await novaPizza.insertPizza(pizza)
    
                if(rsnovaPizza){
                    return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
                }else{
                    return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }
        }
    
    }else{
        return {status: 500,message:MESSAGE_ERROR.NOT_FOUND_ID_PRODUTO}
    }
}

const deletarPizza = async function(idPizza){
    if(idPizza == '' || idPizza == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar= require('../model/dao/produto.js')
        

        const verificar = await deletar.selectByIdPizza(idPizza)

        if(verificar){
            const rsPizza = await deletar.deletePizza(idPizza)

            if(rsPizza){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaIdPizza = async function(idPizza){
    let pizzaJSON = {}

    if(idPizza == '' || idPizza == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdPizza} = require('../model/dao//produto.js')

        const pizza = await selectByIdPizza(idPizza)

        if(pizza){
            pizzaJSON.pizza = pizza
            return pizzaJSON
        }else{
            return false
        }
    }
}

const atualizarPizza = async function(pizza){
    if(pizza.id == '' || pizza.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(pizza.id_tipo_pizza =='' || pizza.id_tipo_pizza == undefined || pizza.id_tamanho_pizza =='' || pizza.id_tamanho_pizza == undefined || pizza.id_produto =='' || pizza.id_produto == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/produto.js')

        if(pizza.favorito =='' || pizza.favorito == undefined || pizza.favorito != 0){
            pizza.favorito = 0

            const verificar = await atualizar.selectByIdPizza(pizza.id)

            if(verificar){
                const rsPizza = await atualizar.updatePizza(pizza)
    
                if(rsPizza){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }
        const verificar = await atualizar.selectByIdTipoPizza(tipoPizza.id)

            if(verificar){
                const rsPizza = await atualizar.updateTipoPizza(tipoPizza)
    
                if(rsPizza){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }  
    }
}

const listarBebidas = async function(){
    let bebidasJSON = {}

    const{selectAllBebidas} = require('../model/dao//produto.js')

    const bebidas = await selectAllBebidas()

    if(bebidas){

        bebidasJSON.bebidas = bebidas

        return bebidasJSON

    }
    
    else{
        return false
    }
}

const novaBebida = async function(bebida){
    const lastId = require('../model/dao/produto.js')
    
    const idProduto = await lastId.selectLastIdProduto()
    if(idProduto>0){
        bebida.id_produto = idProduto

        if(bebida.id_tipo_bebida =='' || bebida.id_tipo_bebida == undefined || bebida.id_tamanho_bebida =='' || bebida.id_tamanho_bebida == undefined || bebida.id_produto =='' || bebida.id_produto == undefined || bebida.ml == '' || bebida.ml == undefined){
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
        }else{
            const novaBebida = require('../model/dao/produto.js')

             const rsNovaBebida = await novaBebida.insertBebida(bebida)

            if(rsNovaBebida){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    }else{
        return {status: 500,message:MESSAGE_ERROR.NOT_FOUND_ID_PRODUTO}
    }
}

const deletarBebida = async function(idBebida){
    if(idBebida == '' || idBebida == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar= require('../model/dao/produto.js')

        const verificar = await deletar.selectByIdBebida(idBebida)

        if(verificar){
            const rsBebida = await deletar.deleteBebida(idBebida)

            if(rsBebida){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaIdBebida = async function(idBebida){
    let bebidaJSON = {}

    if(idBebida == '' || idBebida == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdBebida} = require('../model/dao/produto.js')

        const bebida = await selectByIdBebida(idBebida)

        if(bebida){
            bebidaJSON.bebida = bebida
            return bebidaJSON
        }else{
            return false
        }
    }
}

const atualizarBebida = async function(bebida){
    if(bebida.id == '' || bebida.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(bebida.id_tipo_bebida =='' || bebida.id_tipo_bebida == undefined || bebida.id_tamanho_bebida =='' || bebida.id_tamanho_bebida == undefined || bebida.id_produto =='' || bebida.id_produto == undefined || bebida.ml == '' || bebida.ml == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/produto.js')

        const verificar = await atualizar.selectByIdBebida(bebida.id)

        if(verificar){
            const rsBebida = await atualizar.updateBebida(bebida)
    
            if(rsBebida){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            }else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }  
    }
}

module.exports={
    listarPizzaria,
    novoProduto,
    deletarProduto,
    buscaDadosPizzariaId,
    atualizarProduto,
    listarPizzas,
    novaPizza,
    deletarPizza,
    buscaIdPizza,
    atualizarPizza,
    listarBebidas,
    novaBebida,
    deletarBebida,
    buscaIdBebida,
    atualizarBebida
}