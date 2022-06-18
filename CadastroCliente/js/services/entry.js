/**
 * Arquivo responsável por realizar as requisições para a API
 * @author Thales Santos
 * @date 14/06/2022
 */

 'use strict'

 // URL BASE DA API
 import { BASE_API } from './config.js'

 /*_________     Entrada    __________ */

/**
 * Função responsável por registrar a entrada 
 * @author Thales Santos
 * @param {Object} data Dados da entrada
 * @return {Void}
 */
const saveEntry = async (data) => {
    // Configurando a requisição
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }

    // Realizando a requisição
    const response = await fetch(`${BASE_API}/movimentacao/entrada`, options)

    // Pegando os dados retornados pela API 
    const dadosJSON = await response.json()   

    // Verificando o retorno da API
    if(response.ok)
        return dadosJSON 
    else {
        alert(dadosJSON.message)
        return false
    }
}


// Exports
export {saveEntry}