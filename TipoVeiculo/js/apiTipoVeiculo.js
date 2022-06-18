'use strct'

const url = `http://localhost/php/fastparking/api/tipo`;

const apiTipoVeiculo = async () =>{
    const response = await fetch(url);
    const dados = await response.json();
    return dados;

}

const salvarNovoTpo = async(tipo) =>{

    const option ={
        method : 'POST',
        body: JSON.stringify(tipo),
        headers:{
            'content-type':'application/json'
        }
    }

    const reponse = await fetch(url,option);
     
    if(reponse.ok){
      alert("Registro inserido com sucesso.");
    }else{
        alert("Erro ao Registrar")
    }
     
    return reponse;
}


const atualizandoNvoTipo = async (dados) =>{
  const nome = {nome :dados.nome}
   const id = dados.id;
    const option ={
        method : 'PUT',
        body: JSON.stringify(nome),
        headers:{
            'content-type':'application/json'
        }
    }

    const reponse = await fetch(`${url}/${id}`,option);
     
    if(reponse.ok){
      alert("Registro Atualizado com sucesso.");
    }else{
        alert("Erro ao Registrar")
    }
     
    return reponse;

}



export{
    apiTipoVeiculo,
    salvarNovoTpo,
    atualizandoNvoTipo
}