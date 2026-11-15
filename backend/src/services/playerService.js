const playerRepository = require('../repositories/playerRepository');

async function criarPlayer(time, nome, posicao, numero_camisa, nacionalidade, data_nascimento) {
    const jaExiste = await playerRepository.buscarNome(nome, data_nascimento);
    if (jaExiste) {
        throw new Error('Jogador já cadastrado!');
    }

    if (numero_camisa !== null && numero_camisa !== undefined && numero_camisa !== '') {
        const num = Number(numero_camisa);
        if (num <= 0 || num > 99) {
            const erro = new Error('O número da camisa deve estar entre 1 e 99.');
            erro.statusCode = 400;
            throw erro;
        }

        if (time) {
            const camisaOcupada = await playerRepository.buscarPorTimeECamisa(time, num);
            if (camisaOcupada) {
                const erro = new Error(`O número ${num} já está em uso por outro jogador neste time.`);
                erro.statusCode = 409;
                throw erro;
            }
        }
    }

    return await playerRepository.inserirPlayer(time, nome, posicao, numero_camisa, nacionalidade, data_nascimento);
}

async function listarPlayers() {
    return await playerRepository.listarTodos();
}

async function excluirPlayer(id) {
    const jogadorAtual = await playerRepository.buscarPorId(id);
    if (!jogadorAtual) {
        const erro = new Error('Jogador não encontrado!');
        erro.statusCode = 404;
        throw erro;
    }

    return await playerRepository.excluirPlayer(id);
}

async function atualizarPlayer(id, time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento) {
    const jogadorAtual = await playerRepository.buscarPorId(id);
    if (!jogadorAtual) {
        const erro = new Error('Jogador não encontrado!');
        erro.statusCode = 404;
        throw erro;
    }

    const timeIdFinal = time_id !== undefined ? time_id : jogadorAtual.time_id;
    const nomeFinal = nome ?? jogadorAtual.nome;
    const posicaoFinal = posicao ?? jogadorAtual.posicao;
    const nacionalidadeFinal = nacionalidade ?? jogadorAtual.nacionalidade;
    const dataNascimentoFinal = data_nascimento ?? jogadorAtual.data_nascimento;
    const numeroCamisaFinal = numero_camisa !== undefined ? numero_camisa : jogadorAtual.numero_camisa;

    if (numeroCamisaFinal !== null && numeroCamisaFinal !== undefined && numeroCamisaFinal !== '') {
        const num = Number(numeroCamisaFinal);
        if (num <= 0 || num > 99) {
            const erro = new Error('O número da camisa deve estar entre 1 e 99.');
            erro.statusCode = 400;
            throw erro;
        }

        if (timeIdFinal) {
            const jogadorComMesmaCamisa = await playerRepository.buscarPorTimeECamisa(timeIdFinal, num);
            // Só gera conflito se pertencer a outro jogador
            if (jogadorComMesmaCamisa && jogadorComMesmaCamisa.id !== Number(id)) {
                const erro = new Error(`O número ${num} já está em uso por outro jogador neste time.`);
                erro.statusCode = 409;
                throw erro;
            }
        }
    }

    return await playerRepository.atualizarPlayer(
        id,
        timeIdFinal,
        nomeFinal,
        posicaoFinal,
        numeroCamisaFinal,
        nacionalidadeFinal,
        dataNascimentoFinal
    );
}

module.exports = { criarPlayer, listarPlayers, excluirPlayer, atualizarPlayer };
