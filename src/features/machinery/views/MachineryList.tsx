import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiImage } from 'react-icons/fi';
import type { Machine } from '../types';
import MachineryModal from '../components/MachineryModal';
import './MachineryList.css';

const INITIAL_DATA: Machine[] = [
  { id: 'MQ-001', name: 'Excavadora Cat 320', brand: 'Caterpillar', type: 'Excavadora', year: 2022, status: 'En Stock', price: 120000, stock: 2, imageUrl: 'https://images.unsplash.com/photo-1549247654-e69213dccee3?w=300&auto=format&fit=crop&q=60' },
  { id: 'MQ-002', name: 'Retroexcavadora 310L', brand: 'John Deere', type: 'Retroexcavadora', year: 2021, status: 'Importación', price: 85000, stock: 5 },
  { id: 'MQ-003', name: 'Cargador Frontal WA380', brand: 'Komatsu', type: 'Cargador', year: 2023, status: 'Reservado', price: 150000, stock: 0 },
];

export default function MachineryList() {
  const [machinery, setMachinery] = useState<Machine[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);

  const handleOpenModal = (machine: Machine | null = null) => {
    setEditingMachine(machine);
    setIsModalOpen(true);
  };

  const handleSaveMachine = (savedMachine: Machine) => {
    setMachinery(prev => {
      const exists = prev.find(m => m.id === savedMachine.id);
      if (exists) {
        return prev.map(m => m.id === savedMachine.id ? savedMachine : m);
      }
      return [savedMachine, ...prev];
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const handleShareWhatsApp = (machine: Machine) => {
    const text = `🚜 *Catálogo de Maquinarias* 🚜\n\n*Modelo:* ${machine.name}\n*Marca:* ${machine.brand}\n*Año:* ${machine.year}\n*Precio Ref:* ${formatPrice(machine.price)}\n*Estado:* ${machine.status}\n\n¿Te interesa este equipo? Déjanos un mensaje para enviarte más detalles.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="machinery-container">
      <header className="page-header flex-header">
        <div>
          <h1>Maquinarias</h1>
          <p>Catálogo e inventario de equipos pesados</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Nueva Máquina
        </button>
      </header>

      <div className="toolbar glass">
        <div className="search-bar">
          <FiSearch className="icon" />
          <input type="text" placeholder="Buscar por modelo, marca o ID..." />
        </div>
        <button className="btn-secondary">
          <FiFilter /> Filtros
        </button>
      </div>

      <div className="machine-grid">
        {machinery.map(item => (
          <div className="machine-card glass" key={item.id}>
            <div className="machine-card-img-wrapper">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="machine-card-img" />
              ) : (
                <div className="machine-card-img-placeholder"><FiImage size={40} /></div>
              )}
              <span className={`badge status-${item.status.toLowerCase().replace(' ', '')} floating-badge`}>
                {item.status}
              </span>
            </div>
            
            <div className="machine-card-content">
              <div className="machine-card-header">
                <h3 className="machine-name">{item.name}</h3>
                <span className="machine-brand">{item.brand} • {item.year}</span>
              </div>
              
              <div className="machine-card-price">
                {formatPrice(item.price)}
              </div>
              
              <div className="machine-card-details">
                <div className="machine-detail">
                  <span className="detail-label">ID / Tipo</span>
                  <span className="detail-val">{item.id} • {item.type}</span>
                </div>
                <div className="machine-detail">
                  <span className="detail-label">Unidades en Stock</span>
                  <span className={`detail-val ${item.stock > 0 ? "stock-positive" : "stock-empty"}`}>
                    {item.stock}
                  </span>
                </div>
              </div>
            </div>

            <div className="machine-card-footer">
              <button className="btn-icon" onClick={() => handleOpenModal(item)} title="Editar" style={{ flex: 1, backgroundColor: 'var(--color-bg-surface-hover)' }}>
                <FiEdit2 size={16} style={{marginRight: '6px'}} /> Editar
              </button>
              <button className="btn-icon btn-whatsapp" onClick={() => handleShareWhatsApp(item)} title="Compartir a WhatsApp">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Compartir
              </button>
            </div>
          </div>
        ))}
      </div>

      <MachineryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        machine={editingMachine}
        onSave={handleSaveMachine}
      />
    </div>
  );
}
