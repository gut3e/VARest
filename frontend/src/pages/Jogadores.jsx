import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Shield, Award } from 'lucide-react';

export default function Jogadores() {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: 'Giorgian de Arrascaeta', time: 'Flamengo', posicao: 'Meio-campo', camisa: 14, gols: 12, assistencias: 16, nacionalidade: 'Uruguai' },
    { id: 2, nome: 'Pedro Guilherme', time: 'Flamengo', posicao: 'Atacante', camisa: 9, gols: 30, assistencias: 6, nacionalidade: 'Brasil' },
    { id: 3, nome: 'Raphael Veiga', time: 'Palmeiras', posicao: 'Meio-campo', camisa: 23, gols: 18, assistencias: 11, nacionalidade: 'Brasil' },
    { id: 4, nome: 'Gustavo Gómez', time: 'Palmeiras', posicao: 'Zagueiro', camisa: 15, gols: 5, assistencias: 1, nacionalidade: 'Paraguai' },
    { id: 5, nome: 'Lucas Moura', time: 'São Paulo', posicao: 'Atacante', camisa: 7, gols: 11, assistencias: 8, nacionalidade: 'Brasil' },
    { id: 6, nome: 'Weverton', time: 'Palmeiras', posicao: 'Goleiro', camisa: 21, gols: 0, assistencias: 0, nacionalidade: 'Brasil' },
  ]);

  const [busca, setBusca] = useState('');
  const [filtroPosicao, setFiltroPosicao] = useState('Todas');

  const posicoes = ['Todas', 'Goleiro', 'Zagueiro', 'Meio-campo', 'Atacante'];

  const filtrados = jogadores.filter((j) => {
    const matchBusca =
      j.nome.toLowerCase().includes(busca.toLowerCase()) ||
      j.time.toLowerCase().includes(busca.toLowerCase());
    const matchPosicao = filtroPosicao === 'Todas' || j.posicao === filtroPosicao;
    return matchBusca && matchPosicao;
  });

  const getBadgePosicao = (pos) => {
    switch (pos) {
      case 'Goleiro':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'Zagueiro':
        return { bg: '#e0f2fe', text: '#0369a1' };
      case 'Meio-campo':
        return { bg: '#ecfdf5', text: '#047857' };
      case 'Atacante':
        return { bg: '#fee2e2', text: '#b91c1c' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
              Elenco de Atletas
            </h2>
            <span
              style={{
                backgroundColor: '#edf7f2',
                color: 'var(--pitch-turf-hover)',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {jogadores.length} atletas
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.35rem 0 0 0' }}>
            Estatísticas individuais, posições táticas e histórico de contribuição em gols.
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-subtle)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '260px', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Pesquisar por nome ou clube..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem 0.6rem 2.4rem',
              border: '1px solid var(--border-strong)',
              borderRadius: '6px',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'inherit',
              backgroundColor: '#fafcfb',
            }}
          />
        </div>

        {/* Tags de Posição */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {posicoes.map((pos) => {
            const ativo = filtroPosicao === pos;
            return (
              <button
                key={pos}
                onClick={() => setFiltroPosicao(pos)}
                style={{
                  background: ativo ? '#091c15' : '#f3f6f4',
                  color: ativo ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: ativo ? '#091c15' : 'var(--border-subtle)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: ativo ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                {pos}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabela Tática de Jogadores */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#fafcfb',
                borderBottom: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th style={{ padding: '1rem 1.25rem' }}>Atleta / Camisa</th>
              <th style={{ padding: '1rem 1.25rem' }}>Clube</th>
              <th style={{ padding: '1rem 1.25rem' }}>Posição</th>
              <th style={{ padding: '1rem 1.25rem' }}>Nacionalidade</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>Gols</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>Assistências</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((j) => {
              const badge = getBadgePosicao(j.posicao);
              return (
                <tr
                  key={j.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7faf8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: '#091c15',
                          color: '#34d399',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {j.camisa}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{j.nome}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>ID #{j.id}</span>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Shield size={14} color="var(--pitch-turf-hover)" /> {j.time}
                    </span>
                  </td>

                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.text,
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {j.posicao}
                    </span>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                    {j.nacionalidade}
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center', fontWeight: 800, color: '#059669' }}>
                    {j.gols}
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {j.assistencias}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

