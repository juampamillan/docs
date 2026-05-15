---
sidebar_position: 1
sidebar_label: Introducción
---

# Desarrollo de Backend

Esta sección documenta los estándares y guías para el desarrollo de microservicios backend utilizando **Python 3.11+** y **FastAPI**, aplicando principios de **Clean Architecture**.

---

## Stack Tecnológico

- **Lenguaje**: Python 3.11+
- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0
- **Validación**: Pydantic
- **Base de Datos**: PostgreSQL (Cloud SQL)

:::note Agnóstico de lenguaje
Los principios de Clean Architecture de esta sección se ilustran con Python/FastAPI,
pero aplican igualmente a TypeScript/NestJS, Go, Java/Spring Boot o cualquier lenguaje
orientado a objetos.
:::

---

## Clean Architecture

Organizamos el código en capas concéntricas donde las dependencias fluyen hacia adentro:

```
src/
├── domain/           # Entidades puras y contratos (interfaces)
├── application/      # Casos de uso y DTOs (Pydantic)
├── infrastructure/   # Repositorios, modelos SQLAlchemy, clientes externos
└── api/              # Routers FastAPI, middleware, autenticación
```

> **Regla de Dependencia**: Un caso de uso nunca debe conocer detalles de la base de datos. Siempre interactúa con el repositorio a través de su interfaz abstracta.

---

## Contenido de esta Sección

Explora las guías detalladas:

- **[Diseño de APIs](./api)**: Endpoints RESTful, métodos HTTP, códigos de estado y estructura de respuestas.
- **[Data Transfer Objects (DTOs)](./dto)**: Estructura de DTOs con Pydantic, validaciones y patrones.
- **[Convenciones de Nomenclatura](./convenciones)**: Estándares de nombres para código, base de datos y APIs.

---

### Temas Relacionados

- [Arquitectura General](/docs/arquitectura/intro)
- [Gestión de Base de Datos](/docs/database/intro)
