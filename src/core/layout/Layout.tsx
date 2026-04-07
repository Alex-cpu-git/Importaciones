import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-wrapper">
        {/* We can add a Topbar here later */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
