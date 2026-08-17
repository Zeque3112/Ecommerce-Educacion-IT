import { useCart } from '../hooks/useCart'
import Toast from './Toast'
import { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={product.foto} alt={product.nombre} />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.nombre}</h3>

          <p className="product-brand">
            <strong>Marca:</strong> {product.marca}
          </p>

          <p className="product-category">
            <strong>Categoría:</strong> {product.categoria}
          </p>

          <p className="product-description">{product.descripcionCorta}</p>

          <div className="product-footer">
            <span className="product-price">${product.precio.toFixed(2)}</span>
            {product.stock > 0 ? (
              <span className="product-stock">Stock: {product.stock}</span>
            ) : (
              <span className="product-stock-empty">Sin stock</span>
            )}
          </div>

          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>

      {showToast && <Toast message={`${product.nombre} agregado al carrito`} />}
    </>
  )
}

export default ProductCard
