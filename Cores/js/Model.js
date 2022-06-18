import { limparmodal } from "./main.js";

const abrirModal = () =>{
    document.getElementById('conteudotodo').classList.add('active');
    document.querySelector('.modal-conteiner').classList.add('active');
}

const fecharModal = () =>{
    limparmodal();
    document.querySelector('.modal-conteiner').classList.remove('active');
    document.getElementById('conteudotodo').classList.remove('active');
    
}


export{
    abrirModal,
    fecharModal
}

document.getElementById('submit-adicionar').addEventListener('click' , abrirModal)
document.getElementById('imgFechar').addEventListener('click' , fecharModal)