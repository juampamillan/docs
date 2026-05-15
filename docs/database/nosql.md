---
sidebar_position: 8
sidebar_label: Patrones NoSQL
---

# Patrones NoSQL

Las bases de datos NoSQL ofrecen esquemas flexibles, escalabilidad horizontal nativa y baja latencia para casos específicos. La decisión no es "SQL vs NoSQL", sino elegir la herramienta adecuada para los requisitos de acceso a datos del sistema.

## Cuándo SQL y cuándo NoSQL

- **Usa SQL (PostgreSQL/MySQL) si:** Necesitas transacciones ACID complejas (movimientos bancarios), esquemas altamente relacionales, integridad referencial fuerte o análisis ad-hoc imprevisto.
- **Usa NoSQL si:** El esquema evoluciona constantemente, se requiere una ingestión extrema de datos, consultas rápidas predecibles (Key-Value) o relaciones complejas (Grafos).

## Tipos de NoSQL

| Tipo | Herramienta Común | Caso de Uso Ideal |
| :--- | :--- | :--- |
| **Documento** | MongoDB, Firestore, Couchbase | Perfiles de usuario, carritos de compra, CMS, catálogos. Datos jerárquicos agrupados. |
| **Clave-Valor (Key-Value)** | Redis, DynamoDB (básico) | Caching, manejo de sesiones, leaderboards, rate limiting. |
| **Columnar (Wide-Column)** | Cassandra, HBase, ScyllaDB | Time-series, analítica, IoT, registros masivos de logs con alta tasa de escritura. |
| **Grafo** | Neo4j, Amazon Neptune | Redes sociales, motores de recomendación, detección de fraudes y relaciones complejas ("amigos de mis amigos"). |

## Data Modeling en Documentales (Ej. MongoDB / Firestore)

A diferencia del modelo relacional donde se normaliza para evitar duplicación, en NoSQL el modelo de datos se basa en **cómo la aplicación va a consultar los datos**.

### Embedding (Anidamiento)

Útil para relaciones 1-a-pocos donde los datos hijos rara vez se consultan sin el padre y no cambian constantemente.
- **Ejemplo:** Las "direcciones" o "configuraciones de notificaciones" guardadas directamente dentro del documento del "usuario".

### Referencing (Referencias)

Útil para relaciones 1-a-muchos y N-a-N, o cuando los datos hijos cambian independientemente y son muy voluminosos.
- **Ejemplo:** Las "ordenes de compra" tienen una referencia al "id del usuario", pero viven en su propia colección.

:::danger Anti-Patrón
**Usar NoSQL por pereza a modelar.**
NoSQL requiere a menudo mucho *más* modelado por adelantado que SQL, porque debes conocer exactamente los patrones de consulta de tu aplicación para estructurar correctamente los documentos e índices.
:::

## Consistencia Eventual

En entornos distribuidos NoSQL de alta disponibilidad (AP en el teorema CAP), es común la consistencia eventual:

- Si escribes un dato en el Nodo A, y lees inmediatamente del Nodo B, podrías ver el dato viejo. Eventualmente, en cuestión de milisegundos, todos los nodos tendrán la copia nueva.
- **Impacto en código:** La UI no debe asumir que la lectura inmediata a la BD traerá el nuevo dato recién escrito; es mejor confiar en la respuesta del comando de escritura o aplicar actualizaciones optimistas en la interfaz.

## Tabla Comparativa Tecnológica General

| Solución | Fortaleza Principal | Escenario Recomendado |
| :--- | :--- | :--- |
| **PostgreSQL** | Integridad, ACID, Relaciones complejas | Por defecto para casi cualquier app backend transaccional. |
| **MongoDB / Firestore** | Esquemas flexibles, desarrollo rápido | Apps móviles/web con estructuras JSON, MVPs, jerarquías. |
| **Redis** | In-memory, sub-milisegundo | Caché, Pub/Sub, manejo de estado efímero. |
| **BigQuery / Snowflake** | OLAP, SQL masivo analítico | Data warehousing, análisis de terabytes sin afectar la BD transaccional. |
