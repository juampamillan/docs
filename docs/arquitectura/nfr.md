---
sidebar_position: 4
sidebar_label: Requisitos No Funcionales (NFRs)
authors: pablomillansotelo
tags: [arquitectura]
---

# Requisitos No Funcionales (NFRs)

Los requisitos no funcionales definen los atributos de calidad del sistema. Estos estándares garantizan que la plataforma no solo funcione, sino que sea profesional y confiable.

---

## 1. Rendimiento y Latencia

El rendimiento es crítico para la experiencia del usuario y la eficiencia operativa.

### Tiempos de Respuesta (p95)

- **Operaciones de Interfaz**: < 500ms en el 95% de las peticiones.
- **Consultas de Reportes**: < 5 segundos para análisis complejos.
- **Procesamiento de Eventos**: < 3 segundos desde la generación hasta la persistencia.

### Estrategias de Optimización

- **Caching**: Uso de Redis para datos de alta frecuencia.
- **CDN**: Entrega de activos estáticos del frontend mediante Google Cloud CDN.
- **BFF (Backend For Frontend)**: Adaptación de respuestas para minimizar el número de llamadas desde el cliente.

---

## 2. Disponibilidad

La plataforma está diseñada para una disponibilidad del **99.95%**.

### Estrategias de Alta Disponibilidad (HA)

- **Multi-Zona**: Todos los servicios se despliegan en al menos dos zonas de disponibilidad dentro de la misma región.
- **Regiones**: Cloud SQL y Cloud Run configurados con redundancia regional.
- **Health Checks**: Monitoreo automático que reinicia instancias fallidas y las saca del balanceador de carga.

---

## 3. Escalabilidad

El sistema debe escalar de forma transparente ante picos de demanda.

- **Escalado Horizontal**: Los microservicios en Cloud Run aumentan el número de instancias automáticamente según el CPU/Tráfico.
- **Escalado a Cero**: Los servicios se apagan si no hay tráfico para optimizar costos (en ambientes de desarrollo).
- **Pub/Sub**: Maneja ráfagas de millones de mensajes sin intervención manual.

---

## 4. Resiliencia

Capacidad del sistema para recuperarse de fallas.

### Patrones de Recuperación

- **Dead Letter Queues (DLQ)**: Los mensajes que fallan en Pub/Sub después de N intentos se mueven a una cola especial para auditoría y re-procesamiento manual.
- **Backups Inmutables**: Copias de seguridad diarias de bases de datos con retención de 30 días en producción.
- **Point-in-Time Recovery (PITR)**: Capacidad de restaurar la base de datos a cualquier segundo de los últimos 7 días.

---

## 5. Seguridad y Privacidad

- **Cifrado en Reposo**: Todos los datos en Cloud SQL y Cloud Storage están cifrados por defecto.
- **Cifrado en Tránsito**: Obligatoriedad de TLS 1.2+ para todas las comunicaciones (HTTPS/gRPC).
- **Zero Trust**: Cada servicio verifica la identidad y permisos de quien lo invoca mediante tokens JWT.

---

### Temas Relacionados

- [Principios de Diseño](./principios)
- [Especificaciones por Ambiente (BD)](/docs/database/ambientes)
