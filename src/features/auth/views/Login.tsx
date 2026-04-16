import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import logoImg from '../../../assets/logo1.png';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  // Temporary hardcoded credentials structure
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded check for purely visual UI demonstration as requested
    if (formData.email === 'admin@pym.com' && formData.password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. (Pista: admin@pym.com / admin123)');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logoImg} alt="P&M S.A.C Logo" className="login-logo" />
        <h1 className="login-title">Administración</h1>
        <p className="login-subtitle">Gestión del Catálogo P&M S.A.C.</p>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-group">
            <label>Correo Electrónico</label>
            <div className="login-input-container">
              <FiUser className="login-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="admin@pym.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="login-group">
            <label>Contraseña</label>
            <div className="login-input-container">
              <FiLock className="login-icon" />
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}
