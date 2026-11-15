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
        return res.status(error.statusCode || 400).json({ mensagem: error.message });
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

async function atualizarPlayer(req, res) {
    const { id } = req.params;
    const { time_id, time, nome, posicao, numero_camisa, nacionalidade, data_nascimento } = req.body;
    const timeIdFinal = time_id !== undefined ? time_id : (time !== undefined ? time : null);

    if (!nome || !posicao || !nacionalidade || !data_nascimento) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser preenchidos!" });
    }

    try {
        const updatedPlayer = await playerService.atualizarPlayer(id, timeIdFinal, nome, posicao, numero_camisa, nacionalidade, data_nascimento);
        return res.status(200).json({ mensagem: "Jogador atualizado com sucesso!", jogador: updatedPlayer });
    } catch (error) {
        return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
}

async function excluirPlayer(req, res) {
    const { id } = req.params;

    try {
        await playerService.excluirPlayer(id);
        return res.status(200).json({ mensagem: "Jogador excluído com sucesso!" });
    } catch (error) {
        return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
}

module.exports = { criar, atualizarPlayer, excluirPlayer, listar };
