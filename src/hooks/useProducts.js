import { useState, useEffect } from 'react'
import { getProducts, createProduct } from '../utils/api'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (productData) => {
    try {
      setLoading(true)
      setError(null)

      const normalizedProduct = {
        ...productData,
        precio: Number(productData.precio),
        stock: Number(productData.stock),
      }

      const newProduct = await createProduct(normalizedProduct)
      setProducts((prevProducts) => [...prevProducts, newProduct])
      return newProduct
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, fetchProducts, addProduct }
}
