---
sidebar_position: 6
sidebar_label: Criterios para Cambios
title: Criterios para cambios en modelos de datos
---

# Criterios para cambios en modelos de datos

## 🎯 Objetivo

Este documento define criterios técnicos para evaluar cambios en el modelo de datos antes de implementarlos.

El objetivo es:

- Evitar modificaciones impulsivas
- Reducir deuda estructural
- Proteger flujos existentes
- Tratar el modelo de datos como un activo crítico

Un cambio en datos rara vez es local; casi siempre es transversal.

## 🧠 El modelo de datos como contrato

El modelo de datos actúa como:

- Contrato entre capas
- Fuente de verdad
- Base de reportes y analítica
- Dependencia de múltiples sistemas

Cambiarlo sin análisis es equivalente a cambiar una API pública sin versión.

## 🧩 Dimensiones de evaluación de un cambio

Antes de aprobar un cambio en el modelo de datos, se deben evaluar varias dimensiones.

### 1️⃣ Impacto funcional

**Preguntas clave:**

- ¿Qué flujos usan estos datos?
- ¿Qué consultas se verán afectadas?
- ¿Existen dependencias implícitas?

Los datos casi nunca son usados solo donde creemos.

### 2️⃣ Compatibilidad hacia atrás

**Preguntas clave:**

- ¿Rompe consumidores existentes?
- ¿Puede convivir con el esquema anterior?
- ¿Requiere cambios coordinados?

La compatibilidad es una herramienta de despliegue seguro.

### 3️⃣ Impacto en rendimiento

**Preguntas clave:**

- ¿Afecta índices?
- ¿Incrementa joins costosos?
- ¿Cambia cardinalidad o volumen?

Un cambio inocente en estructura puede ser catastrófico en ejecución.

### 4️⃣ Consistencia e integridad

**Preguntas clave:**

- ¿Se mantienen invariantes del dominio?
- ¿Existen estados inválidos posibles?
- ¿Dónde se valida la consistencia?

La base de datos no debe permitir estados imposibles del dominio.

### 5️⃣ Impacto operativo

**Preguntas clave:**

- ¿Requiere migración de datos?
- ¿Implica downtime?
- ¿Afecta backups o restores?

Un buen modelo también es operable.

## ⚖️ Evaluar costo vs valor

No todos los cambios valen lo que cuestan.

Un cambio debe justificarse por:

- Simplificación futura
- Eliminación de deuda
- Habilitación de nuevas capacidades

Cambiar por comodidad inmediata suele salir caro.

## ⚠️ Antipatrones comunes

- Cambios “rápidos” sin análisis
- Columnas genéricas sin semántica
- Sobre-normalización o desnormalización sin criterio
- Uso de la base como dumping ground

El modelo de datos refleja la madurez del sistema.

## 🧠 Cierre conceptual

El modelo de datos no se refactoriza con la misma facilidad que el código.
Por eso, cada cambio debe ser consciente, evaluado y justificado.

Diseñar datos es diseñar el futuro del sistema.
