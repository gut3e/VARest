const authRepository = require("../repositories/authRepository");
const bcrypt = require('bcrypt');

async function register (nome, email, senha){
    const jaExiste = await authRepository.buscarPorEmail(email);
    if (jaExiste){
        throw new Error('Email já cadastrado!');
    }
    
    const senhaHash = await bcrypt.hash(senha, 10);

    await authRepository.criar(nome, email, senhaHash);
}

async function login(email, senha){
    const usuario = await authRepository.buscarPorEmail(email);
    if (!usuario){
        throw new Error('Email ou senha invalido!');
    }
    const senhaValida = await bcrypt.compare(senha,usuario.senha);
    if(!senhaValida){
        throw new Error('Email ou senha invalido!');
    }

    return {
        id:usuario.id,
        nome:usuario.nome,
        email:usuario.email
    }
}

module.exports = {register, login};