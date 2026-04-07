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

      <div className="table-container glass">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Img</th>
              <th>Modelo / ID</th>
              <th>Marca & Tipo</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Precio Ref.</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {machinery.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="table-img-container">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="table-img" />
                    ) : (
                      <div className="table-img-placeholder"><FiImage /></div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="machine-name">{item.name}</div>
                  <div className="machine-id">{item.id} - {item.year}</div>
                </td>
                <td>
                  <div className="machine-brand">{item.brand}</div>
                  <div className="machine-type">{item.type}</div>
                </td>
                <td>
                  <strong className={item.stock > 0 ? "stock-positive" : "stock-empty"}>
                    {item.stock} unds.
                  </strong>
                </td>
                <td>
                  <span className={`badge status-${item.status.toLowerCase().replace(' ', '')}`}>
                    {item.status}
                  </span>
                </td>
                <td><strong>{formatPrice(item.price)}</strong></td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn-icon" onClick={() => handleOpenModal(item)} title="Editar">
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
