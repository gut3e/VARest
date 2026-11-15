import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Users, Calendar, Trophy, TrendingUp, Activity, ArrowUpRight, Zap, Play } from 'lucide-react';

export default function Dashboard({ onNavegar, usuario }) {
  const [totalTimes, setTotalTimes] = useState(0);
  const [totalJogadores, setTotalJogadores] = useState(0);
  const [totalConfrontos, setTotalConfrontos] = useState(0);

  useEffect(() => {
    async function carregarTotais() {
      try {
        const [resTimes, resJogadores, resConfrontos] = await Promise.all([
          axios.get('http://localhost:3000/api/times'),
          axios.get('http://localhost:3000/api/players'),
          axios.get('http://localhost:3000/api/matches'),
        ]);

        setTotalTimes(resTimes.data.length);
        setTotalJogadores(resJogadores.data.length);
        setTotalConfrontos(resConfrontos.data.length);
      } catch (error) {
        console.error('Erro ao buscar totais do dashboard:', error);
      }
    }

    carregarTotais();
  }, []);

  const kpis = [
    { label: 'Clubes Monitorados', valor: String(totalTimes), delta: `${totalTimes} cadastrados no banco`, icon: Shield, tab: 'times' },
    { label: 'Atletas no Radar', valor: String(totalJogadores), delta: `${totalJogadores} scoutings ativos`, icon: Users, tab: 'jogadores' },
    { label: 'Confrontos Analisados', valor: String(totalConfrontos), delta: `${totalConfrontos}`, icon: Calendar, tab: 'partidas' },
    { label: 'Taças Registradas', valor: '42', delta: 'Histórico desde 1950', icon: Trophy, tab: 'titulos' },
  ];

  const partidaDestaque = {
    rodada: 'Rodada 28 • Brasileirão',
    status: 'AO VIVO (74\')',
    mandante: { nome: 'Flamengo', sigla: 'FLA', gols: 0, cor: '#dc2626' },
    visitante: { nome: 'Palmeiras', sigla: 'PAL', gols: 3, cor: '#16a34a' },
    estadio: 'Maracanã, Rio de Janeiro',
    gols: [
      { minuto: "18'", autor: 'Gustavo Gomes (PAL)' },
      { minuto: "42'", autor: 'Raphael Veiga (PAL)' },
      { minuto: "63'", autor: 'Gabriel Menino (PAL)' },
    ],
  };

  const ultimosRegistros = [
    { id: 1, tipo: 'Clube', titulo: 'São Paulo FC atualizou capacidade do Morumbi', tempo: '12 min atrás' },
    { id: 2, tipo: 'Partida', titulo: 'Súmula enviada: Santos 0 x 1 Corinthians', tempo: '45 min atrás' },
    { id: 3, tipo: 'Título', titulo: 'Copa do Brasil 2025 vinculada ao histórico do campeão', tempo: '2h atrás' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Tactical Welcome */}
      <div
        style={{
          background: 'linear-gradient(135deg, #091c15 0%, #0e2e21 60%, #123d2b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '-40px',
            opacity: 0.07,
            pointerEvents: 'none',
          }}
        >
          <Shield size={260} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              padding: '0.3rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1rem',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <Activity size={13} /> SALA DE ANÁLISE DE DADOS
          </div>

          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 0.5rem 0',
              lineHeight: 1.2,
            }}
          >
            Prancheta de Gestão VARest
          </h2>
          <p
            style={{
              color: '#a1b8ac',
              fontSize: '0.975rem',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.6,
            }}
          >
            Bem-vindo(a), {usuario?.nome || 'Analista'}. O ecossistema está conectado ao banco de dados relacional.
            Gerencie clubes, elenque atletas e consulte relatórios de partidas com latência zero.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavegar('times')}
              className="btn-emerald"
            >
              <Shield size={16} /> Explorar Clubes
            </button>
            <button
              onClick={() => onNavegar('partidas')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.7rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Calendar size={16} /> Ver Calendário
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavegar(kpi.tab)}
              className="tactical-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {kpi.label}
                </span>
                <div
                  style={{
                    backgroundColor: '#e6f6ee',
                    color: '#059669',
                    padding: '0.45rem',
                    borderRadius: '8px',
                    display: 'flex',
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  {kpi.valor}
                </div>
                <div
                  style={{
                    fontSize: '0.775rem',
                    color: 'var(--pitch-turf-hover)',
                    fontWeight: 600,
                    marginTop: '0.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <TrendingUp size={13} /> {kpi.delta}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split section: Live Match Tracking + Activity Feed */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Match Center Simulator */}
        <div className="tactical-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '0.75rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Central do Confronto</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{partidaDestaque.rodada}</span>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#dc2626',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span className="live-pulse" style={{ backgroundColor: '#ef4444' }}></span>
              {partidaDestaque.status}
            </div>
          </div>

          {/* Placar Realista */}
          <div
            style={{
              backgroundColor: '#091c15',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{partidaDestaque.mandante.sigla}</div>
              <div style={{ fontSize: '0.75rem', color: '#9bb0a4' }}>{partidaDestaque.mandante.nome}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399' }}>
                {partidaDestaque.mandante.gols}
              </span>
              <span style={{ fontSize: '1.5rem', color: '#4b6558', fontWeight: 300 }}>×</span>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399' }}>
                {partidaDestaque.visitante.gols}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{partidaDestaque.visitante.sigla}</div>
              <div style={{ fontSize: '0.75rem', color: '#9bb0a4' }}>{partidaDestaque.visitante.nome}</div>
            </div>
          </div>

          {/* Stadium info & timeline */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            📍 {partidaDestaque.estadio}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {partidaDestaque.gols.map((g, i) => (
              <div
                key={i}
                style={{
                  fontSize: '0.775rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.6rem',
                  backgroundColor: '#f6f9f7',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                }}
              >
                <span style={{ fontWeight: 700, color: '#059669' }}>⚽ {g.minuto}</span>
                <span>{g.autor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry / Recent Audit logs */}
        <div className="tactical-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Últimas Movimentações</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--pitch-turf-hover)', fontWeight: 600 }}>Sincronizado</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {ultimosRegistros.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #f0f4f2',
                  }}
                >
                  <div
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: '#edf7f2',
                      color: '#065f46',
                      marginTop: '0.15rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.tipo}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.titulo}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f8faf9',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Documentação Swagger Integrada
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Acesse todos os endpoints RESTful e esquemas
              </div>
            </div>
            <a
              href="http://localhost:3000/api/docs"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontSize: '0.775rem',
                fontWeight: 600,
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              Abrir Docs <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

