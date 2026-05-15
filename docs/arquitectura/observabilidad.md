---
title: Observabilidad
sidebar_label: Observabilidad
sidebar_position: 9
---

# Observabilidad

La observabilidad es la capacidad de entender qué está ocurriendo dentro de un sistema a partir de la información que este expone externamente. Es fundamental para operar software con confianza y diagnosticar fallos.

## Los Tres Pilares de la Observabilidad

| Pilar | Qué es | Cuándo usarlo |
| :--- | :--- | :--- |
| **Logs** | Registros estructurados de eventos ocurridos. | Para investigar un error específico, entender el "por qué" y el contexto detallado. |
| **Métricas** | Mediciones numéricas agregadas a lo largo del tiempo. | Para monitorear la salud del sistema, configurar alertas, observar tendencias de rendimiento o errores. |
| **Trazas (Traces)** | El viaje de una solicitud a través de múltiples servicios. | Para diagnosticar cuellos de botella de rendimiento y entender dependencias en sistemas distribuidos. |

## OpenTelemetry como Estándar

Se recomienda utilizar **OpenTelemetry (OTel)** como estándar de instrumentación. OpenTelemetry proporciona APIs y SDKs agnósticos al proveedor para recolectar logs, métricas y trazas, evitando el vendor lock-in.

### Ejemplo de Instrumentación de un Span (Python - FastAPI)

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

async def procesar_pago(pago_id: str):
    with tracer.start_as_current_span("procesar_pago_interno") as span:
        span.set_attribute("pago.id", pago_id)
        try:
            resultado = await llamar_api_externa()
            span.set_attribute("pago.estado", "exito")
            return resultado
        except Exception as e:
            span.record_exception(e)
            span.set_status(trace.Status(trace.StatusCode.ERROR))
            raise
```

### Ejemplo de Instrumentación de un Span (TypeScript - Node.js)

```typescript
import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("pago-service");

async function procesarPago(pagoId: string) {
  return tracer.startActiveSpan("procesar_pago_interno", async (span) => {
    span.setAttribute("pago.id", pagoId);
    try {
      const resultado = await llamarApiExterna();
      span.setAttribute("pago.estado", "exito");
      return resultado;
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

## Tabla Comparativa de Herramientas

| Herramienta | Fortaleza | Casos de Uso |
| :--- | :--- | :--- |
| **Datadog** | Solución "todo en uno" de primer nivel, excelente correlación OOTB. | Empresas con presupuesto que buscan facilidad de uso y correlación profunda automática. |
| **Grafana Stack (LGTM)** | Open Source, altamente personalizable (Loki, Grafana, Tempo, Mimir). | Equipos que prefieren infraestructura self-hosted o gestionada pero basada en estándares abiertos. |
| **Google Cloud Operations** | Integrado de forma nativa en GCP. | Plataformas 100% basadas en Google Cloud que buscan simplicidad. |
| **New Relic** | Fuerte en APM (Application Performance Monitoring). | Sistemas complejos donde el rendimiento del código es la principal preocupación. |

## SLI, SLO y SLA

- **SLI (Service Level Indicator):** Una medida cuantitativa real del nivel de un servicio. (Ej. "El 99.5% de las peticiones en los últimos 5 minutos respondieron en menos de 200ms").
- **SLO (Service Level Objective):** Un valor objetivo o rango de valores para un nivel de servicio, medido por un SLI. Es un acuerdo interno. (Ej. "Nuestro objetivo es 99.9% de éxito en las respuestas").
- **SLA (Service Level Agreement):** Un contrato explícito o implícito con los usuarios que incluye consecuencias (generalmente financieras) si no se cumple el SLO.

### Error Budgets (Presupuesto de Errores)

El Error Budget es la diferencia entre el 100% de fiabilidad y el SLO acordado. Si el SLO es 99.9%, el Error Budget es 0.1%.

:::info Cultura del Error Budget
El presupuesto de errores se utiliza como una herramienta de toma de decisiones. Si el presupuesto se agota, el equipo debe detener el lanzamiento de nuevas features y enfocarse exclusivamente en estabilización técnica hasta que el presupuesto se recupere.
:::
