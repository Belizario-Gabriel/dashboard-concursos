import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Dash from './pages/dashboard.jsx';
import Simulados from './pages/simulados.jsx';
import Disciplinas from './pages/disciplinas.jsx';
import Configuracoes from './pages/configuracoes.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/simulados" element={<Simulados />} />
            <Route path="/disciplinas" element={<Disciplinas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;