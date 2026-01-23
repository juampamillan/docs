---
sidebar_position: 7
sidebar_label: Lineamientos de Documentación
title: Lineamientos de Documentación de UI y Estado
---

# Lineamientos de Documentación de UI y Estado

## Propósito del documento

Este documento define qué aspectos del frontend deben documentarse y cómo hacerlo, con énfasis en la interfaz de usuario (UI) y el manejo de estado. Su objetivo principal es evitar que el conocimiento crítico del sistema viva únicamente en la cabeza de algunas personas o se transmita de forma informal.

En muchos equipos, el frontend “funciona” mientras quienes lo construyeron siguen presentes. El problema aparece cuando alguien nuevo entra al equipo, cuando se intenta refactorizar un flujo existente o cuando ocurre un bug en producción y nadie entiende completamente por qué la UI se comporta de cierta forma. La documentación existe para reducir esa fragilidad.

Documentar no es escribir por escribir; es externalizar decisiones.

## Qué NO es esta documentación

Antes de definir qué debe documentarse, es importante aclarar qué no se espera de estos lineamientos.

No se trata de documentar cada componente, cada prop o cada línea de código. Tampoco busca reemplazar el código como fuente de verdad ni convertirse en un manual exhaustivo que nadie lee.

Esta documentación **no** es:

- Un duplicado del código.
- Una especificación de diseño visual pixel-perfect.
- Un tutorial paso a paso de uso de la aplicación.

Es, en cambio, un mapa mental compartido del sistema.

## Principio clave: documentar lo no evidente

La regla más importante es sencilla pero poderosa:

> **Si algo no es obvio al leer el código, probablemente deba documentarse.**

Esto incluye:

- Decisiones de diseño.
- Comportamientos implícitos.
- Flujos condicionales complejos.
- Restricciones técnicas.
- Razones detrás de una implementación.

La documentación no explica *qué* hace el código (eso debería verse en el código), sino *por qué* existe de esa forma.

## Documentación de flujos de UI

Un flujo de UI es una secuencia de estados y pantallas que el usuario atraviesa para lograr un objetivo. Estos flujos son una de las principales fuentes de complejidad en frontend.

### Qué documentar de un flujo

Para cada flujo relevante, se debería documentar al menos:

1. Objetivo del flujo desde la perspectiva del usuario.
2. Pantallas o vistas involucradas.
3. Estados principales del flujo.
4. Puntos de decisión (condiciones que cambian el comportamiento).
5. Estados de error y excepciones.
6. Casos límite conocidos.

No es necesario usar diagramas complejos; muchas veces un texto estructurado es suficiente.

### Ejemplo conceptual de flujo documentado

> **Flujo: Creación de reporte mensual.**
>
> El usuario inicia el flujo desde el dashboard. Si no tiene permisos suficientes, se muestra un mensaje de bloqueo y no puede continuar. Si tiene permisos, se presenta un formulario con validaciones tanto sincrónicas como asincrónicas. Al enviar el formulario, la UI entra en estado de carga. Si la API responde correctamente, se redirige al detalle del reporte. Si ocurre un error, se muestra un mensaje específico dependiendo del tipo de fallo.

Este tipo de descripción evita que el conocimiento del flujo dependa de “acordarse cómo funcionaba”.

## Documentación del manejo de estado

El estado es uno de los aspectos más difíciles de entender en un frontend existente. Por eso, merece documentación explícita.

### Qué estado debe documentarse

No todo estado necesita documentación. Solo aquel que cumple al menos una de estas condiciones:

- Es compartido entre múltiples componentes.
- Vive más allá de una pantalla.
- Tiene impacto en varios flujos.
- Representa reglas de negocio.
- Tiene efectos secundarios (llamadas a API, persistencia, etc.).

### Qué debe incluir la documentación de estado

Para cada pieza de estado relevante, se debería documentar:

- Qué representa.
- Quién lo modifica.
- Quién lo consume.
- En qué eventos cambia.
- Qué invariantes deben cumplirse.
- Qué errores pueden surgir si se usa incorrectamente.

Esto aplica tanto para estado global como para estado encapsulado en un módulo.

## Relación entre UI y estado

Uno de los puntos más importantes —y menos documentados— es cómo el estado afecta a la UI.

Muchos bugs nacen no de un error técnico, sino de una mala comprensión de esta relación.

La documentación debería aclarar:

- Qué estados habilitan o bloquean acciones.
- Qué estados disparan renderizados alternativos.
- Qué combinaciones de estado son válidas o inválidas.
- Qué estados no deberían coexistir.

Este tipo de información rara vez es evidente solo leyendo componentes aislados.

## Decisiones de diseño relevantes

No todas las decisiones de diseño visual necesitan documentación, pero algunas sí, especialmente cuando afectan comportamiento o mantenibilidad.

Ejemplos de decisiones que deben documentarse:

- Por qué cierto flujo es modal y no una página.
- Por qué se fuerza una confirmación adicional.
- Por qué se oculta información bajo ciertas condiciones.
- Por qué se prioriza una acción sobre otra.

Estas decisiones suelen tener contexto histórico o de negocio que el código por sí solo no refleja.

## Comportamientos no evidentes

Un comportamiento no evidente es aquel que sorprende a alguien que no participó en su diseño.

Ejemplos comunes:

- Campos que cambian automáticamente en función de otros.
- Acciones que disparan efectos secundarios invisibles.
- Validaciones que dependen de reglas externas.
- Estados que se “resetean” al navegar.

Estos comportamientos deben documentarse explícitamente, incluso si parecen “obvios” para quien los implementó.

## Dónde debe vivir esta documentación

La documentación debe vivir lo más cerca posible del código, pero no dentro del código mismo.

Buenas opciones incluyen:

- Archivos Markdown por módulo o feature.
- Secciones específicas en el sitio de documentación.
- Documentación enlazada desde el `README` del módulo.

Lo importante es que sea:

- Fácil de encontrar.
- Fácil de actualizar.
- Claramente asociada al sistema que describe.

## Documentación como herramienta de onboarding

Una de las pruebas más claras de que esta documentación funciona es el onboarding.

Una persona nueva debería poder:

1. Entender los flujos principales sin ejecutar la app.
2. Comprender cómo se maneja el estado clave.
3. Identificar dónde hacer cambios sin miedo excesivo.

Si el onboarding depende de “hablar con la persona correcta”, el sistema es frágil.

## Antipatrones en documentación de frontend

Algunos errores comunes incluyen:

- Documentar solo happy paths.
- Mantener documentación desactualizada.
- Escribir documentación excesivamente genérica.
- Documentar decisiones sin contexto.
- Usar la documentación como sustituto de buen código.

La documentación no corrige mala arquitectura; la complementa.

## Mantenimiento de la documentación

La documentación debe evolucionar junto con el código. Para ello, es recomendable:

- Actualizarla como parte del cambio, no después.
- Tratarla como un artefacto de primera clase.
- Revisarla en PRs cuando el cambio lo amerite.

Una documentación ligeramente incompleta es mejor que una aparentemente completa pero incorrecta.

## Conclusión

La documentación de UI y estado no es burocracia. Es una estrategia consciente para reducir dependencia de individuos, disminuir errores costosos y permitir que el frontend crezca sin volverse opaco.

Cuando la documentación es clara, el frontend deja de ser una caja negra y se convierte en un sistema comprensible, discutible y mejorable. Eso no solo mejora el software: mejora al equipo que lo construye.
