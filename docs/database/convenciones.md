---
sidebar_position: 3
sidebar_label: Convención de Nombres
authors: pablomillansotelo
tags: [database]
---

# Convención de Nombres para Base de Datos

Esta guía establece las convenciones de nomenclatura para instancias de Cloud SQL, bases de datos, esquemas, tablas y columnas.

---

## Principios

1.  **Consistencia**: Todas las instancias y objetos siguen el mismo patrón.
2.  **Descubribilidad**: El nombre debe indicar el proyecto, módulo y ambiente.
3.  **Inmutabilidad**: Los nombres no cambian después de la creación.

---

## Instancias de Cloud SQL

### Formato

```
<proyecto>-<modulo>db-<ambiente>
```

### Componentes

| Componente   | Descripción                                | Ejemplo             |
| :----------- | :----------------------------------------- | :------------------ |
| `<proyecto>` | Prefijo del proyecto                       | `myapp`             |
| `<modulo>`   | Nombre del microservicio o módulo          | `users`, `orders`   |
| `db`         | Sufijo fijo para identificar base de datos | `db`                |
| `<ambiente>` | Ambiente de despliegue                     | `dev`, `qa`, `prod` |

### Ejemplos

| ✅ Correcto            | ❌ Incorrecto        |
| :--------------------- | :------------------- |
| `myapp-usersdb-dev`    | `users-database-dev` |
| `myapp-ordersdb-prod`  | `myapp-orders`       |
| `myapp-inventorydb-qa` | `inventory_db_qa`    |

---

## Bases de Datos

### Formato

```
<proyecto>_<modulo>_<ambiente>
```

**Nota:** Se usa `snake_case` con guiones bajos porque PostgreSQL convierte nombres a minúsculas.

### Ejemplos

- `myapp_users_dev`
- `myapp_orders_prod`
- `myapp_inventory_qa`

---

## Esquemas

### Formato

```
<modulo>_schema  o  <Prefijo>Sch
```

### Ejemplos

- `users_schema`
- `AppSch`
- `OrdersSch`

:::tip Esquema por Defecto
Si el proyecto usa un único esquema, utilizar un nombre genérico como `app_schema` o `AppSch`.
:::

---

## Tablas

### Formato por Tipo

| Tipo de Tabla           | Formato                        | Ejemplo                   |
| :---------------------- | :----------------------------- | :------------------------ |
| **Catálogo** (maestros) | `[Entidad]Catalog`             | `ProductCatalog`          |
| **Historial** (logs)    | `[Entidad]History`             | `OrderHistory`            |
| **Relación** (N:M)      | `[Entidad1][Entidad2]Relation` | `ProductCategoryRelation` |
| **Transaccional**       | `[Entidad]`                    | `Order`, `Invoice`        |

### Reglas

- **PascalCase**: Usar mayúscula inicial en cada palabra.
- **Singular**: Nombres en singular (`Product`, no `Products`).
- **Sin prefijos**: No usar `tbl_`, `tb_` o similares.

### Ejemplos

| ✅ Correcto               | ❌ Incorrecto      |
| :------------------------ | :----------------- |
| `UserCatalog`             | `tbl_users`        |
| `OrderHistory`            | `orders_history`   |
| `ProductCategoryRelation` | `product_category` |

---

## Columnas

### Formato

```
PascalCase
```

### Campos Estándar

Todas las tablas deben incluir estos campos de control:

| Campo         | Tipo             | Descripción                              |
| :------------ | :--------------- | :--------------------------------------- |
| `[Entidad]Id` | `SERIAL` / `INT` | Llave primaria auto-incremental.         |
| `IsActive`    | `BOOLEAN`        | Estado activo/inactivo (soft delete).    |
| `InsDatetime` | `TIMESTAMP`      | Fecha de creación del registro.          |
| `UpDatetime`  | `TIMESTAMP`      | Fecha de última actualización.           |
| `UserEmail`   | `VARCHAR(100)`   | Email del usuario que realizó la acción. |

### Ejemplos de Columnas

| ✅ Correcto   | ❌ Incorrecto |
| :------------ | :------------ |
| `ProductId`   | `product_id`  |
| `IsActive`    | `is_active`   |
| `InsDatetime` | `created_at`  |
| `UserEmail`   | `user_email`  |

---

## Índices

### Formato

```
idx_<tabla>_<columna(s)>
```

### Ejemplos

- `idx_product_name`
- `idx_order_customer_date`
- `idx_user_email`

---

## Constraints

### Formato por Tipo

| Tipo            | Formato                  | Ejemplo                    |
| :-------------- | :----------------------- | :------------------------- |
| **Primary Key** | `pk_<tabla>`             | `pk_product`               |
| **Foreign Key** | `fk_<tabla>_<tabla_ref>` | `fk_order_customer`        |
| **Unique**      | `uq_<tabla>_<columna>`   | `uq_user_email`            |
| **Check**       | `ck_<tabla>_<condicion>` | `ck_order_amount_positive` |

---

## Secuencias

### Formato

```
seq_<tabla>_<columna>
```

### Ejemplos

- `seq_product_id`
- `seq_order_number`

---

## Script de Ejemplo

```sql
-- Crear esquema
CREATE SCHEMA IF NOT EXISTS "AppSch";

-- Crear tabla de catálogo
CREATE TABLE "AppSch"."ProductCatalog" (
    "ProductId" SERIAL PRIMARY KEY,
    "ProductCode" VARCHAR(50) UNIQUE,
    "ProductName" VARCHAR(100) NOT NULL,
    "ProductDescription" TEXT,
    "CategoryId" INT REFERENCES "AppSch"."CategoryCatalog"("CategoryId"),
    "IsActive" BOOLEAN DEFAULT TRUE,
    "InsDatetime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpDatetime" TIMESTAMP,
    "UserEmail" VARCHAR(100) NOT NULL,

    CONSTRAINT "pk_product" PRIMARY KEY ("ProductId"),
    CONSTRAINT "uq_product_code" UNIQUE ("ProductCode")
);

-- Crear índice
CREATE INDEX "idx_product_name" ON "AppSch"."ProductCatalog"("ProductName");
```

---

## Checklist de Verificación

Antes de crear objetos en la base de datos:

- [ ] El nombre de la instancia sigue el formato `<proyecto>-<modulo>db-<ambiente>`.
- [ ] Las tablas usan PascalCase y sufijos de tipo (`Catalog`, `History`).
- [ ] Las columnas usan PascalCase.
- [ ] Los campos estándar (`IsActive`, `InsDatetime`, etc.) están presentes.
- [ ] Los índices y constraints siguen la convención.

---

### Temas Relacionados

- [Gestión de Permisos](./permisos)
- [Especificaciones por Ambiente](./ambientes)
