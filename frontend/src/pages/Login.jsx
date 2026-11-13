import React, { useState } from 'react';
import { LogIn, Mail, Lock, Shield, ArrowRight, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Login({ onLoginSucesso, onIrParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        senha,
      });
      onLoginSucesso(response.data);
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.mensagem || 'Falha ao autenticar. Verifique suas credenciais.';
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  // Atalho para teste rápido caso o usuário queira entrar sem backend ativo
  function handleDemoLogin() {
    onLoginSucesso({
      id: 99,
      nome: 'Gustavo Silva',
      email: 'gustavo@varest.com.br',
    });
  }

  return (
    <div className="auth-wrapper">
      {/* Left Pane - Stadium Intelligence Showcase */}
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
                TACTICAL INTELLIGENCE
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '0.25rem 0.65rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
          >
            <span className="live-pulse" style={{ width: '6px', height: '6px' }}></span>
            SISTEMA OPERACIONAL
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
            Gestão analítica e métricas de futebol em tempo real.
          </h2>

          <p style={{ color: '#9bb0a4', fontSize: '1rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Monitore clubes, estruture fichas táticas de atletas, sincronize confrontos oficiais e acesse endpoints
            RESTful estruturados para o ecossistema esportivo.
          </p>
        </div>

        {/* Tactical preview pill */}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>BANCO RELACIONAL POSTGRESQL</span>
            <span style={{ fontSize: '0.75rem', color: '#9bb0a4' }}>v1.0.0</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#e5e7eb' }}>
            Esquemas de dados modelados para alta integridade: chaves estrangeiras, estatísticas por minuto e registros de títulos.
          </p>
        </div>
      </div>

      {/* Right Pane - Clean Login Form */}
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
              Entrar no VARest
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Insira suas credenciais para gerenciar a base de futebol.
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
              <label className="form-label">E-mail corporativo ou técnico</label>
              <div className="input-container">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="analista@futebol.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Senha de acesso</label>
              </div>
              <div className="input-container">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
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
              <LogIn size={18} />
              {carregando ? 'Autenticando...' : 'Acessar Central'}
            </button>
          </form>

          {/* Atalho Demo e Ir para Cadastro */}
          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              textAlign: 'center',
            }}
          >
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                background: 'none',
                border: '1px dashed var(--border-strong)',
                color: 'var(--pitch-turf-hover)',
                padding: '0.55rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⚡ Acesso Rápido de Demonstração
            </button>

            <button
              type="button"
              onClick={onIrParaCadastro}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
              }}
            >
              Novo no VARest? <strong style={{ color: 'var(--text-primary)' }}>Criar conta analista</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
