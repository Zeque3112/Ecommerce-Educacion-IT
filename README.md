# E-commerce - Educación IT

## Descripción
Proyecto fullstack de e-commerce desarrollado con React, Vite y mockapi.io. Implementa una SPA (Single Page Application) completa con funcionalidades de carrito, validación de formularios y gestión de productos.

## Etapas del Proyecto

### Etapa 1
- Estructura HTML/CSS/JavaScript básica
- Páginas estáticas del sitio
- Componentes visuales

### Etapa 2 (Actual)
- SPA con React + React Router
- Carrito de compras con Context API
- Validación de formularios avanzada
- Integración con mockapi.io
- Diseño responsive

## Tecnologías

- **Frontend**: React 18, React Router 6, Axios
- **Bundler**: Vite
- **Backend Mock**: mockapi.io
- **Estilos**: CSS3

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartModal.jsx
│   ├── Toast.jsx
│   └── *.css
├── pages/            # Páginas principales
│   ├── Home.jsx
│   ├── Alta.jsx
│   ├── Contacto.jsx
│   ├── Carrito.jsx
│   └── *.css
├── context/          # Context API
│   └── CartContext.jsx
├── hooks/            # Custom hooks
│   ├── useCart.js
│   └── useProducts.js
├── utils/            # Utilidades
│   ├── api.js
│   └── validation.js
├── App.jsx           # Componente principal
├── main.jsx          # Punto de entrada
├── App.css
└── index.css
```

## Funcionalidades

### Home
- Listado de productos desde mockapi.io
- Cards de productos con agregar al carrito
- Notificaciones tipo Toast
- Responsive grid

### Carrito
- Modal y vista del carrito
- Agregar/eliminar/modificar cantidad
- Cálculo de totales
- Envío de pedidos a mockapi.io

### Alta de Productos
- Formulario con validaciones
- Validación en blur y submit
- Mostrar errores específicos
- POST a mockapi.io

### Contacto
- Formulario de contacto
- Validaciones nombre, email, comentarios
- Mismo sistema de validaciones que Alta

## Configuración de mockapi.io

1. Crear cuenta en [mockapi.io](https://mockapi.io)
2. Crear dos recursos:
   - `productos`: para gestionar productos
   - `carrito`: para guardar pedidos
3. Actualizar la URL base en `src/utils/api.js`:

```javascript
const API_BASE_URL = 'https://tu-id.mockapi.io/api'
```

## Validaciones

### Productos
- Nombre: mínimo 3 caracteres
- Precio: mayor a 0
- Stock: mayor o igual a 0
- Marca: mínimo 2 caracteres
- Categoría: requerida
- Descripción corta: mínimo 10 caracteres
- Descripción larga: mínimo 20 caracteres
- Foto: URL válida

### Contacto
- Nombre: mínimo 3 caracteres
- Email: formato válido
- Comentarios: mínimo 10 caracteres

## Autor
Ezequiel Spagnoli
