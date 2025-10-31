import { useNavigate } from 'react-router-dom';

export default function Cybercafes() {
  const navigate = useNavigate();

  const cybercafes = [
    {
      id: 'silicom',
      name: 'Silicom Lan Center',
      address: 'Av. Real 1234, Huancayo, Junín',
      image: '/imagenes/silicom-lan.png',
      description: 'El mejor lugar para gamers profesionales'
    },
    {
      id: 'linux',
      name: 'Linux Cybercafé',
      address: 'Jr. Tecnología 456, El Tambo',
      image: '/imagenes/linux-cyber.png',
      description: 'Tecnología de punta y ambiente gamer'
    },
    {
      id: 'shadow',
      name: 'ShadowLAN',
      address: 'Av. Gamer Pro 789, Chilca',
      image: '/imagenes/shadow-lan.png',
      description: 'Experiencia gaming de alto nivel'
    }
  ];

  return (
    <div className="page-with-nav">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Cybercafés</h1>
          <p className="page-subtitle">⚡ ¡Reserva tu cabina favorita y juega sin límites! ⚡</p>
        </div>

        <div className="cybercafe-grid">
          {cybercafes.map((cyber) => (
            <div key={cyber.id} className="cybercafe-card">
              <div className="cybercafe-image">
                <img 
                  src={cyber.image} 
                  alt={cyber.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error(`Error cargando imagen: ${cyber.image}`);
                  }}
                />
                <div className="cybercafe-image-overlay"></div>
              </div>
              <div className="cybercafe-info">
                <h3 className="cybercafe-name">{cyber.name}</h3>
                <p className="cybercafe-address">📍 {cyber.address}</p>
                <p className="cybercafe-description">{cyber.description}</p>
                <button 
                  className="btn-view-cabinas"
                  onClick={() => navigate(`/cybercafe/${cyber.id}`)}
                >
                  Ver Cabinas Disponibles
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="page-footer">
          <p>Hecho con 💻 y ❤️ por Marc Aquino</p>
        </footer>
      </div>

    </div>
  );
}
