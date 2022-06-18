'use strict'

import { getHistoricoDeVeiculos, creatPreco, editPreco, deletarpreco } from "./consumapi.js";

const abrirmodal = () => {

    document.getElementById('modal-conteiner').classList.add('active');

}

const fecharmodel = () => {
    clearFild();
    document.getElementById('modal-conteiner').classList.remove('active');
}



const createCampos = (preco, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td class="tblColunas destaque">${preco.veiculo.tipo}</td>
    <td class="tblColunas destaque">R$ ${preco.precos.primeiraHora}</td>
    <td class="tblColunas destaque">R$ ${preco.precos.demaisHoras}</td>
    <td class="tblColunas registros ">
        <div class="divbutton-excluir-editar">
        <button type="button" class="button green" id="editar-${index}" data-action="edit">Editar</button>
        <button type="button" class="button red" id="delete-${index}" data-action="delet">Excluir</button>
        </div>

    </td>
    `

    document.querySelector('#tblConsulta').appendChild(newRow)

}


//trazaendo os dados api
const updateTable = async () => {
    const dbveiculos = await getHistoricoDeVeiculos();
    dbveiculos.forEach(createCampos);

}




updateTable();



//validando campo
const isvalid = () => {
    const form = document.getElementById('form').reportValidity();
}

//limpar a option modal
const clearFild = () => {
    const fild = document.querySelectorAll('.boardCar');
    fild.forEach(fild => fild.value = "");
}


//salvar um preco e saber se é um preco novo
const savePreco = async () => {

    if (isvalid) {
        const select = document.getElementById('typeCar');
        const tipoVeiculo = select.options[select.selectedIndex].value;

        const cliente = {

            primeiraHora: document.getElementById('primeirahora').value,
            demaisHoras: document.getElementById('demaishoras').value,
            idTipoVeiculo: tipoVeiculo
        }
        const index = document.getElementById('primeirahora').dataset.index;

        if (index == 'new') {
            creatPreco(cliente);
            fecharmodel();
            alert("Preço atualizada com sucesso!");
            location.reload();
            updateTable();


        } else {
            const dados = await getHistoricoDeVeiculos();
            const idpreco = dados[index];
            editPreco(idpreco.id, cliente);

        }



    }

}

//preencher a modal (editar)
const preenchercampo = async (item) => {
    const dados = await getHistoricoDeVeiculos();
    document.getElementById('primeirahora').value = dados[item].precos.primeiraHora;
    document.getElementById('demaishoras').value = dados[item].precos.demaisHoras;
    document.getElementById('typeCar').value = dados[item].veiculo.idTipoVeiculo;
    document.getElementById('primeirahora').dataset.index = item



}

//Editar ou deletar
const editdelet = async (event) => {

    if (event.target.type == "button") {

        const [action, id] = event.target.id.split('-');


        if (action == 'editar') {
            abrirmodal();
            preenchercampo(id);


        } else {
            const dados = await getHistoricoDeVeiculos();
            const idpreco = dados[id];
            deletarpreco(idpreco.id);



        }

    }



}


//Eventos 
document.getElementById('add').addEventListener('click', abrirmodal);
document.getElementById('titlle_x').addEventListener('click', fecharmodel);
document.getElementById('btnAdd').addEventListener('click', savePreco)

document.getElementById('tblConsulta').addEventListener('click', editdelet);
