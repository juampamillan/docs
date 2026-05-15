---
sidebar_position: 2
sidebar_label: Principios de Diseño
authors: pablomillansotelo
tags: [arquitectura]
---

# Principios de Diseño Arquitectónico

Esta guía establece los principios fundamentales que rigen el diseño de esta plataforma, asegurando la mantenibilidad, escalabilidad y evolución tecnológica.

---

## 1. Microservicios vs. Monolito

Se adopta una arquitectura de **microservicios** para permitir que diferentes equipos trabajen de forma independiente y escalen componentes específicos según la demanda.

### El Riesgo: El Monolito Distribuido

Un error común es crear servicios independientes en despliegue pero fuertemente acoplados mediante llamadas síncronas. Si el Servicio A siempre necesita al Servicio B para funcionar, hemos creado un monolito distribuido con mayor latencia y más puntos de falla.

**Cómo evitarlo**:

- **Autonomía de Datos**: Cada servicio es dueño de sus propios datos.
- **Comunicación Asíncrona**: Preferir eventos sobre llamadas REST directas.
- **Contratos Claros**: Definir APIs estables y versionadas.

---

## 2. Clean Architecture

Aplicamos Clean Architecture (Arquitectura Limpia) para desacoplar la lógica de negocio de los detalles técnicos (bases de datos, frameworks, APIs).

### Capas del Sistema

```
src/
├── domain/           # REGLAS DE NEGOCIO PURAS. No dependen de nada externo.
├── application/      # CASOS DE USO. Orquestan entidades para cumplir metas del negocio.
├── infrastructure/   # DETALLES. Implementación de BD, clientes de terceros, etc.
└── api/              # ENTRY POINTS. Routers FastAPI, controladores, etc.
```

> **La Regla de Dependencia**: Las dependencias siempre fluyen hacia adentro. Las capas internas (Domain) no conocen nada de las externas (Infrastructure).

---

## 3. Desacoplamiento de Datos

Ningún servicio puede acceder directamente a la base de datos de otro.

- **Integración vía API**: El Servicio A solicita datos al Servicio B mediante su API pública.
- **Integración vía Eventos**: El Servicio A se suscribe a un tópico del Servicio B y mantiene una proyección local de los datos que necesita (Read Models).

---

## 4. Diseño Orientado al Dominio (DDD)

Se utiliza el lenguaje del negocio para nombrar clases, funciones y tablas.

- **Bounded Contexts**: Identificamos fronteras claras entre módulos para evitar que la lógica se mezcle (ej. el concepto de "Usuario" puede ser distinto en el módulo de Autenticación vs. el módulo de Producción).
- **Ubiquitous Language**: Desarrolladores y expertos de negocio usan los mismos términos.

---

## 5. Idempotencia

Todas las operaciones de escritura (especialmente en sistemas distribuidos) deben ser **idempotentes**.

- Si una operación se ejecuta dos veces con los mismos parámetros, el resultado final debe ser el mismo que si se ejecutara una sola vez.
- Esto es crucial para manejar correctamente los reintentos automáticos en caso de fallas de red.

---

### Temas Relacionados

- [Comunicación entre Servicios](./comunicacion)
- [Clean Architecture en Backend](/docs/backend/intro)
