// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // ajuste se necessário

import Sidebar from './components/sidebar.jsx';
import Dash from './pages/dashboard.jsx';
import Simulados from './pages/simulados.jsx';
import Disciplinas from './pages/disciplinas.jsx';
import Configuracoes from './pages/configuracoes.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

/* ─────────────────────────────────────────────────────────────
   FLAG DE DESENVOLVIMENTO
   Enquanto o Supabase não estiver conectado/configurado, deixe
   isto como `true` para acessar livremente o /dashboard, /simulados, etc.
   sem precisar fazer login.

   Quando for publicar ou já tiver o Supabase rodando, MUDE PARA `false`.
   ───────────────────────────────────────────────────────────── */
const DEV_BYPASS_AUTH = false;

/* ─────────────────────────────────────────────────────────────
   Layout AUTENTICADO — mostra sidebar + protege contra acesso
   sem sessão. Tudo o que estiver dentro dele exige login.
   ───────────────────────────────────────────────────────────── */
function AuthedLayout() {
  const [status, setStatus] = useState(DEV_BYPASS_AUTH ? 'in' : 'loading');

  useEffect(() => {
    if (DEV_BYPASS_AUTH) return;

    // 1. Checa a sessão atual ao carregar
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'in' : 'out');
    });

    // 2. Escuta mudanças (login/logout em outra aba etc.)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'in' : 'out');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (status === 'loading') {
    return (
      <div style={{
        display: 'grid', placeItems: 'center', height: '100vh',
        color: '#94a3b8', fontFamily: 'sans-serif'
      }}>
        Carregando…
      </div>
    );
  }

  if (status === 'out') return <Navigate to="/login" replace />;

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Layout PÚBLICO — sem sidebar. Para login, cadastro, etc.
   Se já estiver logado, manda direto pro dashboard.
   ───────────────────────────────────────────────────────────── */
function PublicLayout() {
  const [status, setStatus] = useState(DEV_BYPASS_AUTH ? 'out' : 'loading');

  useEffect(() => {
    if (DEV_BYPASS_AUTH) return;

    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'in' : 'out');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'in' : 'out');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (status === 'loading') return null;
  if (status === 'in') return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

/* ─────────────────────────────────────────────────────────────
   App raiz
   ───────────────────────────────────────────────────────────── */
function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas — SEM sidebar */}
        <Route element={<PublicLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/cadastro" element={<Signup />} />
        </Route>

        {/* Rotas privadas — COM sidebar */}
        <Route element={<AuthedLayout />}>
          <Route path="/"             element={<Dash />} />
          <Route path="/dashboard"    element={<Dash />} />
          <Route path="/simulados"    element={<Simulados />} />
          <Route path="/disciplinas"  element={<Disciplinas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
