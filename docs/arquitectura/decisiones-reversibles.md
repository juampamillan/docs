---
sidebar_position: 9
sidebar_label: Decisiones Reversibles
title: Criterios para decisiones reversibles
---

# Criterios para decisiones reversibles

## Objetivo

Este documento describe cómo identificar, clasificar y tratar decisiones reversibles e irreversibles dentro de un sistema de software.

El objetivo no es evitar decisiones difíciles, sino:

- Reducir rigidez prematura
- Minimizar el costo del error
- Favorecer aprendizaje continuo
- Diseñar arquitecturas que puedan evolucionar sin reescrituras traumáticas

Una buena arquitectura no elimina errores; los hace baratos.

## La naturaleza real de las decisiones técnicas

Toda decisión técnica tiene dos componentes:

1. Impacto
2. Costo de revertirla

El problema no es decidir mal.
El problema es decidir mal de forma irreversible sin saberlo.

Muchas arquitecturas fallan no por malas decisiones, sino por mal manejo de la reversibilidad.

## Decisiones reversibles vs irreversibles

### Decisiones reversibles

Son decisiones que:

- Pueden cambiarse con esfuerzo razonable
- No afectan profundamente el sistema
- No requieren migraciones masivas o downtime crítico

**Ejemplos:**

- Librerías internas
- Patrones de organización de código
- Frameworks de UI
- Estrategias de cache locales

### Decisiones irreversibles (o de alto costo)

Son decisiones que:

- Afectan múltiples componentes
- Impactan datos persistentes
- Condicionan el futuro del sistema
- Requieren migraciones complejas para cambiar

**Ejemplos:**

- Modelo de datos central
- Estrategia de comunicación entre servicios
- Contratos públicos de API
- Arquitectura base del sistema

## El error común: tratarlas igual

Un antipatrón frecuente es:

- Tomar decisiones irreversibles con poca información
- Tratar decisiones críticas como experimentos
- No diferenciar entre “probar” y “apostar”

La arquitectura madura cambia el proceso según el tipo de decisión.

## Principio fundamental

> Cuanto más irreversible es una decisión, más evidencia y deliberación requiere.

Y al revés:

> Cuanto más reversible, más rápido se puede decidir.

Este principio evita dos extremos:

1. Parálisis por análisis
2. Temeridad técnica

## Criterios para evaluar reversibilidad

Antes de tomar una decisión importante, conviene evaluar:

### 1. Impacto en datos

**Preguntas clave:**

- ¿Afecta datos persistentes?
- ¿Requiere migraciones complejas?
- ¿Se puede coexistir con el modelo anterior?

Las decisiones que tocan datos suelen ser costosas de revertir.

### 2. Superficie de acoplamiento

**Preguntas clave:**

- ¿Cuántos componentes dependen de esto?
- ¿Es un contrato público?
- ¿Está expuesto a terceros?

Cuanto mayor el acoplamiento, menor la reversibilidad.

### 3. Coste operativo

**Preguntas clave:**

- ¿Requiere downtime para cambiar?
- ¿Afecta despliegues?
- ¿Complica monitoreo u operación?

Una decisión difícil de operar también es difícil de revertir.

### 4. Costo humano

**Preguntas clave:**

- ¿Requiere reaprender herramientas?
- ¿Depende de conocimiento especializado?
- ¿Genera dependencia de personas clave?

El factor humano suele subestimarse y es crítico.

## Estrategias para decisiones de alto impacto

Cuando una decisión es poco reversible, conviene:

- **Diseñar para coexistencia**: Permitir que lo nuevo y lo viejo vivan juntos temporalmente.
- **Introducir capas de aislamiento**: Encapsular decisiones detrás de interfaces claras.
- **Usar pruebas controladas**: Pilotos, canary releases, feature flags.
- **Documentar explícitamente**: Registrar contexto, riesgos y supuestos mediante ADRs.

No todo se puede probar, pero mucho se puede aislar.

## Tratar decisiones reversibles como experimentos

Las decisiones reversibles son oportunidades de aprendizaje.

**Buenas prácticas:**

- Time-boxing
- Prototipos
- Pruebas A/B
- Métricas claras de éxito

Aquí la velocidad importa más que la perfección.

## Relación con los ADRs

Un ADR debería indicar implícitamente:

- Si la decisión es reversible
- Bajo qué condiciones se reconsideraría
- Qué señales indicarían que fue incorrecta

Esto convierte al ADR en una herramienta de gestión del cambio, no solo de memoria.

## Antipatrones comunes

- Diseñar todo como irreversible
- Congelar decisiones por miedo
- Cambiar decisiones críticas sin plan
- Confundir flexibilidad con falta de criterio

La flexibilidad bien diseñada no es caos, es resiliencia.

## Arquitectura como sistema de aprendizaje

Una arquitectura saludable:

- Aprende de la realidad
- Ajusta decisiones
- Reduce el costo del error
- Evita apuestas innecesarias

El objetivo no es acertar siempre, sino sobrevivir a los errores.
