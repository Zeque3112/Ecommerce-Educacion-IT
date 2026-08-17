import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TechStore</h3>
          <p>Tu tienda de tecnología y componentes de PC de confianza</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/alta">Agregar Producto</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Información</h4>
          <p>Email: info@techstore.com</p>
          <p>Teléfono: +54 (11) 1234-5678</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TechStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
