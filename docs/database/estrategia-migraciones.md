---
sidebar_position: 5
sidebar_label: Estrategia de Migraciones
title: Estrategia de migraciones y versionado de esquemas
---

# Estrategia de migraciones y versionado de esquemas

## 🎯 Objetivo

Este documento describe una estrategia técnica para gestionar cambios en la base de datos de forma controlada, reproducible y segura, utilizando migraciones versionadas como mecanismo principal.

El objetivo es:

- Eliminar cambios manuales en bases de datos
- Reducir inconsistencias entre entornos
- Permitir la evolución del modelo de datos sin frenar el desarrollo
- Hacer explícita la historia del esquema

La base de datos no es un detalle de implementación; es un activo central del sistema.

## 🧠 El problema de fondo

En muchos sistemas, la base de datos:

- Se modifica manualmente
- Vive “fuera” del control de versiones
- Depende de conocimiento implícito
- Se convierte en un cuello de botella

Esto genera efectos conocidos:

- “En mi entorno sí funciona”
- Miedo a tocar tablas existentes
- Despliegues riesgosos
- Cambios irreproducibles

Las migraciones existen para domar ese caos.

## 🧩 Qué es una migración de esquema

Una migración es un cambio incremental y versionado al esquema de la base de datos.

**Características clave:**

- Es inmutable una vez aplicada
- Tiene orden explícito
- Se ejecuta de forma automatizada
- Vive en control de versiones

Una migración no es solo SQL; es historia ejecutable del modelo de datos.

## 🧱 Principios de una buena estrategia de migraciones

### 1️⃣ Versionado explícito

Cada cambio debe tener:

- Identificador único
- Orden claro
- Propósito específico

Nunca se “edita” una migración aplicada.
Los cambios se acumulan, no se reescriben.

### 2️⃣ Automatización total

Las migraciones deben:

- Ejecutarse automáticamente
- Integrarse al pipeline
- No depender de pasos manuales

Si alguien tiene que “acordarse” de correr un script, el sistema ya es frágil.

### 3️⃣ Reproducibilidad entre entornos

El mismo conjunto de migraciones debe:

- Crear el esquema desde cero
- Llevar cualquier entorno al mismo estado

Producción no es especial; solo es más sensible.

### 4️⃣ Migraciones pequeñas y enfocadas

Una migración debe:

- Cambiar una cosa
- Tener un propósito claro
- Ser fácil de entender

Migraciones gigantes son difíciles de revisar y peligrosas de revertir.

## 🔄 Migraciones forward-only vs rollback

En la práctica:

- Muchas migraciones no son fácilmente reversibles
- El rollback real suele implicar restauración de datos

Por eso:

- Se prioriza forward-only
- Se diseñan cambios compatibles hacia atrás
- Se usan despliegues en fases

El rollback no es solo técnico; es estratégico.

## ⚠️ Antipatrones comunes

- Cambios manuales “rápidos” en producción
- Migraciones que dependen del estado previo implícito
- Scripts no versionados
- Edición de migraciones ya ejecutadas

Cada uno de estos erosiona la confianza en el sistema.

## 🧠 Cierre conceptual

Las migraciones no son burocracia. Son el lenguaje formal de evolución del modelo de datos.

Un sistema sin estrategia de migraciones depende de la memoria humana.
Un sistema con migraciones bien diseñadas puede crecer sin miedo.
