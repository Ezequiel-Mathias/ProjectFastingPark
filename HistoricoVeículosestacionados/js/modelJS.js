const abrirModal = () =>{
    document.getElementById('modal-conteiner').classList.add('active')

}

const fecharModal = () =>{
    document.getElementById('modal-conteiner').classList.remove('active')

}


document.getElementById('fechar').addEventListener('click' , fecharModal)

export{
    abrirModal
}
