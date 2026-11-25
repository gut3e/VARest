const teamRepository = require('../repositories/teamRepository');

async function criarTime(nome, sigla, estadio, fundacao){
    const jaExiste = await teamRepository.buscarNomeOuSigla(nome, sigla.toUpperCase());
    if (jaExiste){
        throw new Error('Time já cadastrado!');
    }

    return await teamRepository.inserirTime(nome, sigla, estadio, fundacao);
}

async function listarTimes() {
    return await teamRepository.listarTodos();
}

async function excluirTime(id){
    const time = await teamRepository.buscarPorId(id);
    if(!time){
        const erro = new Error('Time não encontrado!');
        erro.statusCode = 404;
        throw erro;
    }

    const possuiPartidas = await teamRepository.temPartidas(id);
    if (possuiPartidas) {
        const erro = new Error('Não é possível excluir um time que possui partidas registradas!');
        erro.statusCode = 400;
        throw erro;
    }

    return await teamRepository.excluirTime(id);
}

module.exports = { criarTime, listarTimes, excluirTime };