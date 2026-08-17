import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import './Home.css'

function Home() {
  const { products, loading, error } = useProducts()

  return (
    <div className="home">
      <section className="home-hero">
        <h1>Bienvenido a TechStore</h1>
        <p>Descubre nuestros mejores productos de tecnología</p>
      </section>

      <section className="home-products">
        <h2>Nuestros Productos</h2>

        {error && (
          <div className="error-message">
            Error al cargar productos: {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <p>Cargando productos...</p>
          </div>
        )}

        {products.length === 0 && !loading && !error && (
          <div className="no-products">
            <p>No hay productos disponibles</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
