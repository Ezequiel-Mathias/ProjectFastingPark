'use strict'


const abrirmodal = () =>{
   document.getElementById('containerModel_entrada').classList.add('active');
}


const fecharmodal = () =>{
    document.getElementById('containerModel_entrada').classList.remove('active');

   //  Limpando o formulário
   location.reload()
 }

export{
   abrirmodal,
   fecharmodal
};

