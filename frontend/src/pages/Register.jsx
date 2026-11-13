import React, { useState } from 'react';
import { UserPlus, ArrowLeft, Mail, Lock, User, AlertCircle, Shield } from 'lucide-react';
import axios from 'axios';

export default function Register({ onVoltarLogin, onLoginSucesso }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        senha,
      });
      console.log(response.data);
      onLoginSucesso({ nome, email });
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.mensagem || 'Erro ao realizar cadastro de analista.';
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-wrapper">
      {/* Left Pane */}
      <div className="auth-hero-pane">
        <div className="auth-hero-pitch" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: '#091c15',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
              }}
            >
              ⚽
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>VARest</span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#34d399',
                }}
              >
                CADASTRO DE ANALISTA
              </span>
            </div>
          </div>

          <h2
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: '#ffffff',
            }}
          >
            Faça parte da equipe técnica da plataforma.
          </h2>

          <p style={{ color: '#9bb0a4', fontSize: '1rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Crie seu perfil operacional para cadastrar agremiações, registrar estatísticas de partidas e gerenciar
            dados estratégicos do futebol brasileiro.
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', marginBottom: '0.25rem' }}>
            SEGURANÇA COM BCRYPT & JWT READY
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#e5e7eb' }}>
            Credenciais criptografadas de ponta a ponta com hash salgado no banco de dados relacional.
          </p>
        </div>
      </div>

      {/* Right Pane */}
      <div className="auth-form-pane">
        <div className="auth-card">
          <div style={{ marginBottom: '2rem' }}>
            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                margin: '0 0 0.35rem 0',
              }}
            >
              Criar Conta Analista
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Preencha os campos para receber acesso completo à prancheta.
            </p>
          </div>

          {erro && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome completo</label>
              <div className="input-container">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Gustavo Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">E-mail corporativo ou técnico</label>
              <div className="input-container">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="gustavo@varest.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Defina sua senha</label>
              <div className="input-container">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <UserPlus size={18} />
              {carregando ? 'Registrando...' : 'Cadastrar no VARest'}
            </button>
          </form>

          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <button
              type="button"
              onClick={onVoltarLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--pitch-turf-hover)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <ArrowLeft size={16} /> Voltar para o Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
