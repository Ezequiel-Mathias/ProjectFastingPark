import { atualizandonovacor, buscarcolor, criarcor } from "./apiCor.js";
import { abrirModal, fecharModal } from "./Model.js";

// colocando nova cor nos campos
const criarcampos = ({ nome }, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td class="tblColunas destaque">${nome}</td>
    <td class="tblColunas registros acao">
        <div class="divbutton-excluir-editar">
        <input type="image" src="img/more.png" id="editar-${index}"  >
        </div>

    </td>
    `

  document.querySelector('#Consulta').appendChild(newRow)
}




//trazendo os dados api
const atualizarTabela = async () => {
  const dbcor = await buscarcolor();
  dbcor.forEach(criarcampos);

}

atualizarTabela();

//validacao  do campos
const validacao = () => {
  document.getElementById('formCor').reportValidity();
}


//nova cor
const novacor = async () => {
  if (validacao()) {
    const cornome = document.getElementById('textNome').value;

    const cor = {
      nome: cornome
    }

    const index = document.getElementById('textNome').dataset.index;
    if (index == "new") {
      const novacor = await criarcor(cor);
      if (novacor) {
        fecharModal();
        location.reload();
      }

    } else {
      const dados = {
        id: index,
        nome: cor['nome']
      }

      const resposta = await atualizandonovacor(dados);
      if (resposta) {
        fecharModal();
        location.reload();
      }


    }
  }
}

const preencermodal = (cor) => {
  document.getElementById('textNome').value = cor.nome;
  document.getElementById('textNome').dataset.index = cor.id;
}

const editarCor = async (item) => {

  const cores = await buscarcolor();
  preencermodal(cores[item]);
  abrirModal();

}

//limpar dados da modal (export)
const limparmodal = () => {
  const campos = document.querySelectorAll('.textNome');
  campos.forEach(campo => campo.value = "");
}


//atualizando cor
const atualizarcor = (event) => {
  const click = event.target.type;

  if (click == 'image') {
    const [action, index] = event.target.id.split('-');
    editarCor(index);
  }
}



document.querySelector('#Consulta').addEventListener('click', atualizarcor);
document.getElementById('add').addEventListener('click', novacor);


export {
  limparmodal
}