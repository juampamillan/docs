---
title: Pipeline Estándar de CI/CD
sidebar_label: Pipeline Estándar
sidebar_position: 5
---

# Pipeline Estándar de CI/CD

## Propósito del documento

Este documento define el pipeline estándar de Integración Continua y Despliegue Continuo (CI/CD) que deben seguir los proyectos de la organización. Su objetivo es establecer una base común y confiable que permita integrar cambios de forma frecuente, detectar errores temprano y desplegar a producción con menor riesgo.

Un pipeline estándar no busca limitar la autonomía de los equipos ni imponer una única herramienta o proveedor. Busca algo más fundamental: reducir la variabilidad innecesaria. Cuando cada proyecto tiene un pipeline distinto, los errores se multiplican, el aprendizaje no se comparte y la operación se vuelve frágil.

Este documento convierte el pipeline en una pieza explícita de la arquitectura del sistema, no en un script accidental.

## Qué es y qué no es un pipeline estándar

Un pipeline estándar es un contrato operativo mínimo. Define qué etapas deben existir, qué validaciones son obligatorias y bajo qué condiciones un cambio puede avanzar.

No es:

- Una implementación específica en una herramienta concreta.
- Una receta cerrada que no puede extenderse.
- Un obstáculo burocrático para desplegar.

Sí es:

- Un flujo base reproducible.
- Una garantía mínima de calidad y seguridad.
- Un lenguaje común entre desarrollo, QA y operaciones.

La estandarización no elimina la innovación; elimina el caos innecesario.

## Principios del pipeline

Antes de describir las etapas, es importante entender los principios que lo gobiernan.

- El pipeline es la primera línea de defensa del sistema. Todo lo que pueda detectarse automáticamente antes de producción debe detectarse ahí.
- El pipeline debe ser rápido. Un pipeline lento rompe el feedback loop y empuja a los equipos a evadirlo.
- El pipeline debe ser determinista. Un mismo commit debe producir el mismo resultado independientemente de quién lo ejecute.
- El pipeline debe fallar de forma clara. Un fallo ambiguo es casi tan malo como no fallar.

## Estructura general del pipeline

Todo proyecto debe contar, como mínimo, con las siguientes etapas lógicas, aunque su implementación técnica pueda variar.

1. Validación de código
2. Build
3. Pruebas
4. Análisis estático y calidad
5. Empaquetado del artefacto
6. Despliegue controlado

Estas etapas reflejan el ciclo natural del software desde el cambio hasta su ejecución.

### Etapa 1: Validación de código

Esta es la etapa más barata y, por tanto, una de las más importantes.

Aquí se valida que el código:

- Compile o transpile correctamente.
- Cumpla reglas básicas de formato y estilo.
- No tenga errores obvios de sintaxis o tipado.

Cualquier fallo en esta etapa debe detener el pipeline inmediatamente. No tiene sentido ejecutar pruebas o despliegues si el código ni siquiera cumple condiciones mínimas de sanidad.

Una regla fundamental: si falla localmente, debe fallar en el pipeline.

### Etapa 2: Build

La etapa de build genera el artefacto que eventualmente se desplegará. Esto puede ser un bundle frontend, una imagen de contenedor, un binario o cualquier unidad ejecutable.

Criterios mínimos:

- El build debe ser reproducible.
- No debe depender de estado externo mutable.
- Debe ejecutarse de la misma forma en todos los entornos.

El artefacto generado aquí es la unidad que avanza por el pipeline. No se recompila en cada entorno; se promueve.

### Etapa 3: Pruebas

Las pruebas no son un lujo; son una validación automática de supuestos.

El pipeline debe ejecutar al menos:

- Pruebas unitarias relevantes.
- Pruebas de integración básicas si existen.

No se espera cobertura perfecta, pero sí pruebas sobre:

- Lógica crítica.
- Flujos que no deben romperse.
- Comportamientos que ya fallaron en el pasado.

Un pipeline que no ejecuta pruebas transmite una falsa sensación de seguridad.

### Etapa 4: Análisis estático y calidad

Esta etapa busca detectar problemas que no necesariamente rompen el build, pero degradan el sistema a mediano plazo.

Ejemplos:

- Complejidad excesiva.
- Código duplicado.
- Dependencias inseguras.
- Violaciones de convenciones.

No todos los hallazgos deben bloquear el pipeline, pero algunos sí. La organización debe definir qué reglas son obligatorias y cuáles son informativas.

La calidad técnica no debe depender solo de revisiones humanas.

### Etapa 5: Empaquetado y versionado del artefacto

Una vez validado, el artefacto debe:

- Ser versionado de forma clara.
- Almacenarse en un repositorio confiable.
- Ser inmutable.

Esto permite trazabilidad completa: saber qué versión está en producción, de qué commit proviene y qué validaciones pasó.

Sin artefactos versionados, no hay rollback confiable.

### Etapa 6: Despliegue controlado

El pipeline debe definir cómo y cuándo se despliega un cambio.

Criterios mínimos:

- El despliegue no debe ser manual paso a paso.
- Debe existir al menos un entorno previo a producción.
- El despliegue debe ser observable.

El pipeline no solo entrega código; orquesta cambios en sistemas vivos.

## Criterios de éxito del pipeline

Un pipeline estándar se considera exitoso si:

- Detecta errores temprano.
- Reduce despliegues fallidos.
- Permite identificar rápidamente qué salió mal.
- Es entendido por cualquier persona del equipo.
- Se ejecuta de forma consistente en todos los proyectos.

Si el pipeline requiere “la persona que sabe cómo funciona”, es una señal de riesgo.

## Antipatrones comunes en CI/CD

Algunos errores frecuentes que este documento busca evitar:

- Pipelines distintos en cada proyecto sin razón.
- Validaciones que se saltan “por urgencia”.
- Builds que se repiten en cada entorno.
- Despliegues manuales fuera del pipeline.
- Falta de visibilidad sobre el estado del pipeline.

Estos antipatrones suelen aparecer cuando el pipeline no se trata como parte del sistema.

## Evolución del pipeline

El pipeline estándar es un punto de partida, no un techo.

Los equipos pueden:

- Agregar etapas adicionales.
- Optimizar tiempos.
- Introducir nuevas validaciones.

Pero nunca eliminar las etapas mínimas sin una justificación explícita y consensuada.

La estandarización crea una base común sobre la cual es posible evolucionar con seguridad.

## Cierre

Un pipeline de CI/CD no es solo automatización; es política operativa codificada. Define qué cambios son aceptables, cómo se validan y bajo qué condiciones llegan a producción.

Cuando el pipeline es claro, confiable y compartido, el sistema se vuelve más predecible y el equipo gana velocidad real. No porque corra más rápido, sino porque tropieza menos.
