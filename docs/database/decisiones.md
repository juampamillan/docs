---
sidebar_position: 7
sidebar_label: Decisiones de Datos
title: Registro de decisiones de datos (ADR de datos)
---

# Registro de decisiones de datos (ADR de datos)

## Objetivo

Este documento define cómo registrar decisiones relevantes relacionadas con el modelo de datos, utilizando un enfoque similar a los Architecture Decision Records (ADR).

El objetivo es:

- Preservar memoria técnica
- Evitar debates repetidos
- Facilitar refactors futuros
- Dar contexto a decisiones costosas

Los datos cambian lento, pero sus consecuencias duran mucho.

## Por qué los datos necesitan ADRs propios

Las decisiones de datos suelen ser:

- Irreversibles o de alto costo
- Difíciles de entender fuera de contexto
- Tomadas bajo presión de negocio

**Sin registro:**

- Se pierde el “por qué”
- Se juzga el pasado con información nueva
- Se repiten errores estructurales

## Qué decisiones ameritan un ADR de datos

**Ejemplos:**

- Cambio de modelo central
- Introducción de nuevas entidades clave
- Decisiones de normalización
- Elección de tipo de base de datos
- Estrategias de particionamiento

No todo cambio necesita ADR, pero los estructurales sí.

## Estructura de un ADR de datos

Un ADR de datos debe capturar:

### Contexto
Estado del sistema, necesidades y restricciones.

### Decisión
Qué se decidió sobre el modelo de datos.

### Alternativas
Opciones consideradas y por qué se descartaron.

### Consecuencias
Impacto en:
- Rendimiento
- Escalabilidad
- Operación
- Evolución futura

## Relación con migraciones

Un ADR de datos:

- Justifica migraciones complejas
- Explica por qué existen ciertos compromisos
- Ayuda a decidir cuándo refactorizar

Las migraciones cuentan qué pasó. El ADR explica por qué pasó.

## Antipatrones comunes

- No documentar decisiones críticas
- Escribir ADRs demasiado tarde
- No actualizarlos cuando el contexto cambia
- Usarlos solo como trámite

Un ADR útil ahorra discusiones futuras.

## Cierre conceptual

El modelo de datos es una de las partes más rígidas del sistema. Por eso, sus decisiones deben quedar claramente registradas.

Los ADRs de datos no son papeleo. Son memoria estructural del sistema.
