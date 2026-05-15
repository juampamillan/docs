---
sidebar_position: 3
sidebar_label: Onboarding de Desarrolladores
---

# Onboarding de Desarrolladores

El onboarding técnico es la primera impresión que tiene un desarrollador de la madurez de ingeniería del equipo. Un onboarding desestructurado resulta en frustración y semanas de baja productividad.

## Por qué importa el Onboarding

El costo de un mal onboarding es un desarrollador senior incapaz de empujar código durante un mes porque no tiene los permisos adecuados, no entiende la arquitectura o los proyectos no levantan localmente.

## Estructura de un README Efectivo

El `README.md` del repositorio principal es el punto de entrada. Debe contener:

1. **Propósito:** ¿Qué problema de negocio resuelve este proyecto?
2. **Prerrequisitos:** Versiones exactas necesarias (Node 18+, Python 3.11, Docker).
3. **Puesta en Marcha Local:** Pasos exactos (copiar y pegar) para correr la app. (Ej. `docker-compose up -d && npm run dev`).
4. **Testing:** Cómo ejecutar la suite de pruebas.
5. **Arquitectura:** Diagrama o enlace a la documentación técnica.

:::tip Documentación Local
Si el README no sirve para levantar el proyecto sin hacer preguntas a otros devs, el README está incompleto y debe ser corregido.
:::

## Checklist de Día 1

Un nuevo desarrollador debería poder lograr esto el primer día:

- [ ] Clonar el repositorio principal.
- [ ] Configurar sus variables de entorno de desarrollo (`.env`).
- [ ] Ejecutar el proyecto localmente sin errores inexplicables.
- [ ] Pasar los tests en su máquina.
- [ ] Desplegar un PR trivial (como agregar su nombre al archivo `CONTRIBUTORS.md` o corregir un typo).

## Buddy System

Asignar un "Onboarding Buddy" al nuevo ingreso durante las primeras 2 semanas.
- El rol del buddy no es hacerle el trabajo, sino ser el punto focal seguro para preguntas que el nuevo ingreso podría considerar "tontas".
- El buddy acompaña en el primer despliegue a producción.

## Métricas de Onboarding

Para evaluar si el proceso es saludable, medir:
- **Time-to-first-commit:** Tiempo desde que recibe la computadora hasta que sube código funcional localmente.
- **Time-to-first-PR-merged:** Tiempo hasta que una porción de código (por pequeña que sea) llega a la rama principal.

:::tip Puesta a Prueba
La mejor forma de probar que la documentación local funciona es pedirle al nuevo desarrollador que la siga paso a paso y corrija la documentación si algún paso estaba obsoleto.
:::
