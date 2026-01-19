---
sidebar_position: 2
sidebar_label: Gestión de Permisos
---

# Gestión de Permisos en PostgreSQL

Esta guía describe el modelo de permisos para bases de datos PostgreSQL, siguiendo el principio de **menor privilegio** mediante roles jerárquicos.

---

## Principios de Seguridad

1.  **Menor privilegio**: Solo otorgar los permisos estrictamente necesarios.
2.  **Roles sobre usuarios**: Agrupar permisos en roles, no asignarlos directamente a usuarios.
3.  **Sin DELETE por defecto**: El permiso de eliminación se otorga solo cuando es necesario.
4.  **Auditoría**: Documentar quién tiene acceso a cada instancia.

---

## Estructura de Roles

Utilizamos un modelo de roles jerárquicos donde los usuarios individuales heredan permisos de roles de equipo.

```
postgres (superadmin)
    │
    ├── equipo_dev (rol de equipo)
    │       ├── developer1@company.com
    │       ├── developer2@company.com
    │       └── ...
    │
    └── cloudrun_user (identidad de servicio)
```

---

## Roles Estándar

| Rol             | Descripción           | Permisos                         |
| :-------------- | :-------------------- | :------------------------------- |
| `postgres`      | Superadministrador    | Todos (solo para administración) |
| `equipo_dev`    | Rol de desarrollo     | SELECT, INSERT, UPDATE           |
| `cloudrun_user` | Identidad de servicio | SELECT, INSERT, UPDATE           |

---

## Script de Configuración de Permisos

### 1. Crear Esquema

```sql
CREATE SCHEMA IF NOT EXISTS app_schema;
```

### 2. Crear Rol de Equipo

```sql
CREATE ROLE equipo_dev;
```

### 3. Permisos en el Esquema

```sql
-- Permiso para usar el esquema
GRANT USAGE ON SCHEMA app_schema TO equipo_dev;
```

### 4. Permisos por Defecto (Objetos Futuros)

Estos permisos se aplican automáticamente a tablas, secuencias y funciones **creadas en el futuro**.

```sql
-- Permisos en tablas nuevas
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
  GRANT SELECT, INSERT, UPDATE ON TABLES TO equipo_dev;

-- Permisos en secuencias nuevas (para auto-increment)
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
  GRANT USAGE, SELECT ON SEQUENCES TO equipo_dev;

-- Permisos en funciones nuevas
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
  GRANT EXECUTE ON FUNCTIONS TO equipo_dev;
```

### 5. Permisos en Objetos Existentes

```sql
-- Permisos en todas las tablas existentes
GRANT SELECT, INSERT, UPDATE ON ALL TABLES
  IN SCHEMA app_schema TO equipo_dev;

-- Permisos en todas las secuencias existentes
GRANT USAGE, SELECT ON ALL SEQUENCES
  IN SCHEMA app_schema TO equipo_dev;

-- Permisos en todas las funciones existentes
GRANT EXECUTE ON ALL FUNCTIONS
  IN SCHEMA app_schema TO equipo_dev;
```

### 6. Crear Usuario Individual

```sql
-- Crear usuario con login
CREATE ROLE "developer@company.com" LOGIN;

-- Asignar rol de equipo
GRANT equipo_dev TO "developer@company.com";
```

### 7. Permisos para Servicios Cloud

```sql
-- Permiso para la identidad de servicio de Cloud Run
GRANT USAGE ON SCHEMA app_schema TO cloudrun_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES
  IN SCHEMA app_schema TO cloudrun_user;
```

---

## Permisos de DELETE (Caso Especial)

:::warning Permiso Restringido
El permiso `DELETE` **no se otorga por defecto**. Si es necesario, debe asignarse de forma **manual y temporal**.
:::

```sql
-- Otorgar DELETE (solo si es necesario)
GRANT DELETE ON ALL TABLES IN SCHEMA app_schema TO equipo_dev;

-- Permisos por defecto para tablas futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
  GRANT DELETE ON TABLES TO equipo_dev;
```

---

## Verificación de Permisos

### Ver Roles Creados

```sql
SELECT rolname, rolsuper, rolcreaterole, rolcreatedb, rolcanlogin
FROM pg_roles
WHERE rolname LIKE 'equipo%' OR rolname LIKE '%@%';
```

### Ver Permisos en Tablas

```sql
SELECT
    grantee,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges
WHERE grantee = 'equipo_dev';
```

### Ver Permisos en Esquema

```sql
SELECT
    nspname AS schema_name,
    array_agg(DISTINCT privilege_type) AS privileges
FROM information_schema.role_table_grants
WHERE grantee = 'equipo_dev'
GROUP BY nspname;
```

---

## Resumen de Permisos por Rol

### Equipo de Desarrollo

| Objeto     | SELECT | INSERT | UPDATE | DELETE | EXECUTE |
| :--------- | :----: | :----: | :----: | :----: | :-----: |
| Tablas     |   ✅   |   ✅   |   ✅   |   ❌   |    -    |
| Secuencias |   ✅   |   -    |   -    |   -    |    -    |
| Funciones  |   -    |   -    |   -    |   -    |   ✅    |

### Servicio Cloud Run

| Objeto     | SELECT | INSERT | UPDATE | DELETE | EXECUTE |
| :--------- | :----: | :----: | :----: | :----: | :-----: |
| Tablas     |   ✅   |   ✅   |   ✅   |   ❌   |    -    |
| Secuencias |   ✅   |   -    |   -    |   -    |    -    |
| Funciones  |   -    |   -    |   -    |   -    |   ✅    |

---

## Buenas Prácticas

### ✅ Hacer

- Usar roles para agrupar permisos en lugar de asignar directamente a usuarios.
- Aplicar `ALTER DEFAULT PRIVILEGES` para que afecte objetos futuros.
- Documentar quién tiene acceso a cada instancia y por qué.
- Revisar permisos periódicamente y revocar los no utilizados.

### ❌ Evitar

- Otorgar permisos de superusuario a cuentas de desarrollo.
- Compartir credenciales de `postgres` entre desarrolladores.
- Otorgar `DELETE` sin una justificación documentada.
- Usar la cuenta de servicio de Cloud Run para acceso manual.

---

### Temas Relacionados

- [Convención de Nombres](./convenciones)
- [Especificaciones por Ambiente](./ambientes)
