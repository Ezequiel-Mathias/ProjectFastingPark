
const url = `http://localhost/php/fastparking/api/cor`;
const buscarcolor = async()=>{
  
 
   const repose = await fetch(url);

   const dados = await repose.json(); 

   return dados;
 
 
    
 }
 
 const criarcor = async(dados) =>{
    const option = {
      method:'POST',
      body : JSON.stringify(dados),
      headers:{
        'content-type':'application/json'
      }

    }

    const repose = await fetch(url,option);
    
    if(repose.ok){
     alert("Registro inserido com sucesso.")
    }else{
      alert("Erro ao Resgistra.")
    }
      
    return repose;

 }
  
 const atualizandonovacor = async(dados) =>{

   const nome = {
       nome:dados.nome
   }
   const id = dados.id
   const options = {
    method: 'PUT',
    body: JSON.stringify(nome),
    headers: {
        'content-type' : 'application/json'
    }
} 

  const resposta = await fetch(`${url}/${id}`,options);
  
  if(resposta.ok){
    alert("Registro Atualizado com sucesso.")
   }else{
     alert("Erro ao Resgistra.")
   }
     
   return resposta;

 }

 export{
  buscarcolor,
  criarcor,
  atualizandonovacor
 }

  
 


