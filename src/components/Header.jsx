import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartModal from './CartModal'
import './Header.css'
import logo from '../../logo.png'

function Header() {
  const { getCartItemsCount, isCartModalOpen, toggleCartModal } = useCart()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <h1>TechStore</h1>
        </Link>

        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/alta">Alta de Productos</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
          </ul>
        </nav>

        <button className="cart-button" onClick={toggleCartModal}>
          🛒 ({getCartItemsCount()})
        </button>
      </div>

      {isCartModalOpen && <CartModal />}
    </header>
  )
}

export default Header
