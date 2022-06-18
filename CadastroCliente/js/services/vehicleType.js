/**
 * Arquivo responsável por realizar as requisições para a API
 * @author Thales Santos
 * @date 14/06/2022
 */

'use strict'

// URL BASE DA API
import { BASE_API } from './config.js'

 /**
  * Função responsável por retornar os Tipos de veículo
  * @author Thales Santos
  * @param {Void}
  * @return {JSON}
  */
 export const getVeiculos = async (idTipoVeiculo) => {
    // Realizando requisição para a API
    const response = await fetch(`${BASE_API}/tipo`)

    // Resgatando o JSON da requisição
    const data = await response.json()

    // Retornando os dados
    return data
}