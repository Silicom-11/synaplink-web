export default function Footer() {
  return (
    <footer id="contacto" role="contentinfo" className="simple-footer">
      <div className="footer-grid">
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>SynapLink</div>
          <div className="small">
            SynapLink - Software para gestión de cybercafés y centros gaming · © {new Date().getFullYear()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Producto</div>
            <div className="small">Reservas · Control remoto · Chatbot · Panel admin</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Contacto</div>
            <div className="small">hola@synaplink.app</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
