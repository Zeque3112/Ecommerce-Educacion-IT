function renderErrores() {
    const contenedor = document.querySelector('#errores-validacion')

    if (!errores.length) {
        contenedor.innerHTML = ''
        return
    }

    let html = `
        <div class="error-box">
            <h3>Se encontraron errores:</h3>
            <ul>
    `

    for (let error of errores) {
        html += `<li>${error}</li>`
    }

    html += `
            </ul>
        </div>
    `

    contenedor.innerHTML = html
}

function agregar(e) {

    e.preventDefault()

    const form = document.querySelector('.alta-form')

    if (!form.checkValidity()) {

        form.reportValidity()

        return
    }

    const producto = {

        nombre: document.querySelector('#nombre').value.trim(),

        precio: Number(document.querySelector('#precio').value),

        stock: Number(document.querySelector('#stock').value),

        marca: document.querySelector('#marca').value.trim(),

        categoria: document.querySelector('#categoria').value.trim(),

        descripcionCorta:
            document.querySelector('#descripcion-corta').value.trim(),

        descripcionLarga:
            document.querySelector('#descripcion-larga').value.trim(),

        edadDesde:
            Number(document.querySelector('#edad-desde').value),

        edadHasta:
            Number(document.querySelector('#edad-hasta').value),

        foto: document.querySelector('#foto').value.trim(),

        envio: document.querySelector('#envio').checked
    }

    if (producto.edadDesde > producto.edadHasta) {

        const errores = document.querySelector('#errores-validacion')

        errores.innerHTML = `
            <div class="error-box">
                <h3>Se encontraron errores:</h3>

                <ul>
                    <li>
                        Edad desde no puede ser mayor que edad hasta
                    </li>
                </ul>
            </div>
        `

        return
    }

    productos.push(producto)

    representarTablaProductos()

    form.reset()
}


function representarTablaProductos() {
    let filasTabla = ''

    if(productos.length) {
        filasTabla += `
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>precio</th>
                    <th>stock</th>
                    <th>marca</th>
                    <th>categoría</th>
                    <th>descripción corta</th>
                    <th>descripción larga</th>
                    <th>edad desde</th>
                    <th>edad hasta</th>
                    <th>foto</th>
                    <th>envío</th>
                </tr>
            </thead>
        `

        filasTabla += '<tbody>'

        for(let producto of productos) {
            filasTabla += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td class="centrar">$${producto.precio}</td>
                    <td class="centrar">${producto.stock}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.descripcionCorta}</td>
                    <td>${producto.descripcionLarga}</td>
                    <td class="centrar">${producto.edadDesde}</td>
                    <td class="centrar">${producto.edadHasta}</td>
                    <td><img width="75" src="${producto.foto}" alt="${producto.nombre}"></td>
                    <td class="centrar">${producto.envio?'Si':'No'}</td>
                </tr>
            `
        }

        filasTabla += '</tbody>'
    }
    else filasTabla += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('table').innerHTML = filasTabla
}

function start() {
    console.warn( document.querySelector('title').innerText )

    document.querySelector('button').onclick = agregar

    representarTablaProductos()
}
