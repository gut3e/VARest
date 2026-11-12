const authService =  require("../services/authService");

async function register(req,res){
    const {nome,email,senha} = req.body;

    if (!nome || !email || !senha){
        return res.status(400).json({mensagem: 'Faltam dados"'})
    }
    try{
        await authService.register(nome,email,senha);
        return res.status(201).json({mensagem: 'Usuario cadastrado com sucesso!'});
    }catch(error){
        return res.status(400).json({ mensagem: error.message });
    }
}

async function login(req,res){
    const {email,senha} = req.body;
    try{
        const usuario = await authService.login(email,senha);
        return res.status(200).json(usuario);
    } catch (error){
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {register,login};