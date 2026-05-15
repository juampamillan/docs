---
sidebar_position: 9
sidebar_label: Manejo de Errores
---

# Manejo de Errores

El manejo de errores debe ser estructurado, predecible para el cliente de la API y seguro para evitar filtrar detalles de implementación en producción.

## Jerarquía de Excepciones de Dominio

Nunca lanzar respuestas HTTP (`HTTPException`) desde la capa de lógica de negocio o repositorios. Lanzar excepciones de dominio y mapearlas en el controlador.

```python
class DomainError(Exception):
    """Base para excepciones del negocio."""
    pass

class NotFoundError(DomainError):
    pass

class ValidationError(DomainError):
    pass
```

## Mapeo de Excepciones a Respuestas HTTP (FastAPI)

Centralizar el manejo usando "Exception Handlers". Esto mantiene los controladores limpios de bloques `try/except` repetitivos.

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import logging

app = FastAPI()
logger = logging.getLogger(__name__)

@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(
        status_code=404,
        content={"error_code": "NOT_FOUND", "message": str(exc)}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Loguear el error real con stack trace, pero devolver mensaje genérico
    logger.error("Error no manejado: %s", str(exc), exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error_code": "INTERNAL_ERROR", "message": "Ocurrió un error inesperado."}
    )
```

:::danger No exponer Stack Traces
El exception handler global es crucial. Si ocurre una excepción no controlada (`KeyError`, error de BD), nunca se debe retornar el *stack trace* al cliente. Solo "Ocurrió un error inesperado" y el ID de traza si existe.
:::

## Logging Estructurado

Los logs de error deben ser parseables fácilmente por sistemas de agregación (como Datadog o Cloud Logging). Usar formato JSON.

Campos mínimos recomendados:
- `level`: ERROR
- `trace_id`: Para seguir la petición (si aplica).
- `user_id`: Si el usuario está autenticado.
- `error_code`: Un código fijo (ej. `DB_TIMEOUT`).
- `message`: Contexto del error.
- `stack_trace`: (Solo en el log interno, NUNCA en la respuesta HTTP).

## Retry con Backoff Exponencial

Para operaciones fallidas contra APIs externas (errores 502, 503, 504), implementar políticas de reintento en lugar de fallar inmediatamente.

```python
import tenacity

@tenacity.retry(
    stop=tenacity.stop_after_attempt(3),
    wait=tenacity.wait_exponential(multiplier=1, min=2, max=10)
)
def llamar_api_inestable():
    # Intenta, si falla, espera 2s, luego 4s, luego falla definitivo.
    response = requests.get("https://api.flaky.com/data")
    response.raise_for_status()
    return response.json()
```
