---
sidebar_position: 5
sidebar_label: Seguridad en APIs
---

# Seguridad en APIs

## Rate Limiting

Previene ataques de fuerza bruta y DDoS limitando la cantidad de requests que un usuario o IP puede hacer en una ventana de tiempo.

- **Token Bucket / Sliding Window:** Algoritmos estándar para implementar límites fluidos.
- **Implementación:** Normalmente configurado a nivel de API Gateway (Kong, Apigee) o Proxy (Nginx), no en la lógica del código backend.

## Validación de Inputs

:::warning Desconfianza Total
Nunca confíes en el cliente. Incluso si el frontend tiene validaciones exhaustivas de formularios, la API debe validar todo estrictamente de nuevo.
:::

Utilizar validadores como Pydantic (Python) o Zod (TypeScript) para asegurar tipos, longitudes y formatos exactos antes de que el payload llegue al controlador.

## CORS (Cross-Origin Resource Sharing)

Controla qué dominios web pueden hacer requests a la API.

- **En Producción:** Nunca configurar `Access-Control-Allow-Origin: *`. Se debe definir una lista blanca explícita de dominios confiables (ej. `https://mi-app.com`).
- **Preflight (`OPTIONS`):** El navegador verifica si está autorizado antes de enviar mutaciones (`POST`, `PUT`, `DELETE`).

## Headers de Seguridad

Ayudan al navegador a proteger al usuario contra inyecciones y ataques de clickjacking.

| Header | Función |
| :--- | :--- |
| `Strict-Transport-Security` (HSTS) | Obliga al navegador a usar siempre HTTPS. |
| `Content-Security-Policy` (CSP) | Restringe desde dónde se pueden cargar scripts e imágenes (mitiga XSS). |
| `X-Frame-Options: DENY` | Evita que el sitio sea incrustado en un iframe (mitiga Clickjacking). |
| `X-Content-Type-Options: nosniff` | Evita que el navegador intente adivinar el MIME type. |

### Ejemplo: Middleware en FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

# CORS Seguro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://miapp.produccion.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Headers de Seguridad Custom
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        return response

app.add_middleware(SecurityHeadersMiddleware)
```

## API Keys vs OAuth Tokens

| Característica | API Keys | OAuth / JWT |
| :--- | :--- | :--- |
| **Audiencia** | Máquinas, scripts. | Usuarios, aplicaciones frontend. |
| **Tiempo de vida** | Largo plazo (hasta que se revoque). | Corto plazo (minutos/horas). |
| **Contexto** | Identifica al "cliente" que hace la llamada. | Identifica a una "persona" y sus permisos. |
