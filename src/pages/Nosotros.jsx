import './Nosotros.css'

function Nosotros() {
  return (
    <div className="nosotros-page">
      <section className="nosotros-container">
        <h1>Sobre Nosotros</h1>

        <div className="nosotros-card">
          <h2>Quiénes Somos</h2>

          <p>
            Somos una empresa especializada en la venta de productos de informática y tecnología.
            Trabajamos con componentes de computadoras, notebooks, periféricos, hardware gamer y
            accesorios tecnológicos de las mejores marcas del mercado.
          </p>

          <p>
            Nuestro objetivo es ofrecer productos de calidad, precios competitivos y una experiencia
            de compra simple, rápida y segura para todos nuestros clientes.
          </p>
        </div>

        <div className="nosotros-grid">
          <div className="info-box">
            <h3>💻 Tecnología</h3>
            <p>
              Contamos con una amplia variedad de productos: placas de video, procesadores,
              memorias RAM, monitores, teclados mecánicos y mucho más.
            </p>
          </div>

          <div className="info-box">
            <h3>🚚 Envíos</h3>
            <p>
              Realizamos envíos a todo el país con seguimiento en tiempo real y opciones de envío
              rápido.
            </p>
          </div>

          <div className="info-box">
            <h3>🛡️ Garantía</h3>
            <p>
              Todos nuestros productos poseen garantía oficial y soporte técnico especializado.
            </p>
          </div>

          <div className="info-box">
            <h3>⭐ Atención</h3>
            <p>
              Nuestro equipo está preparado para ayudarte a elegir el producto ideal según tus
              necesidades.
            </p>
          </div>
        </div>

        <div className="nosotros-card">
          <h2>Nuestra Misión</h2>
          <p>
            Buscamos acercar la mejor tecnología a cada persona, ofreciendo productos confiables y
            atención personalizada. Creemos que la informática debe ser accesible, moderna y
            eficiente.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Nosotros
