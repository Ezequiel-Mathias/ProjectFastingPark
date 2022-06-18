'use strict'



 import {abrirmodal} from "../js/efectmodal.js";

const marca_Carro = async () =>{

    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas`;
    const response = await fetch(url);

    const marcaCarro = await response.json();
        
    return marcaCarro;

}

const marca_Moto = async () =>{
   const url = `https://parallelum.com.br/fipe/api/v1/motos/marcas`;
   const response = await fetch(url);

   const marcaMoto = await response.json();
       
   return marcaMoto;

}

const marca_Caminhao = async () =>{
   const url = `https://parallelum.com.br/fipe/api/v1/caminhoes/marcas`;
   const response = await fetch(url);

   const marcaCaminhao = await response.json();

   return marcaCaminhao
  

}

const criarlist = async() =>{


   const list = document.getElementById('lista-marca');
   const marca = await marca_Carro();
   const marcaMoto = await marca_Moto();
   const marcaCaminhao = await marca_Caminhao();
   let apoio = '<option value=""selected> selecione:</option> ';


   marca.map((item)=>{
         apoio += `
           <option value="${item.codigo}">${item.nome}</option>
         `;
   });

   marcaMoto.map((item)=>{
      apoio += `
        <option  value="${item.codigo}">${item.nome}</option>
      `;
   });
     
   marcaCaminhao.map((dados)=>{
    
   apoio+= `
     
    <option value="${dados.codigo}">${dados.nome}</option>
   
   `;
    
  
   });
 
    
   list.innerHTML = apoio;
  
}


criarlist();






/*modelos Veiculo*/


const modelo_Veiculos = async(idMarcaCarro) =>{
   
   const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarcaCarro}/modelos`;
    
    const response = await fetch(url);

    const modelosCarro = await response.json();

     return modelosCarro.modelos;


}

// const modelo_VeiculosMoto = async(idMarcaMoto) =>{
   
//    const url = `https://parallelum.com.br/fipe/api/v1/moto/marcas/${idMarcaMoto}/modelos`;
    
//     const response = await fetch(url);

//     const modelosCarro = await response.json();

//      return modelosCarro.modelos;


// }



 const criarlist_Modelo = async() =>{
   
   let idmodelo = document.getElementById('lista-marca').value;

   const list = document.getElementById('lista-modelos');
   const modelosCarro = await modelo_Veiculos(idmodelo);
   let apoio = '<option value=""selected> selecione:</option>';
   
   modelosCarro.map((item) =>{
         
   apoio+=`
         <option value="${item.codigo}">${item.nome}</option>
       `;
   });
   

    list.innerHTML = apoio;
    

 }
 

 const valuesDados = async () =>{
   const nome = document.getElementById('NomeCliente').value;
   const telefone = document.getElementById('telefoneCliente').value;
   const fab = document.getElementById('lista-marca');
   const opcaoTexto = fab.options[fab.selectedIndex].text;
   const placa = document.getElementById('placa').value;
   const tipo = document.getElementById('tipoVeiculo');
   const tipoVeiculo = tipo.options[tipo.selectedIndex].text;
   const cor = document.getElementById('CorVeiculo').value;
   const modelos = document.getElementById('lista-modelos');
   const modelVeiculo = modelos.options[modelos.selectedIndex].text;


   abrirmodal();
 }
 /*informações de dados feitos*/




 /*api*/

 const url = 'http://localhost/php/fastparking/api/movimentacao/entrada';

 const readCliente = async (id='')=>{
        const response = await fetch(`${url}/${id}`);
          
        return await response.json();
 }

const creatCliente = async (cliente) =>{
  const option={
   method : 'POST',
   body: JSON.stringify(cliente),
   headers:{
       'content-type':'application/json'
   }
  }

  const response = await fetch(url,option);
  console.log(response.ok);

}


const deletarCliente = async(id) =>{
    const option  ={
      method : 'DELETE'
    }
    const response = await fetch(`${url}/${id}`);
} 

/*na tela*/

const dadosCliente = () =>{
   const clientes = {
        
       "cliente":{
         nome:document.getElementById('NomeCliente').value,
         telefone:document.getElementById('telefoneCliente').value,
       },
       "veiculo":{
         placa:document.getElementById('placa').value,
         tipo:document.getElementById('tipoVeiculo').value,
         modelo:document.getElementById('lista-modelos').value,
         cor:document.getElementById('CorVeiculo').value,
         fabricante:document.getElementById('lista-marca').value,
         vaga:document.getElementById('vagaVeiculo').value
       }

   }

   return clientes;
}

const validado = ()=>{
   document.getElementById('dadosCliente').reportValidity();
}

const savecliente = () =>{
   if(validado()){
      const dados = dadosCliente();
     creatCliente(dados);
      console.log(dados);
      abrirmodal();
   }
   

}





document.getElementById('cadastra').addEventListener('click', savecliente);
document.getElementById('lista-marca').addEventListener('change', criarlist_Modelo);




