import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './core/layout/Layout';
import Dashboard from './features/dashboard/views/Dashboard';
import MachineryList from './features/machinery/views/MachineryList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default route redirect to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Domains */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="machinery" element={<MachineryList />} />
        
        {/* Placeholder routes for other domains */}
        <Route path="imports" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Importaciones</h2><p>Próximamente...</p></div>} />
        <Route path="suppliers" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Proveedores</h2><p>Próximamente...</p></div>} />
        <Route path="clients" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Clientes</h2><p>Próximamente...</p></div>} />
        <Route path="orders" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Pedidos</h2><p>Próximamente...</p></div>} />
      </Route>
    </Routes>
  );
}

export default App;
