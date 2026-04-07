export interface Machine {
  id: string;
  name: string;
  brand: string;
  type: string;
  year: number;
  status: 'En Stock' | 'Importación' | 'Reservado';
  price: number;
  stock: number;
  imageUrl?: string;
  features?: { key: string; value: string }[];
}
