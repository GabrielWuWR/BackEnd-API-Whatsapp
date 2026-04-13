/**************************************************************************************
 * Objetivo: Desenvolver as principais funções relacionadas aos usuarios
 * Autor: Gabriel José
 * Data: 08/04/2026
 * Versão: 1.0.8.4
 *************************************************************************************/

const dados = require('./contatos.js');
const ERRO_MENSAGEM = { status: false, status_code: 404, desenvolvedor: 'Gabriel' };

//Função para listar todos os usuarios da aplicação
function retornarTodosUsuarios() {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', usuarios: [] };

    dados.contatos['whats-users'].forEach((contato) => {
        resposta.usuarios.push(
            {
                id: contato.id,
                conta: contato.account,
                apelido: contato.nickname,
                data_criacao: { comeco: contato['created-since'].start, fim: contato['created-since'].end },
                imagem_perfil: contato['profile-image'],
                numero: contato.number,
                fundo: contato.background,

                contatos: contato.contacts.map(function (itemUser) {
                    return {
                        nome: itemUser.name,
                        descricao: itemUser.description,
                        imagem: itemUser.image,
                        mensagens: itemUser.messages.map(function (itemMensagem) {
                            return {
                                remetente: itemMensagem.sender,
                                conteudo: itemMensagem.content,
                                horaEnvio: itemMensagem.time
                            };
                        }),
                    };
                }),
            },
        );
    });

    if (resposta.usuarios.length > 0) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.dir(retornarTodosUsuarios(), { depth: null});

//Função para listar apenas um usuario buscando pelo número
function retornarDadosUsuario(numero) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel' };
    let numeroPesquisa = numero;
    let dados = retornarTodosUsuarios();

    if (dados.status == true) {
        dados.usuarios.forEach((usuario) => {
            if (numeroPesquisa == usuario.numero) {
                resposta.usuario = usuario;
            };
        });
    };

    if (dados.status == true && resposta.usuario !== undefined) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.dir(retornarDadosUsuario('11966578996'), { depth: null});

//Função para listar uma lista dos contatos de um usuario
function retornarDadosContato(numero) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', contato: [] };
    let dados = retornarDadosUsuario(numero);

    if (dados.status == true) {
        dados.usuario.contatos.forEach((contato) => {
            resposta.contato.push(
                {
                    nome: contato.nome,
                    descricao: contato.descricao,
                    imagem: contato.imagem
                }
            );
        });
    };

    if (dados.status == true && resposta.contato.length > 0) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.dir(retornarDadosContato('11955577796', 'Ana Maria'), { depth: null});

//Função para listar todas as conversas de um usuario
function retornarConversasUsuario(numero) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', conversas: [] };
    let dados = retornarDadosUsuario(numero);

    if (dados.status == true) {
        dados.usuario.contatos.forEach((contato) => {
            contato.mensagens.forEach((mensagem) => {
                resposta.conversas.push(mensagem);
            });
        });
    };

    if (dados.status == true && resposta.conversas.length > 0) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.log(retornarConversasUsuario('11966578996'))

//Função para listar todas as conversas entre um usuario e um contato expecifico
function retornarConversaContato(numero, contatoNome) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel' };
    let dados = retornarDadosUsuario(numero);

    if (dados.status == true) {
        dados.usuario.contatos.forEach((contato) => {
            if (contatoNome.toLowerCase() == contato.nome.toLowerCase()) {
                resposta.contato = contato;
            };
        });
    };


    if (dados.status == true && resposta.contato !== undefined) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.log(retornarConversaContato('11966578996', 'José Maria da Silva'));

//Função para pesquisar por uma conversa através de uma palavra chave
function pesquisaConversaContato(numero, contato, palavra) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', mensagens: [] };
    let dados = retornarConversaContato(numero, contato);

    if (dados.status == true) {
        dados.contato.mensagens.forEach((mensagem) => {
            let mensagemMinuscula = mensagem.conteudo.toLowerCase();

            if (mensagemMinuscula.includes(palavra.toLowerCase())) {
                resposta.mensagens.push(mensagem);
            };
        });
    };

    if (resposta.mensagens.length > 0 && dados.status == true && palavra != '') {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.log(pesquisaConversaContato('11966578996', 'José Maria da Silva', 'hello'));

function documentacaoAPI() {
    let documentacao = {
        'descricacao-API': 'API de pesquisa, filtragem e listagem de usuários e contatos do Whatsapp.',
        'versao': '1.0.8.4',
        'desenvolvedor': 'Gabriel José',
        'status': true,
        'status_code': 200,
        'rotasBase': {
            'local': 'localhost://8080',
            'render': 'https://backend-api-whatsapp-ajie.onrender.com'
        },
        'rotas': [
            { 'rota1': '/v1/whatsapp/usuarios', 'descricao': 'Rota para listar todos os usuarios da aplicação.' },
            { 'rota2': '/v1/whatsapp/dados/usuario/:numero', 'descricao': 'Rota para listar os dados de um usuario filtrando pelo número.' },
            { 'rota3': '/v1/whatsapp/dados/usuario/:numero/contatos', 'descricao': 'Rota para listar os contatos de um usuário.' },
            { 'rota4': '/v1/whatsapp/dados/usuario/:numero/mensagens', 'descricao': 'Rota para listar todas as mensagens trocadas na conta de um usuário.' },
            { 'rota5': '/v1/whatsapp/dados/usuario/:numero/conversa?contato=NOME CONTATO', 'descricao': 'Rota para listar a conversa entre um usuário e um contato expecifico.' },
            { 'rota6': '/v1/whatsapp/dados/usuario/:numero/conversa/busca?contato=NOME CONTATO&palavra=PALAVRA', 'descricao': 'Rota para buscar uma conversa do usuário com um contato filtrando por uma palavra chave.' },
        ]
    };

    return documentacao;
};

module.exports = {
    retornarTodosUsuarios,
    retornarDadosUsuario,
    retornarDadosContato,
    retornarConversasUsuario,
    retornarConversaContato,
    pesquisaConversaContato,
    documentacaoAPI
};