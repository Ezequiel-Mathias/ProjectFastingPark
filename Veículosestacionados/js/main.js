/*******************************************************************************************
* Objetivo: Arquivo responsável manipulação da api e estrutura da index
* Autor: Ezequiel
* Data: 21/06/2022
* Versão: 4.0
*******************************************************************************************/


/****************************** FUNÇÕES MODAL ****************************** */



const abrirModalSaida = () => {
    document.getElementById('containerModel_saida').classList.add('active');
   
}

const fecharmodalTicket = () => {
    document.getElementById('containerModel_saida').classList.remove('active');
    location.reload();
}

const abrirmodal = () => {
    document.getElementById('modalVeiculo').classList.add('active');
    document.getElementById('todamodel').classList.add('active');

}

const fecharmodalButton = () => {

    document.getElementById('modalVeiculo').classList.remove('active');
    document.getElementById('todamodel').classList.remove('active');
}


const fecharmodal = () => {

    document.getElementById('modalVeiculo').classList.remove('active');
    document.getElementById('todamodel').classList.remove('active');
    abrirModalSaida()

}




/******************************************************** CONSUMO API *********************************************************/

const getHistoricoDeVeiculos = async () => {
    const url = 'http://localhost/ezequielphp/fastparking/api/'

    const resposta = await fetch(`${url}veiculo/estacionados`)

    const dados = await resposta.json()

    if (resposta.ok) {
       
        return dados
        
    } else {
        alert('sem veiculos')
    }

}


const getTipo = async () => {
    const url = 'http://localhost/ezequielphp/fastparking/api/'
    const resposta = await fetch(`${url}tipo`)
    const dados = await resposta.json()
    return dados


}



const FiltroApi = async (selectds) => {
    const url = `http://localhost/ezequielphp/fastparking/api/veiculo/tipo/${selectds}`;
    const repose = await fetch(url);
    const dados = await repose.json();
    dados.forEach(createCampos)

}



const APIPesquisarPorPlaca = async (placa) => {
    const url = `http://localhost/ezequielphp/fastparking/api/veiculo/estacionados/placa/${placa}`;
    const response = await fetch(url);

    const dadosplaca = await response.json();

    if (response.ok) {
        createCampos(dadosplaca)
    } else {
        alert('Placa inexistente')
    }

}

const FazerSaidaDoVeiculo = async (index) => {
    const url = 'http://localhost/ezequielphp/fastparking/api/'


    const resposta = await fetch(`${url}movimentacao/saida/${index}`)

    const dados = await resposta.json()

    preencherCamposModalTicket(dados)


}


/*************************************************** FUNÇOES DE CRIAÇAO (INNER HTML) ***********************************/


const createCampos = (item, index) => {

    const newcampos = document.createElement('tr')
    newcampos.innerHTML = `
    
    <td id="tblTitulo">
        <td class="tblColunas destaque corModelo ">${item.veiculo.modelo}</td>
        <td class="tblColunas destaque tipocar ">${item.veiculo.tipo}</td>
        <td class="tblColunas destaque placaCar">${item.veiculo.placa}</td>
        <td class="tblColunas destaque vagaCar">${item.vaga.sigla}</td>
        <td class="tblColunas destaque acaoC">
            <button type="button" class="button green"  id="detalhes-${index}">Detalhes</button>
                           
        </td> 
    </td>
    `
    document.getElementById('Consulta').appendChild(newcampos)
}

const CreateFiltragemSelectd = async () => {
    const list = document.getElementById('filtrarVeiculo');
    const tipo = await getTipo();
    let apoio = '<option value=""selected> Selecione um veiculo:</option> ';
    tipo.map((item) => {
        apoio += `
          <option value="${item.id}">${item.nome}</option>
        `;
    });

    list.innerHTML = apoio;
}

CreateFiltragemSelectd()



//Limpa a tabela caso necessario
const ClearTable = () => {
    const rows = document.querySelectorAll('#Consulta > tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}



/********************************* FUNÇOES PARA PREENCHER OS CAMPOS ******************************************** */

const preencherCamposModalRegistro = (item) => {

    document.getElementById('nome').value = item.cliente.nome
    document.getElementById('telefone').value = item.cliente.telefone
    document.getElementById('modelo').value = item.veiculo.modelo
    document.getElementById('tipo').value = item.veiculo.tipo
    document.getElementById('placa').value = item.veiculo.placa
    document.getElementById('entrada').value = item.entrada.horario
    document.getElementById('vaga').value = item.vaga.codigo
}


const preencherCamposModalTicket = async (item) => {

    document.getElementById('nometicket').value = item.cliente.nome
    document.getElementById('telefoneticket').value = item.cliente.telefone
    document.getElementById('Fabricanteticket').value = item.veiculo.fabricante
    document.getElementById('modeloticket').value = item.veiculo.modelo
    document.getElementById('tipoticket').value = item.veiculo.tipo
    document.getElementById('placaticket').value = item.veiculo.placa
    document.getElementById('codigoticket').value = item.vaga.codigo
    document.getElementById('entradaticket').value = item.entrada.horario
    document.getElementById('vagaticket').value = item.vaga.codigo
    document.getElementById('dataentradaticket').value = item.entrada.data
    document.getElementById('datasaida').value = item.saida.data
    document.getElementById('horariosaida').value = item.saida.horario
    document.getElementById('totalapagarticket').value = 'R$ ' + item.valor
}





/*********************************** Função Pesquisar Placa ******************************************* */

const PesquisarPlaca = async (event) => {

    if (event.key == "Enter") {
        var placa = document.getElementById("pesquisarplaca").value;
        if (placa != "") {
            APIPesquisarPorPlaca(placa)
        } else {
            updateTable();
        }

    }


}



// Função responsavel pela criação das tr 
const updateTable = async () => {
    const dbveiculos = await getHistoricoDeVeiculos()
    dbveiculos.forEach(createCampos)
    

}


//função responsavel por chamar a API que faz a ação de gerar a saida do veiculo    
const SaidaVeiculo = async (index) => {
    const veiculos = await getHistoricoDeVeiculos()
    const teste = veiculos[index].id
    FazerSaidaDoVeiculo(teste)
   
    abrirModalSaida()
    
}


//Função responsaver por pegar a posição da api getHistoricoDeVeiculos e jogar para fazer a ação de saida
//de vaga
const Detalhes = async (event) => {
    const [action, index] = event.target.id.split('-')

    if (event.target.type == 'button') {
        const veiculosestacionados = await getHistoricoDeVeiculos()
        const veiculo = veiculosestacionados[index]

        if (action == 'detalhes') {
            preencherCamposModalRegistro(veiculo)
            abrirmodal()
            document.getElementById('registrarsaida').addEventListener('click', RegistroSaidaTicket = async () => {
                const teste = veiculo.id
                console.log(teste)
                fecharmodal()
                SaidaVeiculo(index)
               


            })

        }

    }

}








updateTable()


//Eventos MODAL

document.getElementById('closemodal').addEventListener('click', fecharmodalButton);
document.getElementById('fecharticket').addEventListener('click', fecharmodalTicket);

// Funções API

document.querySelector('#tableCrud_veiculo > #Consulta').addEventListener('click', Detalhes)
document.getElementById('filtrarVeiculo').addEventListener('change', FiltragemSelectd)

document.getElementById('lupadepesquisa').addEventListener('click', PesquisarPlaca)
document.getElementById('pesquisarplaca').addEventListener('keypress', PesquisarPlaca)




