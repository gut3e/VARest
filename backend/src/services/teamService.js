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

module.exports = { criarTime, listarTimes };