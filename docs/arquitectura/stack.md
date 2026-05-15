---
sidebar_position: 5
sidebar_label: Stack Tecnológico GCP
authors: pablomillansotelo
tags: [arquitectura]
---

# Stack Tecnológico en Google Cloud Platform

Esta arquitectura es **Cloud Native** y aprovecha los servicios gestionados de GCP para minimizar la carga operativa y maximizar la fiabilidad.

---

## 1. Computación y Orquestación

### Google Cloud Run (Principal)

Plataforma serverless para desplegar contenedores. Es nuestra opción preferida por su simplicidad y escalado automático.

- **Casos de uso**: Microservicios FastAPI, aplicaciones React, tares programadas.

### Google Kubernetes Engine (GKE)

Utilizado solo para servicios con requisitos de orquestación complejos o que requieren estado (stateful sets).

---

## 2. Gestión de APIs

### Google Cloud Apigee

Capa de gestión y fachada única para todas las APIs de la plataforma.

- **Funciones**: Seguridad (JWT), Cuotas (Traffic Management), Analytics y Developer Portal.

---

## 3. Almacenamiento de Datos

### Cloud SQL (PostgreSQL)

Base de datos relacional gestionada para datos transaccionales.

- **Versión**: PostgreSQL 17+.
- **Configuración**: Alta disponibilidad regional y backups automáticos.

### BigQuery

Data Warehouse serverless para análisis de datos a gran escala y reportes complejos.

- **Integración**: Los microservicios pueden exportar datos a BigQuery para analítica avanzada sin afectar el performance transaccional.

### Secret Manager

Almacenamiento seguro de credenciales, API Keys y certificados. Ningún secreto reside en el código o variables de entorno planas.

---

## 4. Mensajería e Integración

### Cloud Pub/Sub

Bus de eventos global para comunicación asíncrona entre microservicios.

- **Garantía**: Entrega de mensajes "al menos una vez".

### Cloud Storage

Almacenamiento de objetos (archivos, imágenes, respaldos) con políticas de ciclo de vida automáticas.

---

## 5. Observabilidad

### Cloud Operations Suite

Monitoreo centralizado del estado de la plataforma.

- **Cloud Logging**: Centralización de logs de todos los contenedores.
- **Cloud Monitoring**: Dashboards de salud y alertas vía Slack/Email.
- **Cloud Trace**: Traza distribuida para seguir el viaje de una petición entre múltiples microservicios.

---

## Resumen del Stack

| Capa              | Tecnología                      |
| :---------------- | :------------------------------ |
| **Computación**   | Python 3.11+, FastAPI, Docker   |
| **UI**            | React, TypeScript, Vite         |
| **Base de Datos** | PostgreSQL 17+, SQLAlchemy 2.0  |
| **Mensajería**    | Google Cloud Pub/Sub            |
| **API Gateway**   | Google Cloud Apigee             |
| **Seguridad**     | Secret Manager, IAM, OAuth2/JWT |

:::note Otras opciones
Las tecnologías aquí descritas son una combinación probada en producción.
Alternativas válidas: Node.js/NestJS o Go/Gin para backend; AWS o Azure para cloud;
MySQL o MongoDB según el caso de uso.
:::

---

### Temas Relacionados

- [Despliegue en GCP](/docs/devops/gcp)
- [Clean Architecture en Backend](/docs/backend/intro)
