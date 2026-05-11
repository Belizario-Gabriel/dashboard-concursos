import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';'./components/sidebar.jsx'
import Dash from './pages/dashboard.jsx';
import Simulados from './pages/simulados.jsx';
import Disciplinas from './pages/disciplinas.jsx';
import Configuracoes from './pages/configuracoes.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/disciplinas" element={<Disciplinas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;