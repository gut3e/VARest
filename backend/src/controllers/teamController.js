const teamService = require("../services/teamService");

async function criar(req,res){
    const {nome,sigla,estadio,fundacao} = req.body;

    if(!nome || !sigla || !estadio || !fundacao){
        return res.status(400).json({mensagem : "Faltam dados do Time!"});
    }

    try{
        const novo = await teamService.criarTime(nome,sigla,estadio,fundacao);
        return res.status(201).json({mensagem: "Time cadastrado com sucesso", time: novo});
    }catch (error){
        return res.status(400).json({ mensagem: error.message });
    }
}

async function listar(req, res) {
    try {
        const times = await teamService.listarTimes();
        return res.status(200).json(times);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao listar times" });
    }
}

module.exports = { criar, listar }; 
