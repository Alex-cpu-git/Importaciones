import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './core/layout/Layout';
import Dashboard from './features/dashboard/views/Dashboard';
import MachineryList from './features/machinery/views/MachineryList';
import OrdersView from './features/orders/views/OrdersView';
import Login from './features/auth/views/Login';

// A simple wrapper to protect routes
function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
        {/* Vista principal */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="machinery" element={<MachineryList />} />
        <Route path="orders" element={<OrdersView />} />
        
        {/* Placeholder routes for other domains */}
        <Route path="imports" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Importaciones</h2><p>Próximamente...</p></div>} />
        <Route path="suppliers" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Proveedores</h2><p>Próximamente...</p></div>} />
        <Route path="clients" element={<div className="glass p-8 rounded-lg"><h2>Módulo de Clientes</h2><p>Próximamente...</p></div>} />
      </Route>
    </Routes>
  );
}

export default App;
