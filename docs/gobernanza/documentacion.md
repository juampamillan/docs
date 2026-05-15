---
sidebar_position: 5
sidebar_label: Documentación como Práctica
---

# Documentación como Práctica

La documentación debe tratarse como código: tiene versiones, se obsoletiza, necesita revisión y debe vivir cerca de la implementación.

## Por Qué Documentar

- **Escalabilidad del Equipo:** Evita la transmisión de conocimiento "boca a boca", donde el contexto se pierde.
- **Onboarding:** Acelera la productividad de nuevas incorporaciones.
- **Prevención de Deuda Técnica:** Las decisiones sin documentar suelen revertirse accidentalmente en el futuro.

## Qué Documentar

No todo requiere documentación extensiva, pero ciertas piezas son críticas:

- **Arquitectura y ADRs (Architecture Decision Records):** El "por qué" detrás de las grandes decisiones técnicas.
- **APIs (Contratos):** Uso de Swagger/OpenAPI para documentar endpoints. Las APIs son la interfaz principal del sistema.
- **Runbooks de Operaciones:** Instrucciones para resolución de incidentes (P1/P2).
- **Proceso de Onboarding:** Cómo levantar el entorno local en 30 minutos o menos.

## Cómo Escribir Buena Documentación

- **Docs-as-Code:** Usar Markdown y guardar la documentación en el mismo repositorio que el código fuente, o en un repositorio centralizado de ingeniería (como este sitio).
- **Actualización Continua:** Una documentación desactualizada es peor que ninguna documentación. Si un PR cambia la arquitectura o agrega una variable de entorno, el PR debe incluir la actualización de los documentos.
- **Enfoque en Casos de Uso:** En lugar de describir qué hace un archivo, explicar *cómo* usar el sistema para resolver un problema de negocio.

:::info Regla de Oro
Si te preguntan la misma cosa técnica tres veces en la oficina o por Slack, es hora de escribir un documento sobre ello y compartir el enlace la cuarta vez.
:::
