import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiFileText } from 'react-icons/fi';
import type { Order } from '../types';
import OrderModal from '../components/OrderModal';
import './OrdersView.css';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    productName: 'Excavadora Cat 320',
    quantity: 2,
    expectedPrice: 240000,
    specifications: '- Año 2022+\n- Motor ACERT\n- Cabina ROPS cerrada con AC',
    status: 'Aprobado',
    clientName: 'Constructora Alpha SAC',
    orderDate: '2025-10-14'
  },
  {
    id: 'ORD-045',
    productName: 'Camión Volquete Volvo FMX 8x4',
    quantity: 5,
    expectedPrice: 650000,
    specifications: '- Tolva de 20m³\n- Caja I-Shift\n- Llantas mineras',
    status: 'Cotizando',
    clientName: 'Minería del Sur S.A.',
    orderDate: '2025-11-02'
  }
];

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order | null = null) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = (savedOrder: Order) => {
    setOrders(prev => {
      const exists = prev.find(o => o.id === savedOrder.id);
      if (exists) {
        return prev.map(o => o.id === savedOrder.id ? savedOrder : o);
      }
      return [savedOrder, ...prev];
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Cotizando': return 'status-cotizando';
      case 'Aprobado': return 'status-aprobado';
      case 'En Tránsito': return 'status-transito';
      case 'Entregado': return 'status-entregado';
      default: return '';
    }
  };

  return (
    <div className="orders-container">
      <header className="page-header flex-header">
        <div>
          <h1>Gestión de Pedidos</h1>
          <p>Solicitudes, cotizaciones y pedidos de importación</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Nuevo Pedido
        </button>
      </header>

      <div className="toolbar glass">
        <div className="search-bar">
          <FiSearch className="icon" />
          <input type="text" placeholder="Buscar por cliente, ID o producto..." />
        </div>
        <button className="btn-secondary">
          <FiFilter /> Filtros
        </button>
      </div>

      <div className="orders-grid">
        {orders.map(order => (
          <div className="order-card glass" key={order.id}>
            <div className="order-card-header">
              <span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span>
              <div className="order-actions">
                <button className="btn-icon" onClick={() => handleOpenModal(order)} title="Editar pedido">
                  <FiEdit2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="order-card-body">
              <h3 className="order-product">{order.productName}</h3>
              <p className="order-id">ID: {order.id} • Creado el {order.orderDate}</p>
              
              <div className="order-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Cliente</span>
                  <span className="detail-value">{order.clientName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Cantidad</span>
                  <span className="detail-value">{order.quantity} unidades</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Presupuesto</span>
                  <span className="detail-value highlighted">{formatPrice(order.expectedPrice)}</span>
                </div>
              </div>

              <div className="order-specs">
                <div className="specs-title"><FiFileText /> Especificaciones</div>
                <pre className="specs-content">{order.specifications}</pre>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="empty-state">No hay pedidos registrados. Haz clic en "Nuevo Pedido" para comenzar.</div>
        )}
      </div>

      <OrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={editingOrder}
        onSave={handleSaveOrder}
      />
    </div>
  );
}
