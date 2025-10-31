import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function CybercafeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cabinas, setCabinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCabina, setSelectedCabina] = useState(null);
  const [duration, setDuration] = useState(1); // horas
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [reserving, setReserving] = useState(false);

  const cybercafeInfo = {
    silicom: {
      name: 'Silicom Lan Center',
      address: 'Av. Real 1234, Huancayo, Junín',
      image: '/imagenes/silicom-lan.png',
      description: 'El mejor lugar para gamers profesionales',
      specs: ['Intel i7 12700K', 'RTX 3070', '16GB RAM', 'Monitor 144Hz'],
      facilities: ['Wi-Fi Gratis', 'Aire Acondicionado', 'Snacks & Bebidas', 'Estacionamiento']
    },
    linux: {
      name: 'Linux Cybercafé',
      address: 'Jr. Tecnología 456, El Tambo',
      image: '/imagenes/linux-cyber.png',
      description: 'Tecnología de punta y ambiente gamer',
      specs: ['Intel i5 12400F', 'RTX 3060', '16GB RAM', 'Monitor 120Hz'],
      facilities: ['Wi-Fi Gratis', 'Ventilación', 'Snacks', 'Seguridad 24/7']
    },
    shadow: {
      name: 'ShadowLAN',
      address: 'Av. Gamer Pro 789, Chilca',
      image: '/imagenes/shadow-lan.png',
      description: 'Experiencia gaming de alto nivel',
      specs: ['Intel i9 13900K', 'RTX 4080', '32GB RAM', 'Monitor 240Hz'],
      facilities: ['Wi-Fi Gigabit', 'Climatizado', 'Cafetería', 'Streaming Setup']
    }
  };

  const cyber = cybercafeInfo[id] || cybercafeInfo.silicom;

  // Cargar cabinas
  useEffect(() => {
    loadCabinas();
  }, []);

  async function loadCabinas() {
    try {
      setLoading(true);
      const data = await api.reservas.getCabinas();
      // Filtrar cabinas por cybercafé
      const cabinasCyber = data.cabinas.filter(c => 
        c.cybercafe === cyber.name || c.cybercafe === 'Silicom Lan Center'
      );
      setCabinas(cabinasCyber);
      setError(null);
    } catch (err) {
      console.error('Error loading cabinas:', err);
      setError('Error al cargar las cabinas');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCabina(cabina) {
    if (cabina.estado !== 'Libre') return;
    setSelectedCabina(cabina);
    setShowReservaModal(true);
  }

  function calculatePrice() {
    const basePrice = duration === 1 ? 2 : duration === 2 ? 5 : duration === 3 ? 10 : 2;
    return `S/${basePrice}`;
  }

  async function handleReservar() {
    if (!selectedCabina) return;

    try {
      setReserving(true);
      const response = await api.auth.me();
      const user = response.user; // El usuario está dentro de response.user
      
      console.log('User data:', user);
      console.log('Selected cabina:', selectedCabina);
      
      if (!user || !user._id) {
        throw new Error('Usuario no autenticado correctamente');
      }
      
      const fechaInicio = new Date();
      const fechaFin = new Date(fechaInicio.getTime() + duration * 60 * 60 * 1000);

      const reservaData = {
        userId: user._id,
        cabinas: [selectedCabina.numero],
        cybercafe: cyber.name, // Agregamos el nombre del cybercafé
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        precio: calculatePrice(),
        duracionMinutos: duration * 60
      };

      console.log('Sending reservation data:', reservaData);

      const reservaResponse = await api.reservas.reservarTemporal(reservaData);
      
      console.log('Reservation response:', reservaResponse);
      
      // Mostrar éxito
      alert(`¡Reserva exitosa! 🎉\n\nCabina ${selectedCabina.numero}\nDuración: ${duration}h\nPrecio: ${calculatePrice()}\n\nDirígete al cybercafé para confirmar tu pago.`);
      
      setShowReservaModal(false);
      setSelectedCabina(null);
      loadCabinas(); // Recargar estado
    } catch (err) {
      console.error('Error al reservar:', err);
      console.error('Error details:', err.body || err.message);
      
      const errorMsg = err.body?.error || err.message || 'Error desconocido';
      alert(`Error al realizar la reserva:\n${errorMsg}\n\nIntenta nuevamente.`);
    } finally {
      setReserving(false);
    }
  }

  function getStatusColor(estado) {
    switch (estado) {
      case 'Libre': return '#2ecc71';
      case 'Ocupado': return '#e74c3c';
      case 'Reservado': return '#f39c12';
      default: return '#95a5a6';
    }
  }

  function getStatusIcon(estado) {
    switch (estado) {
      case 'Libre': return '✅';
      case 'Ocupado': return '🔴';
      case 'Reservado': return '🟡';
      default: return '⚪';
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando cabinas...</p>
      </div>
    );
  }

  return (
    <div className="cybercafe-detail">
      {/* Header del Cybercafé */}
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/cybercafes')}>
          ← Volver
        </button>
        <div className="header-content">
          <img src={cyber.image} alt={cyber.name} className="cyber-logo-large" />
          <div className="header-info">
            <h1 className="cyber-title">{cyber.name}</h1>
            <p className="cyber-address">📍 {cyber.address}</p>
            <p className="cyber-description">{cyber.description}</p>
          </div>
        </div>
      </div>

      {/* Especificaciones y Facilidades */}
      <div className="cyber-features">
        <div className="feature-box">
          <h3>💻 Especificaciones</h3>
          <ul>
            {cyber.specs.map((spec, i) => (
              <li key={i}>✓ {spec}</li>
            ))}
          </ul>
        </div>
        <div className="feature-box">
          <h3>🎯 Facilidades</h3>
          <ul>
            {cyber.facilities.map((facility, i) => (
              <li key={i}>✓ {facility}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Estado de Cabinas */}
      <div className="cabinas-section">
        <h2 className="section-title">
          Estado de Cabinas en Tiempo Real
        </h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="cabinas-grid">
          {cabinas.map((cabina) => (
            <div
              key={cabina.numero}
              className={`cabina-card ${cabina.estado.toLowerCase()}`}
              onClick={() => handleSelectCabina(cabina)}
              style={{
                borderColor: getStatusColor(cabina.estado),
                cursor: cabina.estado === 'Libre' ? 'pointer' : 'not-allowed'
              }}
            >
              <div className="cabina-header">
                <span className="cabina-numero">Cabina {cabina.numero}</span>
                <span className="cabina-status" style={{ color: getStatusColor(cabina.estado) }}>
                  {getStatusIcon(cabina.estado)} {cabina.estado}
                </span>
              </div>
              
              {cabina.estado === 'Libre' && (
                <button className="btn-reservar-cabina">
                  Reservar Ahora
                </button>
              )}
              
              {(cabina.estado === 'Ocupado' || cabina.estado === 'Reservado') && cabina.horaFin && (
                <p className="cabina-timer">
                  ⏱️ Disponible: {new Date(cabina.horaFin).toLocaleTimeString('es-PE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Reserva */}
      {showReservaModal && selectedCabina && (
        <div className="modal-overlay" onClick={() => setShowReservaModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reservar Cabina {selectedCabina.numero}</h2>
              <button className="modal-close" onClick={() => setShowReservaModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="reserva-info">
                <p><strong>Cybercafé:</strong> {cyber.name}</p>
                <p><strong>Cabina:</strong> #{selectedCabina.numero}</p>
              </div>

              <div className="duration-selector">
                <label>Duración:</label>
                <div className="duration-options">
                  <button
                    className={`duration-btn ${duration === 1 ? 'active' : ''}`}
                    onClick={() => setDuration(1)}
                  >
                    1 hora
                    <span className="price-tag">S/2</span>
                  </button>
                  <button
                    className={`duration-btn ${duration === 2 ? 'active' : ''}`}
                    onClick={() => setDuration(2)}
                  >
                    2 horas
                    <span className="price-tag">S/5</span>
                  </button>
                  <button
                    className={`duration-btn ${duration === 3 ? 'active' : ''}`}
                    onClick={() => setDuration(3)}
                  >
                    3 horas
                    <span className="price-tag">S/10</span>
                  </button>
                </div>
              </div>

              <div className="reserva-summary">
                <div className="summary-row">
                  <span>Duración:</span>
                  <span>{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                </div>
                <div className="summary-row">
                  <span>Inicio:</span>
                  <span>{new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="summary-row">
                  <span>Fin estimado:</span>
                  <span>{new Date(Date.now() + duration * 60 * 60 * 1000).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="summary-row total">
                  <span>Total a pagar:</span>
                  <span className="price-total">{calculatePrice()}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel" 
                onClick={() => setShowReservaModal(false)}
                disabled={reserving}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirm" 
                onClick={handleReservar}
                disabled={reserving}
              >
                {reserving ? 'Reservando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
