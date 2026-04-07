export interface Order {
  id: string;
  productName: string;
  quantity: number;
  expectedPrice: number;
  specifications: string;
  status: 'Cotizando' | 'Aprobado' | 'En Tránsito' | 'Entregado';
  clientName: string;
  orderDate: string;
}
