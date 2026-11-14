const matchRepository = require('../repositories/matchRepository');

async function criarPartidas(time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio){
    if(time_mandante_id === time_visitante_id){
        throw new Error('O time não pode ser o mesmo!');
    }
    
    return await matchRepository.inserirPartida(time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio)

}

async function listarPartidas(){
    return await matchRepository.listarPartidas();
}

module.exports = {criarPartidas, listarPartidas};