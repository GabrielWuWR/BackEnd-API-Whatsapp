/**************************************************************************************
 * Objetivo: Deenvolver as principais funções relacionadas aos usuarios
 * Autor: Gabriel José
 * Data: 08/04/2026
 * Versão: 1.0.8.4
 *************************************************************************************/

const dados = require('./contatos.js');
const ERRO_MENSAGEM = { status: false, status_code: 404, desenvolvedor: 'Gabriel' };

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
            }
        );
    });

    if (resposta.usuarios.length > 0) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    }
};

//console.dir(retornarTodosUsuarios(), { depth: null});

function retornarDadosUsuario(numero) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel' };
    let numeroPesquisa = numero;
    let dados = retornarTodosUsuarios();

    if (dados.status == true) {
        dados.usuarios.forEach((usuario) => {
            if (numeroPesquisa == usuario.numero) {
                resposta.usuario = usuario;
            }
        });
    }

    if (dados.status == true && resposta.usuario !== undefined) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    }
};

//console.dir(retornarDadosUsuario('11966578996'), { depth: null});

function retornarDadosContato(numero, nomeContato) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', contato: {} };
    let dados = retornarDadosUsuario(numero);
    let contatoCorrigido = nomeContato.toLowerCase();

    if (dados.status == true) {
        dados.usuario.contatos.forEach((contato) => {
            if (contatoCorrigido == contato.nome.toLowerCase()) {
                resposta.contato.nome = contato.nome;
                resposta.contato.descricao = contato.descricao;
                resposta.contato.imagem = contato.imagem;
            };
        });
    }

    if (dados.status == true && JSON.stringify(resposta.contato) != '{}') {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    }
};

//console.dir(retornarDadosContato('11955577796', 'Peter Wilsen'), { depth: null});

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

function retornarConversaContato(numero, contatoNome) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel' };
    let dados = retornarDadosUsuario(numero);

    if (dados.status == true) {
        dados.usuario.contatos.forEach((contato) => {
            if (contatoNome.toLowerCase() == contato.nome.toLowerCase()) {
                resposta.contato = contato;
            };
        });
    }


    if (dados.status == true && resposta.contato !== undefined) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    };
};

//console.log(retornarConversaContato('11966578996', 'José Maria da Silva'));

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