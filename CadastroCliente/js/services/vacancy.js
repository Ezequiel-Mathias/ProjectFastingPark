/**
 * Arquivo responsável por realizar as requisições para a API
 * @author Thales Santos
 * @date 14/06/2022
 */

 'use strict'

 // URL BASE DA API
 import { BASE_API } from './config.js'
 
 /*_________     Vagas    __________ */
 
 /**
  * Função responsável por retornar as vagas livres para seleção
  * @author Thales Santos
  * @param {Integer} idTipoVeiculo ID do tipo de veiculo
  * @return {JSON}
  */
 export const getVagas = async (idTipoVeiculo) => {
     // Realizando requisição para a API
     const response = await fetch(`${BASE_API}/vaga/livres/tipo/${idTipoVeiculo}`)
 
     // Resgatando o JSON da requisição
     const data = await response.json()
 
     // Retornando os dados
     return data
 }
 