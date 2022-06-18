import { apiTipoVeiculo, atualizandoNvoTipo, salvarNovoTpo } from "./apiTipoVeiculo.js";
import { fecharModal, abrirModal } from "./Model.js";


//exibindo dados nas tr
const creatCampos = ({ nome }, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td class="tblColunas destaque">${nome}</td>
    <td class="tblColunas registros acao"">
        <div class="divbutton-excluir-editar">
        <input  type="image" src="img/more.png" id="editar-${index}">
        </div>

    </td>
    `

  document.querySelector('#Consulta').appendChild(newRow)

}

/*trazendo dados*/
const uptadedados = async () => {
  const dbTipoveiculo = await apiTipoVeiculo();
  dbTipoveiculo.forEach(creatCampos);

}

uptadedados();


//limpar dados da modal (export)
const limparmodal = () => {
  const campos = document.querySelectorAll('.txtNome');
  campos.forEach(campo => campo.value = "");
}


//validacao  do campos
const validacao = () => {
  document.getElementById('formTipoV').reportValidity();
}

//salavando um novo tipo
const salvartipo = async() =>{

  
  
    const tipo = document.getElementById('txtNome').value;

    const novoTipo = {
      nome: tipo
    }
    const indexTipo = document.getElementById('txtNome').dataset.index;
      
    if(indexTipo == "new"){
      const responsta = salvarNovoTpo(novoTipo);
      if (responsta) {
        fecharModal();
        location.reload();
      }
     

    }else{
      const dados = {
       id: indexTipo,
       nome : novoTipo.nome
      }
        const resposta = await atualizandoNvoTipo(dados);
         
        if(resposta){
               fecharModal();
               location.reload();
        }
      
    }


 
}


//colcoando o valor na modal
const preenchermodal = (indextipo) =>{
document.getElementById('txtNome').value = indextipo.nome;
document.getElementById('txtNome').dataset.index = indextipo.id;
abrirModal();
}


//trazendo o tipo na modal
const editarTipo = async(index) =>{
 const tipos = await apiTipoVeiculo();
 preenchermodal(tipos[index]);

}

// //decobrindo onde ele click e atribundo-a as funcoes
const tipoModal = (event) =>{
    const click = event.target.type;
    if(click == "image"){
        const [action, index] = event.target.id.split('-');
           editarTipo(index);
    }
}

document.getElementById('addd').addEventListener('click', salvartipo);
document.getElementById('Consulta').addEventListener('click', tipoModal);


export {
  limparmodal
}