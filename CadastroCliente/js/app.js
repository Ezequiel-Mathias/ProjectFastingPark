/**
 * Arquivo principal que chama as outras funções
 * @author Thales Santos
 * @date 14/06/2022
 */

'use strict'

// Imports
import {saveEntry} from './services/entry.js'
import {getVagas} from './services/vacancy.js'
import {getVeiculos} from './services/vehicleType.js'
import {getCores} from './services/colors.js'
import {abrirmodal, fecharmodal} from './efectmodal.js'


/**
 * Função responsável por resgatar os dados para registrar entrada
 * @author Thales Santos 
 * @param {Void}
 * @return {Boolean}
 *  */
const getDataEntry = async () =>{
    // Regatando os valores dos selects
    const selectTipoVeiculo = document.getElementById('tipoVeiculo')
    const idTipoVeiculo     = selectTipoVeiculo.options[selectTipoVeiculo.selectedIndex].dataset.id || null

    const selectCor = document.getElementById('CorVeiculo')
    const idCor     = selectCor.options[selectCor.selectedIndex].dataset.id || null

    const selectFabricante = document.getElementById('lista-marca')
    const fabricante       = selectFabricante.options[selectFabricante.selectedIndex].text || null

    const selectModelo = document.getElementById('lista-modelos')
    const modelo       =  selectModelo.options[selectModelo.selectedIndex].text || null

    const selectVaga   = document.getElementById('vagaVeiculo')
    const idVaga       = selectVaga.options[selectVaga.selectedIndex].dataset.id || null

    // Montando um Objeto com todos os dados
    const dados = {
        cliente: {
            nome:       document.getElementById('NomeCliente').value,
            telefone:   document.getElementById('telefoneCliente').value
        },

        veiculo: {
            placa:          document.getElementById('placa').value,
            modelo:         modelo,
            fabricante:     fabricante,
            idCor:          idCor,
            idTipoVeiculo:  idTipoVeiculo
        },

        idVaga: idVaga
    }
    
    const response = await saveEntry(dados)
    
    if(response != false)
        updateModal(response)
}

/**
 * Função responsável por criar uma lista com as vagas disponíveis
 * @author Thales Santos
 * @param {Void} 
 * @return {Void}
 */
const createVecancyList = async () =>{
    // Resgatando o id do tipo de veiculo
    const selectTipoVeiculo = document.getElementById('tipoVeiculo')
    const idTipoVeiculo     = selectTipoVeiculo.options[selectTipoVeiculo.selectedIndex].dataset.id
    
    // Resgatando as vagas disponíveis
    const vagas = await getVagas(idTipoVeiculo)

    // Variável que receberá as Options
    let options = '';

    if(vagas.length > 0) {
        await vagas.forEach((vaga) => {
            
            options += `<option data-id="${vaga.id}">${vaga.sigla} - ${vaga.tipo.toUpperCase()}</option>`
        })
    }

    // Adicionando as options no select de vagas
    document
        .getElementById('vagaVeiculo')
        .innerHTML = options !== '' ? options : '<option value="" selected>NÃO HÁ VAGAS DISPONÍVEIS</option>'
}

/**
 * Função responsável por criar uma lista os tipos de veículos
 * @author Thales Santos
 * @param {Void} 
 * @return {Void}
 */
const createVehicleTypeList = async () =>{
    // Resgatando o select de tipos de veiculos
    const selectTipoVeiculo = document.getElementById('tipoVeiculo')
    
    // Resgatando as vagas disponíveis
    const veiculos = await getVeiculos()

    // Variável que receberá as Options
    let options = '<option value="">Selecione:</option>';

    if(veiculos.length > 0) {
        await veiculos.forEach((veiculo) => {
            
            options += `<option data-id="${veiculo.id}">${veiculo.nome.toUpperCase()}</option>`
        })
    }

    // Adicionando as options no select de Veiculos
    selectTipoVeiculo
        .innerHTML = options !== '' ? options : '<option value="" selected>NÃO HÁ VEÍCULOS DISPONÍVEIS</option>'
}

/**
 * Função responsável por criar uma lista os tipos de veículos
 * @author Thales Santos
 * @param {Void} 
 * @return {Void}
 */
const createColorsList = async () =>{
    // Resgatando o select de cores
    const selectCor = document.getElementById('CorVeiculo')
    
    // Resgatando as vagas disponíveis
    const cores = await getCores()

    // Variável que receberá as Options
    let options = '<option value="">Selecione:</option>';

    if(cores.length > 0) {
        await cores.forEach((cor) => {
            
            options += `<option data-id="${cor.id}">${cor.nome.toUpperCase()}</option>`
        })
    }

    // Adicionando as options no select de cores
    selectCor
        .innerHTML = options !== '' ? options : '<option value="" selected>NÃO HÁ CORES DISPONÍVEIS</option>'
}


/**
 * Função responsável por alimentar a model com informações da entrada
 * @author Thales Santos
 * @param {Objetc} All Dados da entrada
 */
const updateModal = ({cliente, veiculo, vaga, entrada}) => {
    // Resgatando a modal 
    const modal = document.getElementById('containerModel_entrada')

    // Criando o HTML dinamicamente
    const dados = `
            <span class="img" id="imgmodel">
                <img src="img/X.png" alt="">
            </span>

            <div id="checkEntrada">
                <div class="content">
                    
                        <h1>Fast parking</h1>
                        
                        <p>Nome: ${cliente.nome}</p>
                        
                        <p>Placa: ${veiculo.placa}</p> 
                        
                        <span>
                            <p>Fabricante: ${veiculo.fabricante}</p>

                            
                            <p>Tipo: ${veiculo.tipo.toUpperCase()}</p>
                            
                            <p>Modelo:  ${veiculo.modelo}</p> 

                            <p>Cor: ${veiculo.cor.toUpperCase()}</p> 
                        </span>
                        
                        
                        <div class="vagamodal_entrada">
                            <h2>VAGA:</h2>
                            <p>Piso: ${vaga.localizacao.piso}
                                Setor: ${vaga.localizacao.setor}
                                Corredor: ${vaga.localizacao.corredor.toUpperCase()}
                                Número: ${vaga.codigo.toUpperCase()}
                            </p>
                        </div>
                        <p id="Entrada_model">Entrada: ${entrada.data} - ${entrada.horario}
                        </p>

                </div>
            </div>
    
    `

    // Adicionando os dados na Modal
    modal.innerHTML = dados

    // Abrindo a modal
    abrirmodal()
    document.getElementById('imgmodel').addEventListener('click', fecharmodal);
}


// Adiconando os eventos 
document
    .getElementById('cadastra')
    .addEventListener('click', getDataEntry)

document
    .getElementById('tipoVeiculo')
    .addEventListener('change', createVecancyList)

createVehicleTypeList()
createColorsList()