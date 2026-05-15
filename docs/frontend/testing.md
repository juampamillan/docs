---
sidebar_position: 8
sidebar_label: Testing de Frontend
---

# Testing de Frontend

El testing en frontend no debe enfocarse en los detalles de implementación (cómo se renderiza internamente), sino en el comportamiento: qué ve y qué puede hacer el usuario.

## Qué Testear

- **Lógica Pura:** Funciones utilitarias, formateadores. (Unit Testing).
- **Hooks Personalizados (React):** Lógica de estado compleja.
- **Componentes UI:** Interacción del usuario, estados de carga/error. (Integration Testing).

:::tip Testear Comportamiento
No testees si una variable de estado local cambió de `false` a `true`. Testea si al hacer clic en el botón, el texto "Cargando..." aparece en pantalla.
:::

## Testing Library como Estándar

`@testing-library/react` es el estándar porque fuerza a escribir tests desde la perspectiva del usuario (ej. buscar por texto o rol, no por id o clase CSS).

### Ejemplo: Test de Componente React

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BotonContador } from './BotonContador';

test('incrementa el contador al hacer clic', () => {
  render(<BotonContador />);

  // El usuario busca un botón que dice "Clicks: 0"
  const boton = screen.getByRole('button', { name: /clicks: 0/i });
  expect(boton).toBeInTheDocument();

  // El usuario hace clic
  fireEvent.click(boton);

  // El usuario espera ver "Clicks: 1"
  expect(screen.getByRole('button', { name: /clicks: 1/i })).toBeInTheDocument();
});
```

### Ejemplo: Test de Custom Hook

Con `@testing-library/react-hooks` (o integrado en RTL en versiones modernas):

```tsx
import { renderHook, act } from '@testing-library/react';
import { useContador } from './useContador';

test('debe incrementar el valor', () => {
  const { result } = renderHook(() => useContador());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.incrementar();
  });

  expect(result.current.count).toBe(1);
});
```

## Vitest vs Jest

- **Vitest:** Recomendado para proyectos modernos basados en Vite. Es significativamente más rápido, requiere menos configuración y soporta ESM de forma nativa.
- **Jest:** Estándar histórico. Usar en proyectos legacy o basados en Webpack.

## Cuándo usar Testing E2E (Playwright / Cypress)

Los tests E2E son frágiles y lentos. Se deben usar con moderación.

- **Cuándo SÍ:** Flujos críticos de negocio donde participan Frontend, Backend y BD reales (ej. Flujo de Login completo, Checkout de e-commerce).
- **Cuándo NO:** Validar si un botón cambia de color al hover, testear todas las variantes de un input. Para eso están los tests de componentes o Storybook.
