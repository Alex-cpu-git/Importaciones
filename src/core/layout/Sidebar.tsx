import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiTruck,
  FiUsers,
  FiBriefcase,
  FiShoppingCart,
  FiBox,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import './Sidebar.css';

export default function Sidebar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: '/machinery', label: 'Maquinarias', icon: <FiBox /> },

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
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </aside>
  );
}
