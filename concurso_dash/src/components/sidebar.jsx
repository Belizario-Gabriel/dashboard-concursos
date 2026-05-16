import '../App.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div id='concourseName'><h2 className='logo'>ConcursoDash</h2></div>
      <div id='userName'>Gabriel</div>
      <div id='linha-horizontal'></div>
      <nav>
        <ul>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Dashboard
          </NavLink>
          <NavLink to="/simulados" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Meus Simulados
          </NavLink>
          <NavLink to="/disciplinas" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Disciplinas
          </NavLink>
          <NavLink to="/configuracoes" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Configurações
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;