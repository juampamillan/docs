---
sidebar_position: 9
sidebar_label: Gestión de Incidentes
---

# Gestión de Incidentes

El objetivo no es evitar fallos a toda costa, sino saber cómo responder, mitigarlos rápidamente y aprender de ellos para que no se repitan.

## Severidades de Incidentes

| Nivel | Definición | Impacto | Respuesta Esperada |
| :--- | :--- | :--- | :--- |
| **P1 (Crítico)** | Sistema core totalmente caído o pérdida grave de datos. | Negocio paralizado. | Inmediata (Llamada al On-Call). Todos dejan lo que están haciendo. |
| **P2 (Alto)** | Feature crítico degradado o caído para un gran volumen de usuarios. | Alto impacto, negocio afectado. | Minutos (Slack alert/Paging). Intervención urgente. |
| **P3 (Medio)** | Degradación parcial, feature no crítico, o impacto a pocos usuarios. | Moderado, trabajo con fricción. | Mismo día / Próximo sprint. |
| **P4 (Bajo)** | Errores cosméticos, bugs que no interrumpen flujos. | Mínimo. | Triage normal de backlog. |

## Runbooks

Un Runbook es un documento vivo que describe cómo operar, diagnosticar y resolver un problema específico del sistema sin depender del creador del servicio.

**Estructura ideal:**
1. Arquitectura y contexto del servicio.
2. Significado de las métricas clave.
3. Pasos de diagnóstico ("Si falla la base de datos, revisa este dashboard").
4. Pasos de mitigación rápida ("Si el servicio se ahoga, corre este comando para escalar temporalmente").

:::warning Gestión sin Culpa
Un postmortem debe enfocarse en cómo falló el sistema y no en encontrar un culpable humano.
:::

## Ciclo de Vida de un Incidente

1. **Detección:** Una alerta automática se dispara o soporte al cliente reporta un problema.
2. **Triaje:** El On-Call define la severidad. Si es P1/P2, se abre un canal de Slack dedicado (`#incidente-2026-auth-caido`).
3. **Mitigación:** Detener el sangrado (ej. hacer rollback a la versión anterior, escalar capacidad). La meta no es arreglar el código, es restaurar el servicio.
4. **Resolución:** Análisis de causa raíz (RCA) y despliegue del parche real.
5. **Postmortem:** Aprender del evento.

## Postmortem Sin Culpa (Blameless Postmortem)

El propósito del postmortem es mejorar el sistema, no buscar culpables. Partir de la premisa de que "todos hicieron el mejor trabajo posible con la información que tenían".

**Plantilla:**
- **Fecha y Severidad.**
- **Resumen:** 2-3 líneas de qué pasó, impacto y mitigación.
- **Línea de Tiempo:** Cronología de eventos (ej. 14:00 - Deploy a main, 14:02 - Alertas disparadas, 14:15 - Rollback exitoso).
- **Causa Raíz:** Por qué falló el sistema (técnicamente).
- **Qué salió bien:** Herramientas que ayudaron, rapidez.
- **Qué salió mal:** Ceguera de observabilidad, procesos manuales.
- **Action Items (Tickets JIRA):** Tareas concretas con responsable para evitar que vuelva a ocurrir.

## On-Call

- **Alertas accionables:** Si una alerta suena y la respuesta del desarrollador es "ah, eso es normal", la alerta es ruidosa y debe ser borrada o ajustada. La fatiga de alertas destruye la moral.
- **Rotaciones sostenibles:** Rotaciones semanales con compensación y días libres tras incidentes graves.
