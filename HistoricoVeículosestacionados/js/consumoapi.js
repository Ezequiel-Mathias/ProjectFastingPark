import{clearTable, createCampos} from "./ApiHVeiculos.js";

const apivagas = async() =>{
 
    const url = 'http://localhost/php/fastparking/api/veiculo';
 

    const repose = await fetch(url);
    
    const dados = await repose.json();
    
    return dados;
 
 
 }
 
 const buscarplaca = async(placa)=>{
    const url = `http://localhost/php/fastparking/api/veiculo/placa/${placa}`;
 
   const repose = await fetch(url);
        
   const dados = await repose.json();

    
    if(repose.ok){
        clearTable();
   dados.forEach(createCampos);

    }else{
       alert('Não existe');
    }
    
 }





 

 export{
    apivagas,
    buscarplaca,
 }