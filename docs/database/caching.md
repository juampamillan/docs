---
sidebar_position: 7
sidebar_label: Caching con Redis
---

# Caching con Redis

El caché almacena datos en memoria para reducir latencias y proteger a la base de datos principal de picos de lectura, a costa de lidiar con datos temporalmente obsoletos.

## Cuándo usar caché

- **SÍ:** Consultas pesadas que cambian poco (catálogos de productos), perfiles públicos, contadores, limitadores de tasa (Rate Limiting).
- **NO:** Transacciones financieras críticas, información que requiere consistencia fuerte inmediata, consultas extremadamente ad-hoc sin patrones repetitivos.

:::danger El Problema Principal
"Hay solo dos cosas difíciles en Ciencias de la Computación: la invalidación de caché y nombrar las cosas." — Phil Karlton.
Planifica cómo se invalidará el caché ANTES de implementarlo.
:::

## Patrones de Caching

1. **Cache-Aside (Lazy Loading):** La aplicación intenta leer del caché. Si no está (Miss), lee de la BD, escribe en el caché y devuelve el dato.
2. **Write-Through:** La aplicación escribe en el caché y en la base de datos sincrónicamente en la misma operación. (Caché siempre fresco, latencia de escritura doble).
3. **Write-Behind (Write-Back):** La aplicación escribe solo en el caché. Un proceso en background vuelca los datos a la BD más tarde. (Extremadamente rápido, riesgo de pérdida de datos si el caché falla).
4. **Read-Through:** Similar a Cache-Aside pero delegando la lógica al proveedor de caché/framework (el caché va directamente a la BD en caso de miss).

## Ejemplo de Cache-Aside (Python + Redis)

```python
import redis
import json

cache = redis.Redis(host='localhost', port=6379, db=0)

def obtener_perfil_usuario(user_id):
    cache_key = f"user:profile:{user_id}"

    # Intento 1: Leer del caché
    cached_data = cache.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    # Cache Miss: Ir a la base de datos
    usuario = db.query("SELECT * FROM usuarios WHERE id = %s", (user_id,))

    if usuario:
        # Guardar en caché y poner un TTL de 15 minutos
        cache.setex(cache_key, 900, json.dumps(usuario))

    return usuario
```

## TTL (Time-To-Live) Estratégico

Todos los datos en caché DEBEN tener un TTL por defecto como mecanismo de seguridad contra datos permanentemente estancados.

- Catálogo de categorías: 24 horas.
- Perfil de usuario (Lectura frecuente): 15 minutos.
- Configuración de Feature Flags: 1 a 5 minutos.
- Datos transaccionales en curso: Segundos o no cachear.

## Stampede (Thundering Herd)

El problema del "Stampede" ocurre cuando un dato muy popular expira del caché, y miles de requests entran exactamente al mismo milisegundo y todos experimentan un Cache Miss, yendo simultáneamente a golpear la Base de Datos, matándola.

**Prevención:**
- Añadir ruido (jitter) al TTL (ej. `TTL = 15 min + random(-2, 2) min`) para que no todos los keys expiren al mismo tiempo.
- Usar Locks en memoria para que solo el primer request que tenga un Cache Miss vaya a la BD, y los demás esperen un poco.

## Cache Distribuido vs Local

- **Local (In-Memory, ej. LRU de Python):** Extremadamente rápido. Problema: En un clúster de Kubernetes, cada pod tendrá su propio caché, generando inconsistencias y golpes repetidos a la BD por cada contenedor.
- **Distribuido (Redis, Memcached):** Fuente única de verdad compartida entre todos los contenedores. Resiliente a reinicios de pods.
