---
sidebar_position: 4
sidebar_label: Sistema de Permisos
---

# Sistema de Permisos en el Frontend

La gestión de permisos es un aspecto crítico que garantiza que los usuarios solo puedan ver y realizar acciones para las que están autorizados.

---

## 1. Arquitectura de Permisos

Utilizamos un modelo **RBAC (Role-Based Access Control)** gestionado centralmente e implementado de forma distribuida.

- **Servicio de Permisos**: El Shell carga los permisos del usuario al inicio de la sesión.
- **Provider de Permisos**: Los microfrontends consumen estos permisos a través de un contexto compartido o del objeto global `window`.

---

## 2. Implementación de Guards

### Page Guard (Protección de Rutas)

Impide que el usuario acceda a una página completa si no tiene el permiso de lectura (`view`).

```tsx
<PageGuard permission="inventory.view">
  <InventoryPage />
</PageGuard>
```

### Component Guard (Protección de Acciones)

Oculta botones o elementos de UI específicos basados en permisos de acción (`create`, `update`, `delete`).

```tsx
<AccessGuard permission="inventory.delete">
  <Button color="error">Eliminar Ítem</Button>
</AccessGuard>
```

---

## 3. Verificación Programática

En ocasiones, es necesario verificar permisos dentro de la lógica de una función (ej. antes de disparar una petición API).

```typescript
const { checkPermission } = usePermissions();

const handleExport = async () => {
  if (await checkPermission("inventory.export")) {
    // Proceder con la descarga
  } else {
    notify("No tienes permisos para exportar");
  }
};
```

---

## 4. Mejores Prácticas

1.  **Fail-Safe**: Por defecto, el sistema debe denegar el acceso si no puede verificar los permisos.
2.  **Sincronización Backend**: Recuerda que la seguridad en el frontend es solo cosmética. El backend **siempre** debe validar los permisos de nuevo al recibir la petición.
3.  **Carga Diferida**: Los permisos deben estar disponibles antes de que se rendericen los componentes críticos para evitar parpadeos en la UI.

---

### Temas Relacionados

- [Estructura de Permisos (DB)](/docs/database/permisos)
- [Arquitectura de Microfrontends](./microfrontends)
