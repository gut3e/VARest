const teamRepository = require('../repositories/teamRepository');

async function criarTime(nome, sigla, estadio, fundacao){
    const jaExiste = await teamRepository.buscarNomeOuSigla(nome, sigla.toUpperCase());
    if (jaExiste){
        throw new Error('Time já cadastrado!');
    }

    await teamRepository.inserirTime(nome, sigla, estadio, fundacao);
}

module.exports = {criarTime};