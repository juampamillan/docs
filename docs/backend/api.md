---
sidebar_position: 2
sidebar_label: API
authors: pablomillansotelo
tags: [backend]
---

# Diseño de APIs

Esta guía establece los estándares para diseñar y construir APIs RESTful robustas, consistentes y fáciles de consumir desde cualquier cliente (frontend, móvil, servicios externos).

---

## Principios de Diseño

1.  **Consistencia**: Todas las APIs deben seguir las mismas convenciones de nomenclatura, estructura de respuesta y códigos de error.
2.  **Descubribilidad**: Los endpoints deben ser intuitivos. Un desarrollador debería poder adivinar la URL de un recurso.
3.  **Versionado**: Siempre incluir la versión en la ruta base (`/api/v1/`).

---

## Base URL y Versionado

Todos los endpoints deben usar el prefijo:

```
/api/v1/[recurso]
```

**Ejemplos:**

- `/api/v1/usuarios`
- `/api/v1/productos`
- `/api/v1/ordenes-de-compra`

---

## Nomenclatura de Endpoints

- **Formato**: `kebab-case` (minúsculas separadas por guiones).
- **Sustantivos en plural**: Los recursos siempre deben ser nombrados en plural.

| ✅ Correcto                 | ❌ Incorrecto           |
| :-------------------------- | :---------------------- |
| `/api/v1/usuarios`          | `/api/v1/usuario`       |
| `/api/v1/ordenes-de-compra` | `/api/v1/ordenDeCompra` |
| `/api/v1/tipos-de-producto` | `/api/v1/product_types` |

---

## Métodos HTTP Estándar

| Método     | Propósito                                 | Idempotente | Body          |
| :--------- | :---------------------------------------- | :---------- | :------------ |
| **GET**    | Recuperar uno o más recursos              | Sí          | No            |
| **POST**   | Crear un nuevo recurso                    | No          | Sí            |
| **PUT**    | Reemplazar un recurso completo            | Sí          | Sí            |
| **PATCH**  | Actualización parcial o acción específica | No          | Sí (opcional) |
| **DELETE** | Eliminar un recurso                       | Sí          | No            |

---

## Estructura de Endpoints CRUD

Para un recurso `[entidad]`, los endpoints estándar son:

### 1. Listar Recursos

```http
GET /api/v1/[entidad]/
```

**Query Parameters Estándar:**

| Parámetro       | Tipo   | Default | Descripción                                 |
| :-------------- | :----- | :------ | :------------------------------------------ |
| `skip`          | int    | 0       | Registros a omitir (paginación).            |
| `limit`         | int    | 100     | Máximo de registros a retornar (max: 1000). |
| `is_active`     | bool   | (todos) | Filtrar por estado activo/inactivo.         |
| `name_contains` | string | -       | Búsqueda parcial por nombre.                |
| `[entidad]_ids` | string | -       | IDs separados por comas (ej: `1,3,5`).      |

**Respuesta:** Lista de DTOs de respuesta.

### 2. Obtener por ID

```http
GET /api/v1/[entidad]/{id}
```

**Respuesta:** DTO de respuesta o `404 Not Found`.

### 3. Crear Recurso

```http
POST /api/v1/[entidad]/
```

**Body:** DTO de creación.  
**Respuesta:** DTO de respuesta con el recurso creado.

### 4. Actualizar Recurso

```http
PUT /api/v1/[entidad]/{id}
```

**Body:** DTO de actualización.  
**Respuesta:** DTO de respuesta con el recurso actualizado.

### 5. Eliminar Recurso

```http
DELETE /api/v1/[entidad]/{id}
```

**Respuesta:** `204 No Content` o `{"ok": true}`.

### 6. Acciones Específicas (PATCH)

Para acciones que no son CRUD puro, utilizar `PATCH` con un verbo en la ruta:

```http
PATCH /api/v1/[entidad]/{id}/desactivar
PATCH /api/v1/[entidad]/{id}/reactivar
PATCH /api/v1/[entidad]/{id}/aprobar
```

---

## Códigos de Estado HTTP

### Éxito (2xx)

| Código  | Nombre     | Cuándo Usarlo                             |
| :------ | :--------- | :---------------------------------------- |
| **200** | OK         | Operación exitosa (GET, PUT, PATCH).      |
| **201** | Created    | Recurso creado exitosamente (POST).       |
| **204** | No Content | Operación exitosa sin contenido (DELETE). |

### Error del Cliente (4xx)

| Código  | Nombre               | Cuándo Usarlo                             |
| :------ | :------------------- | :---------------------------------------- |
| **400** | Bad Request          | Datos inválidos o formato incorrecto.     |
| **401** | Unauthorized         | Autenticación requerida o token inválido. |
| **403** | Forbidden            | Usuario autenticado pero sin permisos.    |
| **404** | Not Found            | Recurso no encontrado.                    |
| **409** | Conflict             | Conflicto de estado (ej: duplicado).      |
| **422** | Unprocessable Entity | Error de validación de Pydantic.          |

### Error del Servidor (5xx)

| Código  | Nombre                | Cuándo Usarlo                         |
| :------ | :-------------------- | :------------------------------------ |
| **500** | Internal Server Error | Error inesperado en el servidor.      |
| **503** | Service Unavailable   | Servicio temporalmente no disponible. |

---

## Estructura de Respuestas de Error

Todas las respuestas de error deben seguir una estructura consistente:

```json
{
  "error": "ValidationError",
  "message": "Error de validación en los datos enviados",
  "details": [{ "field": "Email", "message": "El email es requerido", "value": null }],
  "status_code": 400
}
```

### DTO de Error (Python)

```python
from pydantic import BaseModel
from typing import List, Optional

class ErrorDetailDTO(BaseModel):
    field: str
    message: str
    value: Optional[str] = None

class ErrorResponseDTO(BaseModel):
    error: str
    message: str
    details: Optional[List[ErrorDetailDTO]] = None
    status_code: int
```

---

## Buenas Prácticas

### ✅ Hacer

- Usar verbos HTTP correctos para cada operación.
- Incluir siempre `limit` máximo para evitar consultas masivas.
- Retornar el código de estado HTTP apropiado.
- Documentar cada endpoint con OpenAPI (FastAPI lo hace automáticamente).

### ❌ Evitar

- URLs con verbos: `/api/v1/getUsuarios` → usar `GET /api/v1/usuarios`.
- Mezclar convenciones de nomenclatura en una misma API.
- Retornar `200 OK` con un cuerpo de error en JSON.
- Exponer IDs internos de la base de datos sin validación.

---

### Temas Relacionados

- [Data Transfer Objects (DTOs)](/docs/backend/dto)
- [Convenciones de Nomenclatura](/docs/backend/convenciones)
