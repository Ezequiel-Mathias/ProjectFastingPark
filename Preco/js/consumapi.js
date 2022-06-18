
const url = 'http://localhost/php/fastparking/api/preco'
const getHistoricoDeVeiculos = async () => {

    const resposta = await fetch(url)

    const dados = await resposta.json()

    return dados

}



const creatPreco = async(newpreco) =>{
     
    const options = {
        method: 'POST',
        body: JSON.stringify(newpreco),
        headers: {
            'content-type' : 'application/json'
        }
    } 
   

    const resposta = await fetch(url,options);
   const dados = await resposta.json();
   
   return dados;
   

}

const editPreco = async(id,dados) =>{
      
    const options = {
        method: 'PUT',
        body: JSON.stringify(dados),
        headers: {
            'content-type' : 'application/json'
        }
    } 

    console.log(options);
   
   const resposta = await fetch(`${url}/${id}`,options);
   
    
   console.log(resposta.ok);

   

 
}


const deletarpreco = async(codigoid) =>{
    const option = {
       method : 'DELETE',
    }
    const reponse = await fetch(`${url}/${codigoid}`,option);
    console.log(reponse.ok);
    alert("Registro apagado com sucesso.");

    location.reload();
      
   }


export{
    getHistoricoDeVeiculos,
    creatPreco,
    editPreco,
    deletarpreco
}