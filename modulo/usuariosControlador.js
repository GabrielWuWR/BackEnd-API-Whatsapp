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

function retornarDadosUsuario(numero) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', usuario: [] };
    let numeroPesquisa = numero;
    let dados = retornarTodosUsuarios();

    dados.usuarios.forEach((usuario) => {
        if (numeroPesquisa == usuario.numero) {
            resposta.usuario.push(usuario);
        }
    });

    if (resposta.usuario.length > 0) {
        return resposta;
    } else {
        return ERRO_MENSAGEM;
    }
}

function retornarDadosContato(numero, nomeContato) {
    let resposta = { status: true, status_code: 200, desenvolvedor: 'Gabriel', contato: [] };
    let dados = retornarDadosUsuario(numero);
    let contatoPesquisa = nomeContato;

    dados.usuario[0].contatos.forEach((contato) => {
        if(contatoPesquisa == contato.nome) {
            resposta.contato.push(
                {
                    nome: contato.nome,
                    descricao: contato.descricao,
                    imagem: contato.imagem
                }
            )
        }
    });

    console.log(resposta)
}

retornarDadosContato('11987876567', "Jane Smith");