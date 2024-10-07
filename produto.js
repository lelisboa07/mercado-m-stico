async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;
    const file = document.getElementById('file').files[0]

    let formData = new FormData();

    formData.append('nome', nome)
    formData.append('valor', valor.replace(",","."))
    formData.append('descricao', descricao)
    formData.append('file', file)
    
    const response = await fetch('http://localhost:3000/produto/cadastrar', {
        method: "POST",
        body: formData
    });

    const results = await response.json();
    

    if(results.success) {
        alert(results.message)
    } else {
        // alert(alert.message)
        alert(results.message)
        console.log(results)
    }
}


// Modal

let elemento = document.querySelectorAll("#final")
let modal = document.querySelectorAll(".modal")
let fechar = document.querySelectorAll("#fechar-modal")

elemento[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'visible'
})

fechar[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'hidden'
})



async function verificarCargo() {
    const response = await fetch(`http://localhost:3000/usuario/informacoes/${localStorage.getItem("usuario")}`);
  
    const results = await response.json();
  
    if (results.data[0].cargo !== "A") {
        location.pathname = "";
    }
}
  
verificarCargo()