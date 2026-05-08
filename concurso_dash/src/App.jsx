import './App.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Dados de exemplo (Simulando o desempenho por matéria)
const data = [
  { subject: 'Português', A: 80, fullMark: 100 },
  { subject: 'Direito Const.', A: 98, fullMark: 100 },
  { subject: 'Matemática', A: 65, fullMark: 100 },
  { subject: 'Informática', A: 85, fullMark: 100 },
  { subject: 'Raciocínio L.', A: 70, fullMark: 100 },
  { subject: 'Direito Adm.', A: 90, fullMark: 100 },
];

function App() {
  return (
    <div className="app-container">
      
      {/* Barra Lateral Escura */}
      <aside className="sidebar">
        <div id='concourseName'><h2 className='logo'>ConcursoDash</h2></div>
        <div id='userName'>Gabriel</div>
        <div id='linha-horizontal'></div>
        <nav>
          <ul>
            <li className='active'>Dashboard</li>
            <li>Meus Simulados</li>
            <li>Disciplinas</li>
            <li>Configurações</li>
          </ul>
        </nav>
      </aside>

      {/* Lado Direito: Header + Conteúdo */}
      <div className="main-wrapper">
        <header className="topbar">
          <h2>Painel Geral</h2>
        </header>

        <main className="dashboard-content">
          <div className="welcome-card">
            <h2>Olá, Gabriel!</h2>
            <p>Pronto para bater suas metas de estudos hoje?</p>
          </div>

          <div className="cards-grid">
  <div className="summary-card">
   <div className="chart-section">
        <div className="chart-container">
          <h3>Desempenho por Disciplina</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Gabriel"
                dataKey="A"
                stroke="#059669"
                fill="#059669"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
  </div>

  <div className="summary-card">
    <span className="card-label">Evolução da Nota Geral</span>
    <h3 className="card-value">78%</h3>
    <span className="card-detail positive">↑ 5% vs mês anterior</span>
  </div>

  <div className="summary-card">
    <span className="card-label">Próximos Objetivos</span>
    <h3 className="card-value">1.250</h3>
    <span className="card-detail">Meta: 2.000</span>
  </div>

  <div className="summary-card">
    <span className="card-label">Atividades Recentes</span>
    <h3 className="card-value">42h</h3>
    <span className="card-detail">Foco total</span>
  </div>
</div>
          
        </main>
      </div>

    </div>
  );
}

export default App;