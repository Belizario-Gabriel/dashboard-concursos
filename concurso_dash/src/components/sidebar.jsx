import '../App.css';
import Dash from '../pages/dashboard.jsx';


function Sidebar() {
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

      <Dash />

    </div>
  );
}

export default Sidebar;