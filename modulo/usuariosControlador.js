/**************************************************************************************
 * Objetivo: Deenvolver as principais funções relacionadas aos usuarios
 * Autor: Gabriel José
 * Data: 08/04/2026
 * Versão: 1.0.8.4
 *************************************************************************************/

const dados = require('./contatos.js');

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
};

retornarTodosUsuarios();