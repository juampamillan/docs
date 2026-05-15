---
sidebar_position: 8
sidebar_label: FinOps y Optimización de Costos
---

# FinOps y Optimización de Costos

FinOps (Financial Operations) es una disciplina y un cambio cultural. El costo de la nube no es solo responsabilidad del área financiera, es una métrica de diseño de ingeniería.

## Los Tres Pilares de FinOps

1. **Visibilidad:** Entender en qué se está gastando el dinero (etiquetado de recursos, dashboards).
2. **Optimización:** Identificar ineficiencias (recursos huérfanos, instancias sobre-dimensionadas).
3. **Gobernanza:** Automatizar y establecer políticas de control de costos (alertas, cuotas).

## Dónde suele estar el gasto oculto

- **Egress Transfer (Transferencia de datos):** Transferir datos entre nubes, hacia internet o entre zonas de disponibilidad suele ser un costo oculto masivo.
- **NAT Gateways:** El costo de los NAT Gateways suele ser por hora + por giga procesado.
- **Recursos Huérfanos:** Discos persistentes que no están atados a ninguna VM, IPs estáticas no usadas.
- **Ambientes no productivos:** Entornos de desarrollo y QA que corren 24/7 en lugar de apagarse en fines de semana o noches.

## Técnicas de Optimización

| Técnica | Descripción |
| :--- | :--- |
| **Rightsizing** | Reducir CPU/RAM de instancias que históricamente no superan el 10% de uso. |
| **Instancias Spot/Preemptibles** | Máquinas efímeras hasta un 80% más baratas, ideales para workers asíncronos y procesos tolerantes a fallos. |
| **Savings Plans / Reserved Instances** | Comprometerse a 1 o 3 años de uso en la nube por un descuento sustancial en las cargas de trabajo predecibles (base de datos, clusters base). |
| **Auto-scaling** | Escalar a 0 o mínimo en horas de bajo tráfico. |

## Alertas de Presupuesto

:::warning
Nunca lanzar un proyecto a la nube sin configurar una alerta de presupuesto.
:::

- **Configuración Básica:** Alertas de consumo enviadas al canal de Slack cuando se alcanza el 50%, 80%, y 100% del presupuesto mensual.
- **Detección de anomalías:** Configurar alertas que detecten picos inusuales de gasto inter-diario.

## Herramientas Nativas

- **AWS Cost Explorer / Cost Anomaly Detection:** Para análisis profundo y sugerencias de instancias reservadas.
- **GCP Billing & Cost Management:** Exportación a BigQuery obligatoria para hacer dashboards de Looker Studio con granularidad por etiquetas de equipo.
- **Azure Cost Management:** Herramienta integrada muy visual para control de gastos.

## Cultura FinOps en el Equipo

El desarrollador es dueño del costo. Cuando se diseña una nueva arquitectura, se debe estimar su costo. Cambiar de una base de datos relacional a una managed serverless puede ser más rápido, pero su costo por millón de lecturas debe estar documentado en el ADR pertinente.
