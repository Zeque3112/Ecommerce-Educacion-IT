import axios from 'axios'

// URL de mockapi.io
const API_BASE_URL = 'https://6a8081a2ec7a640e63abd071.mockapi.io/EcommerceZeque'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Funciones para productos
export const getProducts = async () => {
  try {
    const response = await api.get('/productos')
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener productos: ${error.message}`)
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener producto: ${error.message}`)
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/productos', productData)
    return response.data
  } catch (error) {
    throw new Error(`Error al crear producto: ${error.message}`)
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/productos/${id}`, productData)
    return response.data
  } catch (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`)
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/productos/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error al eliminar producto: ${error.message}`)
  }
}

// Funciones para carrito
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/carrito', orderData)
    return response.data
  } catch (error) {
    throw new Error(`Error al crear pedido: ${error.message}`)
  }
}

// Provisional para futuro uso
export const getOrders = async () => {
  try {
    const response = await api.get('/carrito')
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener pedidos: ${error.message}`)
  }
}

// Funciones para contacto (opcional)
export const sendContactMessage = async (messageData) => {
  try {
    const response = await api.post('/contacto', messageData)
    return response.data
  } catch (error) {
    throw new Error(`Error al enviar mensaje: ${error.message}`)
  }
}

export default api
