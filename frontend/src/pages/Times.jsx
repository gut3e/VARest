import React, { useState } from 'react';
import { Shield, Plus } from 'lucide-react';

export default function Times() {
  // Simulando dados que no futuro virão do backend:
  const [times] = useState([
    { id: 1, nome: 'Flamengo', sigla: 'FLA', estadio: 'Maracanã', fundacao: 1895 },
    { id: 2, nome: 'Palmeiras', sigla: 'PAL', estadio: 'Allianz Parque', fundacao: 1914 },
    { id: 3, nome: 'São Paulo', sigla: 'SAO', estadio: 'Morumbi', fundacao: 1930 },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', margin: 0 }}>
            Times de Futebol
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
            Lista de clubes cadastrados no sistema
          </p>
        </div>

        <button
          onClick={() => alert('No próximo passo vamos criar o formulário para adicionar time!')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#059669',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Plus size={18} /> Novo Time
        </button>
      </div>

      {/* Grid de Cards de Times */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {times.map((time) => (
          <div
            key={time.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  backgroundColor: '#dcfce7',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  color: '#15803d',
                  display: 'flex',
                }}
              >
                <Shield size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{time.nome}</h3>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>{time.sigla}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <p style={{ margin: 0 }}>🏟️ <strong>Estádio:</strong> {time.estadio}</p>
              <p style={{ margin: 0 }}>📅 <strong>Fundação:</strong> {time.fundacao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

