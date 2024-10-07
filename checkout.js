let elemento = document.querySelectorAll("#final")
let modal = document.querySelectorAll(".modal")
let fechar = document.querySelectorAll("#fechar-modal")

elemento[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'visible'
})

fechar[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'hidden'
})