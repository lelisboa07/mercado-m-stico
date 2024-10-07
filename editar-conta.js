async function atualizarConta(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;

    const response = await fetch(`http://localhost:3000/usuario/editar/${localStorage.getItem("usuario")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome
        })
    });
    
    const results = await response.json();

    console.log(results)

    if(results.success) {
        alert(results.message)
    } else {
        alert(alert.message)
    }
}