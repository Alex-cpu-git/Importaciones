import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiUsers, 
  FiBriefcase, 
  FiShoppingCart,
  FiBox 
} from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import './Sidebar.css';

export default function Sidebar() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: '/machinery', label: 'Maquinarias', icon: <FiBox /> },
    { path: '/imports', label: 'Importaciones', icon: <FiTruck /> },
    { path: '/suppliers', label: 'Proveedores', icon: <FiBriefcase /> },
    { path: '/clients', label: 'Clientes', icon: <FiUsers /> },
    { path: '/orders', label: 'Pedidos', icon: <FiShoppingCart /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header logo-container">
        <img src={logoImg} alt="P&M S.A.C Logo" className="company-logo" />
        <span className="logo-text">Importaciones</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <p className="name">Admin User</p>
            <p className="role">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
