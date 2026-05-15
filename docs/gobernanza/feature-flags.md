---
sidebar_position: 6
sidebar_label: Feature Flags
---

# Feature Flags

Los Feature Flags (Toggles) permiten alterar el comportamiento de un sistema sin cambiar ni desplegar código, separando el despliegue del lanzamiento.

## Casos de Uso

- **Trunk-Based Development:** Permitir a los desarrolladores integrar código parcial a `main` diariamente, oculto tras un flag apagado.
- **Lanzamientos Graduales (Canary):** Encender la funcionalidad solo para el 10% de los usuarios, medir el impacto y luego expandir al 100%.
- **Kill Switches (Ops):** Si el nuevo servicio de pagos externo empieza a fallar masivamente en producción, el equipo de operaciones puede apagar el flag para volver al servicio de pagos anterior en segundos.
- **A/B Testing:** Entregar dos versiones diferentes a distintos segmentos de usuarios para medir cuál convierte mejor.

## Tipos de Flags

1. **Release Flags:** De corta duración. Su propósito es lanzar una feature.
2. **Experiment Flags:** Para A/B testing. Se evalúa el impacto métrico.
3. **Ops Flags:** De larga duración. Para controlar comportamientos operacionales (ej. degradación agraciada).
4. **Permission Flags:** Premium users vs Free users.

## Herramientas

| Solución | Complejidad | Caso de Uso |
| :--- | :--- | :--- |
| **Variables de Entorno** | Baja | Funcionalidad binaria en backend, requiere reinicio para cambiar de estado. |
| **Tabla en BD / Redis** | Media | Flag casero simple, actualización en tiempo real. |
| **Unleash / GrowthBook** | Alta | Open Source. Excelente para proyectos medianos-grandes con equipos técnicos dedicados. |
| **LaunchDarkly** | Muy Alta | Solución Enterprise SaaS. Reglas ultra-avanzadas por atributos de usuario. |

## Ciclo de Vida de un Flag

La principal desventaja de los Feature Flags es la deuda técnica que introducen en el código (`if flag_is_on() else`).

**Pasos de vida:**
1. Crear el Flag en la herramienta y en código.
2. Despliegue con el Flag apagado a Producción.
3. Encendido progresivo (10%, 50%, 100%).
4. **Limpieza (Crítico):** Una vez que el flag está al 100% y se validó la estabilidad (usualmente 1-2 semanas), se debe crear un PR para borrar la comprobación condicional (`if`) y el código viejo, dejando la nueva feature fija.

:::danger Flag Debt (Anti-patrón)
Dejar docenas de release flags obsoletos en el código vuelve el sistema imposible de testear debido a la explosión combinatoria de estados. "Si este flag está prendido pero este otro está apagado...".
:::
