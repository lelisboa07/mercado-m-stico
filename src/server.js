// Importar pacotes para aplicação
const express = require('express');
const cors = require('cors');

// Definir a porta e instanciar o expess
const porta = 3000;
const app = express();

// Habilitar o cors e utilização de JSON
app.use(cors());
app.use(express.json());

// Testar API
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

// Importar a conexão com o banco
const connection = require('./db_config');

const upload = require('./multer')

// cadastro de usuário
app.post('/usuario/cadastrar', (request, response) => {
    // Criar um array com os dados recebidos
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.password
    );
    // Criar o comando de execução no banco de dados
    let query = "INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?);";
    // Passar o comando e os dados para função query


    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});

app.get('/usuario/listar', (request, response) => {
    const query = "SELECT * FROM usuarios";

    connection.query(query, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso!",
                    data: err
                })
        }
    })
});

app.post('/usuario/login', (request, response) => {
    let params = Array(
        request.body.email
    );

    let query = "SELECT * FROM usuarios WHERE email = ?;";

    connection.query(query, params, (err, results) => {
        if(err) {
            response.status(400).json({
                success: false,
                message: "Erro ao encontrar usuário",
                data: err,
            });
            return;
        }
        if(results.length > 0) {
            let senhaDigita = request.body.password
            let senhaBanco = results[0].senha

            if (senhaBanco === senhaDigita) {
                response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Verifique sua senha!"
                })
            } 
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "E-mail não cadastrado!",
                    data: err
                })
        }
    })
})

app.get('/usuario/informacoes/:id', (request, response) => {
    let params = Array(
        request.params.id
    );

    let query = "SELECT * FROM usuarios WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
})

app.put('/usuario/editar/:id', (request, response) => {
    let params = Array(
        request.body.nome,
        request.params.id
    );

    let query = "UPDATE usuarios SET nome = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});

app.delete('/usuario/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM usuarios WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});


// cadastro de produto

app.post('/produto/cadastrar', upload.single('file'), (request, response) => {
    // Criar um array com os dados recebidos
    let params = Array(
        request.body.nome,
        request.body.valor,
        request.body.descricao,
        request.file.filename
    );
    // Criar o comando de execução no banco de dados
    let query = "INSERT INTO produtos(nome,valor,descricao,image) VALUES(?,?,?,?);";
    // Passar o comando e os dados para função query

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});

app.get('/produto/listar', (request, response) => {
    const query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso!",
                    data: err
                })
        }
    })
});

app.put('/produto/editar/:id', (request, response) => {
    let params = Array(
        request.body.nome,
        request.params.id
    );

    let query = "UPDATE produtos SET nome = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});

app.delete('/produto/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM produtos WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
});

app.use('/uploads', express.static(__dirname + '\\public'))