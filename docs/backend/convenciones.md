---
sidebar_position: 4
sidebar_label: Convenciones de Nomenclatura
authors: pablomillansotelo
tags: [backend]
---

# Convenciones de Nomenclatura

Esta guía establece las convenciones de nomenclatura a utilizar en todo el stack tecnológico: base de datos, backend (Python) y APIs. La consistencia en los nombres es fundamental para la mantenibilidad y la colaboración entre equipos.

---

## Resumen Ejecutivo

| Contexto                  | Formato         | Ejemplo                     |
| :------------------------ | :-------------- | :-------------------------- |
| **URLs / Endpoints**      | `kebab-case`    | `/api/v1/tipos-de-producto` |
| **Columnas de BD / JSON** | `PascalCase`    | `ProductoId`, `IsActive`    |
| **Variables Python**      | `snake_case`    | `producto_id`, `is_active`  |
| **Clases Python**         | `PascalCase`    | `ProductoResponseDTO`       |
| **Funciones Python**      | `snake_case`    | `obtener_producto()`        |
| **Archivos Python**       | `snake_case.py` | `tipo_producto.py`          |
| **Tablas SQL**            | `PascalCase`    | `ProductoCatalog`           |

---

## 1. URLs y Endpoints

### Formato: `kebab-case`

Las URLs deben ser legibles, en minúsculas, y con palabras separadas por guiones.

| ✅ Correcto                 | ❌ Incorrecto               |
| :-------------------------- | :-------------------------- |
| `/api/v1/usuarios`          | `/api/v1/Usuarios`          |
| `/api/v1/tipos-de-producto` | `/api/v1/tiposDeProducto`   |
| `/api/v1/ordenes-de-compra` | `/api/v1/ordenes_de_compra` |

### Reglas Adicionales

- **Sustantivos en plural**: `/api/v1/productos` (no `/api/v1/producto`).
- **Sin verbos en la URL**: Usar métodos HTTP en su lugar.
- **Sin extensiones**: No usar `.json`, `.xml`, etc.

---

## 2. Base de Datos y JSON

### Formato: `PascalCase`

Todas las columnas de la base de datos y campos de JSON deben usar `PascalCase`. Esto asegura consistencia directa entre el modelo de datos y las respuestas de la API.

| ✅ Correcto      | ❌ Incorrecto    |
| :--------------- | :--------------- |
| `ProductoId`     | `producto_id`    |
| `NombreCompleto` | `nombreCompleto` |
| `IsActive`       | `is_active`      |
| `InsDatetime`    | `ins_datetime`   |

### Campos Estándar

Todas las tablas deben incluir estos campos de control:

| Campo         | Tipo           | Descripción                              |
| :------------ | :------------- | :--------------------------------------- |
| `[Entidad]Id` | `INT` (PK)     | Identificador único auto-incremental.    |
| `IsActive`    | `BOOLEAN`      | Estado activo/inactivo (soft delete).    |
| `InsDatetime` | `TIMESTAMP`    | Fecha de creación (automática).          |
| `UpDatetime`  | `TIMESTAMP`    | Fecha de última actualización.           |
| `UserEmail`   | `VARCHAR(100)` | Email del usuario que realizó la acción. |

---

## 3. Variables y Funciones Python

### Formato: `snake_case`

Siguiendo PEP 8, todas las variables y funciones en Python deben usar `snake_case`.

| ✅ Correcto         | ❌ Incorrecto      |
| :------------------ | :----------------- |
| `producto_id`       | `productoId`       |
| `nombre_completo`   | `NombreCompleto`   |
| `obtener_usuario()` | `obtenerUsuario()` |
| `crear_producto()`  | `CrearProducto()`  |

### Mapeo con Pydantic

Pydantic permite usar alias para mapear entre `PascalCase` (JSON) y `snake_case` (Python), pero **en este estándar usamos `PascalCase` directamente en los DTOs** para evitar la complejidad adicional.

```python
# Enfoque estándar (PascalCase en DTOs)
class ProductoResponseDTO(BaseModel):
    ProductoId: int
    NombreCompleto: str
    IsActive: bool
```

---

## 4. Clases Python

### Formato: `PascalCase`

Las clases deben usar `PascalCase` sin guiones ni guiones bajos.

| Tipo de Clase          | Patrón                          | Ejemplo                        |
| :--------------------- | :------------------------------ | :----------------------------- |
| **DTOs**               | `[Entidad][Tipo]DTO`            | `ProductoCreateDTO`            |
| **Modelos SQLAlchemy** | `[Entidad]Model`                | `ProductoModel`                |
| **Repositorios**       | `SQLAlchemy[Entidad]Repository` | `SQLAlchemyProductoRepository` |
| **Casos de Uso**       | `[Accion][Entidad]UseCase`      | `CrearProductoUseCase`         |
| **Routers**            | (archivo, no clase)             | `producto.py`                  |

---

## 5. Archivos Python

### Formato: `snake_case.py`

Los archivos deben usar `snake_case` y la extensión `.py`.

| ✅ Correcto              | ❌ Incorrecto           |
| :----------------------- | :---------------------- |
| `tipo_producto.py`       | `TipoProducto.py`       |
| `orden_de_compra.py`     | `ordenDeCompra.py`      |
| `usuario_repositorio.py` | `UsuarioRepositorio.py` |

### Estructura de Archivos por Entidad

Para cada entidad `[Entidad]`, se crean los siguientes archivos:

```
app/
├── api/routers/[entidad].py
├── application/
│   ├── dto/[entidad].py
│   └── use_cases/[entidad].py
├── domain/
│   ├── entities/[entidad].py
│   └── adapters/[entidad].py
└── infrastructure/
    ├── models/[entidad].py
    └── repositories/[entidad].py
```

---

## 6. Tablas SQL

### Formato: `PascalCase` + Sufijo de Tipo

Las tablas deben nombrarse en `PascalCase` y terminar con un sufijo que indique su tipo:

| Tipo          | Sufijo     | Ejemplo                     |
| :------------ | :--------- | :-------------------------- |
| **Catálogo**  | `Catalog`  | `ProductoCatalog`           |
| **Historial** | `History`  | `OrdenHistory`              |
| **Relación**  | `Relation` | `ProductoCategoriaRelation` |

### Esquema

Todas las tablas deben crearse dentro del esquema definido para la aplicación (ej. `AppSchema`).

```sql
CREATE TABLE "AppSchema"."ProductoCatalog" (
    "ProductoId" SERIAL PRIMARY KEY,
    "Nombre" VARCHAR(100) NOT NULL,
    "IsActive" BOOLEAN DEFAULT TRUE,
    "InsDatetime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpDatetime" TIMESTAMP,
    "UserEmail" VARCHAR(100) NOT NULL
);
```

---

## Checklist de Verificación

Antes de hacer merge, verifica:

- [ ] Los endpoints usan `kebab-case` y sustantivos en plural.
- [ ] Los campos de JSON y BD usan `PascalCase`.
- [ ] Las variables y funciones Python usan `snake_case`.
- [ ] Las clases Python usan `PascalCase` con el sufijo correcto.
- [ ] Los archivos Python usan `snake_case.py`.
- [ ] Las tablas SQL usan `PascalCase` con el sufijo de tipo.

---

### Temas Relacionados

- [Diseño de APIs](/docs/backend/api)
- [Data Transfer Objects (DTOs)](/docs/backend/dto)
