import { FiTrendingUp, FiBox, FiTruck, FiUsers } from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const stats = [
    { title: 'Ingresos Mensuales', value: '$124,500', icon: <FiTrendingUp />, color: 'var(--color-primary)' },
    { title: 'Maquinarias en Stock', value: '45', icon: <FiBox />, color: 'var(--color-accent-blue)' },
    { title: 'Importaciones en Curso', value: '12', icon: <FiTruck />, color: 'var(--color-accent-green)' },
    { title: 'Nuevos Clientes', value: '8', icon: <FiUsers />, color: 'var(--color-accent-red)' }
  ];

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Resumen de actividades de importación y ventas</p>
        </div>
      </header>
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card glass" key={idx}>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="value">{stat.value}</p>
            </div>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-activity glass">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            <p><strong>Arribo a puerto:</strong> Excavadora Caterpillar 320 - <i>Hace 2 horas</i></p>
            <p><strong>Nuevo Pedido:</strong> Retroexcavadora John Deere - <i>Hace 5 horas</i></p>
            <p><strong>Pago recibido:</strong> Constructora Alpha SAC - <i>Ayer</i></p>
          </div>
        </div>
      </div>
    </div>
  );
}
