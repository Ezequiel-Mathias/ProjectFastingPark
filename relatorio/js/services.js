/**
 * Arquivo responsável por realizar as requisições para a API
 * @author Thales Santos
 * @date 14/06/2022
 */

 'use strict'

// URL BASE DA API
const BASE_API = 'http://localhost/senai/fastparking/api'

/**
 * Função responsável por trazer os dados de relatório
 * @author Thales Santos
 * @param {Void}
 * @return {JSON} Dados encontrados
 */
const getReport = async () => {
    // Realizando a requisição
    const response = await fetch(`${BASE_API}/relatorio`)

    // Resgatando o JSON da resposta
    const data = await response.json()

    // Retornando os dados
    return data
}

export { getReport }