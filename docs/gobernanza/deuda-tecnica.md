---
sidebar_position: 4
sidebar_label: Deuda Técnica
---

# Deuda Técnica

La deuda técnica es un préstamo que se toma para ganar velocidad hoy, asumiendo el compromiso de pagar un interés (mantenibilidad, bugs futuros) más adelante.

## Tipos de Deuda

No toda la deuda es mala o accidental.

- **Deliberada Prudente:** "Sabemos que esto no escalará a 1 millón de usuarios, pero necesitamos lanzarlo hoy para el MVP. Lo reconstruiremos cuando lleguemos a los 100k". (Es una decisión de negocio validada).
- **Deliberada Imprudente:** "No tenemos tiempo de escribir tests. Funciona, despliégalo".
- **Inadvertida:** El equipo descubre, meses después, que el framework elegido está abandonado o que el modelo de datos es erróneo.

## Cómo Identificarla

- **Síntomas:** Las nuevas features toman el doble de tiempo que hace 6 meses. Existen "zonas muertas" del código que nadie quiere tocar por miedo a romper algo.
- **Herramientas:** Análisis estático (SonarQube) puede detectar olores de código, complejidad ciclomática excesiva o falta de cobertura.

:::info Identificación Temprana
Priorizar el pago de deuda técnica evita que la curva de mantenimiento hunda el avance en nuevas características.
:::

## Priorización

No toda la deuda técnica necesita pagarse.

- **Pagar SI:** Afecta directamente la velocidad de las nuevas features (el interés compuesto está destruyendo la agilidad).
- **Pagar SI:** Afecta la seguridad o estabilidad del sistema central.
- **NO pagar SI:** Es un módulo "feo" pero que funciona perfectamente y no se planean modificaciones futuras sobre él.

## El Presupuesto de Deuda Técnica

La deuda técnica se debe visualizar en el backlog como cualquier otra tarea.

- **Regla del 20%:** Se recomienda destinar el 20% de la capacidad de desarrollo en cada sprint/ciclo para refactorización o pago de deuda técnica. Ignorarlo acumulará el problema hasta llegar a la bancarrota técnica (donde la única solución es reescribir todo desde cero).

## Cómo Comunicar Deuda al Negocio

El negocio rara vez entiende el valor de "Actualizar la librería X".

- En lugar de decir: "Necesitamos refactorizar el servicio de notificaciones por exceso de complejidad."
- Decir: "Cada vez que queremos agregar un nuevo canal de notificación nos toma 2 semanas de desarrollo por bugs en el código actual. Si invertimos 1 semana hoy en arreglar los cimientos, las futuras integraciones nos tomarán 2 días."
