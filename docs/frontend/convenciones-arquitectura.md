---
sidebar_position: 5
sidebar_label: Convenciones de Arquitectura
title: Convenciones de Arquitectura Frontend
---

# Convenciones de Arquitectura Frontend

## Propósito del documento

Este documento define un conjunto de convenciones de arquitectura frontend cuyo objetivo principal es reducir la fricción cognitiva al trabajar en aplicaciones de mediana y gran escala. No busca imponer un framework específico ni una única forma “correcta” de construir interfaces, sino establecer un lenguaje común que permita a múltiples personas colaborar, mantener y evolucionar el código con seguridad.

En sistemas pequeños, muchas decisiones pueden tomarse de forma implícita. En sistemas que crecen —en número de features, personas o años de vida— esas decisiones implícitas se convierten en deuda. La arquitectura frontend existe para hacer explícitas esas decisiones, antes de que el caos lo haga por nosotros.

## Principios rectores

Antes de hablar de carpetas, archivos o patrones, es importante dejar claros algunos principios que guían estas convenciones.

**El frontend es un sistema, no solo vistas.** Un frontend moderno no es únicamente una colección de pantallas. Maneja estado complejo, reglas de negocio, flujos asincrónicos, permisos, errores y experiencia de usuario. Por tanto, debe tratarse como un sistema de software completo, con arquitectura, límites y responsabilidades claras.

**Optimizar para lectura, no para escritura.** El código frontend se escribe una vez, pero se lee cientos de veces. Estas convenciones priorizan que cualquier persona pueda entender rápidamente qué hace el sistema, dónde vive cada cosa y qué no debería tocar, incluso sin haber participado en su desarrollo original.

**Separación de responsabilidades por intención, no por tecnología.** Separar “componentes”, “hooks” y “servicios” no es suficiente si no está claro para qué existe cada cosa. La arquitectura debe expresar intención: qué es UI, qué es estado, qué es lógica de dominio y qué es infraestructura.

## Estructura general del frontend

La estructura de carpetas no es solo organización estética. Es una forma de comunicación. Una buena estructura responde preguntas sin necesidad de abrir archivos.

Una estructura base recomendada podría verse conceptualmente así:

```
src
├── app – configuración de la aplicación (routing, providers)
├── modules – features o dominios funcionales
├── shared – elementos reutilizables y transversales
├── services – acceso a APIs y servicios externos
├── state – estado global y configuración
├── styles – estilos globales y tokens de diseño
└── utils – utilidades puras
```

Esta estructura no es rígida, pero sí intencional. Cada carpeta tiene un propósito claro y evita mezclar conceptos incompatibles.

## Arquitectura basada en módulos (feature-oriented)

Una de las decisiones más importantes es organizar el frontend por dominio funcional, no por tipo técnico.

Un módulo representa una capacidad del sistema, por ejemplo: autenticación, usuarios, reportes, dashboard o facturación. Cada módulo encapsula todo lo necesario para cumplir su función: componentes, hooks, páginas, estado propio y servicios.

La idea central es que, para entender o modificar un feature, el contexto esté concentrado en un solo lugar. Esto reduce el acoplamiento entre features, facilita eliminar o refactorizar módulos completos, mejora el onboarding y permite que equipos distintos trabajen en paralelo con menor fricción.

Un síntoma claro de mala arquitectura es cuando, para entender un feature, hay que saltar entre diez carpetas distintas repartidas por todo el proyecto.

## Componentes y responsabilidades

No todos los componentes son iguales, y tratarlos como si lo fueran suele generar confusión.

**Los componentes de presentación** están enfocados exclusivamente en renderizar UI. No conocen APIs, no manejan estado global y reciben datos y callbacks por props. Son predecibles, reutilizables y fáciles de testear. Estos componentes pueden vivir en shared o dentro de un módulo si son específicos de ese dominio.

**Por otro lado, existen componentes contenedores o de composición.** Su responsabilidad es conectar estado, llamar hooks, orquestar flujos y decidir qué se renderiza. Idealmente, no contienen markup complejo, sino que ensamblan componentes de presentación. Esta separación evita que los componentes se conviertan en unidades gigantes que hacen todo y son difíciles de mantener.

## Manejo de estado

Uno de los mayores focos de complejidad en frontend es el estado. No todo estado es igual, y mezclar niveles genera errores sutiles y difíciles de rastrear.

**El estado local** pertenece a un componente o a un flujo muy acotado. Ejemplos típicos son inputs de un formulario, el estado de un modal o banderas puramente visuales. Este estado debe vivir lo más cerca posible de donde se usa.

**El estado compartido por módulo** aparece cuando varios componentes dentro del mismo dominio necesitan acceder a la misma información. En estos casos, se recomienda encapsular ese estado en hooks o stores a nivel de módulo, evitando llevarlo innecesariamente al estado global de la aplicación.

**El estado global** debe ser mínimo y claramente justificado. Ejemplos válidos suelen ser la sesión del usuario, permisos, tema visual o feature flags. Cada pieza de estado global debería responder con claridad a la pregunta: ¿múltiples módulos realmente necesitan esto? Si la respuesta es no, probablemente no debería ser global.

## Lógica de negocio en el frontend

Aunque parte de la lógica viva en el backend, el frontend suele contener reglas importantes: validaciones complejas, decisiones de UI basadas en estado, transformación de datos y flujos condicionales. Esta lógica no debería vivir directamente dentro de los componentes visuales.

La recomendación es extraerla a hooks personalizados, servicios del módulo o funciones puras en utilidades. Una regla práctica es que, si algo no renderiza UI, probablemente no debería estar dentro de un componente.

Esta separación mejora la legibilidad, reduce duplicación y facilita pruebas.

## Servicios y comunicación con APIs

El acceso a APIs debe estar centralizado y abstraído. Los componentes no deberían hacer llamadas HTTP directamente. En su lugar, deben consumir servicios bien definidos que encapsulen los endpoints, el manejo de errores y la transformación de datos.

Esto permite cambiar la implementación sin tocar la UI, facilita el mocking en pruebas y asegura consistencia en cómo la aplicación interactúa con sistemas externos.

## Separación entre arquitectura y framework

Estas convenciones están diseñadas para sobrevivir a cambios tecnológicos. React, Vue, Next.js u otros frameworks son herramientas, no arquitectura. Una señal de madurez es poder identificar qué conceptos sobreviven si mañana cambia el framework.

Si casi nada sobrevive, probablemente la arquitectura esté demasiado acoplada a la tecnología y no al dominio del problema.

## Antipatrones comunes

Algunos olores que indican problemas estructurales son carpetas gigantes de componentes sin criterio, hooks que mezclan llamadas a API, estado global y lógica compleja, uso del estado global como cache por conveniencia, componentes con múltiples responsabilidades o lógica de negocio duplicada en distintos lugares.

Estos problemas no aparecen de golpe. Emergen cuando no existen convenciones explícitas o cuando se dejan de respetar.

## Evolución de la arquitectura

Estas convenciones no son estáticas. Deben revisarse y evolucionar conforme el sistema crece y el equipo aprende. Un frontend saludable tolera el cambio, hace visibles las decisiones, reduce la dependencia de individuos específicos y permite modificar el sistema sin miedo constante a romperlo.

La arquitectura no elimina la complejidad, pero puede colocarla en lugares predecibles y controlables.

## Cierre

La arquitectura frontend no es un lujo ni una preocupación prematura. Es una inversión en claridad, sostenibilidad y colaboración. Estas convenciones existen para que el código cuente su propia historia sin necesidad de intérpretes.

Cuando la arquitectura es buena, el frontend deja de ser frágil y empieza a comportarse como lo que realmente es: un sistema serio que evoluciona con el tiempo.
