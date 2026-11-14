const playerRepository = require('../repositories/playerRepository');

async function criarPlayer(time, nome, posicao, numero_camisa, nacionalidade, data_nascimento){
    const jaExiste = await playerRepository.buscarNome(nome, data_nascimento);
    if(jaExiste){
        throw new Error('Jogador já cadastrado!');
    }

    return await playerRepository.inserirPlayer(time, nome, posicao, numero_camisa, nacionalidade, data_nascimento);
}

async function listarPlayers() {
    return await playerRepository.listarTodos();
}

module.exports = { criarPlayer, listarPlayers };