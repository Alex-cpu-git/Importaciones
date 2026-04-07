import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import type { Order } from '../types';
import './OrderModal.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: (order: Order) => void;
}

export default function OrderModal({ isOpen, onClose, order, onSave }: OrderModalProps) {
  const [formData, setFormData] = useState<Order>({
    id: '',
    productName: '',
    quantity: 1,
    expectedPrice: 0,
    specifications: '',
    status: 'Cotizando',
    clientName: '',
    orderDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        productName: '',
        quantity: 1,
        expectedPrice: 0,
        specifications: '',
        status: 'Cotizando',
        clientName: '',
        orderDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'expectedPrice' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="modal-header">
          <h2>{order ? 'Editar Pedido' : 'Nuevo Pedido'}</h2>
          <button type="button" className="close-btn" onClick={onClose}><FiX /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-2">
              <label>Cliente / Solicitante</label>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="Ej: Constructora Alpha SAC" />
            </div>
            <div className="form-group flex-1">
              <label>Fecha de Solicitud</label>
              <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-2">
              <label>Producto / Maquinaria a pedir</label>
              <input type="text" name="productName" value={formData.productName} onChange={handleChange} required placeholder="Ej: Excavadora de Cadenas Cat 320" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cantidad</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="1" />
            </div>
            <div className="form-group">
              <label>Precio Estimado / Presupuesto ($)</label>
              <input type="number" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required min="0" />
            </div>
            <div className="form-group">
              <label>Estado del Pedido</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Cotizando">Cotizando</option>
                <option value="Aprobado">Aprobado</option>
                <option value="En Tránsito">En Tránsito</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Especificaciones y Requisitos Técnicos</label>
              <textarea 
                name="specifications" 
                value={formData.specifications} 
                onChange={handleChange} 
                rows={5}
                placeholder="Detalla las características requeridas. Ej: Motor V8, Año mínimo 2021, Cuchara de 2m³, Sistema GPS incluido, pintura amarilla original."
                className="spec-textarea"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Guardar Pedido</button>
          </div>
        </form>
      </div>
    </div>
  );
}
