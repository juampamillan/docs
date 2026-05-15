---
sidebar_position: 6
sidebar_label: Event-Driven Architecture
---

# Event-Driven Architecture

La Arquitectura Orientada a Eventos (EDA) es un paradigma de diseño donde el flujo del sistema está determinado por la producción, detección, consumo y reacción a eventos.

## Cuándo usar EDA vs Request-Response

| Característica | EDA (Asíncrono) | Request-Response (Síncrono) |
| :--- | :--- | :--- |
| **Acoplamiento** | Bajo (productor y consumidor no se conocen) | Alto (el cliente debe conocer al servidor) |
| **Latencia percibida** | Baja (respuesta inmediata al producir el evento) | Depende del procesamiento (se debe esperar la respuesta) |
| **Complejidad de fallos** | Alta (requiere retries, dead-letter queues) | Baja (el cliente recibe el error inmediatamente) |
| **Trazabilidad** | Compleja (flujos asíncronos distribuidos) | Simple (trazabilidad directa HTTP) |
| **Caso de uso ideal** | Notificaciones, procesamiento en background, logs, analítica, integración de múltiples sistemas. | Consultas en tiempo real, operaciones donde el cliente necesita conocer el resultado de inmediato. |

:::tip Decisión clave
Se recomienda usar EDA cuando la operación puede procesarse "eventualmente" y cuando múltiples sistemas necesitan reaccionar al mismo hecho sin crear acoplamiento fuerte.
:::

## Anatomía de un Evento

Un evento debe ser autocontenido y representar un hecho que ya ocurrió.

### Ejemplo de schema de evento en JSON (CloudEvents format)

```json
{
  "specversion": "1.0",
  "type": "com.empresa.ordenes.creada",
  "source": "/servicio-ordenes",
  "id": "A234-1234-1234",
  "time": "2026-05-15T12:00:00Z",
  "datacontenttype": "application/json",
  "data": {
    "orden_id": "ORD-9981",
    "usuario_id": "USR-112",
    "monto_total": 150.50,
    "estado": "PENDIENTE"
  }
}
```

## Patrones de Eventos

1. **Event Notification:** El evento notifica que algo pasó, pero el consumidor debe consultar la API del productor para obtener los detalles. (Mínimo payload, alto acoplamiento en lectura).
2. **Event-Carried State Transfer:** El evento contiene toda la información necesaria para que el consumidor actualice su propio estado sin consultar al productor. (Payload grande, bajo acoplamiento).
3. **Event Sourcing:** El estado del sistema se calcula como la suma de todos los eventos inmutables registrados a lo largo del tiempo.
4. **CQRS (Command Query Responsibility Segregation):** Separación de los modelos de lectura y escritura, donde los eventos sincronizan la base de datos de lectura.

## Garantías de Entrega

- **At-least-once (Al menos una vez):** Garantiza que el mensaje llegará, pero puede llegar duplicado. Requiere que los consumidores sean **idempotentes**. (Es el estándar de la industria).
- **Exactly-once (Exactamente una vez):** Garantiza que el mensaje llegue solo una vez. Es muy costoso en rendimiento y generalmente se simula mediante "At-least-once" + procesamiento idempotente.

:::warning Idempotencia obligatoria
Dado que la mayoría de los brokers ofrecen *at-least-once*, todo consumidor de eventos debe estar diseñado de forma idempotente para manejar la recepción de eventos duplicados sin causar inconsistencias.
:::

## Tabla Comparativa de Brokers

| Broker | Características | Casos de Uso |
| :--- | :--- | :--- |
| **Kafka** | Event streaming, retención a largo plazo, alto throughput. | Event Sourcing, analítica masiva, streams de datos persistentes. |
| **Google Cloud Pub/Sub** | Serverless, "at-least-once" garantizado, push/pull. | Integraciones asíncronas estándar, microservicios cloud-native. |
| **RabbitMQ** | Message broker tradicional, ruteo complejo (exchanges/queues). | Tareas en background (Celery), ruteo avanzado. |
| **AWS SQS / SNS** | Simple, escalable, colas estándar y FIFO. | Desacoplamiento básico en ecosistema AWS. |

## Anti-patrones comunes

- **Eventos chatty:** Enviar eventos con demasiada frecuencia por cambios menores, sobrecargando el broker y a los consumidores.
- **Dependencia de orden:** Diseñar sistemas asumiendo que los eventos llegarán exactamente en el orden en que se emitieron. En sistemas distribuidos, el orden rara vez está garantizado.
- **Consumidores sin idempotencia:** Procesar un evento duplicado y generar inconsistencias en la base de datos o correos duplicados al usuario.
