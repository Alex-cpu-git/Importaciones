import { FiX, FiTag, FiLayers, FiActivity, FiImage } from 'react-icons/fi';
import type { Machine } from '../types';
import './MachineDetailModal.css';

interface MachineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: Machine | null;
}

export default function MachineDetailModal({ isOpen, onClose, machine }: MachineDetailModalProps) {
  if (!isOpen || !machine) return null;


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal-content" onClick={e => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} title="Cerrar Detalles"><FiX size={24} /></button>
        
        <div className="detail-banner">
          {machine.imageUrls && machine.imageUrls.length > 0 ? (
            <div className="detail-gallery" style={{ display: 'flex', overflowX: 'auto', gap: '8px', padding: '16px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
              {machine.imageUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`${machine.name} - Imagen ${idx + 1}`} style={{ height: '240px', minWidth: '80%', objectFit: 'cover', borderRadius: '8px', scrollSnapAlign: 'center', flexShrink: 0, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              ))}
            </div>
          ) : machine.imageUrl ? (
            <img src={machine.imageUrl} alt={machine.name} />
          ) : (
            <div className="detail-no-image">
              <FiImage size={60} color="#94a3b8" />
              <p>Sin Imagen Disponible</p>
            </div>
          )}
          <span className={`detail-statusbadge status-${machine.status.toLowerCase().replace(' ', '')}`}>
            {machine.status}
          </span>
        </div>

        <div className="detail-body">
          <div className="detail-header">
            <h4>{machine.brand} • {machine.year}</h4>
            <h2>{machine.name}</h2>
          </div>

          <div className="detail-grid">
            <div className="detail-info-card">
              <div className="info-icon-wrapper"><FiTag className="info-icon" /></div>
              <div className="info-text">
                <span>Código ID</span>
                <strong>{machine.id}</strong>
              </div>
            </div>
            <div className="detail-info-card">
              <div className="info-icon-wrapper"><FiLayers className="info-icon" /></div>
              <div className="info-text">
                <span>Categoría</span>
                <strong>{machine.type}</strong>
              </div>
            </div>
            <div className="detail-info-card">
              <div className="info-icon-wrapper"><FiActivity className="info-icon" /></div>
              <div className="info-text">
                <span>Disponibilidad</span>
                <strong className={machine.stock > 0 ? "text-green" : "text-red"}>
                  {machine.stock} Unidades
                </strong>
              </div>
            </div>
          </div>

          <div className="detail-features-container">
            <h3>Especificaciones Técnicas</h3>
            {machine.features && machine.features.length > 0 ? (
              <ul className="technical-list">
                {machine.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-key">{f.key}</span>
                    <span className="feature-separator"></span>
                    <span className="feature-val">{f.value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-features-msg">Esta máquina no tiene especificaciones adicionales registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
