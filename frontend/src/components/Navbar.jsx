import React from 'react';
import { Users, Calendar, Trophy, BarChart2, Shield, LogOut, Radio } from 'lucide-react';

export default function Navbar({ abaAtiva, setAbaAtiva, usuario, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Painel Tático', icon: BarChart2 },
    { id: 'times', label: 'Clubes & Elencos', icon: Shield },
    { id: 'jogadores', label: 'Atletas', icon: Users },
    { id: 'partidas', label: 'Confrontos', icon: Calendar },
    { id: 'titulos', label: 'Galeria de Títulos', icon: Trophy },
  ];

  const getInitials = (nome) => {
    if (!nome) return 'VA';
    return nome
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header
      style={{
        backgroundColor: '#091c15',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.875rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            onClick={() => setAbaAtiva('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#091c15',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)',
                fontWeight: 800,
                fontSize: '1.25rem',
              }}
            >
              ⚽
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                  }}
                >
                  VARest
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span className="live-pulse" style={{ width: '5px', height: '5px' }}></span>
                  TEMPORADA 2026
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#84998f',
                  margin: 0,
                  letterSpacing: '0.01em',
                }}
              >
                Central de Inteligência & Estatísticas
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Navigation Tabs */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            padding: '0.25rem',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const ativo = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAbaAtiva(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '7px',
                  fontSize: '0.825rem',
                  fontWeight: ativo ? 700 : 500,
                  color: ativo ? '#ffffff' : '#9bb0a4',
                  backgroundColor: ativo ? '#133527' : 'transparent',
                  border: ativo ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  boxShadow: ativo ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                <Icon size={16} color={ativo ? '#34d399' : '#84998f'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {usuario && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.35rem 0.65rem 0.35rem 0.35rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#091c15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                {getInitials(usuario.nome)}
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {usuario.nome}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#34d399' }}>Analista Técnico</span>
              </div>
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              title="Encerrar sessão"
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                padding: '0.55rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
