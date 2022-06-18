'use strict'

import { abrirModal } from "./modelJS.js";
import { apivagas,buscarplaca } from "./consumoapi.js";


// const deletar = (index) =>{ 
//  const item = apivagas()[index];
//  item.splice(index,1);
 
// }

/*colocando dados nos campost*/
const createCampos = (item,index) =>{
   const newcampos = document.createElement('tr');
   newcampos.innerHTML = `
   
   <td id="tblTitulo" >
   <td class="tblColunas destaque " >${item.veiculo.modelo}-${item.veiculo.cor}</td>
   <td class="tblColunas destaque ">${item.veiculo.tipo}</td>
   <td class="tblColunas destaque " >${item.veiculo.placa}</td>
   <td class="tblColunas destaque ">${item.vaga.sigla}</td>
   <td class="tblColunas destaque vagaCar">${item.entrada.horario}</td>
   <td class="tblColunas destaque img ">
           <input  type="image" src="img/more.png" id="editar-${index}">
      

   </td>
</td>
   `;
     
   document.getElementById('Consulta').appendChild(newcampos)
}


/*limpar as tabelas para não se repetirem*/
const clearTable = () =>{
   const rows = document.querySelectorAll('#Consulta > tr');
   rows.forEach(row => row.parentNode.removeChild(row))
}


const updatetabela = async () =>{
const dbVagas = await apivagas();
clearTable();
dbVagas.forEach(createCampos);

}

/*mostra na tela uptade*/
updatetabela();


/*preenchendo a modal*/
const preenchermodal = async(item)=>{
   const hist = await apivagas();
  document.getElementById('nome').value = hist[item].cliente.nome;
  document.getElementById('telefone').value = hist[item].cliente.telefone;
  document.getElementById('entrada').value = hist[item].entrada.horario;
  document.getElementById('modelo').value =hist[item].veiculo.modelo;
  document.getElementById('tipo').value = hist[item].veiculo.tipo;
  document.getElementById('placa').value = hist[item].veiculo.placa;
  document.getElementById('saida').value = hist[item].saida.horario;
  document.getElementById('valor').value = "R$ "+hist[item].valor;
}


/*trazendo o cliente a modal e editando*/
const editarH  = (index) =>{
     preenchermodal(index);
  
     abrirModal();
}

/*verificando onde foi clicado e se é editar ou deletar e atribuindo as funções*/
const editarExcluir = (event) =>{
    const type = event.target.type;
    if(type == 'image'){
      const [action,index] = event.target.id.split('-');
      if(action == 'editar'){
         editarH(index);  
      }
        
    }
}


const filtraplaca = async(event) =>{

   if(event.key == 'Enter'){
      const placa = document.getElementById('filtplaca').value;
      if(placa != ""){
         buscarplaca(placa);
      }else{
         updatetabela();
      }
      
   }
   
}


document.querySelector('#Consulta').addEventListener('click', editarExcluir);
document.getElementById('filtplaca').addEventListener('keypress', filtraplaca);


export{
   createCampos,
   clearTable,
   updatetabela
}