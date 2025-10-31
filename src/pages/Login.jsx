import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      if (res && res.user) {
        navigate('/home');
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Si es un error de red/conexión
      if (err.isNetworkError || err.message === 'Failed to fetch' || !navigator.onLine) {
        setError('No se puede conectar al servidor. El backend puede estar iniciándose (espera 30-60 segundos) o sin conexión a internet.');
        return;
      }
      
      // Error del servidor (401, 400, etc.)
      if (err.status === 401) {
        setError('Credenciales inválidas');
        return;
      }
      
      const serverMsg = err.body?.message || err.message;
      setError(serverMsg || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">
          <img src="/imagenes/logo.png" alt="SynapLink" className="auth-logo-img" />
          <h1 className="auth-title">¡Bienvenido de nuevo!</h1>
          <p className="auth-subtitle">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              className="input-field"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              autoCapitalize="none"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
              disabled={loading}
            />
          </div>

          <button className="btn-primary-auth" type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Ingresando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {error && <div className="auth-error-box">{error}</div>}
        </form>

        <div className="auth-divider">o</div>

        <div className="auth-link">
          ¿Aún no tienes cuenta? <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}
