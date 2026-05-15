---
sidebar_position: 3
sidebar_label: Autenticación y Autorización
---

# Autenticación y Autorización

- **Autenticación (Authn):** ¿Quién eres? (Comprobación de identidad).
- **Autorización (Authz):** ¿Qué tienes permitido hacer? (Comprobación de permisos).

## OAuth 2.0 y OpenID Connect (OIDC)

Delegan la autenticación a proveedores de identidad dedicados (IdP) como Keycloak, Auth0, Azure AD o Google Identity.

- **OIDC:** Construido sobre OAuth 2.0, provee el *ID Token* (con datos del usuario).
- **Flujos (Grants) Comunes:**
  - **Authorization Code Flow (+ PKCE):** El estándar para SPAs (React) y apps móviles. El frontend nunca ve el *client_secret*.
  - **Client Credentials Flow:** Comunicación máquina a máquina (M2M) o microservicio a microservicio.

## JSON Web Tokens (JWT)

Un JWT no es un mecanismo de encriptación, es un mecanismo de *firma*. El payload es visible (base64url), la seguridad radica en que no puede ser alterado sin invalidar la firma.

:::warning Cuándo NO usar JWT
No uses JWT para sesiones tradicionales en sitios web monolíticos donde no escalas horizontalmente. Las *server-side sessions* son más seguras y fáciles de invalidar. JWT brilla en arquitecturas de microservicios sin estado (stateless).
:::

### Ejemplo: Validación Middleware en FastAPI

```python
from fastapi import Request, HTTPException, Depends
from jose import jwt, JWTError

ALGORITHM = "RS256"
# jwks = Cargar llaves públicas del IdP (Auth0/AzureAD)

async def validar_token(request: Request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Token faltante")

    token = auth_header.split(' ')[1]

    try:
        # Se debe validar signature, expiración (exp) y audiencia (aud)
        payload = jwt.decode(token, jwks, algorithms=[ALGORITHM], audience="mi-api")
        return payload # Retorna el contexto del usuario
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
```

## Modelos de Autorización

### RBAC (Role-Based Access Control)
Asigna permisos a roles genéricos (`admin`, `usuario_basico`), y roles a usuarios. Es fácil de implementar pero inflexible para reglas complejas.

### ABAC (Attribute-Based Access Control)
Evalúa permisos en tiempo de ejecución basándose en atributos (Ej. "El usuario X puede editar el documento Y si el departamento de X coincide con el departamento creador de Y y es horario laboral").

### Ejemplo: Guard de ruta basado en Roles (React)

```tsx
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth(); // Custom hook que saca el rol del JWT

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const tieneRol = user.roles.some(rol => rolesPermitidos.includes(rol));

  if (!tieneRol) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Uso
// <RutaProtegida rolesPermitidos={['admin', 'editor']}><Dashboard /></RutaProtegida>
```
