/**************************************************************************************
 * Objetivo: Desenvolver as principais rotas usadas na aplicação
 * Autor: Gabriel José
 * Data: 08/04/2026
 * Versão: 1.0.8.4
 *************************************************************************************/

const extress = require('express');
const cors = require('cors');

const app = extress();

const porta = 8080;

const corsOpcoes = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-type', 'Authorization']
};

app.use(cors(corsOpcoes));

const usuariosControlador = require('./modulo/usuariosControlador.js');

//Rota para listar todos os usuarios da aplicação
app.get('/v1/whatsapp/usuarios', function (request, response) {
    let usuarios = usuariosControlador.retornarTodosUsuarios();

    response.status(usuarios.status_code);
    response.json(usuarios);
});

//Rota para listar os dados de apenas um usuario filtrando pelo número
app.get('/v1/whatsapp/dados/usuario/:numero', function (request, response) {
    let numero = request.params.numero;
    let usuario = usuariosControlador.retornarDadosUsuario(numero);

    response.status(usuario.status_code);
    response.json(usuario);
});

//Rota para listar os contatos de um usuario
app.get('/v1/whatsapp/dados/usuario/:numero/contatos', function (request, response) {
    let numero = request.params.numero;
    let contato = usuariosControlador.retornarDadosContato(numero);

    response.status(contato.status_code);
    response.json(contato);
});

//Rota para listar todas as mensagens trocadas na conta de um usuario
app.get('/v1/whatsapp/dados/usuario/:numero/mensagens', function (request, response) {
    let numero = request.params.numero;
    let conversas = usuariosControlador.retornarConversasUsuario(numero);

    response.status(conversas.status_code);
    response.json(conversas);
});

//Rota para listar a conversa entre um usuario e um contato expecifico
app.get('/v1/whatsapp/dados/usuario/:numero/conversa', function (request, response) {
    let numero = request.params.numero;
    let contato = request.query.contato;
    let conversa = usuariosControlador.retornarConversaContato(numero, contato);

    response.status(conversa.status_code);
    response.json(conversa);
});

//Rota para buscar uma conversa do usuário com um contato filtrando por uma palavra chave
app.get('/v1/whatsapp/dados/usuario/:numero/conversa/busca', function (request, response) {
    let numero = request.params.numero;
    let contato = request.query.contato;
    let palavra = request.query.palavra;
    let conversa = usuariosControlador.pesquisaConversaContato(numero, contato, palavra);

    response.status(conversa.status_code);
    response.json(conversa);
});

//Rota para obter as informações das principais rotas
app.get('/v1/whatsapp/ajuda', function (request, response) {
    let documentacao = usuariosControlador.documentacaoAPI();

    response.status(documentacao.status_code);
    response.json(documentacao);
});

app.listen(porta, function () {
    console.log(`A API está funcionando em http://localhost:${porta}`);
});