---
sidebar_position: 9
sidebar_label: Performance y Web Vitals
---

# Performance y Web Vitals

El rendimiento frontend no es solo sobre tiempos de carga, sino sobre la experiencia percibida. Google define esta experiencia a través de las Core Web Vitals.

## Core Web Vitals

| Métrica | Qué mide | Umbral "Bueno" |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | Tiempo de carga del elemento visible más grande (imagen hero, texto principal). | < 2.5 segundos |
| **INP** (Interaction to Next Paint) | Latencia visual ante interacciones del usuario (clics, teclado). Reemplaza a FID. | < 200 ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual. Cuánto saltan los elementos mientras se carga la página. | < 0.1 |

## Técnicas de Optimización

### Code Splitting y Lazy Loading

No enviar todo el JavaScript en el primer renderizado. Dividir el código en trozos (chunks) y cargar solo lo necesario para la ruta actual.

**Ejemplo con React.lazy y Suspense:**

```tsx
import React, { Suspense } from 'react';

// Se cargará solo cuando se renderice
const GraficoPesado = React.lazy(() => import('./GraficoPesado'));

function Dashboard() {
  return (
    <div>
      <h1>Mi Dashboard</h1>
      <Suspense fallback={<div>Cargando gráfico...</div>}>
        <GraficoPesado />
      </Suspense>
    </div>
  );
}
```

:::tip Optimización Proactiva
El análisis de bundle con herramientas como rollup-plugin-visualizer es fundamental para evitar empaquetar librerías enteras cuando solo se usa una función.
:::

### Tree Shaking

Asegurarse de que el bundler (Vite/Webpack) elimine el código muerto (funciones exportadas pero no utilizadas). Para esto, se debe usar sintaxis ESM (`import { util } from 'lib'`).

### Optimización de Imágenes

Las imágenes son a menudo el mayor cuello de botella del LCP.

- **Formatos:** Usar WebP o AVIF en lugar de PNG/JPEG.
- **Dimensiones:** Cargar el tamaño adecuado según el dispositivo (usar `srcset`).
- **Lazy loading:** Agregar `loading="lazy"` a las imágenes debajo del *fold* (no visibles inicialmente).

### Prefetching y Preloading Estratégico

- **Preload:** Para recursos críticos descubiertos tarde (ej. fuentes web, imagen LCP).
  `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
- **Prefetch:** Para recursos que probablemente se necesiten en la *siguiente* página (ej. hover sobre un link).

## Bundle Analysis

Si la aplicación es lenta, lo primero es analizar el tamaño del bundle. En Vite, herramientas como `rollup-plugin-visualizer` generan un mapa de calor para identificar qué librerías ocupan más espacio (ej. importar todo `lodash` en lugar de `lodash-es`).
