import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../utils/api'
import Toast from './Toast'
import { useState } from 'react'
import './CartModal.css'

function CartModal() {
  const {
    cart,
    getCartTotal,
    removeFromCart,
    updateQuantity,
    toggleCartModal,
    clearCart,
    setIsCartModalOpen,
  } = useCart()

  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsCartModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [setIsCartModalOpen])

  // Cerrar modal al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartModalOpen(false)
    }
  }

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
      setTimeout(() => setIsCartModalOpen(false), 2000)
    } catch (error) {
      setToastMessage(`Error al enviar pedido: ${error.message}`)
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="cart-modal-backdrop" onClick={handleBackdropClick}>
        <div className="cart-modal">
          <div className="cart-modal-header">
            <h2>Carrito de Compras</h2>
            <button className="close-button" onClick={toggleCartModal}>
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.foto} alt={item.nombre} />
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.nombre}</h4>
                      <p className="cart-item-price">
                        ${item.precio.toFixed(2)}
                      </p>
                    </div>
                    <div className="cart-item-quantity">
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
                    <div className="cart-item-subtotal">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="cart-actions">
                <button
                  className="btn-clear"
                  onClick={clearCart}
                  disabled={isLoading}
                >
                  Vaciar Carrito
                </button>
                <button
                  className="btn-submit"
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Pedido'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </>
  )
}

export default CartModal
