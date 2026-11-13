import React, { useState } from 'react';
import { Shield, Plus, Search, MapPin, Calendar, Users, X, Check, Trash2 } from 'lucide-react';

export default function Times() {
  const [times, setTimes] = useState([
    { id: 1, nome: 'Flamengo', sigla: 'FLA', estadio: 'Maracanã', fundacao: 1895, atletas: 32, cor: '#b91c1c' },
    { id: 2, nome: 'Palmeiras', sigla: 'PAL', estadio: 'Allianz Parque', fundacao: 1914, atletas: 29, cor: '#15803d' },
    { id: 3, nome: 'São Paulo', sigla: 'SAO', estadio: 'Morumbi', fundacao: 1930, atletas: 30, cor: '#b91c1c' },
    { id: 4, nome: 'Corinthians', sigla: 'COR', estadio: 'Neo Química Arena', fundacao: 1910, atletas: 28, cor: '#18181b' },
    { id: 5, nome: 'Grêmio', sigla: 'GRE', estadio: 'Arena do Grêmio', fundacao: 1903, atletas: 27, cor: '#0284c7' },
    { id: 6, nome: 'Atlético Mineiro', sigla: 'CAM', estadio: 'Arena MRV', fundacao: 1908, atletas: 31, cor: '#27272a' },
  ]);

  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoTime, setNovoTime] = useState({
    nome: '',
    sigla: '',
    estadio: '',
    fundacao: '',
  });

  const timesFiltrados = times.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.sigla.toLowerCase().includes(busca.toLowerCase()) ||
    t.estadio.toLowerCase().includes(busca.toLowerCase())
  );

  function handleSalvarTime(e) {
    e.preventDefault();
    if (!novoTime.nome || !novoTime.sigla) return;

    const novo = {
      id: Date.now(),
      nome: novoTime.nome,
      sigla: novoTime.sigla.toUpperCase(),
      estadio: novoTime.estadio || 'Não informado',
      fundacao: parseInt(novoTime.fundacao, 10) || new Date().getFullYear(),
      atletas: 0,
      cor: '#059669',
    };

    setTimes([novo, ...times]);
    setNovoTime({ nome: '', sigla: '', estadio: '', fundacao: '' });
    setModalAberto(false);
  }

  function handleRemoverTime(id) {
    if (confirm('Deseja realmente remover este clube do radar?')) {
      setTimes(times.filter((t) => t.id !== id));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Clubes Cadastrados
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
              {times.length} no total
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.35rem 0 0 0' }}>
            Gerencie as agremiações esportivas, sedes de estádios e metadados históricos.
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="btn-emerald"
        >
          <Plus size={18} /> Adicionar Clube
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-subtle)',
        }}
      >
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Pesquisar por clube, sigla (ex: FLA) ou estádio..."
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
        {busca && (
          <button
            onClick={() => setBusca('')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Grid de Clubes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {timesFiltrados.map((time) => {
          const anosHistoria = new Date().getFullYear() - time.fundacao;
          return (
            <div
              key={time.id}
              className="tactical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Card Top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: '#091c15',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#34d399',
                        boxShadow: '0 2px 8px rgba(9, 28, 21, 0.15)',
                      }}
                    >
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          margin: 0,
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {time.nome}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#059669',
                          backgroundColor: '#ecfdf5',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          border: '1px solid #d1fae5',
                        }}
                      >
                        {time.sigla}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoverTime(time.id)}
                    title="Excluir clube"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: '0.35rem',
                      borderRadius: '6px',
                      display: 'flex',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details list */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: '#fafcfb',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={15} color="var(--pitch-turf-hover)" />
                    <span style={{ fontWeight: 500 }}>{time.estadio}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={15} color="var(--pitch-turf-hover)" />
                    <span>Fundado em {time.fundacao} ({anosHistoria} anos)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={15} color="var(--pitch-turf-hover)" />
                    <span>{time.atletas > 0 ? `${time.atletas} atletas vinculados` : 'Elenco em formação'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div
                style={{
                  marginTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>ID #{time.id}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--pitch-turf-hover)',
                  }}
                >
                  Ativo na base de dados
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {timesFiltrados.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            textAlign: 'center',
            border: '1px dashed var(--border-strong)',
          }}
        >
          <Shield size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Nenhum clube encontrado</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Tente pesquisar com outro termo ou adicione uma nova agremiação.
          </p>
        </div>
      )}

      {/* Modal de Criação de Time */}
      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                backgroundColor: '#091c15',
                color: '#ffffff',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shield size={20} color="#34d399" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Cadastrar Novo Clube</h3>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9bb0a4',
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSalvarTime} style={{ padding: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Nome do Clube</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Santos Futebol Clube"
                  value={novoTime.nome}
                  onChange={(e) => setNovoTime({ ...novoTime, nome: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Sigla Oficial (3-4 letras)</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="Ex: SAN"
                    value={novoTime.sigla}
                    onChange={(e) => setNovoTime({ ...novoTime, sigla: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem', textTransform: 'uppercase' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ano de Fundação</label>
                  <input
                    type="number"
                    placeholder="Ex: 1912"
                    min="1850"
                    max="2030"
                    value={novoTime.fundacao}
                    onChange={(e) => setNovoTime({ ...novoTime, fundacao: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Estádio / Sede</label>
                <input
                  type="text"
                  placeholder="Ex: Vila Belmiro"
                  value={novoTime.estadio}
                  onChange={(e) => setNovoTime({ ...novoTime, estadio: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-emerald">
                  <Check size={16} /> Salvar no Sistema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
