---
sidebar_position: 1
sidebar_label: Introducción
---

# Base de Datos

Esta sección documenta los estándares para la gestión de bases de datos **PostgreSQL** en **Google Cloud SQL**.

---

## Stack Tecnológico

- **Motor**: PostgreSQL 17+
- **Plataforma**: Google Cloud SQL (Enterprise Edition)
- **Conexión**: Cloud SQL Connector / IP Privada
- **Credenciales**: Secret Manager

---

## Principios

1.  **Menor privilegio**: Solo otorgar permisos estrictamente necesarios.
2.  **Consistencia**: Seguir convenciones de nomenclatura en toda la organización.
3.  **Seguridad**: Credenciales en Secret Manager, nunca en código.
4.  **Ambientes aislados**: Configuraciones diferenciadas por ambiente.

---

## Contenido de esta Sección

Explora las guías detalladas:

- **[Gestión de Permisos](./permisos)**: Roles, usuarios y modelo de seguridad.
- **[Convención de Nombres](./convenciones)**: Nomenclatura para instancias, tablas y columnas.
- **[Especificaciones por Ambiente](./ambientes)**: Configuración de Dev, QA y Prod.

---

### Temas Relacionados

- [Estándares de Backend](/docs/backend/intro)
- [Despliegue en GCP](/docs/devops/gcp)
