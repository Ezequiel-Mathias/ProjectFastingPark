/*importando as funcoes exportadas*/

import { limparmodal } from "./app.js";


const abrirModal = () =>{
    document.getElementById('modal-conteiner').classList.add('active');
    document.getElementById('conteudotodo').classList.add('active');

}

const fecharModal = () =>{
    document.getElementById('modal-conteiner').classList.remove('active');
    document.getElementById('conteudotodo').classList.remove('active');
    limparmodal();
    
}

document.getElementById('submit-adicionar').addEventListener('click' , abrirModal);
document.getElementById('imgFechar').addEventListener('click' , fecharModal);


export{
    fecharModal,
    abrirModal
}