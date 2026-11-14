const playerService = require("../services/playerService");

async function criar(req, res) {
    const { time_id, time, nome, posicao, numero_camisa, nacionalidade, data_nascimento } = req.body;
    const timeIdFinal = time_id || time || null;

    if (!nome || !posicao || !nacionalidade || !data_nascimento) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser preenchidos!" });
    }

    try {
        const novoJogador = await playerService.criarPlayer(timeIdFinal, nome, posicao, numero_camisa, nacionalidade, data_nascimento);
        return res.status(201).json({ mensagem: "Jogador cadastrado com sucesso!", jogador: novoJogador });
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

async function listar(req, res) {
    try {
        const jogadores = await playerService.listarPlayers();
        return res.status(200).json(jogadores);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar jogadores" });
    }
}

module.exports = { criar, listar };