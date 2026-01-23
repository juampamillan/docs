---
sidebar_position: 8
sidebar_label: Criterios de Calidad
title: Criterios Mínimos de Calidad Frontend
---

# Criterios Mínimos de Calidad Frontend

## Propósito del documento

Este documento define los criterios mínimos de calidad que debe cumplir cualquier desarrollo frontend antes de considerarse aceptable. No describe excelencia ideal ni mejores prácticas avanzadas; establece un piso compartido que protege al sistema de la degradación silenciosa que ocurre cuando se prioriza únicamente la entrega inmediata.

En ausencia de criterios explícitos, la calidad se vuelve subjetiva, dependiente de quién revisa o de cuánto tiempo hay. Este documento busca eliminar esa ambigüedad y convertir la calidad en un acuerdo explícito, no en una expectativa tácita.

## Qué significa “calidad” en frontend

La calidad frontend no se mide solo por si “funciona” o si “se ve bien”. Un frontend de calidad es aquel que puede entenderse, modificarse y extenderse sin introducir miedo constante a romper algo.

Este documento aborda la calidad desde cinco dimensiones principales: legibilidad, manejo de estado, consistencia visual, accesibilidad básica y pruebas mínimas. Si cualquiera de estas falla, el sistema se vuelve frágil, aunque visualmente parezca correcto.

## Legibilidad y estructura del código

La legibilidad no es un lujo estético; es un requisito funcional.

Un desarrollo frontend aceptable debe cumplir, como mínimo, con lo siguiente:

*   **El código debe ser fácil de seguir sin necesidad de contexto externo.** Un lector razonable debería poder entender qué hace un componente sin conocer toda la aplicación.
*   **Las responsabilidades deben ser claras.** Un componente no debe mezclar renderizado, llamadas a API, reglas de negocio complejas y manejo de estado global al mismo tiempo. Si lo hace, debe refactorizarse antes de considerarse aceptable.
*   **Los nombres importan.** Variables, funciones y componentes deben nombrarse por intención, no por implementación. Un nombre que requiere explicación es una señal de alerta.
*   **La duplicación evidente debe evitarse.** Copiar y pegar lógica o UI sin una justificación clara introduce inconsistencia y riesgo.

## Manejo de estado

El manejo de estado es uno de los puntos más sensibles en frontend y, por tanto, uno de los más regulados por estos criterios.

*   **Todo estado debe tener un dueño claro.** Debe ser evidente quién lo crea, quién lo modifica y quién lo consume. El estado “huérfano” o implícito no es aceptable.
*   **El estado debe vivir en el nivel correcto.** El estado local no debe elevarse sin necesidad, y el estado global no debe usarse como solución rápida para compartir información.
*   **Las transiciones de estado deben ser predecibles.** Cambios de estado que disparan efectos secundarios invisibles o difíciles de rastrear deben justificarse o refactorizarse.
*   **El estado global debe mantenerse pequeño.** Cada nueva incorporación al estado global debe responder a una necesidad real y transversal.

## Consistencia visual y de comportamiento

La consistencia es una forma de respeto al usuario y al equipo.

Un desarrollo frontend aceptable debe mantener coherencia en:

*   **Uso de componentes reutilizables en lugar de soluciones ad-hoc.** Si existe un componente base, debe usarse.
*   **Comportamiento de acciones similares.** Botones, formularios y flujos equivalentes no deben comportarse de formas distintas sin razón documentada.
*   **Estados visuales.** Carga, error, vacío y éxito deben tratarse de forma consistente en toda la aplicación.

La consistencia reduce la carga cognitiva tanto para usuarios como para desarrolladores.

## Accesibilidad básica

La accesibilidad no es opcional, incluso en su forma mínima.

Como piso de calidad, el frontend debe cumplir al menos con:

*   Uso correcto de elementos semánticos cuando aplique.
*   Posibilidad de navegación básica mediante teclado.
*   Contraste suficiente para texto y elementos interactivos.
*   Textos alternativos en elementos visuales relevantes.
*   Indicadores claros de foco y estados interactivos.

No se espera cumplimiento total de estándares avanzados, pero sí evitar barreras evidentes que excluyan a usuarios o dificulten el uso.

## Manejo de errores y estados límite

Un frontend de calidad no asume que todo saldrá bien.

Todo flujo relevante debe considerar:

*   Estados de carga.
*   Errores de red o de servidor.
*   Datos incompletos o inesperados.
*   Acciones inválidas del usuario.

Ignorar estos casos genera una falsa sensación de estabilidad. Un sistema que falla de forma clara y controlada es preferible a uno que falla silenciosamente.

## Pruebas mínimas

Este documento no impone una estrategia completa de testing, pero sí define un mínimo aceptable.

Al menos deben existir pruebas para:

*   Lógica crítica de negocio en frontend.
*   Flujos importantes que no deben romperse.
*   Componentes reutilizables con comportamiento no trivial.

La ausencia total de pruebas en áreas críticas es una señal de riesgo, no de velocidad.

## Performance y comportamiento responsable

La performance no se trata de micro-optimizaciones prematuras, sino de evitar negligencias evidentes.

Un desarrollo aceptable debe evitar:

*   Renderizados innecesarios sin justificación.
*   Cargas excesivas de datos que no se usan.
*   Bloqueos visibles de la UI sin feedback.

No se exige optimización extrema, pero sí conciencia del costo.

## Seguridad básica en frontend

Aunque el frontend no es el principal guardián de la seguridad, existen responsabilidades mínimas:

*   No exponer información sensible innecesariamente.
*   No confiar en validaciones únicamente del lado del cliente.
*   Manejar correctamente tokens, sesiones y errores visibles.
*   Evitar leaks de información técnica en mensajes de error.

La seguridad no es absoluta, pero la negligencia es inaceptable.

## Criterios de aceptación y revisión

Un cambio frontend no debería considerarse aceptado si viola claramente alguno de estos criterios, incluso si “funciona”.

Estos criterios sirven como:

*   Checklist de revisión.
*   Marco para discusiones técnicas.
*   Defensa contra la presión de entrega sin control.

La calidad no debe depender del humor o experiencia de quien revisa el código.

## Evolución de los criterios

Estos criterios representan un mínimo, no un máximo. A medida que el equipo madura, el piso puede elevarse.

Es preferible tener pocos criterios claros y aplicados que muchos criterios ignorados.

La revisión periódica de este documento es señal de un equipo sano.

## Cierre

La calidad frontend no emerge por accidente. Es el resultado de decisiones conscientes, acuerdos explícitos y límites claros.

Estos criterios existen para proteger al sistema de la erosión diaria, no para frenar el desarrollo. Cuando el piso de calidad es compartido, la velocidad real aumenta, porque el equipo deja de pagar intereses sobre deuda innecesaria.

Un frontend sostenible no es el más brillante, sino el que puede seguir evolucionando sin colapsar bajo su propio peso.
