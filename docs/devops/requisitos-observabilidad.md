---
title: Requisitos Mínimos de Observabilidad
sidebar_label: Observabilidad
sidebar_position: 6
---

# Requisitos Mínimos de Observabilidad

## Propósito del documento

Este documento describe los requisitos mínimos de observabilidad que debería cumplir cualquier sistema que opere en producción. Su objetivo es servir como referencia técnica para comprender qué información es necesario exponer para poder operar software con confianza, detectar problemas de forma temprana y diagnosticar fallos sin depender de suposiciones o conocimiento implícito.

La observabilidad no se presenta aquí como una mejora opcional ni como una preocupación avanzada reservada a sistemas “grandes”. Es un requisito operativo básico para cualquier sistema que se espera que funcione de manera confiable a lo largo del tiempo.

## Qué es observabilidad

La observabilidad es la capacidad de entender qué está ocurriendo dentro de un sistema a partir de la información que este expone externamente.

No se trata solo de saber si el sistema está “arriba” o “abajo”, sino de poder responder preguntas como:

*   ¿Está funcionando como se espera?
*   ¿Dónde está fallando?
*   ¿Por qué está fallando?
*   ¿Desde cuándo ocurre el problema?

Un sistema observable permite responder estas preguntas sin modificar el código ni desplegar cambios de emergencia.

### Observabilidad vs monitoreo

Aunque suelen usarse como sinónimos, observabilidad y monitoreo no son lo mismo.

*   El **monitoreo** responde a preguntas conocidas: métricas predefinidas, alertas esperadas, umbrales configurados.
*   La **observabilidad** permite investigar lo desconocido: comportamientos emergentes, fallos nuevos, interacciones inesperadas.

El monitoreo es un subconjunto de la observabilidad. Un sistema puede estar monitoreado sin ser verdaderamente observable.

## Los tres pilares de la observabilidad

La observabilidad moderna se apoya en tres tipos fundamentales de señales: logs, métricas y trazas. Ninguna por sí sola es suficiente.

### Logs

Los logs son registros estructurados de eventos que ocurren dentro del sistema.

Un sistema mínimamente observable debe emitir logs que:

*   Sean legibles y estructurados.
*   Incluyan contexto relevante (identificadores, estados, errores).
*   Permitan reconstruir qué ocurrió antes, durante y después de un fallo.

Los logs no deben ser solo mensajes de texto arbitrarios; deben contar una historia coherente.

### Métricas

Las métricas son mediciones numéricas agregadas a lo largo del tiempo. Permiten observar tendencias, patrones y anomalías.

Ejemplos comunes incluyen:

*   Tiempos de respuesta.
*   Tasas de error.
*   Uso de recursos.
*   Cantidad de solicitudes procesadas.

Las métricas permiten responder rápidamente si algo está fuera de lo normal, incluso antes de que un usuario lo reporte.

### Trazas

Las trazas permiten seguir una solicitud a través de múltiples componentes o servicios.

Son especialmente importantes en sistemas distribuidos, donde una sola acción del usuario puede atravesar varias capas.

Una traza mínima debe permitir:

*   Identificar el inicio y fin de una solicitud.
*   Conocer qué componentes participaron.
*   Medir tiempos parciales.
*   Detectar cuellos de botella.

Sin trazas, los sistemas distribuidos se vuelven opacos.

## Requisitos mínimos de logging

Para que los logs sean útiles, deben cumplir ciertos requisitos básicos.

*   Los logs deben ser estructurados, idealmente en formatos que faciliten búsqueda y análisis automático.
*   Deben existir niveles claros de severidad (información, advertencia, error) con criterios coherentes de uso.
*   Los errores deben incluir contexto suficiente para entender el fallo sin necesidad de reproducirlo localmente.
*   Los logs no deben exponer información sensible ni depender del entorno local para ser interpretados.

Un exceso de logs irrelevantes es tan problemático como la ausencia de logs.

## Requisitos mínimos de métricas

Las métricas mínimas deben permitir evaluar la salud general del sistema.

Al menos debería ser posible observar:

*   Latencia.
*   Tasa de errores.
*   Volumen de tráfico.
*   Saturación de recursos críticos.

Estas métricas deben recolectarse de forma continua y ser accesibles sin fricción durante un incidente.

Las métricas no deben definirse solo cuando ocurre un problema; deben existir antes.

## Requisitos mínimos de trazabilidad

Un sistema mínimamente observable debe permitir correlacionar eventos.

Esto implica:

*   Identificadores de correlación consistentes.
*   Propagación de contexto entre componentes.
*   Capacidad de unir logs, métricas y trazas.

Sin correlación, cada señal vive aislada y el diagnóstico se vuelve lento y especulativo.

## Observabilidad y errores

Un error sin observabilidad es solo un síntoma.

Cuando ocurre un fallo, el sistema debería permitir responder rápidamente:

*   Qué falló.
*   Dónde falló.
*   A quién afectó.
*   Desde cuándo ocurre.
*   Qué cambió antes del fallo.

Si estas preguntas no pueden responderse con la información disponible, la observabilidad es insuficiente.

## Observabilidad como diseño, no como parche

La observabilidad no debe añadirse después de que el sistema está en producción. Debe considerarse desde el diseño.

Esto implica:

*   Pensar qué será difícil de diagnosticar.
*   Definir qué señales se necesitarán.
*   Evitar depender de logs improvisados.

La observabilidad es una forma de empatía con el futuro: con quien operará el sistema bajo presión.

## Antipatrones comunes de observabilidad

Algunos errores frecuentes incluyen:

*   Confiar solo en logs.
*   Generar logs no estructurados.
*   Tener métricas sin contexto.
*   No correlacionar señales.
*   Descubrir la falta de observabilidad durante un incidente.

Estos antipatrones suelen aparecer cuando la observabilidad se trata como un extra opcional.

## Observabilidad y aprendizaje

Un sistema observable no solo permite reaccionar ante fallos; también permite aprender.

Permite:

*   Entender comportamientos reales de uso.
*   Detectar degradaciones progresivas.
*   Validar suposiciones técnicas.
*   Mejorar decisiones futuras.

La observabilidad convierte la operación en una fuente continua de feedback.

## Evolución de la observabilidad

Los requisitos mínimos descritos aquí son solo un punto de partida.

Con el tiempo, pueden incorporarse:

*   Alertas más sofisticadas.
*   Dashboards especializados.
*   Análisis predictivo.
*   Automatización de respuestas.

Lo importante es que la base exista y sea sólida.

## Cierre

La observabilidad no es una herramienta ni un dashboard; es una capacidad del sistema.

Un sistema que no puede explicarse a sí mismo es un sistema frágil.
Uno que expone señales claras puede fallar, pero puede recuperarse con rapidez y aprender de ello.

Como referencia técnica, estos requisitos mínimos buscan establecer un marco claro para construir sistemas que no solo funcionen, sino que puedan entenderse cuando dejan de hacerlo.
