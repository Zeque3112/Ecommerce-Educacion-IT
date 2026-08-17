import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { validateProductForm, validateField } from '../utils/validation'
import { deleteProduct, updateProduct } from '../utils/api'
import Toast from '../components/Toast'
import './Alta.css'

function Alta() {
  const { products, addProduct, loading, fetchProducts } = useProducts()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  // Estados para edición
  const [editingId, setEditingId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editErrors, setEditErrors] = useState({})

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    envioSinCargo: false,
    edadDesde: '',
    edadHasta: '',
    foto: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })

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

    const validationErrors = validateProductForm(formData)
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
      await addProduct(formData)
      setToastMessage('¡Producto agregado exitosamente!')
      setToastType('success')
      setShowToast(true)

      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        descripcionCorta: '',
        descripcionLarga: '',
        envioSinCargo: false,
        edadDesde: '',
        edadHasta: '',
        foto: '',
      })
      setErrors({})
      setTouched({})
    } catch (error) {
      setToastMessage(`Error al agregar producto: ${error.message}`)
      setToastType('error')
      setShowToast(true)
    }
  }

  // Funciones para edición
  const handleEditClick = (product) => {
    setEditingProduct({ ...product })
    setEditingId(product.id)
    setIsEditMode(true)
    setEditErrors({})
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditingProduct({
      ...editingProduct,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSaveEdit = async () => {
    const validationErrors = validateProductForm(editingProduct)

    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors)
      setToastMessage('Por favor completa correctamente todos los campos')
      setToastType('error')
      setShowToast(true)
      return
    }

    try {
      await updateProduct(editingId, editingProduct)
      setToastMessage('¡Producto actualizado exitosamente!')
      setToastType('success')
      setShowToast(true)
      fetchProducts()
      setIsEditMode(false)
      setEditingId(null)
      setEditingProduct(null)
    } catch (error) {
      setToastMessage(`Error al actualizar producto: ${error.message}`)
      setToastType('error')
      setShowToast(true)
    }
  }

  const handleDeleteClick = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId)
        setToastMessage('¡Producto eliminado exitosamente!')
        setToastType('success')
        setShowToast(true)
        fetchProducts()
      } catch (error) {
        setToastMessage(`Error al eliminar producto: ${error.message}`)
        setToastType('error')
        setShowToast(true)
      }
    }
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setEditingId(null)
    setEditingProduct(null)
    setEditErrors({})
  }

  return (
    <div className="alta">
      <div className="alta-container">
        <h1>Alta de Productos</h1>
        <p className="subtitle">Completa el formulario para agregar un nuevo producto</p>

        <form onSubmit={handleSubmit} className="product-form">
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
              placeholder="Nombre del producto"
              className={errors.nombre ? 'input-error' : ''}
            />
            {errors.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precio">
                Precio <span className="required">*</span>
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.precio ? 'input-error' : ''}
              />
              {errors.precio && (
                <span className="error-message">{errors.precio}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="stock">
                Stock <span className="required">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                min="0"
                className={errors.stock ? 'input-error' : ''}
              />
              {errors.stock && (
                <span className="error-message">{errors.stock}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">
                Marca <span className="required">*</span>
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Marca del producto"
                className={errors.marca ? 'input-error' : ''}
              />
              {errors.marca && (
                <span className="error-message">{errors.marca}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="categoria">
                Categoría <span className="required">*</span>
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.categoria ? 'input-error' : ''}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Procesadores">Procesadores</option>
                <option value="Memorias">Memorias</option>
                <option value="Placas Madre">Placas Madre</option>
                <option value="Fuentes">Fuentes</option>
                <option value="Discos">Discos</option>
                <option value="Monitores">Monitores</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Otros">Otros</option>
              </select>
              {errors.categoria && (
                <span className="error-message">{errors.categoria}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcionCorta">
              Descripción Corta <span className="required">*</span>
            </label>
            <input
              type="text"
              id="descripcionCorta"
              name="descripcionCorta"
              value={formData.descripcionCorta}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Descripción breve del producto"
              className={errors.descripcionCorta ? 'input-error' : ''}
            />
            {errors.descripcionCorta && (
              <span className="error-message">{errors.descripcionCorta}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="descripcionLarga">
              Descripción Larga <span className="required">*</span>
            </label>
            <textarea
              id="descripcionLarga"
              name="descripcionLarga"
              value={formData.descripcionLarga}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Descripción detallada del producto"
              rows="4"
              className={errors.descripcionLarga ? 'input-error' : ''}
            />
            {errors.descripcionLarga && (
              <span className="error-message">{errors.descripcionLarga}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edadDesde">
                Edad Desde <span className="required">*</span>
              </label>
              <input
                type="number"
                id="edadDesde"
                name="edadDesde"
                value={formData.edadDesde}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Edad mínima"
                min="0"
                className={errors.edadDesde ? 'input-error' : ''}
              />
              {errors.edadDesde && (
                <span className="error-message">{errors.edadDesde}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edadHasta">
                Edad Hasta <span className="required">*</span>
              </label>
              <input
                type="number"
                id="edadHasta"
                name="edadHasta"
                value={formData.edadHasta}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Edad máxima"
                min="0"
                className={errors.edadHasta ? 'input-error' : ''}
              />
              {errors.edadHasta && (
                <span className="error-message">{errors.edadHasta}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="envioSinCargo"
                checked={formData.envioSinCargo}
                onChange={handleChange}
              />
              <span>Envío sin cargo</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="foto">
              Foto <span className="required">*</span>
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="URL de la imagen del producto"
              className={errors.foto ? 'input-error' : ''}
            />
            {errors.foto && (
              <span className="error-message">{errors.foto}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Agregando...' : 'Agregar Producto'}
          </button>
        </form>

        {/* Tabla de productos */}
        {products.length > 0 && (
          <div className="products-table-section">
            <h2>Productos Registrados</h2>
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="product-row">
                      <td>{product.nombre}</td>
                      <td>{product.marca}</td>
                      <td>{product.categoria}</td>
                      <td>${product.precio.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditClick(product)}
                          title="Editar producto"
                        >
                          ✎
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteClick(product.id)}
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
          </div>
        )}
      </div>

      {/* Modal de edición */}
      {isEditMode && editingProduct && (
        <div className="edit-modal-backdrop">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Editar Producto</h2>
              <button className="close-btn" onClick={handleCancelEdit}>✕</button>
            </div>

            <div className="edit-modal-content">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editingProduct.nombre}
                  onChange={handleEditChange}
                  className={editErrors.nombre ? 'input-error' : ''}
                />
                {editErrors.nombre && <span className="error-message">{editErrors.nombre}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={editingProduct.precio}
                    onChange={handleEditChange}
                    step="0.01"
                    min="0"
                    className={editErrors.precio ? 'input-error' : ''}
                  />
                  {editErrors.precio && <span className="error-message">{editErrors.precio}</span>}
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={editingProduct.stock}
                    onChange={handleEditChange}
                    min="0"
                    className={editErrors.stock ? 'input-error' : ''}
                  />
                  {editErrors.stock && <span className="error-message">{editErrors.stock}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={editingProduct.marca}
                    onChange={handleEditChange}
                    className={editErrors.marca ? 'input-error' : ''}
                  />
                  {editErrors.marca && <span className="error-message">{editErrors.marca}</span>}
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    value={editingProduct.categoria}
                    onChange={handleEditChange}
                    className={editErrors.categoria ? 'input-error' : ''}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Procesadores">Procesadores</option>
                    <option value="Memorias">Memorias</option>
                    <option value="Placas Madre">Placas Madre</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Discos">Discos</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Otros">Otros</option>
                  </select>
                  {editErrors.categoria && <span className="error-message">{editErrors.categoria}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Descripción Corta</label>
                <input
                  type="text"
                  name="descripcionCorta"
                  value={editingProduct.descripcionCorta}
                  onChange={handleEditChange}
                  className={editErrors.descripcionCorta ? 'input-error' : ''}
                />
                {editErrors.descripcionCorta && <span className="error-message">{editErrors.descripcionCorta}</span>}
              </div>

              <div className="form-group">
                <label>Descripción Larga</label>
                <textarea
                  name="descripcionLarga"
                  value={editingProduct.descripcionLarga}
                  onChange={handleEditChange}
                  rows="3"
                  className={editErrors.descripcionLarga ? 'input-error' : ''}
                />
                {editErrors.descripcionLarga && <span className="error-message">{editErrors.descripcionLarga}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Edad Desde</label>
                  <input
                    type="number"
                    name="edadDesde"
                    value={editingProduct.edadDesde || ''}
                    onChange={handleEditChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Edad Hasta</label>
                  <input
                    type="number"
                    name="edadHasta"
                    value={editingProduct.edadHasta || ''}
                    onChange={handleEditChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="envioSinCargo"
                    checked={editingProduct.envioSinCargo || false}
                    onChange={handleEditChange}
                  />
                  <span>Envío sin cargo</span>
                </label>
              </div>

              <div className="form-group">
                <label>Foto (URL)</label>
                <input
                  type="text"
                  name="foto"
                  value={editingProduct.foto}
                  onChange={handleEditChange}
                  className={editErrors.foto ? 'input-error' : ''}
                />
                {editErrors.foto && <span className="error-message">{editErrors.foto}</span>}
              </div>
            </div>

            <div className="edit-modal-actions">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveEdit}>
                Guardar Cambios
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

export default Alta
