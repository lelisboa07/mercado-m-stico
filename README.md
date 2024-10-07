# Estranhezas Estranhas

Cerifique-se de que você tem instalado MySQL.
Certifique-se de que você tem instalado node.js.
Para que consiga realizar os testes das rotas utilize npm install para instalar as dependências.
Utilize npm start para que possa executar os testes.

## Rotas

### Cadastrar usuário

Método: POST

Rota: /usuario/cadastrar

Body: {
    "nome": "Letícia",
    "email": "leticia@gmail.com",
    "password": "123123"
}

### Login do Usuário

Método: POST

Rota: /usuario/login

Body: {
    "email": "leticia@gmail.com",
    "password": "123123"
}

### Listar usuários

Método: GET

Rota: /usuario/listar

### Editar usuário

Método: PUT

Rota: /usuario/editar/:id

Body: {
    "nome": "Amanda"
}

### Deletar Usuário

Método: DELETE

Rota: /usuario/deletar/:id

### Cadastro de produto

Método: POST

Rota: /produto/cadastrar

Body: {
    "nome": "Nome Produto",
    "valor": 99,
    "descricao": "Descrição do produto"
}

### Listar produtos

Método: GET

Rota: /produto/listar

### Atualizar produtos

Método: PUT

Rota: /produto/editar/:id

Body: {
    "nome": "Novo nome"
}

### Deletar produto

Método: DELETE

Rota: /produto/deletar/:id