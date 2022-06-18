/*******************************************************************************************
* Objetivo: Arquivo responsável manipulação da api e estrutura da index
* Autor: Ezequiel
* Data: 21/06/2022
* Versão: 2.0
*******************************************************************************************/

/****************************FUNÇÕES MODAL************************************************* */
const abrirModal = () =>{
    document.getElementById('modal-conteiner').classList.add('active')

}

const fecharModal = () =>{
    document.getElementById('modal-conteiner').classList.remove('active')
}



/**************************** CONSUMOS API ************************************************* */

const getTotaldeVagas = async () => {
    const url = 'http://localhost/ezequielphp/fastparking/api/'
    const resposta = await fetch(`${url}vaga`)
    const dados = await resposta.json()
    console.log(dados)
    return dados

}


const getQuantidadeVagas = async () => {
    const url = 'http://localhost/ezequielphp/fastparking/api/'
    const resposta = await fetch(`${url}vaga/quantidade`)
    const dados = await resposta.json()
    console.log(dados)
    return dados

}


/**************************** CRIAÇÃO DE CAMPOS ************************************************* */
const createCamposVagas = (item ,) => {
    const newcampos = document.createElement('div')
    

    if(item.ativo == false){      
        newcampos.innerHTML = `
        <div class="indisponivel">${item.codigo}</div>
        `
    }else if(item.ocupada == false){
        newcampos.innerHTML = `
        <div class="disponiveis">${item.codigo}</div>
        `
    }else if(item.ocupada == true){
        newcampos.innerHTML = `
        <div class="ocupadas">${item.codigo}</div>
        `
    }
    
    document.getElementById('todas-as-vagas').appendChild(newcampos)
}



//Manda o array pra createCamposVagas
const updateVagas =  async () => {
    const dbveiculos = await getTotaldeVagas()
    dbveiculos.forEach(createCamposVagas)
}

updateVagas()


// Mnada valores da API 
const createCamposVagasQuantidade = (item) => {
    document.getElementById('totaldevagasocupadas').value = item.totalOcupadas
    document.getElementById('totaldevagasdisponiveis').value = item.totalLivres
    
}




//Manda o array pra createCamposVagasQuantidade
const updateQuantidade =  async () => {
    const dbveiculos = await getQuantidadeVagas()
    createCamposVagasQuantidade(dbveiculos)
}

updateQuantidade()


