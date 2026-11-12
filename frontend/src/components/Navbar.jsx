import React from 'react';
import { Users, Calendar, Trophy, BarChart2, Goal } from 'lucide-react';

export default function Navbar({ abaAtiva, setAbaAtiva }) {
  return (
    <header
      style={{
        backgroundColor: '#86efac',
        borderBottom: '1px solid #4ade80',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#064e3b', margin: 0 }}>
          ⚽ VARest
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#065f46', margin: 0 }}>
          Gestão & Estatísticas de Futebol
        </p>
      </div>

      <nav style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => setAbaAtiva('dashboard')}
          style={getEstiloBotao(abaAtiva === 'dashboard')}
        >
          <BarChart2 size={18} /> Início
        </button>

        <button
          onClick={() => setAbaAtiva('times')}
          style={getEstiloBotao(abaAtiva === 'times')}
        >
          <Goal size={18} /> Times
        </button>

        <button
          onClick={() => setAbaAtiva('jogadores')}
          style={getEstiloBotao(abaAtiva === 'jogadores')}
        >
          <Users size={18} /> Jogadores
        </button>

        <button
          onClick={() => setAbaAtiva('partidas')}
          style={getEstiloBotao(abaAtiva === 'partidas')}
        >
          <Calendar size={18} /> Partidas
        </button>

        <button
          onClick={() => setAbaAtiva('titulos')}
          style={getEstiloBotao(abaAtiva === 'titulos')}
        >
          <Trophy size={18} /> Títulos
        </button>
      </nav>
    </header>
  );
}

function getEstiloBotao(ativo) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: ativo ? '#059669' : '#ffffff',
    color: ativo ? '#ffffff' : '#065f46',
    border: '1px solid #6ee7b7',
    padding: '0.5rem 0.9rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };
}

