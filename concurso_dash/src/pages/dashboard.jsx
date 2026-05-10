import '../App.css';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

// Dados de exemplo (Simulando o desempenho por matéria)
const data = [
  { subject: 'Português', A: 80, fullMark: 100 },
  { subject: 'Direito Const.', A: 98, fullMark: 100 },
  { subject: 'Matemática', A: 65, fullMark: 100 },
  { subject: 'Informática', A: 85, fullMark: 100 },
  { subject: 'Raciocínio L.', A: 70, fullMark: 100 },
  { subject: 'Direito Adm.', A: 90, fullMark: 100 },
];
// Dados de exemplo para evolução (Simulados de 1 a 6)
const evolutionData = [
  { name: 'Simulado 1', nota: 62 },
  { name: 'Simulado 2', nota: 65 },
  { name: 'Simulado 3', nota: 72 },
  { name: 'Simulado 4', nota: 68 },
  { name: 'Simulado 5', nota: 78 },
  { name: 'Simulado 6', nota: 85 },
  { name: 'Simulado 7', nota: 82 },
  { name: 'Simulado 8', nota: 90 },
  { name: 'Simulado 9', nota: 95 },
  { name: 'Simulado 10', nota: 72 },
  { name: 'Simulado 11', nota: 78 },
  { name: 'Simulado 12', nota: 85 },
  { name: 'Simulado 13', nota: 52 },
  { name: 'Simulado 14', nota: 46 },
];

function Dash() {
    return (
      <div className="main-wrapper">
        {/* Lado Direito: Header + Conteúdo */}
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
  <div className="chart-container">
    <h3>Evolução de Nota (Média Geral)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={evolutionData}>
        {/* Definindo o gradiente esmeralda para o gráfico */}
        <defs>
          <linearGradient id="colorNota" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          domain={[0, 100]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#13124a', border: 'none', borderRadius: '8px', color: '#fff' }}
          itemStyle={{ color: '#059669' }}
        />
        <Area 
          type="monotone" 
          dataKey="nota" 
          stroke="#059669" 
          fillOpacity={1} 
          fill="url(#colorNota)" 
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  </div>

  <div className="summary-card-attention">
    {/* Card de atenção paras as três matérias com o pior rendimento */}
    <aside className="attention-card">
      <div className="card-header">
        <h3>🚨 Atenção: Reforço Necessário</h3>
        <p>Disciplinas com desempenho abaixo da meta</p>
      </div>

      <div className="focus-list">
        <div className="focus-item">
          <div className="focus-info">
            <span>Matemática</span>
            <span>65%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill warning" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="focus-item">
          <div className="focus-info">
            <span>Raciocínio Lógico</span>
            <span>70%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill warning" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="focus-item">
          <div className="focus-info">
            <span>Português</span>
            <span>80%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  </div>

  <div className="summary-card">
    {/* Adicione logo abaixo do seu card de Atenção ou em uma nova linha */}
<section className="recent-activities">
  <div className="card-header">
    <h3>🕒 Atividades Recentes</h3>
  </div>

  <div className="activities-list">
    
    {/* Exemplo 1: Simulado normal */}
    <div className="activity-item">
      <div className="activity-icon">📝</div>
      <div className="activity-info">
        <h4>Simulado #24 - Bloco Geral</h4>
        <p>Finalizado com <strong>78% de acerto</strong></p>
        <span className="activity-time">há 2 horas</span>
      </div>
    </div>

    {/* Exemplo 2: Ouro! 100% em uma disciplina */}
    <div className="activity-item highlight">
      <div className="activity-icon">🏆</div>
      <div className="activity-info">
        <h4>Simulado #23 - Direito Adm.</h4>
        <p>Parabéns! Você gabaritou esta disciplina!</p>
        <span className="activity-time">ontem</span>
      </div>
      <div className="badge-100">100%</div>
    </div>

    {/* Exemplo 3: Outro simulado */}
    <div className="activity-item">
      <div className="activity-icon">📝</div>
      <div className="activity-info">
        <h4>Simulado #22 - Português Especial</h4>
        <p>Finalizado com <strong>85% de acerto</strong></p>
        <span className="activity-time">há 2 dias</span>
      </div>
    </div>

  </div>
</section>
  </div>
</div>
          
        </main>
      </div>
    );
}

export default Dash;