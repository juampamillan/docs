---
sidebar_position: 10
sidebar_label: Accesibilidad
---

# Accesibilidad (a11y)

La accesibilidad web asegura que la aplicación pueda ser utilizada por personas con diversas capacidades (visuales, motoras, cognitivas) y herramientas de asistencia (lectores de pantalla, teclados).

## WCAG 2.1 Nivel AA

El estándar recomendado para cumplimiento legal e inclusión técnica es WCAG 2.1 Nivel AA. Sus 4 principios fundamentales son:

1. **Perceptible:** La información no puede ser invisible para todos los sentidos (ej. usar `alt` en imágenes para lectores de pantalla).
2. **Operable:** La UI no debe requerir interacciones que el usuario no pueda realizar (ej. poder navegar 100% con teclado).
3. **Comprensible:** La información y la operación de la UI deben ser lógicas (ej. mensajes de error claros).
4. **Robusto:** El contenido debe ser robusto para ser interpretado por tecnologías actuales y futuras (ej. HTML semántico válido).

## Semántica HTML

El primer paso para la accesibilidad es usar los tags correctos.

:::danger Anti-patrón: Divs clickeables
```html
<!-- Mal: El teclado no puede enfocarse ni usar Enter/Espacio -->
<div class="btn" onClick={submit}>Enviar</div>

<!-- Bien: Accesible por defecto -->
<button onClick={submit}>Enviar</button>
```
:::

## Manejo de Foco

Para usuarios que navegan con teclado:

- **Visibilidad:** Siempre debe haber un indicador visible del elemento enfocado (`:focus-visible`).
- **Atrapamiento (Focus Trap):** Cuando se abre un modal, el foco debe quedar atrapado dentro de él. No debe ser posible hacer Tab hacia el contenido de fondo.
- **Skip Links:** Proveer un enlace oculto al inicio de la página para saltar la navegación repetitiva e ir directo al contenido principal.

## Checklist Práctico de Accesibilidad

| Verificación | Herramienta/Método |
| :--- | :--- |
| **Contraste de color** | El texto cumple un ratio de al menos 4.5:1 respecto al fondo (usar Chrome DevTools). |
| **Navegación por teclado** | Desconectar el mouse y navegar todo el flujo crítico solo con la tecla `Tab` y `Enter`. |
| **Atributos ALT** | Todas las imágenes informativas tienen texto alternativo. Las decorativas tienen `alt=""`. |
| **Formularios** | Todo `<input>` tiene un `<label>` asociado visible o enlazado por `aria-labelledby`. |
| **Auditoría automática** | Ejecutar Axe DevTools o Lighthouse y corregir todos los errores críticos. |
