import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Times from './pages/Times';
import Jogadores from './pages/Jogadores';
import Partidas from './pages/Partidas';
import Titulos from './pages/Titulos';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = localStorage.getItem('usuario_varest');
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });
  const [telaAuth, setTelaAuth] = useState('login'); // 'login' ou 'register'
  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  function handleLoginSucesso(dados) {
    localStorage.setItem('usuario_varest', JSON.stringify(dados));
    setUsuario(dados);
  }

  function handleLogout() {
    localStorage.removeItem('usuario_varest');
    setUsuario(null);
  }

  // Caso NÃO esteja logado: alterna entre Login e Cadastro
  if (!usuario) {
    if (telaAuth === 'register') {
      return (
        <Register
          onVoltarLogin={() => setTelaAuth('login')}
          onLoginSucesso={handleLoginSucesso}
        />
      );
    }

    return (
      <Login
        onLoginSucesso={handleLoginSucesso}
        onIrParaCadastro={() => setTelaAuth('register')}
      />
    );
  }

  // Usuário autenticado
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-main)',
      }}
    >
      {/* 1. Barra de Navegação Tática */}
      <Navbar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        usuario={usuario}
        onLogout={handleLogout}
      />

      {/* 2. Conteúdo Central Dinâmico */}
      <main
        style={{
          flex: 1,
          padding: '2.5rem 1.5rem',
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {abaAtiva === 'dashboard' && (
          <Dashboard onNavegar={(aba) => setAbaAtiva(aba)} usuario={usuario} />
        )}
        {abaAtiva === 'times' && <Times />}
        {abaAtiva === 'jogadores' && <Jogadores />}
        {abaAtiva === 'partidas' && <Partidas />}
        {abaAtiva === 'titulos' && <Titulos />}
      </main>

      {/* 3. Rodapé Técnico */}
      <footer
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.25rem 2rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>⚽ VARest • RESTful Football Intelligence API</span>
          <span>Sincronizado com PostgreSQL • Swagger UI ready</span>
        </div>
      </footer>
    </div>
  );
}
