---
title: Estrategia de despliegue y rollback
sidebar_label: Despliegue y Rollback
sidebar_position: 7
---

# Estrategia de despliegue y rollback

## 🎯 Objetivo

Este documento describe cómo desplegar software en producción de forma controlada y cómo revertir cambios cuando algo falla, sin improvisación ni pánico.
El objetivo es reducir el impacto de errores, acortar el tiempo de recuperación y convertir los despliegues en un proceso predecible, repetible y seguro.

Una buena estrategia de despliegue no evita los errores; una buena estrategia de rollback evita que los errores se conviertan en incidentes mayores.

## 🧠 Principio fundamental

Todo despliegue debe cumplir dos condiciones básicas:

1.  **Debe ser reversible**
2.  **Debe ser observable**

Si no puedes volver atrás rápidamente o no puedes saber qué está fallando, entonces no estás desplegando: estás apostando.

## 🚀 Qué es un despliegue (y qué no)

Un despliegue es el proceso mediante el cual una nueva versión del software pasa a atender tráfico real de usuarios.

**No es:**

*   Subir código a un repositorio
*   Hacer merge a main
*   Construir una imagen Docker

Es activar una versión nueva en producción.

Esta distinción es clave porque el rollback también ocurre en producción, no en el repositorio.

## 🧩 Componentes básicos de una estrategia de despliegue

Toda estrategia, sin importar la tecnología, se apoya en cuatro elementos:

### 1. Versionado claro

Cada despliegue debe estar asociado a una versión identificable:

*   Tag de Git
*   Versión semántica (v1.4.2)
*   Hash de commit
*   Imagen Docker con digest

Sin versionado, no hay rollback confiable.

### 2. Artefactos inmutables

El artefacto que se despliega no se modifica después de construirse.

Ejemplos:

*   Imagen Docker
*   Binario compilado
*   Paquete estático

Esto garantiza que:

Revertir significa volver a ejecutar algo conocido, no reconstruir algo “parecido”.

### 3. Separación entre deploy y release

Desplegar no siempre significa liberar inmediatamente al usuario final.

Esto permite:

*   Activar una versión sin exponer tráfico
*   Probar en producción sin riesgo
*   Habilitar o deshabilitar funcionalidades de forma controlada

Aquí entran conceptos como:

*   Feature flags
*   Rutas paralelas
*   Configuración dinámica

### 4. Señales de salud

Después de un despliegue, el sistema debe decirte si está bien o no.

Sin señales claras, el rollback se retrasa o nunca ocurre.

## 🧪 Estrategias comunes de despliegue

No existe una estrategia universal. Cada una tiene ventajas y costos.

### 🔹 Rolling deployment

La versión nueva se despliega gradualmente reemplazando instancias antiguas.

**Ventajas:**

*   No requiere duplicar infraestructura
*   Simplicidad operativa

**Riesgos:**

*   Convivencia temporal de versiones
*   Rollback más lento si el error es sistémico

### 🔹 Blue-Green deployment

Existen dos entornos idénticos:

*   **Blue** (actual)
*   **Green** (nuevo)

El tráfico cambia de uno a otro.

**Ventajas:**

*   Rollback inmediato
*   Entornos aislados

**Riesgos:**

*   Mayor costo de infraestructura
*   Requiere buen manejo de estado y base de datos

### 🔹 Canary deployment

La nueva versión recibe solo una fracción del tráfico.

**Ventajas:**

*   Detección temprana de errores
*   Impacto controlado

**Riesgos:**

*   Mayor complejidad
*   Requiere buena observabilidad

### 🔹 Feature flags como estrategia

El código se despliega apagado y se activa por configuración.

**Ventajas:**

*   Rollback lógico sin redeploy
*   Control fino por usuario o región

**Riesgos:**

*   Acumulación de flags
*   Complejidad si no se limpian

## 🔁 Qué es realmente un rollback

Un rollback **no es**:

*   “Arreglar rápido y volver a desplegar”
*   “Hacer hotfix directo en producción”

Un rollback **es**:

Volver a una versión conocida y estable en el menor tiempo posible.

Esto implica:

*   Misma infraestructura
*   Mismo artefacto
*   Configuración compatible

### ⏱️ Tiempo esperado de recuperación (MTTR)

Una estrategia sana apunta a:

*   Rollback automático o semi-automático
*   Tiempo de recuperación en minutos, no horas
*   Decisiones basadas en métricas, no intuición

Si el rollback requiere:

*   Debug manual
*   Acceso por SSH
*   Cambios urgentes de código

Entonces la estrategia es frágil.

## 🧠 Base de datos y rollback: el punto crítico

El código suele ser fácil de revertir.
La base de datos no.

**Buenas prácticas:**

*   Cambios compatibles hacia atrás
*   Migraciones en dos pasos
*   Nunca asumir que “nadie usa esa columna”

**Regla de oro:**

El rollback del código no debe romper el esquema existente.

## 🚨 Antipatrones comunes

*   No definir rollback porque “nunca falla”
*   Confiar en hotfixes manuales
*   Desplegar cambios irreversibles
*   No probar el rollback
*   Enterarse del fallo por usuarios

Estos patrones no fallan de inmediato; fallan cuando más duele.

## 🧭 Criterios de una buena estrategia de despliegue

Una estrategia madura permite:

*   Desplegar con frecuencia
*   Revertir sin miedo
*   Detectar errores temprano
*   Aprender sin castigar al sistema

El despliegue deja de ser un evento estresante y se convierte en una rutina técnica.

## 🧠 Cierre conceptual

El verdadero indicador de madurez no es qué tan rápido despliegas, sino qué tan rápido puedes volver atrás sin causar daño.

Los sistemas resilientes no confían en la perfección, confían en su capacidad de recuperación.
