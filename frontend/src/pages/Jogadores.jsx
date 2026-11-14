import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, Plus, Filter, Shield, Award, X, Check } from 'lucide-react';

export default function Jogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroPosicao, setFiltroPosicao] = useState('Todas');
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [novoJogador, setNovoJogador] = useState({
    nome: '',
    time_id: '',
    posicao: 'Atacante',
    numero_camisa: '',
    nacionalidade: 'Brasil',
    data_nascimento: '',
  });

  useEffect(() => {
    carregarJogadores();
  }, []);

  async function carregarJogadores() {
    try {
      const response = await axios.get('http://localhost:3000/api/players');
      const formatados = response.data.map((j) => ({
        id: j.id,
        nome: j.nome,
        posicao: j.posicao,
        camisa: j.numero_camisa || '-',
        nacionalidade: j.nacionalidade,
        gols: 0,
        assistencias: 0,
        time: j.time_nome || (j.time_id ? `Clube #${j.time_id}` : 'Sem clube'),
      }));
      setJogadores(formatados);
    } catch (error) {
      console.error('Erro ao carregar atletas:', error);
    }
  }

  const posicoes = ['Todas', 'Goleiro', 'Zagueiro', 'Meio-campo', 'Atacante'];

  const filtrados = jogadores.filter((j) => {
    const matchBusca =
      j.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (j.time && j.time.toLowerCase().includes(busca.toLowerCase()));
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

  async function handleSalvarJogador(e) {
    e.preventDefault();
    if (!novoJogador.nome || !novoJogador.posicao || !novoJogador.nacionalidade || !novoJogador.data_nascimento) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/players', {
        nome: novoJogador.nome,
        time_id: novoJogador.time_id ? Number(novoJogador.time_id) : null,
        posicao: novoJogador.posicao,
        numero_camisa: novoJogador.numero_camisa ? Number(novoJogador.numero_camisa) : null,
        nacionalidade: novoJogador.nacionalidade,
        data_nascimento: novoJogador.data_nascimento,
      });

      const cadastrado = response.data?.jogador || {
        id: Date.now(),
        nome: novoJogador.nome,
        posicao: novoJogador.posicao,
        camisa: novoJogador.numero_camisa || 0,
        nacionalidade: novoJogador.nacionalidade,
        gols: 0,
        assistencias: 0,
        time: novoJogador.time_id ? `Clube #${novoJogador.time_id}` : 'Sem clube',
      };

      setJogadores([
        {
          id: cadastrado.id,
          nome: cadastrado.nome,
          posicao: cadastrado.posicao,
          camisa: cadastrado.numero_camisa || cadastrado.camisa || '-',
          nacionalidade: cadastrado.nacionalidade,
          gols: 0,
          assistencias: 0,
          time: cadastrado.time_id ? `Clube #${cadastrado.time_id}` : 'Sem clube',
        },
        ...jogadores,
      ]);

      setNovoJogador({
        nome: '',
        time_id: '',
        posicao: 'Atacante',
        numero_camisa: '',
        nacionalidade: 'Brasil',
        data_nascimento: '',
      });

      setModalAberto(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensagem || 'Erro ao cadastrar atleta!');
    } finally {
      setCarregando(false);
    }
  }

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

        <button
          onClick={() => setModalAberto(true)}
          className="btn-emerald"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Novo Atleta
        </button>
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

        {filtrados.length === 0 && (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Users size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: 'var(--text-primary)' }}>Nenhum atleta encontrado</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Cadastre um novo atleta para começar a acompanhar o elenco.</p>
          </div>
        )}
      </div>

      {/* Modal de Criação de Jogador */}
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
                <Users size={20} color="#34d399" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Cadastrar Novo Atleta</h3>
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

            <form onSubmit={handleSalvarJogador} style={{ padding: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Neymar da Silva Santos Júnior"
                  value={novoJogador.nome}
                  onChange={(e) => setNovoJogador({ ...novoJogador, nome: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Posição Tática</label>
                  <select
                    value={novoJogador.posicao}
                    onChange={(e) => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="Goleiro">Goleiro</option>
                    <option value="Zagueiro">Zagueiro</option>
                    <option value="Meio-campo">Meio-campo</option>
                    <option value="Atacante">Atacante</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Número da Camisa</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    placeholder="Ex: 10"
                    value={novoJogador.numero_camisa}
                    onChange={(e) => setNovoJogador({ ...novoJogador, numero_camisa: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Nacionalidade</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Brasil"
                    value={novoJogador.nacionalidade}
                    onChange={(e) => setNovoJogador({ ...novoJogador, nacionalidade: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    type="date"
                    required
                    value={novoJogador.data_nascimento}
                    onChange={(e) => setNovoJogador({ ...novoJogador, data_nascimento: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ID do Clube (Opcional)</label>
                <input
                  type="number"
                  placeholder="Ex: 1 (deixe vazio se for sem clube)"
                  value={novoJogador.time_id}
                  onChange={(e) => setNovoJogador({ ...novoJogador, time_id: e.target.value })}
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
                <button type="submit" className="btn-emerald" disabled={carregando}>
                  <Check size={16} /> {carregando ? 'Cadastrando...' : 'Salvar no Elenco'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
