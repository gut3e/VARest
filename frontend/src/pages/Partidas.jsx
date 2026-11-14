import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, Shield, Plus, X, Check } from 'lucide-react';

export default function Partidas() {
  const [partidas, setPartidas] = useState([]);
  const [timesDisponiveis, setTimesDisponiveis] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [novaPartida, setNovaPartida] = useState({
    time_mandante_id: '',
    time_visitante_id: '',
    gols_mandante: 0,
    gols_visitante: 0,
    data_partida: '',
    estadio: '',
  });

  useEffect(() => {
    carregarPartidas();
    carregarTimes();
  }, []);

  async function carregarTimes() {
    try {
      const response = await axios.get('http://localhost:3000/api/times');
      setTimesDisponiveis(response.data);
    } catch (error) {
      console.error('Erro ao buscar times:', error);
    }
  }

  async function carregarPartidas() {
    try {
      const response = await axios.get('http://localhost:3000/api/matches');
      setPartidas(response.data);
    } catch (error) {
      console.error('Erro ao buscar partidas:', error);
    }
  }

  function handleSelecionarMandante(timeId) {
    const timeSelecionado = timesDisponiveis.find((t) => t.id === Number(timeId));
    setNovaPartida((prev) => ({
      ...prev,
      time_mandante_id: timeId,
      estadio: timeSelecionado?.estadio || prev.estadio,
    }));
  }

  async function handleSalvarPartida(e) {
    e.preventDefault();

    if (!novaPartida.time_mandante_id || !novaPartida.time_visitante_id || !novaPartida.data_partida) {
      alert('Selecione os dois times e a data da partida!');
      return;
    }

    if (novaPartida.time_mandante_id === novaPartida.time_visitante_id) {
      alert('O time mandante e visitante não podem ser o mesmo!');
      return;
    }

    setCarregando(true);

    try {
      await axios.post('http://localhost:3000/api/matches', {
        time_mandante_id: Number(novaPartida.time_mandante_id),
        time_visitante_id: Number(novaPartida.time_visitante_id),
        gols_mandante: Number(novaPartida.gols_mandante) || 0,
        gols_visitante: Number(novaPartida.gols_visitante) || 0,
        data_partida: novaPartida.data_partida,
        estadio: novaPartida.estadio || 'Não informado',
      });

      await carregarPartidas();

      setNovaPartida({
        time_mandante_id: '',
        time_visitante_id: '',
        gols_mandante: 0,
        gols_visitante: 0,
        data_partida: '',
        estadio: '',
      });

      setModalAberto(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensagem || 'Erro ao cadastrar partida!');
    } finally {
      setCarregando(false);
    }
  }

  const formatarData = (dataIso) => {
    if (!dataIso) return '';
    const d = new Date(dataIso);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
              Quadro de Confrontos
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
              {partidas.length} partidas
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.35rem 0 0 0' }}>
            Resultados oficiais com súmulas auditadas e confrontos registrados no banco relacional.
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="btn-emerald"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Novo Confronto
        </button>
      </div>

      {/* Grid de Partidas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {partidas.map((p) => {
          return (
            <div key={p.id} className="tactical-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Confronto #{p.id}
                </span>
                <span
                  style={{
                    backgroundColor: '#edf7f2',
                    color: '#059669',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                  }}
                >
                  Registrado
                </span>
              </div>

              {/* Placar Tático */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {/* Mandante */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#091c15',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                    }}
                  >
                    {p.mandante_sigla || 'MND'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {p.mandante_nome}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Mandante</span>
                  </div>
                </div>

                {/* Placar Central */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#f3f6f4',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>{p.gols_mandante}</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>x</span>
                  <span>{p.gols_visitante}</span>
                </div>

                {/* Visitante */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.6rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {p.visitante_nome}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Visitante</span>
                  </div>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#091c15',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                    }}
                  >
                    {p.visitante_sigla || 'VIS'}
                  </div>
                </div>
              </div>

              {/* Informações de Local e Data */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="var(--pitch-turf-hover)" />
                  <span>{p.estadio || 'Estádio não informado'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} color="var(--text-tertiary)" />
                  <span>{formatarData(p.data_partida)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {partidas.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem',
            textAlign: 'center',
            border: '1px dashed var(--border-strong)',
          }}
        >
          <Calendar size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Nenhum confronto registrado</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Clique no botão acima para agendar ou registrar uma nova partida entre os clubes cadastrados.
          </p>
        </div>
      )}

      {/* Modal de Novo Confronto */}
      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
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
                <Calendar size={20} color="#34d399" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Registrar Novo Confronto</h3>
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

            <form onSubmit={handleSalvarPartida} style={{ padding: '1.5rem' }}>
              {/* Seleção dos Times */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Time Mandante</label>
                  <select
                    required
                    value={novaPartida.time_mandante_id}
                    onChange={(e) => handleSelecionarMandante(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Selecione...</option>
                    {timesDisponiveis.map((time) => (
                      <option key={time.id} value={time.id}>
                        {time.nome} ({time.sigla})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Time Visitante</label>
                  <select
                    required
                    value={novaPartida.time_visitante_id}
                    onChange={(e) => setNovaPartida({ ...novaPartida, time_visitante_id: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Selecione...</option>
                    {timesDisponiveis
                      .filter((t) => t.id !== Number(novaPartida.time_mandante_id))
                      .map((time) => (
                        <option key={time.id} value={time.id}>
                          {time.nome} ({time.sigla})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Placar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Gols do Mandante</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={novaPartida.gols_mandante}
                    onChange={(e) => setNovaPartida({ ...novaPartida, gols_mandante: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gols do Visitante</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={novaPartida.gols_visitante}
                    onChange={(e) => setNovaPartida({ ...novaPartida, gols_visitante: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Data e Local */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Data e Horário</label>
                  <input
                    type="datetime-local"
                    required
                    value={novaPartida.data_partida}
                    onChange={(e) => setNovaPartida({ ...novaPartida, data_partida: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Estádio / Local</label>
                  <input
                    type="text"
                    placeholder="Ex: Maracanã"
                    value={novaPartida.estadio}
                    onChange={(e) => setNovaPartida({ ...novaPartida, estadio: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-emerald" disabled={carregando}>
                  <Check size={16} /> {carregando ? 'Salvando...' : 'Salvar Confronto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
