import React from 'react';
import { Trophy, Award, Shield, Star } from 'lucide-react';

export default function Titulos() {
  const titulos = [
    { id: 1, clube: 'Flamengo', nome: 'Copa Libertadores da América', ano: 2022, categoria: 'Continental', icone: '🏆' },
    { id: 2, clube: 'Flamengo', nome: 'Campeonato Brasileiro', ano: 2020, categoria: 'Nacional', icone: '⭐' },
    { id: 3, clube: 'Palmeiras', nome: 'Campeonato Brasileiro', ano: 2023, categoria: 'Nacional', icone: '⭐' },
    { id: 4, clube: 'Palmeiras', nome: 'Copa Libertadores da América', ano: 2021, categoria: 'Continental', icone: '🏆' },
    { id: 5, clube: 'São Paulo', nome: 'Copa do Brasil', ano: 2023, categoria: 'Nacional', icone: '🥇' },
    { id: 6, clube: 'São Paulo', nome: 'Mundial de Clubes da FIFA', ano: 2005, categoria: 'Mundial', icone: '👑' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
          Galeria de Conquistas
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.35rem 0 0 0' }}>
          Memorial de taças oficiais, competições nacionais e glórias continentais.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {titulos.map((t) => (
          <div
            key={t.id}
            className="tactical-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              borderLeft: '4px solid #f59e0b',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}
            >
              {t.icone}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#b45309',
                    backgroundColor: '#fef3c7',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                  }}
                >
                  {t.categoria}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>{t.ano}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: 'var(--text-primary)' }}>
                {t.nome}
              </h3>

              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Shield size={14} color="var(--pitch-turf-hover)" />
                <span style={{ fontWeight: 600 }}>{t.clube}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

