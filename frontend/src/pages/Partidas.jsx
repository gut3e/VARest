import React from 'react';
import { Calendar, MapPin, Clock, Shield } from 'lucide-react';

export default function Partidas() {
  const partidas = [
    {
      id: 1,
      campeonato: 'Brasileirão Série A • Rodada 28',
      mandante: 'Flamengo',
      siglaMandante: 'FLA',
      golsMandante: 2,
      visitante: 'Palmeiras',
      siglaVisitante: 'PAL',
      golsVisitante: 1,
      estadio: 'Maracanã',
      data: '13/11/2026',
      status: 'Finalizado',
    },
    {
      id: 2,
      campeonato: 'Brasileirão Série A • Rodada 28',
      mandante: 'São Paulo',
      siglaMandante: 'SAO',
      golsMandante: 3,
      visitante: 'Corinthians',
      siglaVisitante: 'COR',
      golsVisitante: 1,
      estadio: 'Morumbi',
      data: '14/11/2026',
      status: 'Finalizado',
    },
    {
      id: 3,
      campeonato: 'Copa Libertadores • Semifinal',
      mandante: 'Grêmio',
      siglaMandante: 'GRE',
      golsMandante: 0,
      visitante: 'Atlético Mineiro',
      siglaVisitante: 'CAM',
      golsVisitante: 0,
      estadio: 'Arena do Grêmio',
      data: '20/11/2026',
      status: 'Agendado',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
          Quadro de Confrontos
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.35rem 0 0 0' }}>
          Resultados oficiais com súmulas auditadas e próximos duelos agendados.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {partidas.map((p) => {
          const finalizado = p.status === 'Finalizado';
          return (
            <div key={p.id} className="tactical-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {p.campeonato}
                </span>
                <span
                  style={{
                    backgroundColor: finalizado ? '#edf7f2' : '#f3f4f6',
                    color: finalizado ? '#059669' : '#4b5563',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Scoreboard visual */}
              <div
                style={{
                  backgroundColor: '#091c15',
                  color: '#ffffff',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{p.siglaMandante}</div>
                  <div style={{ fontSize: '0.75rem', color: '#8fa89b' }}>{p.mandante}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
                  {finalizado ? (
                    <>
                      <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399' }}>{p.golsMandante}</span>
                      <span style={{ color: '#557264', fontWeight: 300 }}>×</span>
                      <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399' }}>{p.golsVisitante}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9bb0a4' }}>VS</span>
                  )}
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{p.siglaVisitante}</div>
                  <div style={{ fontSize: '0.75rem', color: '#8fa89b' }}>{p.visitante}</div>
                </div>
              </div>

              {/* Match Details */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.75rem',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="var(--pitch-turf-hover)" /> {p.estadio}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={14} color="var(--pitch-turf-hover)" /> {p.data}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

