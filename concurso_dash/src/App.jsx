import './App.css';

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
            <p>Área dos Cards e Gráficos</p>
          </div>
          
        </main>
      </div>

    </div>
  );
}

export default App;