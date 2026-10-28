import React from 'react';
import { Trophy, Users, Calendar, BarChart2 } from 'lucide-react';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topo em Verde Claro */}
      <header
        style={{
          backgroundColor: '#86efac', // Verde claro suave
          borderBottom: '1px solid #4ade80',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#064e3b' }}>
            ⚽ VARest
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#065f46' }}>
            Gestão & Estatísticas de Futebol
          </p>
        </div>

        {/* Menu simples de navegação para o esboço */}
        <nav style={{ display: 'flex', gap: '1.25rem' }}>
          <button style={navButtonStyle}>
            <Users size={18} /> Times
          </button>
          <button style={navButtonStyle}>
            <Calendar size={18} /> Partidas
          </button>
          <button style={navButtonStyle}>
            <Trophy size={18} /> Títulos
          </button>
          <button style={navButtonStyle}>
            <BarChart2 size={18} /> Estatísticas
          </button>
        </nav>
      </header>

      {/* Conteúdo Principal com Fundo Branco */}
      <main
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          padding: '2.5rem 2rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
            Painel Geral
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Esboço inicial da interface. Conforme formos criando as rotas da API, conectamos os dados aqui.
          </p>
        </section>

        {/* Cards de exemplo com visual limpo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ fontSize: '1rem', color: '#374151' }}>Times Cadastrados</h3>
            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#059669', marginTop: '0.5rem' }}>
              3
            </p>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Flamengo, Palmeiras, São Paulo</span>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '1rem', color: '#374151' }}>Partidas Registradas</h3>
            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#059669', marginTop: '0.5rem' }}>
              0
            </p>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Aguardando cadastro no banco</span>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '1rem', color: '#374151' }}>Status da API</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.5rem' }}>
              ● Pronto para integrar
            </p>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Backend Express na porta 3000</span>
          </div>
        </div>
      </main>
    </div>
  );
}

const navButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: '#ffffff',
  color: '#065f46',
  border: '1px solid #6ee7b7',
  padding: '0.5rem 0.9rem',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  cursor: 'pointer',
};

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '1.25rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

