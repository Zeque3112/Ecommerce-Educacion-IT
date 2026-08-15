function representarCardsProductos() {
    let cards = ''
    
    if(productos.length) {
        for(let i=0; i<productos.length; i++) {
            const producto = productos[i]
            cards += `
                <section>
                    <img src="${producto.foto}" alt="${producto.nombre}">
                    <div>
                        <p>${producto.nombre}</p>
                        <p>${producto.detalles}</p>
                        <p><b>$${producto.precio}</b></p>
                        <br>
                        <button onclick="comprarProducto(${producto.id})">Comprar</button>
                    </div>
                </section>
            `
        }
    }
    else cards += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('.section-cards-body').innerHTML = cards
}


function start() {
    console.warn( document.querySelector('title').innerText )

    representarCardsProductos()
}

