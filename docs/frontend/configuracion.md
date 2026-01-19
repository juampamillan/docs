---
sidebar_position: 5
sidebar_label: Configuración Unificada
authors: pablomillansotelo
tags: [frontend]
---

# Configuración Unificada del Frontend

Para que múltiples microfrontends se sientan como una sola aplicación, es fundamental centralizar ciertos aspectos de configuración y estado.

---

## 1. Autenticación (Azure AD / MSAL)

El Shell es el único responsable de iniciar el flujo de autenticación. Una vez autenticado, expone el token JWT a los microfrontends.

- **Silent Refresh**: El Shell gestiona la renovación automática de tokens antes de que expiren.
- **Intercepción**: Los microfrontends utilizan un interceptor de Axios para inyectar automáticamente el token en los encabezados `Authorization`.

---

## 2. Contexto de Ubicación (Sitios)

Muchas aplicaciones requieren filtrar datos por una entidad geográfica u organizacional (ej. Planta, Sucursal, Almacén).

- El Shell dispone de un selector global en el Navbar.
- Al cambiar la ubicación, se dispara un evento global y se actualiza el `localStorage`.
- Los microfrontends reaccionan a este cambio recargando sus datos.

---

## 3. Sistema de Diseño (MUI Theme)

Compartimos un `Theme` de Material UI configurado centralmente para asegurar:

- Paleta de colores consistente.
- Tipografía uniforme.
- Espaciado y bordes estandarizados.

---

## 4. Manejo de Errores Global

Los microfrontends deben capturar errores de red y mostrarlos mediante un sistema de notificaciones (Snackbars) proporcionado por el Shell o estandarizado mediante una librería compartida.

- **401/403**: Redirigir al inicio o mostrar pantalla de acceso denegado.
- **500**: Mostrar mensaje de "Error en el servidor" con opción de reintento.

---

## 5. Variables de Entorno

Gestionamos las URLs de las APIs de forma dinámica:

| Ambiente   | API Gateway URL               |
| :--------- | :---------------------------- |
| **Local**  | `http://localhost:8000`       |
| **Dev/QA** | `https://api-dev.example.com` |
| **Prod**   | `https://api.example.com`     |

---

### Temas Relacionados

- [Arquitectura de Microfrontends](./microfrontends)
- [Despliegue en GCP](/docs/devops/gcp)
