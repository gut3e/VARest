const teamService = require("../services/teamService");

async function criar(req,res){
    const {nome,sigla,estadio,fundacao} = req.body;

    if(!nome || !sigla || !estadio || !fundacao){
        return res.status(400).json({mensagem : "Faltam dados do Time!"});
    }

    try{
        await teamService.criarTime(nome,sigla,estadio,fundacao);
        return res.status(201).json({mensagem: "Time cadastrado com sucesso"});
    }catch (error){
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {criar}; 
