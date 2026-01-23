---
sidebar_position: 5
sidebar_label: Principios de API
title: Lineamientos para diseño de APIs y contratos
---

# Lineamientos para diseño de APIs y contratos

## Objetivo

Este documento define principios y lineamientos para diseñar APIs consistentes, predecibles y evolutivas, entendiendo las APIs como contratos explícitos entre sistemas, no como simples salidas técnicas del backend.

El objetivo es:

- Reducir ambigüedad entre productores y consumidores
- Minimizar acoplamientos innecesarios
- Facilitar la evolución del backend sin romper integraciones
- Tratar las APIs como productos técnicos de largo plazo

Una API mal diseñada se convierte rápidamente en deuda estructural.

## Las APIs como contratos, no como implementaciones

Una API representa un acuerdo de comportamiento, no una proyección directa del código interno.

Esto implica que:

- El consumidor no debe inferir lógica interna
- La estructura no debe cambiar por refactors internos
- La semántica debe ser clara y estable

Cuando una API filtra detalles internos, el backend pierde libertad para evolucionar.

## Principios generales de diseño de APIs

### 1. Claridad semántica

Cada endpoint debe comunicar claramente:

- Qué recurso representa
- Qué acción realiza
- Qué efectos secundarios puede tener

Los nombres deben reflejar intención, no implementación.

### 2. Consistencia

La API debe comportarse de forma consistente en:

- Naming
- Estructura de respuestas
- Manejo de errores
- Convenciones de estado

La consistencia reduce la carga cognitiva más que cualquier documentación.

### 3. Predecibilidad

Un consumidor debe poder anticipar:

- Qué ocurre ante un error
- Qué formato tendrá la respuesta
- Qué significan los códigos de estado

Las sorpresas en APIs son fallos de diseño.

## Versionado de APIs

El versionado es un mecanismo de protección del consumidor, no del productor.

Principios clave:

- Versionar cuando se rompe compatibilidad
- Preferir cambios compatibles hacia atrás
- Evitar versionar por cambios cosméticos

Versionar demasiado fragmenta. No versionar nunca paraliza.

## Manejo de errores como parte del contrato

Los errores también son respuestas válidas y deben estar bien definidos.

Buenas prácticas:

- Estructura de error consistente
- Mensajes claros y accionables
- Separar errores técnicos de errores de dominio

Un error mal diseñado obliga al consumidor a adivinar.

## Documentación y contratos explícitos

Una API debe poder ser entendida:

- Sin leer el código
- Sin conocer el equipo que la creó
- Sin interpretación subjetiva

Contratos explícitos permiten:

- Evolución segura
- Testing de integración
- Independencia entre equipos

## Cierre conceptual

Diseñar APIs es diseñar relaciones entre sistemas. Cada decisión impacta la capacidad de cambiar, escalar y mantener.

Una buena API libera al backend. Una mala API lo encadena.
