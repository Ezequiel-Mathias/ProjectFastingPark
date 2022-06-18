/**
 * Arquivo responsável por realizar as requisições para a API
 * @author Thales Santos
 * @date 14/06/2022
 */

'use strict'

// Imports 
import {getReport} from './services.js'


/**
 * Função responsável por atualizar os dados da tabela
 * @author Thales Santos
 * @param {Void}
 * @return {Void}
 */
const updateTable = async () => {
    // Resgatando as tables
    const daily = document.getElementById('reportDaily')
    const monthly = document.getElementById('reportMonthly')
    const yearly = document.getElementById('reportYearly')

    // Atualizando as tabelas
    const reports = await getReport()

    const reportDaily   = reports.diario.map(creteRows)
    const reportMonthly = reports.mensal.map(creteRows)
    const reportYearly  = reports.anual.map(creteRows)

    // Substituindo as linhas das tabelas pelo conteúdo atualizado
    daily.replaceChildren(...reportDaily)
    monthly.replaceChildren(...reportMonthly)
    yearly.replaceChildren(...reportYearly)
}

/**
 * Função responsável por criar linhas de tabela
 * @author Thales Santos
 * @param {String} data Data do relatório
 * @param {Double} rendimento Rendimento
 * @return {HTMLTableRowElement}  
 */
const creteRows = ({data, rendimento}) => {
    // Criando elemento TR
    const trElement = document.createElement('tr')

    // Preenchendo a tr
    trElement.innerHTML = `
        <td>${data}</td>
        <td>R$ ${rendimento}</td>
    `

    // Retornando o elemento criado
    return trElement
}


updateTable()



