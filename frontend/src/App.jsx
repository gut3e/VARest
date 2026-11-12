import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Times from './pages/Times';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [telaAuth, setTelaAuth] = useState('login'); // 'login' ou 'register'
  const [abaAtiva, setAbaAtiva] = useState('times');

  // Se NÃO estiver logado: decide entre Login e Register
  if (!usuario) {
    if (telaAuth === 'register') {
      return (
        <Register
          onVoltarLogin={() => setTelaAuth('login')}
          onLoginSucesso={(dados) => setUsuario(dados)}
        />
      );
    }

    return (
      <Login
        onLoginSucesso={(dados) => setUsuario(dados)}
        onIrParaCadastro={() => setTelaAuth('register')}
      />
    );
  }

  // Se ESTIVER logado: sistema completo
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* 1. Barra de Navegação */}
      <Navbar abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      {/* 2. Conteúdo Dinâmico */}
      <main
        style={{
          flex: 1,
          padding: '2.5rem 2rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {abaAtiva === 'times' && <Times />}
        {abaAtiva === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Painel Geral</h2>
            <p style={{ color: '#6b7280' }}>
              Olá, {usuario.nome}! Selecione a aba "Times" no topo para visualizar os clubes cadastrados.
            </p>
          </div>
        )}
        {abaAtiva === 'jogadores' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Jogadores</h2>
            <p style={{ color: '#6b7280' }}>Em breve: jogadores disponíveis.</p>
          </div>
        )}
        {abaAtiva === 'partidas' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Partidas</h2>
            <p style={{ color: '#6b7280' }}>Em breve: histórico e cadastro de partidas.</p>
          </div>
        )}
        {abaAtiva === 'titulos' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Títulos</h2>
            <p style={{ color: '#6b7280' }}>Em breve: galeria de troféus.</p>
          </div>
        )}
      </main>
    </div>
  );
}
