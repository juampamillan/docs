---
sidebar_position: 7
sidebar_label: Atributos de Calidad
title: Atributos de calidad obligatorios (y cómo evaluarlos)
---

# Atributos de calidad obligatorios (y cómo evaluarlos)

## Objetivo

Este documento define los atributos de calidad que todo sistema de software debería considerar de forma explícita, más allá de que “funcione”.
La funcionalidad es solo el punto de partida; la calidad determina si el sistema puede sostenerse, evolucionar y operar en el tiempo.

El objetivo es:

- Evitar decisiones técnicas miopes
- Introducir criterios objetivos de evaluación
- Hacer visible la calidad como una dimensión arquitectónica real

Un sistema puede cumplir todos los requerimientos funcionales y aun así ser un mal sistema.

## Qué son los atributos de calidad

Los atributos de calidad describen cómo se comporta el sistema bajo distintas condiciones.

No responden a:
“¿Qué hace el sistema?”

Sino a:

- ¿Qué tan fácil es cambiarlo?
- ¿Cómo se comporta bajo carga?
- ¿Qué pasa cuando falla?
- ¿Qué tan seguro es?
- ¿Qué tan observable es su estado?

En arquitectura, estos atributos condicionan las decisiones más importantes.

### El error común: tratarlos como secundarios

Un antipatrón frecuente es:

1. Diseñar primero la funcionalidad
2. Resolver la calidad “después”
3. Descubrir demasiado tarde que el sistema no escala, no se entiende o no se puede operar

Los atributos de calidad no emergen solos. Si no se diseñan, se degradan.

## Relación entre arquitectura y atributos de calidad

Cada decisión arquitectónica favorece unos atributos y sacrifica otros.

**Ejemplos:**

- Alta modularidad favorece mantenibilidad, pero puede impactar performance
- Cache agresivo mejora latencia, pero complica consistencia
- Seguridad estricta puede aumentar fricción operativa

Arquitectura es gestión consciente de trade-offs, no optimización absoluta.

## Atributos de calidad fundamentales

Los siguientes atributos aparecen recurrentemente en sistemas reales.
No todos se optimizan al máximo, pero todos deben considerarse.

### 1. Mantenibilidad

Capacidad del sistema para ser modificado de forma segura y predecible.

**Incluye:**

- Legibilidad del código
- Claridad de responsabilidades
- Facilidad para introducir cambios sin efectos colaterales

**Señales de buena mantenibilidad:**

- Cambios localizados
- Código entendible sin contexto histórico
- Bajo acoplamiento entre módulos

**Cómo evaluarla:**

- Tiempo promedio para implementar un cambio pequeño
- Número de módulos afectados por una modificación
- Revisiones de código centradas en comprensión, no solo en estilo

Si cada cambio da miedo, el sistema no es mantenible.

### 2. Escalabilidad

Capacidad del sistema para manejar crecimiento en carga, datos o usuarios.

No es solo “soportar más tráfico”, sino cómo responde el sistema al crecimiento.

**Dimensiones:**

- Escalabilidad horizontal vs vertical
- Escalado de lectura vs escritura
- Escalado de equipos (sí, también humano)

**Cómo evaluarla:**

- Pruebas de carga y estrés
- Identificación de cuellos de botella
- Análisis de componentes críticos

Un sistema que escala solo con heroísmo humano no escala.

### 3. Performance (rendimiento)

Tiempo y recursos que el sistema consume para cumplir su función.

**Incluye:**

- Latencia
- Throughput
- Uso de CPU, memoria, red

**Principio clave:**

> No optimizar performance sin datos reales.

**Cómo evaluarla:**

- Métricas de latencia (p95, p99)
- Benchmarks controlados
- Profiling en puntos críticos

Performance sin observabilidad es especulación.

### 4. Seguridad

Capacidad del sistema para proteger datos, identidad y operaciones.

No es un feature; es una propiedad transversal.

**Incluye:**

- Autenticación
- Autorización
- Protección de datos
- Gestión de secretos

**Cómo evaluarla:**

- Revisiones de diseño
- Análisis de superficies de ataque
- Pruebas de seguridad básicas

La seguridad que no se revisa se asume… y eso es peligroso.

### 5. Observabilidad

Capacidad del sistema para exponer su estado interno mediante señales externas.

**Incluye:**

- Logs
- Métricas
- Trazas

**Principio clave:**

> No se puede operar lo que no se puede observar.

**Cómo evaluarla:**

- ¿Puedo explicar qué pasó después de un incidente?
- ¿Puedo detectar degradación antes de que el usuario la note?
- ¿Puedo correlacionar eventos entre componentes?

Un sistema silencioso es un sistema ciego.

### 6. Resiliencia

Capacidad del sistema para resistir fallos y recuperarse.

Parte de una verdad incómoda:
**Todo sistema falla.**

**Incluye:**

- Manejo de errores
- Retries controlados
- Timeouts
- Degradación graciosa

**Cómo evaluarla:**

- Simulación de fallos
- Pruebas de caos simples
- Análisis post-mortem

Un sistema que falla de forma caótica amplifica el impacto del error.

### 7. Testabilidad

Facilidad para verificar el comportamiento del sistema.

**Incluye:**

- Tests unitarios
- Tests de integración
- Tests end-to-end razonables

**Cómo evaluarla:**

- Tiempo para escribir un test
- Dependencias necesarias para probar
- Estabilidad de los tests

Si probar es difícil, el diseño probablemente lo es.

## Evaluación objetiva vs percepción

Un error común es evaluar calidad por sensación:

- “Se siente lento”
- “Parece complejo”
- “Creo que escala”

La arquitectura madura introduce:

- Métricas
- Criterios claros
- Evidencia observable

Lo que no se puede evaluar, no se puede mejorar.

## Priorizar atributos según contexto

No todos los sistemas priorizan lo mismo.

**Ejemplos:**

- Un sistema financiero prioriza seguridad y consistencia
- Un producto en exploración prioriza velocidad de cambio
- Un sistema crítico prioriza resiliencia y observabilidad

La clave es hacer explícita la prioridad, no asumirla.

### Antipatrones comunes

- Optimizar todos los atributos al máximo
- Ignorar trade-offs
- Introducir complejidad “por si acaso”
- Tratar la calidad como responsabilidad del final del ciclo

La calidad no se agrega; se diseña.

## Cierre conceptual

Los atributos de calidad son el lenguaje real de la arquitectura.

Son la diferencia entre:

- Software que funciona
- Sistemas que sobreviven

Una arquitectura que no los considera explícitamente deja el destino del sistema al azar.
