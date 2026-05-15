---
sidebar_position: 2
sidebar_label: Code Review
---

# Code Review

El Code Review (Revisión de Código) no es un mecanismo de control policial; es una oportunidad de aprendizaje asíncrono, detección temprana de errores lógicos y distribución de conocimiento en el equipo.

## Propósito del Code Review

- Asegurar que el código resuelve el requerimiento de negocio.
- Detectar riesgos de seguridad y cuellos de botella de performance.
- Validar que existe cobertura de testing adecuada.
- Transferir contexto (que más de una persona entienda el cambio).

## Qué Revisar

- **Correctitud:** ¿El algoritmo hace lo que promete el ticket?
- **Seguridad:** ¿Se validaron los inputs? ¿Hay logs filtrando información sensible?
- **Testing:** ¿Se agregaron tests de unidad/integración para el caso feliz y los errores?
- **Legibilidad:** ¿Los nombres de variables explican intención?

:::info Feedback Eficaz
El foco principal del Code Review debe estar en la legibilidad, la correcta arquitectura y evitar deuda técnica severa.
:::

## Qué NO Revisar

- **Formateo y Estilo:** Dónde van los espacios, comillas simples o dobles. (Para eso existe Prettier o Black corriendo automáticamente en el CI). Si es discutible por linter, no debe discutirse por comentarios.
- **Complejidad Arquitectónica profunda no detectada antes:** Los rediseños gigantescos deben discutirse ANTES de escribir el código en sesiones de diseño, no como bloqueo en el PR.

## Guía para el Autor del PR

Tu objetivo es facilitarle la vida al revisor.

1. **Tamaño del PR:** Mantener los PRs por debajo de las 400 líneas de código modificado. PRs más grandes reciben "LGTM" rápidos sin revisión profunda debido a la fatiga del revisor.
2. **Contexto:** Llenar la descripción del PR explicando *por qué* se hizo el cambio, enlaces a tickets (JIRA) e instrucciones de cómo probarlo localmente.
3. **Auto-revisión:** Siempre revisar los propios cambios en el diff de GitHub antes de pedir revisión a otro.

## Guía para el Revisor

- **Tono constructivo:** Usar preguntas ("¿Qué opinas si extraemos esto a una función?") en lugar de órdenes ("Extrae esto").
- **Explicar el Por Qué:** Si se sugiere un cambio, proveer un enlace a la documentación o explicar el beneficio.
- **Diferenciar bloqueos de nitpicks:** Usar prefijos como `Nit:` para sugerencias menores ("Nit: este nombre de variable podría ser X") que no deberían bloquear el mergeo del PR.
