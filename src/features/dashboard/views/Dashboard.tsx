import { FiBox, FiAnchor, FiCheckCircle, FiClock, FiLayers } from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const stats = [
    { title: 'Equipos en Catálogo', value: '24', subtitle: 'Total de maquinarias', icon: <FiBox />, colorClass: 'icon-blue' },
    { title: 'Listos para Entrega', value: '18', subtitle: 'En disponibilidad (Stock)', icon: <FiCheckCircle />, colorClass: 'icon-emerald' },
    { title: 'En Importación', value: '6', subtitle: 'Próximos a llegar', icon: <FiAnchor />, colorClass: 'icon-cyan' },
    { title: 'Familias / Tipos', value: '4', subtitle: 'Categorías activas', icon: <FiLayers />, colorClass: 'icon-rose' }
  ];

  const recentMachines = [
    { name: 'Excavadora Hidráulica 320', brand: 'Caterpillar', status: 'En Stock', time: 'Agregado al catálogo hoy', type: 'in' },
    { name: 'Cargador Frontal WA380', brand: 'Komatsu', status: 'Importación', time: 'Agregado al catálogo ayer', type: 'transit' },
    { name: 'Tractor Oruga D8T', brand: 'Caterpillar', status: 'Reservado', time: 'Actualizado hace 2 días', type: 'out' },
    { name: 'Motoniveladora 140K', brand: 'Caterpillar', status: 'En Stock', time: 'Agregado hace 3 días', type: 'in' },
  ];

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <h1>Resumen del Catálogo</h1>
          <p>Métricas y estado general de tus equipos publicados</p>
        </div>
      </header>
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card glass" key={idx}>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="value">{stat.value}</p>
              <span className="stat-subtitle">{stat.subtitle}</span>
            </div>
            <div className={`stat-icon-wrapper ${stat.colorClass}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="dashboard-panel glass">
          <div className="panel-header">
            <h2>Últimos Agregados</h2>
            <button className="btn-link">Ver catálogo completo</button>
          </div>
          <div className="recent-list">
            {recentMachines.map((m, i) => (
              <div className="recent-item" key={i}>
                <div className={`status-dot ${m.type}`}></div>
                <div className="recent-details">
                  <h4>{m.name}</h4>
                  <span>{m.brand} • {m.status}</span>
                </div>
                <div className="recent-time">
                  <FiClock /> {m.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel glass">
          <div className="panel-header">
            <h2>Categorías Destacadas</h2>
          </div>
          <div className="fleet-composition">
            <div className="fleet-item">
              <div className="fleet-label">Excavadoras <span>(8 Equipos)</span></div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '60%', background: '#3b82f6'}}></div></div>
            </div>
            <div className="fleet-item">
              <div className="fleet-label">Cargadores Frontales <span>(5 Equipos)</span></div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '40%', background: '#10b981'}}></div></div>
            </div>
            <div className="fleet-item">
              <div className="fleet-label">Tractores / Orugas <span>(3 Equipos)</span></div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '25%', background: '#f59e0b'}}></div></div>
            </div>
            <div className="fleet-item">
              <div className="fleet-label">Motoniveladoras <span>(2 Equipos)</span></div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '15%', background: '#8b5cf6'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
