const express = require('express');
const app = express();
const porta = 4001;
const host = '0.0.0.0';

let listaEscolas = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Bem-vindo</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background: linear-gradient(45deg, #FFDD93, #FFC3A0, #FF9B93);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .container {
                        text-align: center;
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Bem-vindo ao Cadastro de Escolas</h1>
                    <a class="btn btn-primary btn-lg m-2" href="/cadastrarEscola">Cadastrar Escola</a>
                    <a class="btn btn-success btn-lg m-2" href="/listarEscolas">Ver Escolas Cadastradas</a>
                </div>
            </body>
        </html>
    `);
});

function cadastroEscolaView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Escolas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background: linear-gradient(45deg, #FFDD93, #FFC3A0, #FF9B93);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .container {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    input, select, button {
                        border: 2px solid #FF6F61; /* Destaque */
                        background-color: #FFF7E0; /* Fundo destacado */
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    input:focus, select:focus {
                        outline: none;
                        border-color: #FF9B93; /* Foco */
                    }
                </style>
            </head>
            <body>
                <div class="container mt-5">
                    <h1>Cadastro de Escolas</h1>
                    <form method="POST" action="/cadastrarEscola" class="border p-4 row g-3">
                        <div class="col-md-6">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" required>
                        </div>
                        <div class="col-md-6">
                            <label for="razaoSocial" class="form-label">Razão Social</label>
                            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" required>
                        </div>
                        <div class="col-md-6">
                            <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" required>
                        </div>
                        <div class="col-md-12">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" required>
                        </div>
                        <div class="col-md-6">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" required>
                        </div>
                        <div class="col-md-3">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf" required>
                                <option value="" selected>Escolha...</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="MG">MG</option>
                                <option value="ES">ES</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" name="cep" required>
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="col-md-6">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" required>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Cadastrar Escola</button>
                        </div>
                    </form>
                </div>
            </body>
        </html>
    `);
}

function listarEscolasView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Lista de Escolas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background: linear-gradient(45deg, #FFDD93, #FFC3A0, #FF9B93);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .container {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <div class="container mt-5">
                    <h2>Escolas Cadastradas</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                                <th>UF</th>
                                <th>CEP</th>
                                <th>Email</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaEscolas.map(escola => `
                                <tr>
                                    <td>${escola.cnpj}</td>
                                    <td>${escola.razaoSocial}</td>
                                    <td>${escola.nomeFantasia}</td>
                                    <td>${escola.endereco}</td>
                                    <td>${escola.cidade}</td>
                                    <td>${escola.uf}</td>
                                    <td>${escola.cep}</td>
                                    <td>${escola.email}</td>
                                    <td>${escola.telefone}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <a class="btn btn-primary" href="/">Voltar ao Início</a>
                </div>
            </body>
        </html>
    `);
}

function cadastrarEscola(req, resp) {
    const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    const escola = { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone };
    listaEscolas.push(escola);

    resp.redirect('/listarEscolas');
}

app.get('/cadastrarEscola', cadastroEscolaView);
app.get('/listarEscolas', listarEscolasView);
app.post('/cadastrarEscola', cadastrarEscola);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
