function clearErrors() {

    document
        .querySelectorAll('.invalid')
        .forEach(el => el.classList.remove('invalid'))

    document.querySelector('#errores').innerHTML = ''
}

function ocultarMensajes() {

    document.querySelector('#errores').innerHTML = ''
}

function renderError(message) {

    document.querySelector('#errores').innerHTML = `
        <div class="error-box">
            <ul>
                <li>${message}</li>
            </ul>
        </div>
    `
}

function showSuccess() {

    document.querySelector('#errores').innerHTML = `
        <div class="success">
            Mensaje enviado correctamente
        </div>
    `
}

function enviarFormulario(e) {

    e.preventDefault()

    clearErrors()

    const form = document.querySelector('#contacto-form')

    if (!form.checkValidity()) {

        form.reportValidity()

        return
    }

    const nombre =
        document.querySelector('#nombre').value.trim()

    const email =
        document.querySelector('#email').value.trim()

    const comentarios =
        document.querySelector('#comentarios').value.trim()

    console.log({
        nombre,
        email,
        comentarios
    })

    showSuccess()

    form.reset()
}

function start() {

    document
        .querySelector('#contacto-form')
        .addEventListener('submit', enviarFormulario)

    document
    .querySelectorAll('#contacto-form input, #contacto-form textarea')
    .forEach(campo => {
        campo.addEventListener('focus', ocultarMensajes)
    })
}

window.onload = start