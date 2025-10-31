export default function Hero(){
  const comenzarSolicitud = () => {
    const trigger = document.querySelector('a[href="#por-que"]');
    if (trigger) trigger.click();
  };
  const verEnAccion = () => {
    const el = document.querySelector('#por-que');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  return (
    <section className="hero container" id="home">
      {/* Sección superior: Título principal y placeholder a la derecha */}
      <div className="hero-top">
        <div className="hero-main-content">
          <div className="eyebrow">SERVICIOS · SynapLink</div>
          <h1>Sin esperas. Reserva tu cabina en segundos. SynapLink — gestión y reservas en tiempo real para cibercafés y LAN centers.</h1>
          <p className="lead">Control total, reservas automatizadas, pagos por QR y chatbot inteligente con Gemini.</p>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={comenzarSolicitud}>Comenzar solicitud</button>
            <button className="btn-ghost" onClick={verEnAccion}>Ver SynapLink en Acción</button>
          </div>
        </div>
        
        <div className="hero-placeholder">
          <img 
            src="/imagenes/imagen_derecha.png" 
            alt="SynapLink Dashboard Preview" 
            className="hero-preview-image"
            style={{
              width: '800px',
              height: '200px',
              objectFit: 'fill',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>

      {/* Sección inferior: Teléfono a la izquierda, contenido a la derecha */}
      <div className="hero-bottom">
        <div className="hero-phone">
          <div className="device">
            <div className="screen">
              <img 
                src="/imagenes/celular.jpg" 
                alt="SynapLink App Interface" 
                className="phone-screen-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px'
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="hero-right-content">
          <div className="big-slogan">Juega sin esperar — SynapLink</div>
          <div className="big-sub">Reserva cabinas, suma puntos y controla tu sesión desde la app. Rápido. Seguro.</div>
          
          <div className="status-text">Si estás abriendo un local de juegos como...</div>
          
          <div className="checkboxes">
            <label><input type="checkbox" defaultChecked disabled /> Esports arena</label>
            <label><input type="checkbox" defaultChecked disabled /> LAN center</label>
            <label><input type="checkbox" defaultChecked disabled /> Cybercafé</label>
            <label><input type="checkbox" defaultChecked disabled /> Internet café</label>
            <label><input type="checkbox" defaultChecked disabled /> Coworking</label>
            <label><input type="checkbox" defaultChecked disabled /> PC bang</label>
          </div>
          
          <div className="final-message">SynapLink es tu mejor opción!!!</div>
        </div>
      </div>

      {/* Sección Por qué SynapLink */}
      <div className="por-que-section">
        <div className="por-que-content">
          <h2>Software para cybercafés y centros de gaming — SynapLink</h2>
          
          <p className="por-que-question">¿Buscas la mejor solución para gestionar tu cibercafé o centro de juegos?</p>
          
          <div className="por-que-description">
            <p>
              SynapLink ofrece un software integral para la administración de cabinas e internet cafés que simplifica tus operaciones diarias. Con nuestra plataforma todo-en-uno, podrás controlar las PCs en tiempo real, gestionar reservas, automatizar pagos con QR y optimizar tu negocio de manera sencilla y segura.
            </p>
            <p>
              Con el sistema de reservas inteligentes y el módulo de fidelización de clientes, podrás garantizar una experiencia fluida, rentable y atractiva tanto para ti como para tus usuarios.
            </p>
          </div>
          
          <p className="por-que-cta-text">Haz crecer tu negocio con SynapLink y vive la gestión sin complicaciones.</p>
          
          <div className="por-que-button">
            <button 
              className="btn-outline"
              onClick={() => {
                const el = document.querySelector('#servicios');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Ver SynapLink en Acción
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
