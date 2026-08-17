// Script para agregar productos de prueba a mockapi.io
// Ejecutar: node seed-products.js

const API_URL = 'https://6a8081a2ec7a640e63abd071.mockapi.io/EcommerceZeque/productos'

const products = [
  {
    nombre: 'Intel Core i7-13700K',
    precio: 449.99,
    stock: 15,
    marca: 'Intel',
    categoria: 'Procesadores',
    descripcionCorta: 'Procesador de alta gama con 16 núcleos',
    descripcionLarga: 'Procesador Intel Core i7-13700K con arquitectura Raptor Lake, 16 núcleos (8 P-cores + 8 E-cores), 24 hilos, frecuencia base de 3.4 GHz y boost hasta 5.4 GHz. Socket LGA1700, TDP 253W.',
    foto: 'https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&q=80',
    envioSinCargo: true,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'AMD Ryzen 7 7700X',
    precio: 399.99,
    stock: 12,
    marca: 'AMD',
    categoria: 'Procesadores',
    descripcionCorta: 'Procesador AM5 con 8 núcleos de alto rendimiento',
    descripcionLarga: 'Procesador AMD Ryzen 7 7700X con arquitectura Zen 4, 8 núcleos, 16 hilos, frecuencia base de 4.5 GHz y boost hasta 5.4 GHz. Socket AM5, TDP 105W.',
    foto: 'https://images.unsplash.com/photo-1591290621749-59a9c5f9bc7e?w=400&q=80',
    envioSinCargo: true,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'Kingston Fury Beast 32GB DDR5',
    precio: 129.99,
    stock: 25,
    marca: 'Kingston',
    categoria: 'Memorias',
    descripcionCorta: 'Memoria RAM DDR5 de 32GB con excelente rendimiento',
    descripcionLarga: 'Memoria Kingston Fury Beast DDR5 32GB (2x16GB), velocidad 6000MHz, latencia CAS 30, compatible con Intel y AMD. Disipador de calor integrado.',
    foto: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'NVIDIA RTX 4070 Super',
    precio: 649.99,
    stock: 8,
    marca: 'NVIDIA',
    categoria: 'Periféricos',
    descripcionCorta: 'Tarjeta gráfica de alta gama para gaming y 3D',
    descripcionLarga: 'Tarjeta gráfica NVIDIA GeForce RTX 4070 Super con 12GB GDDR6X, 5888 CUDA cores, arquitectura Ada. Ideal para gaming 4K y aplicaciones profesionales.',
    foto: 'https://images.unsplash.com/photo-1586253408155-d3a1e1ba39fa?w=400&q=80',
    envioSinCargo: true,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'Samsung 990 Pro 2TB NVMe',
    precio: 189.99,
    stock: 30,
    marca: 'Samsung',
    categoria: 'Discos',
    descripcionCorta: 'SSD NVMe PCIe 4.0 ultra rápido de 2TB',
    descripcionLarga: 'Disco SSD Samsung 990 Pro 2TB, PCIe 4.0, velocidad de lectura hasta 7100 MB/s, escritura hasta 6000 MB/s. Incluye disipador de calor.',
    foto: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'LG 27GP850 Monitor Gaming',
    precio: 399.99,
    stock: 10,
    marca: 'LG',
    categoria: 'Monitores',
    descripcionCorta: 'Monitor IPS 1440p 144Hz con G-Sync',
    descripcionLarga: 'Monitor LG 27GP850 con panel IPS de 27 pulgadas, resolución 2560x1440, frecuencia de refresco 144Hz, tiempo de respuesta 1ms, G-Sync compatible.',
    foto: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&q=80',
    envioSinCargo: true,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'Corsair RM1000x 1000W',
    precio: 199.99,
    stock: 18,
    marca: 'Corsair',
    categoria: 'Fuentes',
    descripcionCorta: 'Fuente modular de 1000W con certificación Gold',
    descripcionLarga: 'Fuente Corsair RM1000x, 1000W, 80+ Gold, completamente modular, ventilador de 135mm, protección completa contra cortos y sobretensión.',
    foto: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'ASUS ROG Strix Z790-E',
    precio: 379.99,
    stock: 7,
    marca: 'ASUS',
    categoria: 'Placas Madre',
    descripcionCorta: 'Placa madre Z790 con características premium',
    descripcionLarga: 'Placa ASUS ROG Strix Z790-E, socket LGA1700, soporte para Intel 12ª y 13ª gen, PCIe 5.0, Wi-Fi 6E, conectividad completa para overclockers.',
    foto: 'https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'Logitech MX Master 3S',
    precio: 99.99,
    stock: 20,
    marca: 'Logitech',
    categoria: 'Periféricos',
    descripcionCorta: 'Ratón ergonómico de precisión profesional',
    descripcionLarga: 'Ratón Logitech MX Master 3S con sensor 8K, rueda magnética, soporte para múltiples dispositivos, batería de 70 días.',
    foto: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
  {
    nombre: 'Cooler Master Hyper 212 RGB',
    precio: 49.99,
    stock: 35,
    marca: 'Cooler Master',
    categoria: 'Otros',
    descripcionCorta: 'Disipador de CPU con excelente rendimiento térmico',
    descripcionLarga: 'Disipador Cooler Master Hyper 212 RGB, compatible con LGA1700 y AM5, torre de aluminio, ventilador RGB de 120mm, TDP hasta 180W.',
    foto: 'https://images.unsplash.com/photo-1586253408155-d3a1e1ba39fa?w=400&q=80',
    envioSinCargo: false,
    edadDesde: 18,
    edadHasta: 100,
  },
]

async function seedProducts() {
  try {
    console.log('📦 Iniciando carga de productos...')

    for (const product of products) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error(`Error al agregar ${product.nombre}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log(`✅ ${product.nombre} agregado (ID: ${result.id})`)
    }

    console.log('✨ ¡Todos los productos han sido agregados exitosamente!')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

seedProducts()
