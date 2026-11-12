import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import axios from 'axios';

export default function Login({ onLoginSucesso, onIrParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        senha
      });
      onLoginSucesso(response.data);
    }catch(error){
      console.log(error)
      const msg = error.response?.data?.mensagem || 'Erro ao fazer login';
      alert(msg);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#064e3b', margin: 0 }}>
            ⚽ VARest
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            <LogIn size={18} />
            Entrar no Sistema
          </button>
        </form>

        {/* Ir para Cadastro */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={onIrParaCadastro}
            style={toggleButtonStyle}
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3f4f6',
  padding: '1rem',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  border: '1px solid #e5e7eb',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '0.25rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.625rem',
  borderRadius: '0.375rem',
  border: '1px solid #d1d5db',
  fontSize: '0.9rem',
  outline: 'none',
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  backgroundColor: '#059669',
  color: '#ffffff',
  border: 'none',
  padding: '0.75rem',
  borderRadius: '0.375rem',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '0.5rem',
};

const toggleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#059669',
  fontSize: '0.85rem',
  cursor: 'pointer',
  textDecoration: 'underline',
};
