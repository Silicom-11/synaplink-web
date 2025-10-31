import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [stats, setStats] = useState({
    totalReservas: 0,
    reservasActivas: 0,
    puntosGanados: 0,
    cyberFavorito: '-',
    miembroDesde: ''
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthDate: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await api.auth.me();
      const userData = response.user;
      setUser(userData);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        gender: userData.gender || '',
        birthDate: userData.birthDate ? userData.birthDate.split('T')[0] : ''
      });

      // Cargar estadísticas
      await loadStats(userData._id);
      
      setLoading(false);
    } catch (error) {
      console.error('Error cargando perfil:', error);
      navigate('/login');
    }
  };

  const loadStats = async (userId) => {
    try {
      const reservas = await api.reservas.misReservas(userId);
      
      const total = reservas.length;
      const activas = reservas.filter(r => r.estado === 'Activo').length;
      const puntos = reservas.reduce((sum, r) => sum + (r.puntosGanados || 0), 0);
      
      // Calcular cybercafé favorito
      const cyberCount = {};
      reservas.forEach(r => {
        const cyber = r.cybercafe || 'Desconocido';
        cyberCount[cyber] = (cyberCount[cyber] || 0) + 1;
      });
      const favorito = Object.keys(cyberCount).length > 0 
        ? Object.keys(cyberCount).reduce((a, b) => cyberCount[a] > cyberCount[b] ? a : b)
        : '-';

      setStats({
        totalReservas: total,
        reservasActivas: activas,
        puntosGanados: puntos,
        cyberFavorito: favorito,
        miembroDesde: new Date(user?.createdAt || Date.now()).toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long' 
        })
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Implementar endpoint de actualización en el backend
      setMessage({ type: 'success', text: '✅ Perfil actualizado correctamente' });
      setEditMode(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Error al actualizar el perfil' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ Las contraseñas no coinciden' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: '❌ La contraseña debe tener al menos 8 caracteres' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    try {
      // TODO: Implementar endpoint de cambio de contraseña en el backend
      setMessage({ type: 'success', text: '✅ Contraseña actualizada correctamente' });
      setPasswordMode(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Error al cambiar la contraseña' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      {/* Hero Header con Avatar */}
      <div className="perfil-hero">
        <div className="perfil-avatar-container">
          <div className="perfil-avatar">
            <span>{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
          </div>
          <div className="avatar-ring"></div>
        </div>
        <h1 className="perfil-name">{user?.firstName} {user?.lastName}</h1>
        <p className="perfil-email">{user?.email}</p>
        <div className="perfil-badges">
          <span className="badge badge-primary">🎮 Gamer</span>
          <span className="badge badge-gold">⭐ {stats.puntosGanados} Puntos</span>
          <span className="badge badge-purple">🏆 Miembro desde {stats.miembroDesde}</span>
        </div>
      </div>

      {/* Mensaje de feedback */}
      {message.text && (
        <div className={`perfil-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Stats Dashboard */}
      <div className="perfil-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalReservas}</span>
            <span className="stat-label">Total Reservas</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-info">
            <span className="stat-value">{stats.reservasActivas}</span>
            <span className="stat-label">Reservas Activas</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <span className="stat-value">{stats.puntosGanados}</span>
            <span className="stat-label">Puntos Ganados</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <span className="stat-value cybercafe-name">{stats.cyberFavorito}</span>
            <span className="stat-label">Cybercafé Favorito</span>
          </div>
        </div>
      </div>

      {/* Información Personal */}
      <div className="perfil-section">
        <div className="section-header">
          <h2>👤 Información Personal</h2>
          {!editMode && (
            <button className="btn-edit" onClick={() => setEditMode(true)}>
              ✏️ Editar
            </button>
          )}
        </div>
        
        <div className="perfil-card">
          <div className="perfil-form-grid">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
                className={editMode ? 'input-editable' : 'input-readonly'}
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
                className={editMode ? 'input-editable' : 'input-readonly'}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="input-readonly"
              />
              <small className="form-hint">El email no se puede cambiar</small>
            </div>
            <div className="form-group">
              <label>Género</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!editMode}
                className={editMode ? 'input-editable' : 'input-readonly'}
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={!editMode}
                className={editMode ? 'input-editable' : 'input-readonly'}
              />
            </div>
          </div>

          {editMode && (
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => {
                setEditMode(false);
                loadUserData();
              }}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveProfile}>
                💾 Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Seguridad - Cambiar Contraseña */}
      <div className="perfil-section">
        <div className="section-header">
          <h2>🔒 Seguridad</h2>
          {!passwordMode && (
            <button className="btn-edit" onClick={() => setPasswordMode(true)}>
              🔑 Cambiar Contraseña
            </button>
          )}
        </div>

        {passwordMode ? (
          <div className="perfil-card">
            <div className="perfil-form-grid">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="input-editable"
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input-editable"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input-editable"
                  placeholder="Repite la nueva contraseña"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => {
                setPasswordMode(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              }}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleChangePassword}>
                🔐 Actualizar Contraseña
              </button>
            </div>
          </div>
        ) : (
          <div className="perfil-card">
            <p className="security-info">
              🛡️ Tu contraseña está segura. Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        )}
      </div>

      {/* Preferencias */}
      <div className="perfil-section">
        <div className="section-header">
          <h2>⚙️ Preferencias</h2>
        </div>
        
        <div className="perfil-card">
          <div className="preference-item">
            <div className="preference-info">
              <span className="preference-icon">🔔</span>
              <div>
                <h4>Notificaciones</h4>
                <p>Recibe alertas sobre tus reservas</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <span className="preference-icon">📧</span>
              <div>
                <h4>Email Marketing</h4>
                <p>Recibe ofertas y promociones</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <span className="preference-icon">🌙</span>
              <div>
                <h4>Modo Oscuro</h4>
                <p>Cambia el tema de la aplicación</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Zona de Peligro */}
      <div className="perfil-section">
        <div className="section-header danger">
          <h2>⚠️ Zona de Peligro</h2>
        </div>
        
        <div className="perfil-card danger-zone">
          <div className="danger-item">
            <div>
              <h4>Eliminar Cuenta</h4>
              <p>Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.</p>
            </div>
            <button className="btn-danger">
              🗑️ Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
