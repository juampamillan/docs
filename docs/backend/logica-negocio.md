---
sidebar_position: 6
sidebar_label: Lógica de Negocio
title: Principios de ubicación de lógica de negocio
---

# Principios de ubicación de lógica de negocio

## Objetivo

Este documento establece dónde debe residir la lógica de negocio y dónde no, con el fin de evitar su dispersión entre capas, tecnologías o componentes no diseñados para contenerla.

El objetivo es:

- Mantener una única fuente de verdad
- Facilitar pruebas
- Reducir comportamientos inesperados
- Alinear el backend con el dominio del negocio

La lógica de negocio mal ubicada es una de las fuentes más comunes de caos técnico.

## Qué es lógica de negocio

La lógica de negocio representa:

- Reglas del dominio
- Invariantes del sistema
- Decisiones que no dependen de la infraestructura
- Comportamientos que definen “qué es válido”

No es:

- Validación de formato
- Serialización
- Orquestación técnica
- Detalles de persistencia

Confundir estos conceptos lleva a arquitecturas frágiles.

## Principio central: una única fuente de verdad

Cada regla de negocio debe:

- Existir en un solo lugar
- Ser ejecutada siempre de la misma forma
- No depender del canal de entrada

Duplicar lógica es garantizar inconsistencias futuras.

## Dónde NO debe vivir la lógica de negocio

**Controladores**
Deben coordinar, no decidir.

**Base de datos**
Los stored procedures complejos esconden reglas críticas y dificultan evolución.

**Frontend**
El frontend puede validar UX, pero nunca imponer reglas del dominio.

**Middleware genérico**
La lógica de negocio requiere contexto, no abstracción ciega.

## Dónde SÍ debe vivir

La lógica de negocio debe residir en:

- Servicios de dominio
- Casos de uso explícitos
- Componentes diseñados para expresar reglas

Esto permite:

- Tests claros
- Evolución controlada
- Lenguaje común con el negocio

## Antipatrones comunes

- “Fat controllers”
- Reglas duplicadas en frontend y backend
- Validaciones repartidas sin criterio
- Lógica escondida en callbacks o triggers

Estos patrones erosionan la predictibilidad del sistema.

## Cierre conceptual

La ubicación de la lógica define la forma mental del sistema.

Cuando la lógica está bien ubicada:

- El sistema se entiende
- Los cambios son seguros
- El dominio es explícito

Un backend sin centro lógico es solo un conjunto de endpoints.
