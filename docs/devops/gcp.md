---
sidebar_position: 4
sidebar_label: Despliegue en GCP
---

# Despliegue en Google Cloud Platform

Esta guía describe la arquitectura de despliegue en GCP, incluyendo Cloud Run para microservicios, Secret Manager para credenciales y Apigee como API Gateway.

---

## Arquitectura de Despliegue

```
                        ┌─────────────────────────────┐
                        │        INTERNET             │
                        └─────────────┬───────────────┘
                                      │
                        ┌─────────────▼───────────────┐
                        │       APIGEE (Gateway)      │
                        │   • Auth (JWT/API Key)      │
                        │   • Rate Limiting           │
                        │   • CORS                    │
                        └─────────────┬───────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
┌────────▼────────┐         ┌────────▼────────┐         ┌────────▼────────┐
│   Cloud Run     │         │   Cloud Run     │         │   Cloud Run     │
│   (Servicio A)  │         │   (Servicio B)  │         │   (Servicio C)  │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                            │
         └──────────────┬────────────┴────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │     Cloud SQL     │
              │   (PostgreSQL)    │
              └───────────────────┘
```

---

## Google Cloud Run

Cloud Run es la plataforma principal para desplegar microservicios como contenedores serverless.

### Características Clave

| Característica    | Descripción                                 |
| :---------------- | :------------------------------------------ |
| **Serverless**    | No hay servidores que gestionar.            |
| **Auto-scaling**  | Escala automáticamente de 0 a N instancias. |
| **Pay-per-use**   | Solo pagas por el tiempo de ejecución.      |
| **HTTP/2 y gRPC** | Soporte nativo para ambos protocolos.       |

### Comando de Despliegue

```bash
gcloud run deploy $SERVICE_NAME \
  --image=gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG \
  --region=us-central1 \
  --platform=managed \
  --allow-unauthenticated \
  --set-env-vars="ENV=production" \
  --set-secrets="DB_PASSWORD=db-password:latest"
```

### Configuración Recomendada por Ambiente

| Parámetro         | Dev   | QA   | Prod |
| :---------------- | :---- | :--- | :--- |
| **Min Instances** | 0     | 0    | 1    |
| **Max Instances** | 2     | 5    | 100  |
| **CPU**           | 1     | 1    | 2    |
| **Memory**        | 512Mi | 1Gi  | 2Gi  |
| **Timeout**       | 60s   | 120s | 300s |

```bash
gcloud run services update $SERVICE_NAME \
  --min-instances=1 \
  --max-instances=100 \
  --memory=2Gi \
  --cpu=2 \
  --timeout=300
```

---

## Secret Manager

Todas las credenciales y configuraciones sensibles deben almacenarse en **Secret Manager**, nunca en variables de entorno planas ni en el código.

### Crear un Secreto

```bash
# Crear secreto
echo -n "mi-password-seguro" | gcloud secrets create DB_PASSWORD --data-file=-

# Agregar nueva versión
echo -n "nuevo-password" | gcloud secrets versions add DB_PASSWORD --data-file=-
```

### Inyectar en Cloud Run

```bash
gcloud run deploy $SERVICE_NAME \
  --set-secrets="DB_PASSWORD=DB_PASSWORD:latest,API_KEY=API_KEY:1"
```

Los secretos se inyectan como variables de entorno en el contenedor:

```python
import os
db_password = os.getenv("DB_PASSWORD")
```

### Acceso desde Código (Alternativo)

```python
from google.cloud import secretmanager

client = secretmanager.SecretManagerServiceClient()
name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
response = client.access_secret_version(request={"name": name})
secret_value = response.payload.data.decode("UTF-8")
```

---

## Apigee (API Gateway)

Apigee actúa como **fachada única** para todas las APIs, proporcionando seguridad, monitoreo y gestión de tráfico.

### Funciones Principales

| Función           | Descripción                                  |
| :---------------- | :------------------------------------------- |
| **Autenticación** | Valida tokens JWT y API Keys.                |
| **Rate Limiting** | Protege contra abusos con cuotas.            |
| **Spike Arrest**  | Suaviza picos de tráfico repentinos.         |
| **CORS**          | Gestión centralizada de políticas de origen. |
| **Analytics**     | Métricas de uso y latencia.                  |

### Regla de Exposición

> **Regla de Oro**: Ningún microservicio debe estar expuesto directamente a Internet. Todo tráfico externo **debe** pasar por Apigee.

### Configuración de Políticas

**Rate Limiting (Quota):**

```xml
<Quota name="QuotaPolicy">
  <Interval>1</Interval>
  <TimeUnit>minute</TimeUnit>
  <Allow count="100"/>
</Quota>
```

**Spike Arrest:**

```xml
<SpikeArrest name="SpikeArrestPolicy">
  <Rate>10ps</Rate>
</SpikeArrest>
```

**JWT Validation:**

```xml
<VerifyJWT name="VerifyJWT">
  <Algorithm>RS256</Algorithm>
  <Source>request.header.Authorization</Source>
  <PublicKey>
    <JWKS uri="https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys"/>
  </PublicKey>
</VerifyJWT>
```

---

## Cloud SQL (PostgreSQL)

Las bases de datos se despliegan en **Cloud SQL** con alta disponibilidad regional.

### Conexión desde Cloud Run

Cloud Run se conecta a Cloud SQL mediante **Cloud SQL Connector** o **Private IP**.

**Usando Cloud SQL Connector (recomendado):**

```python
from google.cloud.sql.connector import Connector

connector = Connector()

def get_connection():
    return connector.connect(
        "project:region:instance",
        "pg8000",
        user="myuser",
        password=os.getenv("DB_PASSWORD"),
        db="mydb"
    )
```

**Variables de Entorno:**

```bash
gcloud run deploy $SERVICE_NAME \
  --add-cloudsql-instances=$PROJECT:$REGION:$INSTANCE \
  --set-env-vars="INSTANCE_CONNECTION_NAME=$PROJECT:$REGION:$INSTANCE"
```

---

## Monitoreo y Observabilidad

### Cloud Logging

Todos los logs de Cloud Run se envían automáticamente a Cloud Logging.

```python
import logging
logging.info("Solicitud procesada", extra={"user_id": user.id})
```

### Cloud Monitoring

Métricas automáticas disponibles:

- Request count
- Request latency
- Container instance count
- CPU/Memory utilization

### Alertas Recomendadas

| Métrica        | Condición     | Severidad   |
| :------------- | :------------ | :---------- |
| Error rate     | > 5% en 5 min | 🔴 Critical |
| Latency P99    | > 1s en 5 min | 🟡 Warning  |
| Instance count | > 80% del max | 🟡 Warning  |

---

## Checklist de Despliegue

Antes de desplegar a producción:

- [ ] Secretos configurados en Secret Manager.
- [ ] Variables de entorno correctas para el ambiente.
- [ ] Pruebas ejecutadas y pasando.
- [ ] Imagen taggeada con commit SHA.
- [ ] Cloud Run configurado con min instances >= 1.
- [ ] Alertas de monitoreo activas.
- [ ] Políticas de Apigee revisadas.

---

### Temas Relacionados

- [Control de Versiones y Git](./git)
- [Pipelines de CI/CD](./pipelines)
