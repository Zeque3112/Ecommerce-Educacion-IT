import { useState } from 'react'
import { validateContactForm, validateField } from '../utils/validation'
import Toast from '../components/Toast'
import './Contacto.css'

function Contacto() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    comentarios: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Validar campo en tiempo real si ya fue tocado
    if (touched[name]) {
      const fieldError = validateField(name, value, formData)
      setErrors({
        ...errors,
        [name]: fieldError,
      })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })

    const fieldError = validateField(name, value, formData)
    setErrors({
      ...errors,
      [name]: fieldError,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar todos los campos
    const validationErrors = validateContactForm(formData)
    const allTouched = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setToastMessage('Por favor completa correctamente todos los campos')
      setToastType('error')
      setShowToast(true)
      return
    }

    try {
      setIsSubmitting(true)
      
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setToastMessage('¡Mensaje enviado exitosamente! Te responderemos pronto.')
      setToastType('success')
      setShowToast(true)

      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        comentarios: '',
      })
      setErrors({})
      setTouched({})
    } catch (error) {
      setToastMessage(`Error al enviar mensaje: ${error.message}`)
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contacto">
      <div className="contacto-container">
        <h1>Contacto</h1>
        <p className="subtitle">
          ¿Tienes alguna pregunta? Nos encantaría escucharte
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu nombre completo"
              className={errors.nombre ? 'input-error' : ''}
            />
            {errors.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="tu@email.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu número de teléfono"
            />
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Asunto del mensaje"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comentarios">
              Comentarios <span className="required">*</span>
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Cuéntanos más sobre tu consulta"
              rows="5"
              className={errors.comentarios ? 'input-error' : ''}
            />
            {errors.comentarios && (
              <span className="error-message">{errors.comentarios}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>

        <div className="contact-info">
          <h3>Otra forma de contactarnos</h3>
          <div className="info-items">
            <div className="info-item">
              <h4>📧 Email</h4>
              <p>info@techstore.com</p>
            </div>
            <div className="info-item">
              <h4>📞 Teléfono</h4>
              <p>+54 (11) 1234-5678</p>
            </div>
            <div className="info-item">
              <h4>📍 Ubicación</h4>
              <p>Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </div>
  )
}

export default Contacto
