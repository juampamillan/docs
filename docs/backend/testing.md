---
sidebar_position: 7
sidebar_label: Testing
title: Reglas mínimas de testing backend
---

# Reglas mínimas de testing backend

## Objetivo

Este documento define reglas mínimas de testing para backend, estableciendo expectativas claras sobre qué tipos de pruebas deben existir y qué riesgos deben cubrirse.

El objetivo no es cobertura absoluta, sino:

- Reducir regresiones
- Detectar errores temprano
- Proteger decisiones críticas
- Hacer del testing una práctica natural

Un backend sin tests confía en la suerte.

## El rol real del testing

El testing no existe para:

- Complacer métricas
- Satisfacer herramientas
- Dar falsa seguridad

Existe para reducir incertidumbre.

Cada test responde implícitamente:
¿Qué error estoy tratando de evitar?

## Niveles mínimos de testing

### 1. Tests unitarios

Protegen:
- Lógica de negocio
- Reglas del dominio
- Casos límite

Deben ser:
- Rápidos
- Deterministas
- Aislados

Si la lógica no se puede testear, probablemente está mal diseñada.

### 2. Tests de integración

Protegen:
- Integración con base de datos
- Configuración real
- Contratos internos

Son más lentos, pero descubren errores reales.

### 3. Tests de contrato

Protegen:
- APIs públicas
- Expectativas de consumidores
- Cambios incompatibles

Aquí se valida que el contrato prometido siga cumpliéndose.

## Cobertura como consecuencia, no como objetivo

Una cobertura alta no garantiza calidad.
Una cobertura baja en puntos críticos sí es un riesgo.

Lo importante es:

- Qué se prueba
- Por qué se prueba
- Qué riesgo se cubre

## Antipatrones comunes

- Tests frágiles
- Tests que replican implementación
- Falta total de tests en lógica crítica
- Confiar solo en tests manuales

Un sistema sin tests obliga a desplegar con miedo.

## Cierre conceptual

El testing backend es una red de seguridad, no una jaula.

Cuando está bien diseñado:

- Permite cambiar sin miedo
- Detecta errores temprano
- Protege la estabilidad del sistema

Un backend profesional no pregunta si necesita tests. Pregunta qué riesgos necesita cubrir.
