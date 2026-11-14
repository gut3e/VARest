const matchService = require('../services/matchService');

async function criarPartidas(req, res){
    const {time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio} = req.body;
    
    if(!time_mandante_id || !time_visitante_id || !data_partida){
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser preenchidos!" })
    }
    try{
        const novaPartida = await matchService.criarPartidas(time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio);
        return res.status(201).json({mensagem: "Partida cadastrada com sucesso!", novaPartida});
    }catch(error){
        console.log(error);
        return res.status(400).json({mensagem: error.message});
        
    }
}

async function listarPartidas(req,res){
    try{
        const partidas = await matchService.listarPartidas();
        return res.status(200).json(partidas);   
    }catch(error){
        return res.status(500).json({mensagem: "Erro ao listar as partidas"});
    }
}

module.exports = {criarPartidas, listarPartidas};