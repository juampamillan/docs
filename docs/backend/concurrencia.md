---
sidebar_position: 8
sidebar_label: Concurrencia y Async
---

# Concurrencia y Programación Asíncrona

La programación asíncrona no hace que el código se ejecute más rápido mágicamente, sino que permite que la aplicación atienda más peticiones simultáneas mientras espera respuestas externas.

## Async/Await en Python

El Event Loop gestiona la ejecución.

- **Útil para I/O-bound:** Llamadas a bases de datos, peticiones HTTP, lectura de archivos. Aquí `async` brilla porque libera el hilo principal durante la espera.
- **Inútil/Perjudicial para CPU-bound:** Cálculos matemáticos pesados, procesamiento de imágenes. Si bloqueas el hilo con procesamiento de CPU, toda la aplicación asíncrona se congela.

## Ejemplo: Operaciones en Paralelo (FastAPI + asyncio)

Ejecutar múltiples llamadas I/O de forma concurrente reduce drásticamente el tiempo de respuesta.

```python
import asyncio
from fastapi import APIRouter

router = APIRouter()

async def obtener_datos_db(user_id):
    await asyncio.sleep(1) # Simula I/O BD
    return {"id": user_id, "nombre": "Usuario"}

async def obtener_datos_api(user_id):
    await asyncio.sleep(1) # Simula HTTP request
    return {"score": 95}

@router.get("/perfil/{user_id}")
async def perfil_completo(user_id: int):
    # En lugar de esperar 2 segundos en total, esperamos 1 segundo
    db_task = obtener_datos_db(user_id)
    api_task = obtener_datos_api(user_id)

    # gather ejecuta ambos de forma paralela
    usuario, score = await asyncio.gather(db_task, api_task)

    return {**usuario, **score}
```

## Evitar Bloqueos de Hilo (Blocking the Loop)

Si debe integrar una librería síncrona heredada o pesada en una ruta asíncrona, delega la ejecución a un executor.

```python
import asyncio
import time

def funcion_sincrona_lenta():
    time.sleep(5) # Esto bloquearía el event loop de FastAPI
    return "Terminé"

@router.get("/bloqueante")
async def endpoint_no_bloqueante():
    loop = asyncio.get_running_loop()
    # Ejecuta la función bloqueante en un thread pool separado
    resultado = await loop.run_in_executor(None, funcion_sincrona_lenta)
    return {"resultado": resultado}
```

## Comparativa de Modelos en Python

| Modelo | Cuándo usarlo |
| :--- | :--- |
| **Multithreading** | Operaciones I/O síncronas bloqueantes (librerías legacy). |
| **Multiprocessing** | Tareas CPU-bound pesadas (supera el GIL de Python). |
| **Asyncio (Corrutinas)**| APIs modernas I/O-bound de alta concurrencia (FastAPI, aiohttp). |

## Race Conditions en APIs

Un error común en entornos de alta concurrencia es leer un valor de la base de datos, modificarlo en memoria y volver a guardarlo, sin prever que otra petición pudo modificarlo en el medio.

:::danger Race Condition Típico
```python
# Malo
saldo = db.query(Cuenta).saldo
saldo -= 100
db.save(saldo)
```
:::

**Soluciones:**

1. **Locks a nivel de BD (Pessimistic Locking):** Usar `SELECT ... FOR UPDATE` en SQL.
2. **Actualización Relativa:** Dejar que la base de datos resuelva la concurrencia atómicamente.

```sql
-- Bueno (La BD asegura atomicidad)
UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1 AND saldo >= 100;
```
