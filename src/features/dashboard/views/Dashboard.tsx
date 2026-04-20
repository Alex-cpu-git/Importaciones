import { useState, useEffect } from 'react';
import { FiBox, FiAnchor, FiCheckCircle, FiClock, FiLayers } from 'react-icons/fi';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../core/firebase/config';
import type { Machine } from '../../machinery/types';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Escuchar actualizaciones en tiempo real de Firebase
    const q = query(collection(db, 'machines'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Machine));
      setMachines(data);
      setIsLoading(false);
    }, (error) => {
      console.error("Error al cargar maquinarias en dashboard:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Calcular métricas
  const totalEquipos = machines.length;
  // Calculamos inventario y en tránsito según las palabras clave.
  const listosEntrega = machines.filter(m => m.stock && m.stock > 0).length;
  const enImportacion = machines.filter(m => m.status?.toLowerCase().includes('importación') || m.status?.toLowerCase().includes('tránsito') || m.status?.toLowerCase().includes('camino')).length;
  
  // Categorías activas
  const familiasActivas = new Set(machines.filter(m => m.type).map(m => m.type)).size;

  const stats = [
    { title: 'Equipos en Catálogo', value: totalEquipos.toString(), subtitle: 'Total de maquinarias', icon: <FiBox />, colorClass: 'icon-blue' },
    { title: 'Listos para Entrega', value: listosEntrega.toString(), subtitle: 'En disponibilidad (Stock)', icon: <FiCheckCircle />, colorClass: 'icon-emerald' },
    { title: 'En Importación', value: enImportacion.toString(), subtitle: 'Próximos a llegar', icon: <FiAnchor />, colorClass: 'icon-cyan' },
    { title: 'Familias / Tipos', value: familiasActivas.toString(), subtitle: 'Categorías activas', icon: <FiLayers />, colorClass: 'icon-rose' }
  ];

  // Tomamos las últimas 4 máquinas recientes
  const recentMachines = machines.slice(0, 4);

  // Calcular composición de flota
  const fleetCount: Record<string, number> = {};
  machines.forEach(m => {
    if (m.type) {
      fleetCount[m.type] = (fleetCount[m.type] || 0) + 1;
    }
  });

  const sortedFleet = Object.entries(fleetCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Las 4 categorías principales

  const formatTime = (dateStr?: any) => {
    if (!dateStr) return 'Agregado recientemente';
    if (dateStr?.seconds) {
      const date = new Date(dateStr.seconds * 1000);
      return date.toLocaleDateString();
    }
    return 'Agregado recientemente';
  };

  const getColors = (index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    return colors[index % colors.length];
  };

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <h1>Resumen del Catálogo</h1>
          <p>Métricas y estado general de tus equipos publicados en tiempo real</p>
        </div>
      </header>
      
      {isLoading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Cargando datos de inventario...</div>
      ) : (
        <>
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
                <Link to="/machinery" className="btn-link" style={{ textDecoration: 'none' }}>Ver catálogo completo</Link>
              </div>
              <div className="recent-list">
                {recentMachines.length > 0 ? recentMachines.map((m, i) => (
                  <div className="recent-item" key={i}>
                    <div className={`status-dot ${m.stock > 0 ? 'in' : 'transit'}`}></div>
                    <div className="recent-details">
                      <h4>{m.name || 'Sin nombre'}</h4>
                      <span>{m.brand} • {m.status}</span>
                    </div>
                    <div className="recent-time">
                      <FiClock /> {formatTime(m.createdAt)}
                    </div>
                  </div>
                )) : (
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '1rem' }}>No hay máquinas registradas en la base de datos.</p>
                )}
              </div>
            </div>

            <div className="dashboard-panel glass">
              <div className="panel-header">
                <h2>Categorías Destacadas</h2>
              </div>
              <div className="fleet-composition">
                {sortedFleet.length > 0 ? sortedFleet.map((item, idx) => {
                  const percentage = totalEquipos > 0 ? Math.round((item.count / totalEquipos) * 100) : 0;
                  return (
                    <div className="fleet-item" key={idx}>
                      <div className="fleet-label">
                        {item.name} <span>({item.count} Equipo{item.count !== 1 && 's'})</span>
                      </div>
                      <div className="progress-bg">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${percentage}%`, background: getColors(idx) }}
                        ></div>
                      </div>
                    </div>
                  );
                }) : (
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '1rem' }}>Sube maquinaria para ver la composición y estadísticas.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
