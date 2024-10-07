// Deslogar
async function deslogar(event) {
    localStorage.removeItem("usuario")
    location.pathname = "login.html"
}

// Pegar dados da conta
async function entrarNaConta() {
    const response = await fetch(`http://localhost:3000/usuario/informacoes/${localStorage.getItem("usuario")}`);

    const results = await response.json();

    const nomeConta = document.querySelector(".nome-conta")
    nomeConta.textContent = results.data[0].nome

    const emailConta = document.querySelector(".email")
    emailConta.textContent = results.data[0].email
}

async function atualizarConta() {
    location.pathname = "editar-conta.html"
}

async function apagarConta() {
    const response = await fetch(`http://localhost:3000/usuario/deletar/${localStorage.getItem("usuario")}`, {
        method: "DELETE"
    });

    const results = await response.json();

    if (results.success) {
        alert("Conta Deletada")
        localStorage.removeItem("usuario");
        location.pathname = "index.html"
    }
}

// Mudar Página
if (!localStorage.getItem("usuario")) {
    location.pathname = "login.html"
}

entrarNaConta()