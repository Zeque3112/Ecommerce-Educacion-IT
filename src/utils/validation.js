// Validaciones para productos
export const validateProductForm = (formData) => {
  const errors = {}

  // Validar nombre
  if (!formData.nombre || formData.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  }

  // Validar precio
  if (!formData.precio || isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
    errors.precio = 'El precio debe ser un número mayor a 0'
  }

  // Validar stock
  if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
    errors.stock = 'El stock debe ser un número mayor o igual a 0'
  }

  // Validar marca
  if (!formData.marca || formData.marca.trim().length < 2) {
    errors.marca = 'La marca debe tener al menos 2 caracteres'
  }

  // Validar categoría
  if (!formData.categoria || formData.categoria.trim() === '') {
    errors.categoria = 'Debe seleccionar una categoría'
  }

  // Validar descripción corta
  if (!formData.descripcionCorta || formData.descripcionCorta.trim().length < 10) {
    errors.descripcionCorta = 'La descripción corta debe tener al menos 10 caracteres'
  }

  // Validar descripción larga
  if (!formData.descripcionLarga || formData.descripcionLarga.trim().length < 20) {
    errors.descripcionLarga = 'La descripción larga debe tener al menos 20 caracteres'
  }

  // Validar edad desde
  if (formData.edadDesde && (isNaN(formData.edadDesde) || parseInt(formData.edadDesde) < 0)) {
    errors.edadDesde = 'La edad desde debe ser un número válido'
  }

  // Validar edad hasta
  if (formData.edadHasta && (isNaN(formData.edadHasta) || parseInt(formData.edadHasta) < 0)) {
    errors.edadHasta = 'La edad hasta debe ser un número válido'
  }

  // Validar foto
  if (!formData.foto || formData.foto.trim() === '') {
    errors.foto = 'Debe proporcionar una URL de foto'
  }

  return errors
}

// Validaciones para contacto
export const validateContactForm = (formData) => {
  const errors = {}

  // Validar nombre
  if (!formData.nombre || formData.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Por favor ingresa un email válido'
  }

  // Validar comentarios
  if (!formData.comentarios || formData.comentarios.trim().length < 10) {
    errors.comentarios = 'Los comentarios deben tener al menos 10 caracteres'
  }

  return errors
}

// Validar campo individual
export const validateField = (fieldName, value, formData = {}) => {
  let error = ''

  switch (fieldName) {
    case 'nombre':
      if (!value || value.trim().length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres'
      }
      break
    case 'precio':
      if (!value || isNaN(value) || parseFloat(value) <= 0) {
        error = 'El precio debe ser un número mayor a 0'
      }
      break
    case 'stock':
      if (!value || isNaN(value) || parseInt(value) < 0) {
        error = 'El stock debe ser un número mayor o igual a 0'
      }
      break
    case 'marca':
      if (!value || value.trim().length < 2) {
        error = 'La marca debe tener al menos 2 caracteres'
      }
      break
    case 'categoria':
      if (!value || value.trim() === '') {
        error = 'Debe seleccionar una categoría'
      }
      break
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value || !emailRegex.test(value)) {
        error = 'Por favor ingresa un email válido'
      }
      break
    case 'comentarios':
      if (!value || value.trim().length < 10) {
        error = 'Los comentarios deben tener al menos 10 caracteres'
      }
      break
    case 'edadDesde':
      if (!value || isNaN(value) || parseInt(value) < 0) {
        error = 'La edad desde debe ser un número válido'
      }
      break
    case 'edadHasta':
      if (!value || isNaN(value) || parseInt(value) < 0) {
        error = 'La edad hasta debe ser un número válido'
      }
      break
    default:
      break
  }

  return error
}
