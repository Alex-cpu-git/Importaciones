import { FiTrendingUp, FiBox, FiTruck, FiUsers } from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const stats = [
    { title: 'Inventario (Máquinas)', value: '14', icon: <FiBox />, color: 'var(--color-primary)' },
    { title: 'Valor Estimado', value: '$850,000', icon: <FiTrendingUp />, color: 'var(--color-accent-green)' },
    { title: 'Catálogos Compartidos (WhatsApp)', value: '32', icon: <FiUsers />, color: 'var(--color-accent-blue)' }
  ];

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <h1>Panel Principal</h1>
          <p>Tu centro de control y visualización de inventario</p>
        </div>
      </header>
      
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {stats.map((stat, idx) => (
          <div className="stat-card glass" key={idx}>
            <div className="stat-info">
              <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{stat.title}</h3>
              <p className="value" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '5px 0' }}>{stat.value}</p>
            </div>
            <div className="stat-icon" style={{ 
              backgroundColor: `${stat.color}15`, 
              color: stat.color,
              width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.4rem'
            }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content" style={{ marginTop: '2rem' }}>
        <div className="recent-activity glass">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            Últimos Movimientos
          </h2>
          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-accent-green)' }}></div>
              <p style={{ fontSize: '0.9rem' }}>Enviado por WhatsApp: <strong>Excavadora Cat 320</strong> a un cliente nuevo.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
              <p style={{ fontSize: '0.9rem' }}>Nueva maquinaria añadida: <strong>Camión Volquete Volvo FMX</strong>.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }}></div>
              <p style={{ fontSize: '0.9rem' }}>Catálogo general actualizado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
