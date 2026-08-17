import { useCart } from '../hooks/useCart'
import { createOrder } from '../utils/api'
import Toast from '../components/Toast'
import { useState } from 'react'
import './Carrito.css'

function Carrito() {
  const {
    cart,
    getCartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart()

  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      setToastMessage('El carrito está vacío')
      setToastType('warning')
      setShowToast(true)
      return
    }

    try {
      setIsLoading(true)
      const orderData = {
        items: cart,
        total: getCartTotal(),
        date: new Date().toISOString(),
      }
      await createOrder(orderData)
      setToastMessage('¡Pedido enviado exitosamente!')
      setToastType('success')
      setShowToast(true)
      clearCart()
    } catch (error) {
      setToastMessage(`Error al enviar pedido: ${error.message}`)
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="carrito-page">
      <h1>Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="carrito-empty">
          <p>Tu carrito está vacío</p>
          <p className="text-secondary">Explora nuestros productos</p>
        </div>
      ) : (
        <div className="carrito-content">
          <div className="carrito-items-section">
            <table className="carrito-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="carrito-row">
                    <td className="product-cell">
                      <div className="product-info">
                        <img src={item.foto} alt={item.nombre} />
                        <div className="product-details">
                          <h4>{item.nombre}</h4>
                          <p>{item.marca}</p>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">
                      ${item.precio.toFixed(2)}
                    </td>
                    <td className="quantity-cell">
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.cantidad - 1)
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.cantidad + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="subtotal-cell">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="carrito-summary-section">
            <div className="carrito-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span className="total-amount">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="carrito-actions">
              <button
                className="btn-clear-cart"
                onClick={clearCart}
                disabled={isLoading}
              >
                Vaciar Carrito
              </button>
              <button
                className="btn-checkout"
                onClick={handleSubmitOrder}
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </div>
  )
}

export default Carrito
