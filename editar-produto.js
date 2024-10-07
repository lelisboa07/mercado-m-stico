async function editarProduto(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    
    const response = await fetch(`http://localhost:3000/produto/editar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome
        })
    });
    
    const results = await response.json();
    
    if(results.success) {
        alert(results.message)
    } else {
        alert(alert.message)
    }
}

async function apagarProduto(event) {
    const id = document.getElementById('id').value;
    
    const response = await fetch(`http://localhost:3000/produto/deletar/${id}`, {
        method: "DELETE"
    });

    const results = await response.json();

    if (results.success) {
        alert("Produto Deletado")
    }
}

async function verificarCargo() {
    const response = await fetch(`http://localhost:3000/usuario/informacoes/${localStorage.getItem("usuario")}`);
  
    const results = await response.json();
  
    if (results.data[0].cargo !== "A") {
        location.pathname = "";
    }
}
  
verificarCargo()