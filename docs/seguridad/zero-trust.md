---
sidebar_position: 6
sidebar_label: Zero Trust
---

# Zero Trust

El modelo de Zero Trust (Confianza Cero) asume que la red ya está comprometida y no otorga confianza implícita basada únicamente en la ubicación de red del usuario o servicio.

:::info Principio Base
Nunca confíes por defecto, verifica de forma explícita cada solicitud en base a identidad, contexto y dispositivo.
:::

## Principios de Zero Trust

- **Verificación Continua:** Autenticar y autorizar explícitamente cada solicitud de red (API a API, o cliente a API), independientemente de que se origine en la "red interna" o internet público.
- **Acceso de Mínimo Privilegio (Just-In-Time):** Limitar el acceso de usuario mediante permisos acotados dinámicamente y con acceso JIT, además de la segmentación de identidades.
- **Asumir que ha habido una Brecha:** Minimizar el radio de impacto segmentando las redes y adoptando cifrado de extremo a extremo en todo el flujo de datos.
