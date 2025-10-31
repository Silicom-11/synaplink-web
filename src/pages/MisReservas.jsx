import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function MisReservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    activas: 0,
    completadas: 0,
    canceladas: 0,
    puntosGanados: 0
  });

  useEffect(() => {
    loadReservas();
  }, []);

  useEffect(() => {
    filterReservas();
  }, [filterStatus, searchTerm, reservas]);

  async function loadReservas() {
    try {
      setLoading(true);
      const response = await api.auth.me();
      const user = response.user;
      
      if (!user || !user._id) {
        navigate('/login');
        return;
      }

      const data = await api.reservas.misReservas(user._id);
      const reservasList = data.reservas || [];
      
      setReservas(reservasList);
      calculateStats(reservasList);
      setError(null);
    } catch (err) {
      console.error('Error loading reservas:', err);
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  }

  function calculateStats(reservasList) {
    const stats = {
      total: reservasList.length,
      activas: reservasList.filter(r => r.estado === 'Activo' || r.estado === 'Pagado').length,
      completadas: reservasList.filter(r => r.estado === 'Completado').length,
      canceladas: reservasList.filter(r => r.estado === 'Cancelado').length,
      puntosGanados: reservasList.reduce((sum, r) => sum + (r.puntosGanados || 0), 0)
    };
    setStats(stats);
  }

  function filterReservas() {
    let filtered = [...reservas];

    // Filtrar por estado
    if (filterStatus !== 'all') {
      if (filterStatus === 'activas') {
        filtered = filtered.filter(r => r.estado === 'Activo' || r.estado === 'Pagado');
      } else if (filterStatus === 'completadas') {
        filtered = filtered.filter(r => r.estado === 'Completado');
      } else if (filterStatus === 'canceladas') {
        filtered = filtered.filter(r => r.estado === 'Cancelado');
      }
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.cybercafe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cabinas?.some(c => c.toString().includes(searchTerm)) ||
        r.estado?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por fecha más reciente
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredReservas(filtered);
  }

  async function handleCancelarReserva(reservaId) {
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return;

    try {
      // Aquí iría la llamada al backend para cancelar
      alert('Funcionalidad de cancelar reserva próximamente...');
      // await api.reservas.cancelar(reservaId);
      // loadReservas();
    } catch (err) {
      console.error('Error al cancelar:', err);
      alert('Error al cancelar la reserva');
    }
  }

  function getStatusBadge(estado) {
    const badges = {
      'Activo': { color: '#2ecc71', icon: '🟢', text: 'Activa' },
      'Pagado': { color: '#3498db', icon: '💳', text: 'Pagado' },
      'Completado': { color: '#95a5a6', icon: '✅', text: 'Completada' },
      'Cancelado': { color: '#e74c3c', icon: '❌', text: 'Cancelada' },
      'Pendiente': { color: '#f39c12', icon: '⏳', text: 'Pendiente' }
    };
    return badges[estado] || badges['Pendiente'];
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  function formatTime(date) {
    return new Date(date).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getTimeRemaining(fechaFin) {
    const ahora = new Date();
    const fin = new Date(fechaFin);
    const diff = fin - ahora;
    
    if (diff <= 0) return 'Finalizado';
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas > 0) return `${horas}h ${minutos}m restantes`;
    return `${minutos}m restantes`;
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando tus reservas...</p>
      </div>
    );
  }

  return (
    <div className="mis-reservas-page">
      {/* Header con título y stats */}
      <div className="reservas-header">
        <div className="header-top">
          <h1 className="page-main-title">📋 Mis Reservas</h1>
          <button className="btn-nueva-reserva" onClick={() => navigate('/cybercafes')}>
            ➕ Nueva Reserva
          </button>
        </div>
        
        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card-mini total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Reservas</div>
            </div>
          </div>
          <div className="stat-card-mini activas">
            <div className="stat-icon">🟢</div>
            <div className="stat-content">
              <div className="stat-value">{stats.activas}</div>
              <div className="stat-label">Activas</div>
            </div>
          </div>
          <div className="stat-card-mini completadas">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.completadas}</div>
              <div className="stat-label">Completadas</div>
            </div>
          </div>
          <div className="stat-card-mini canceladas">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-value">{stats.canceladas}</div>
              <div className="stat-label">Canceladas</div>
            </div>
          </div>
          <div className="stat-card-mini puntos">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">{stats.puntosGanados}</div>
              <div className="stat-label">Puntos Ganados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="reservas-filters">
        <div className="filter-group">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Todas
          </button>
          <button
            className={`filter-btn ${filterStatus === 'activas' ? 'active' : ''}`}
            onClick={() => setFilterStatus('activas')}
          >
            Activas
          </button>
          <button
            className={`filter-btn ${filterStatus === 'completadas' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completadas')}
          >
            Completadas
          </button>
          <button
            className={`filter-btn ${filterStatus === 'canceladas' ? 'active' : ''}`}
            onClick={() => setFilterStatus('canceladas')}
          >
            Canceladas
          </button>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por cybercafé, cabina o estado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-reservas"
          />
        </div>
      </div>

      {/* Lista de reservas */}
      {error && <div className="error-message">{error}</div>}

      {filteredReservas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay reservas</h3>
          <p>
            {searchTerm || filterStatus !== 'all' 
              ? 'No se encontraron reservas con los filtros aplicados'
              : '¡Aún no tienes reservas! Empieza reservando tu cabina favorita.'}
          </p>
          <button className="btn-start-booking" onClick={() => navigate('/cybercafes')}>
            Ver Cybercafés Disponibles
          </button>
        </div>
      ) : (
        <div className="reservas-timeline">
          {filteredReservas.map((reserva) => {
            const badge = getStatusBadge(reserva.estado);
            const isActive = reserva.estado === 'Activo' || reserva.estado === 'Pagado';
            
            return (
              <div key={reserva._id} className={`reserva-card ${reserva.estado.toLowerCase()}`}>
                {/* Timeline indicator */}
                <div className="timeline-indicator" style={{ background: badge.color }}></div>

                <div className="reserva-content">
                  {/* Header */}
                  <div className="reserva-card-header">
                    <div className="reserva-title-section">
                      <h3 className="reserva-cybercafe">{reserva.cybercafe || 'Silicom Lan Center'}</h3>
                      <span className="reserva-badge" style={{ background: badge.color }}>
                        {badge.icon} {badge.text}
                      </span>
                    </div>
                    <div className="reserva-date">
                      📅 {formatDate(reserva.fechaInicio)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="reserva-card-body">
                    <div className="reserva-info-grid">
                      <div className="info-item">
                        <span className="info-label">Cabinas:</span>
                        <span className="info-value">
                          {reserva.cabinas?.map(c => `#${c}`).join(', ') || 'N/A'}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Horario:</span>
                        <span className="info-value">
                          {formatTime(reserva.fechaInicio)} - {formatTime(reserva.fechaFin)}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Duración:</span>
                        <span className="info-value">{reserva.duracionMinutos} min</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Precio:</span>
                        <span className="info-value price">{reserva.precio}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Puntos:</span>
                        <span className="info-value points">⭐ +{reserva.puntosGanados}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Método Pago:</span>
                        <span className="info-value">{reserva.metodoPago || 'Yape'}</span>
                      </div>
                    </div>

                    {/* Progress bar para reservas activas */}
                    {isActive && (
                      <div className="reserva-progress">
                        <div className="progress-info">
                          <span className="progress-label">⏱️ {getTimeRemaining(reserva.fechaFin)}</span>
                          <span className="progress-percentage">En curso</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill active-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* QR Code para reservas activas/pagadas */}
                    {isActive && reserva.codigoQR && (
                      <div className="qr-section">
                        <div className="qr-placeholder">
                          <div className="qr-icon">📱</div>
                          <span>Código QR disponible</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer con acciones */}
                  <div className="reserva-card-footer">
                    <div className="reserva-timestamp">
                      Creada: {formatDate(reserva.createdAt)} a las {formatTime(reserva.createdAt)}
                    </div>
                    <div className="reserva-actions">
                      {isActive && (
                        <>
                          <button className="btn-action extend" title="Extender tiempo">
                            ⏰ Extender
                          </button>
                          <button 
                            className="btn-action cancel" 
                            onClick={() => handleCancelarReserva(reserva._id)}
                            title="Cancelar reserva"
                          >
                            ❌ Cancelar
                          </button>
                        </>
                      )}
                      {reserva.estado === 'Completado' && (
                        <button className="btn-action repeat" onClick={() => navigate('/cybercafes')}>
                          🔄 Reservar de nuevo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
