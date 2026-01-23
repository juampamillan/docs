---
sidebar_position: 8
sidebar_label: Guía de ADRs
title: Uso y formato de Architecture Decision Records (ADR)
---

# Uso y formato de Architecture Decision Records (ADR)

## Objetivo

Este documento define cuándo, cómo y por qué registrar decisiones arquitectónicas mediante Architecture Decision Records (ADR).

El objetivo de los ADR no es documentar todo, sino preservar decisiones importantes que afectan la forma, evolución y calidad del sistema a lo largo del tiempo.

Un ADR responde a una necesidad fundamental del software:

> La arquitectura cambia, pero la memoria humana no escala.

## Qué es un ADR

Un ADR es un documento breve que captura:

- El contexto de una decisión
- La decisión tomada
- Las alternativas consideradas
- Las consecuencias técnicas

No describe implementación detallada, sino criterio arquitectónico.

Un ADR bien escrito permite que alguien que no estuvo presente entienda:

- Por qué se tomó la decisión
- Qué se intentaba optimizar
- Qué se aceptó como costo

### Qué NO es un ADR

No es:

- Un manual de uso
- Un documento de diseño detallado
- Un commit message largo
- Un acta burocrática

Si un ADR explica cómo escribir el código, está mal enfocado. Debe explicar por qué el código existe así.

## Por qué los ADRs son necesarios

En sistemas reales ocurre lo siguiente:

- Las decisiones se toman bajo presión
- El contexto se pierde con el tiempo
- Las personas cambian
- Las suposiciones se olvidan

**Sin ADRs:**

- Se reabren debates ya resueltos
- Se toman decisiones contradictorias
- Se repiten errores pasados
- Aparece el “siempre se hizo así”

Un ADR es un antídoto contra el olvido técnico.

## Cuándo crear un ADR

No todas las decisiones requieren ADR.

Un ADR es recomendable cuando la decisión:

- Afecta múltiples componentes
- Impacta atributos de calidad
- Es costosa de revertir
- Introduce una dependencia relevante
- Cambia la forma de trabajar del sistema

**Ejemplos típicos:**

- Elección de arquitectura (monolito, modular, microservicios)
- Selección de base de datos
- Estrategia de autenticación
- Patrón de manejo de estado
- Estrategia de comunicación entre servicios

Decisiones triviales no necesitan memoria eterna.

## Estructura estándar de un ADR

Un ADR debe ser simple, legible y consistente.
Un formato común y efectivo incluye los siguientes apartados.

### 1. Título

Debe ser claro y específico.

**Ejemplo:**
“Uso de base de datos relacional para el core transaccional”

### 2. Estado

Indica la vigencia de la decisión:

- **Propuesta**
- **Aceptada**
- **Deprecada**
- **Reemplazada**

Esto permite entender si la decisión sigue activa o fue superada.

### 3. Contexto

Describe el problema que se intenta resolver.

**Incluye:**

- Necesidades del sistema
- Restricciones conocidas
- Suposiciones relevantes
- Momento temporal

Este apartado responde a:
¿Qué estaba pasando cuando se tomó esta decisión?

### 4. Decisión

Describe claramente qué se decidió.

Debe ser concreta y sin ambigüedad.
No debe justificar todavía; solo declarar.

**Ejemplo:**
“Se utilizará una base de datos relacional para las operaciones transaccionales críticas.”

### 5. Alternativas consideradas

Lista las opciones evaluadas y por qué no fueron elegidas.

Esto es clave para:

- Evitar repetir discusiones
- Entender trade-offs
- Revaluar si el contexto cambia

Aquí vive el pensamiento arquitectónico real.

### 6. Consecuencias

Describe los efectos de la decisión:

- Beneficios esperados
- Costos asumidos
- Riesgos aceptados
- Impacto en atributos de calidad

Toda decisión tiene consecuencias; el ADR las hace explícitas.

## Dónde viven los ADRs

Los ADRs deben vivir:

- Cerca del código
- Versionados
- Accesibles para todos

**Opciones comunes:**

- Carpeta `/docs/adr`
- Repositorio de documentación
- Sitio de documentación técnica

Un ADR que no se puede encontrar es historia perdida.

## ADRs como documentos vivos

Un ADR no es inmutable.

Puede:

- Ser actualizado
- Ser reemplazado por otro
- Ser marcado como obsoleto

Cuando una decisión cambia, se registra un nuevo ADR, no se reescribe la historia.

La evolución es parte del diseño.

## Antipatrones comunes con ADRs

- Escribir ADRs después del desastre
- Usarlos solo para decisiones obvias
- Convertirlos en documentos extensos
- No actualizarlos nunca
- Escribirlos solo para “cumplir”

Un ADR inútil es peor que ninguno.

## ADRs y cultura técnica

Los ADRs fomentan:

- Pensamiento crítico
- Discusión estructurada
- Transparencia técnica
- Aprendizaje colectivo

No son control, son comunicación técnica asincrónica.

Cuando alguien lee un ADR y dice:
“Ahora entiendo por qué esto es así”

El ADR cumplió su función.

## Relación con los atributos de calidad

Cada ADR debería responder implícitamente:

- ¿Qué atributos de calidad se priorizaron?
- ¿Cuáles se sacrificaron?
- ¿Por qué ese trade-off fue aceptable?

Si un ADR no toca calidad, probablemente documenta algo irrelevante.

## Cierre conceptual

La arquitectura no se define solo por decisiones, sino por decisiones recordadas.

Los ADRs permiten:

- Evolucionar sin amnesia
- Cambiar sin improvisar
- Enseñar sin repetir errores

Un sistema sin ADRs depende de la memoria de las personas.
Un sistema con ADRs construye memoria propia.
