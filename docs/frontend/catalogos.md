---
sidebar_position: 3
sidebar_label: Guía de Catálogos (CRUD)
---

# Guía para la Creación de Catálogos (CRUD)

Esta guía describe el patrón estándar para crear pantallas de gestión de datos (Catálogos), asegurando una experiencia de usuario consistente en toda la plataforma.

---

## 1. Patrón de Diseño

Cada catálogo debe implementar las siguientes funcionalidades:

- **Búsqueda** con debounce.
- **Filtros** de estado (Activo/Inactivo).
- **Paginación** del lado del servidor.
- **Formularios** en Drawer lateral o Modal.
- **Confirmación** para acciones destructivas.

---

## 2. Estructura de Archivos Recomendada

```
src/
├── models/          # Interfaces TypeScript (DTOs)
├── hooks/           # useEntity.ts (encapsula lógica de API)
└── pages/           # EntityPage.tsx (composición de UI)
```

---

## 3. Implementación del Hook de API

El hook debe gestionar el estado de carga, errores y las operaciones CRUD utilizando **Axios**.

```typescript
// hooks/useProducts.ts
export function useProducts(filters) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get("/api/products", { params: filters });
    setData(response.data);
    setLoading(false);
  };

  const createProduct = (dto) => axios.post("/api/products", dto);
  // ... update, delete

  return { data, loading, fetchProducts, createProduct };
}
```

---

## 4. Estándares de UI (MUI)

### Tabla de Datos

- Usar `TableContainer` y `TablePagination`.
- Estados vacíos: Mostrar un mensaje claro cuando no hay resultados.
- Chips para booleanos: Usar `Chip` verde para "Activo" y gris para "Inactivo".

### Formularios

- **Drafting**: Los cambios no deben guardarse hasta que el usuario pulse "Guardar".
- **Validación**: Utilizar validación en tiempo real (ej. Zod o validación nativa de TypeScript).

---

## 5. Sincronización con la URL

Es una buena práctica sincronizar los filtros y la página actual con los **Query Params** de la URL. Esto permite que los usuarios compartan enlaces a vistas específicas (ej. una búsqueda filtrada).

---

### Temas Relacionados

- [Data Transfer Objects (DTOs)](/docs/backend/dto)
- [Sistema de Permisos](./permisos)
