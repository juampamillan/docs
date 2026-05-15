---
sidebar_position: 11
sidebar_label: Design System
---

# Design System

Un Design System (Sistema de Diseño) garantiza coherencia visual y acelera el desarrollo al proveer un lenguaje compartido entre diseño y desarrollo.

## Por qué usar un Design System

- **Consistencia:** El mismo botón se ve y se comporta igual en toda la plataforma.
- **Velocidad:** Los desarrolladores ensamblan UI en lugar de escribir CSS desde cero.
- **Shared Language:** Diseñadores y desarrolladores hablan de "Molecules/Header" o "Token/Color/Primary", no de `#0055ff`.

:::info Beneficio a Escala
Un sistema de diseño compartido es el principal acelerador para equipos que trabajan con arquitecturas distribuidas de Microfrontends.
:::

## Atomic Design

Metodología para construir componentes desde lo más básico hasta lo más complejo:

1. **Átomos:** Botones, inputs, tipografía, iconos. (No se pueden romper más).
2. **Moléculas:** Un grupo de átomos (ej. un Input con su Label y un Botón de "Buscar").
3. **Organismos:** Secciones completas de UI (ej. un Header completo).
4. **Plantillas/Páginas:** Estructuras que usan organismos.

## Design Tokens

Los tokens de diseño son las decisiones visuales básicas codificadas como variables (JSON, CSS Variables).

```css
:root {
  /* Tokens Básicos */
  --color-brand-500: #2563eb;
  --spacing-4: 1rem;
  --font-body: 'Inter', sans-serif;

  /* Tokens Semánticos */
  --button-primary-bg: var(--color-brand-500);
}
```

## Documentación con Storybook

Storybook es el estándar para documentar componentes aislados. Permite a diseñadores y QAs visualizar todos los estados posibles de un componente sin necesidad de correr la aplicación completa.

## Cuándo crear un Design System vs usar Tailwind

| Escenario | Estrategia Recomendada |
| :--- | :--- |
| **MVP, Proyecto único, Equipo pequeño** | Tailwind CSS y componentes de UI locales (ej. shadcn/ui). No sobre-ingenierizar. |
| **Múltiples Microfrontends, Varios equipos** | Design System centralizado exportado como paquete npm para asegurar consistencia visual entre repositorios. |
