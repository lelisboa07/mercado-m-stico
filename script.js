const produtos = document.querySelectorAll(".produtos");

function adicionarAoCarrinho(nomeProduto, imagemProduto, precoProduto, botaoCarrinho, idProduto) {
  botaoCarrinho.classList.toggle("adicionado-ao-carrinho");
    const itemCarrinho = {
      nome: nomeProduto,
      img: imagemProduto,
      preco: precoProduto,
      id: idProduto ?? null
    };

    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) ?? [];

    if (carrinhoAtual.filter((item) => item.nome === nomeProduto || item.id === idProduto).length > 0) {
      const novoCarrinho = carrinhoAtual.filter((item) => item.nome !== nomeProduto && item.id !== idProduto);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    } else {
      carrinhoAtual.push(itemCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    }
}

produtos.forEach((produtos) => {
  const imagemProduto = produtos.querySelector(".img-produtos").src;
  const nomeProduto = produtos.querySelector(".nome-produto").textContent;
  const precoProduto = produtos.querySelector(".preco-produto").textContent;

  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) ?? [];
  const botaoCarrinho = produtos.querySelector(".botao-carrinho");

  if (carrinhoAtual.filter((item) => item.nome === nomeProduto).length > 0) {
    botaoCarrinho.classList.toggle("adicionado-ao-carrinho");
  }

  botaoCarrinho.addEventListener("click", () => adicionarAoCarrinho(nomeProduto, imagemProduto, precoProduto, botaoCarrinho))
    
});

async function verificarCargo() {
  const response = await fetch(`http://localhost:3000/usuario/informacoes/${localStorage.getItem("usuario")}`);

  const results = await response.json();

  if (results.data[0]?.cargo === "A") {
    document.querySelector(".admin").style.display = "inline";
  }
}

listarProdutos()
verificarCargo()

async function listarProdutos() {
  const response = await fetch('http://localhost:3000/produto/listar', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const results = await response.json()

  if (results.success) {
    let productData = results.data
    const images = 'http://localhost:3000/uploads/'
    let section = document.getElementById('novos-produtos')

    productData.forEach(product => {
      let card = `
      <div class="produtos">
        <img class="img-produtos" src="${images + product.image}" alt=""> 
        <div class="preco">
          <div>
              <p class="nome-produto">${product.nome}</p>
              <p class="preco-produto">R$${Number(product.valor).toFixed(2)}</p>
          </div>
          <button class="botao-carrinho novo-botao"><img class="carrinhos" src="./assets/carrinho2.png" alt=""></button>
        </div>
      </div>
      `
      section.innerHTML += card
      let botao = document.querySelector(".novo-botao")
      console.log(botao)
      botao.addEventListener("click", () => adicionarAoCarrinho(product.nome, images + product.image, product.valor, botao, product.id))
      botao.classList.remove("novo-botao")
    });

  } else {
    alert(results.message)
  }
}