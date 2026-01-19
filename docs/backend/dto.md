---
sidebar_position: 3
sidebar_label: Data Transfer Objects
authors: pablomillansotelo
tags: [backend]
---

# Data Transfer Objects (DTOs)

Esta guía establece los estándares para diseñar y utilizar **DTOs** (Data Transfer Objects) en aplicaciones backend con Python y Pydantic. Los DTOs son la capa de abstracción entre la base de datos y el cliente, garantizando seguridad, validación y consistencia.

---

## ¿Qué es un DTO?

Un **DTO** es un objeto que transporta datos entre procesos. En el contexto de una API:

- **Entrada**: Valida y estructura los datos que el cliente envía.
- **Salida**: Define qué datos se exponen al cliente (nunca exponer el modelo de BD directamente).

---

## Tipos de DTOs Obligatorios

Para cada entidad del sistema, se deben crear **3 DTOs**:

| DTO             | Propósito                                   | Sufijo                 |
| :-------------- | :------------------------------------------ | :--------------------- |
| **CreateDTO**   | Datos para crear un nuevo recurso.          | `[Entidad]CreateDTO`   |
| **UpdateDTO**   | Datos para actualizar un recurso existente. | `[Entidad]UpdateDTO`   |
| **ResponseDTO** | Datos que se retornan al cliente.           | `[Entidad]ResponseDTO` |

---

## Ubicación de Archivos

Todos los DTOs deben ubicarse en:

```
app/application/dto/[nombre_entidad].py
```

**Ejemplo:**

- `app/application/dto/usuario.py`
- `app/application/dto/producto.py`

---

## Estructura y Plantillas

### 1. CreateDTO

**Propósito:** Recibir datos para crear un nuevo recurso.

**Reglas:**

- ✅ Incluir solo campos que el cliente debe proporcionar.
- ❌ Excluir: ID, campos de auditoría (`InsDatetime`, `UpDatetime`), `IsActive` (se asigna por defecto).
- ✅ `UserEmail` es obligatorio para auditoría.

```python
from pydantic import BaseModel
from typing import Optional

class UsuarioCreateDTO(BaseModel):
    Email: str
    NombreCompleto: str
    RolId: int
    Telefono: Optional[str] = None
    UserEmail: str  # Quién crea el registro
```

### 2. UpdateDTO

**Propósito:** Recibir datos para actualizar un recurso existente.

**Reglas:**

- ✅ **Todos los campos deben ser opcionales** (`Optional`).
- ✅ Incluir `IsActive` para permitir activación/desactivación.
- ❌ Excluir: ID y campos de auditoría automáticos.

```python
from pydantic import BaseModel
from typing import Optional

class UsuarioUpdateDTO(BaseModel):
    Email: Optional[str] = None
    NombreCompleto: Optional[str] = None
    RolId: Optional[int] = None
    Telefono: Optional[str] = None
    IsActive: Optional[bool] = None
    UserEmail: Optional[str] = None
```

### 3. ResponseDTO

**Propósito:** Definir la estructura de datos que se expone al cliente.

**Reglas:**

- ✅ Incluir **todos** los campos que el cliente necesita ver.
- ✅ Incluir ID, `IsActive`, y campos de auditoría.
- ❌ Nunca exponer datos sensibles (contraseñas, tokens internos).

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UsuarioResponseDTO(BaseModel):
    UsuarioId: int
    Email: str
    NombreCompleto: str
    RolId: int
    Telefono: Optional[str] = None
    IsActive: bool
    InsDatetime: datetime
    UpDatetime: Optional[datetime] = None
    UserEmail: str
```

---

## Convenciones de Nomenclatura

| Elemento            | Formato                     | Ejemplo                      |
| :------------------ | :-------------------------- | :--------------------------- |
| **Nombre de clase** | `PascalCase` + sufijo `DTO` | `ProductoCreateDTO`          |
| **Campos**          | `PascalCase`                | `NombreCompleto`, `IsActive` |
| **Archivos**        | `snake_case.py`             | `tipo_producto.py`           |

:::important Consistencia con la Base de Datos
Los nombres de campos en los DTOs deben coincidir **exactamente** con los nombres de columnas en la base de datos (ambos en `PascalCase`).
:::

---

## Validaciones con Pydantic

Pydantic permite agregar validaciones declarativas a los campos:

### Validaciones de Campo (Field)

```python
from pydantic import BaseModel, Field

class ProductoCreateDTO(BaseModel):
    Nombre: str = Field(..., min_length=3, max_length=100)
    Precio: float = Field(..., gt=0, description="Debe ser mayor a cero")
    Stock: int = Field(default=0, ge=0)
```

### Validadores Personalizados

```python
from pydantic import BaseModel, field_validator

class UsuarioCreateDTO(BaseModel):
    Email: str

    @field_validator('Email')
    @classmethod
    def validar_email(cls, v):
        if '@' not in v:
            raise ValueError('Email inválido')
        return v.lower()
```

---

## DTOs Opcionales (Avanzados)

Además de los 3 obligatorios, puedes crear DTOs adicionales:

### PaginatedResponseDTO

Para respuestas de listado con metadatos de paginación:

```python
from pydantic import BaseModel
from typing import List, Generic, TypeVar

T = TypeVar('T')

class PaginatedResponseDTO(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    has_next: bool
```

### FilterDTO

Para encapsular filtros de búsqueda complejos:

```python
class ProductoFilterDTO(BaseModel):
    nombre_contiene: Optional[str] = None
    categoria_id: Optional[int] = None
    precio_min: Optional[float] = None
    precio_max: Optional[float] = None
    solo_activos: bool = True
```

---

## Checklist de Verificación

Antes de hacer merge, verifica:

- [ ] Existen los 3 DTOs obligatorios (`Create`, `Update`, `Response`).
- [ ] Todos los nombres de clase terminan en `DTO`.
- [ ] Los campos usan `PascalCase`.
- [ ] `CreateDTO` no incluye ID ni campos de auditoría.
- [ ] `UpdateDTO` tiene todos los campos como `Optional`.
- [ ] `ResponseDTO` incluye ID, `IsActive`, y fechas de auditoría.
- [ ] `UserEmail` está presente donde se requiere auditoría.

---

### Temas Relacionados

- [Diseño de APIs](/docs/backend/api)
- [Convenciones de Nomenclatura](/docs/backend/convenciones)
