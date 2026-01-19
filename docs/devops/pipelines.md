---
sidebar_position: 3
sidebar_label: Pipelines CI/CD
---

# Pipelines de CI/CD

Esta guía describe la estructura y funcionamiento de los pipelines de Integración Continua y Despliegue Continuo (CI/CD) que automatizan la validación, construcción y despliegue del código.

---

## Principios Fundamentales

1.  **Automatización**: Cada commit dispara automáticamente las validaciones.
2.  **Fail Fast**: El pipeline debe fallar rápidamente si hay problemas.
3.  **Idempotencia**: Ejecutar el mismo pipeline dos veces produce el mismo resultado.
4.  **Reproducibilidad**: El build debe ser reproducible en cualquier momento.

---

## Estructura del Pipeline

Cada commit en las ramas principales (`dev`, `qa`, `main`) dispara un pipeline con las siguientes etapas:

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Lint &    │──▶│    Test     │──▶│    Build    │──▶│   Deploy    │
│   Analyze   │   │             │   │             │   │             │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
```

---

## Etapas del Pipeline

### 1. Lint & Static Analysis

Valida que el código cumple con los estándares de estilo y detecta problemas potenciales.

**Backend (Python):**

```yaml
lint:
  script:
    - pip install ruff mypy
    - ruff check src/
    - mypy src/ --strict
```

**Frontend (TypeScript/React):**

```yaml
lint:
  script:
    - npm ci
    - npm run lint
    - npm run type-check
```

### 2. Tests

Ejecuta las pruebas automatizadas para validar la funcionalidad.

```yaml
test:
  script:
    - pip install pytest pytest-cov
    - pytest tests/ --cov=src --cov-report=xml
  coverage: '/TOTAL.*\s+(\d+%)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage.xml
```

### 3. Build

Construye la imagen de contenedor Docker lista para despliegue.

```yaml
build:
  script:
    - docker build -t $IMAGE_NAME:$CI_COMMIT_SHA .
    - docker push $IMAGE_NAME:$CI_COMMIT_SHA
```

**Dockerfile Típico (Python/FastAPI):**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

EXPOSE 8080
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### 4. Deploy

Despliega la nueva versión al ambiente correspondiente según la rama.

```yaml
deploy_dev:
  stage: deploy
  script:
    - gcloud run deploy $SERVICE_NAME
      --image=$IMAGE_NAME:$CI_COMMIT_SHA
      --region=$REGION
      --platform=managed
  only:
    - dev
  environment:
    name: development
```

---

## Configuración por Rama

| Rama              | Lint | Tests | Build | Deploy | Ambiente            |
| :---------------- | :--: | :---: | :---: | :----: | :------------------ |
| `feat/*`, `fix/*` |  ✅  |  ✅   |  ❌   |   ❌   | - (solo validación) |
| `merge`           |  ✅  |  ✅   |  ✅   |   ❌   | - (solo build)      |
| `dev`             |  ✅  |  ✅   |  ✅   |   ✅   | Development         |
| `qa`              |  ✅  |  ✅   |  ✅   |   ✅   | QA / Staging        |
| `main`            |  ✅  |  ✅   |  ✅   |   ✅   | Production          |

---

## Variables de Entorno

Las variables sensibles deben almacenarse en el sistema de CI/CD, nunca en el código.

### Variables Típicas

| Variable              | Descripción                        | Ejemplo             |
| :-------------------- | :--------------------------------- | :------------------ |
| `GCP_PROJECT_ID`      | ID del proyecto de GCP             | `my-project-prod`   |
| `GCP_REGION`          | Región de despliegue               | `us-central1`       |
| `IMAGE_REGISTRY`      | URL del registro de imágenes       | `gcr.io/my-project` |
| `SERVICE_ACCOUNT_KEY` | Credenciales de servicio (secreto) | (JSON codificado)   |

### Inyección en el Pipeline

```yaml
variables:
  IMAGE_NAME: $IMAGE_REGISTRY/$CI_PROJECT_NAME

deploy:
  script:
    - echo $GCP_SERVICE_KEY | base64 -d > /tmp/key.json
    - gcloud auth activate-service-account --key-file=/tmp/key.json
    - gcloud run deploy ...
```

---

## Estrategias de Despliegue

### Blue-Green Deployment

Despliega la nueva versión en paralelo y redirige el tráfico una vez validada.

```yaml
deploy:
  script:
    - gcloud run deploy $SERVICE_NAME --tag=new
    -  # Validar manualmente o con tests
    - gcloud run services update-traffic $SERVICE_NAME --to-latest
```

### Canary Release

Envía un porcentaje pequeño del tráfico a la nueva versión.

```yaml
deploy_canary:
  script:
    - gcloud run services update-traffic $SERVICE_NAME
      --to-revisions=new=10,current=90
```

---

## Notificaciones

Configurar notificaciones para mantener al equipo informado.

### Slack

```yaml
notify_success:
  script:
    - 'curl -X POST -H "Content-type: application/json"
      --data "{\"text\":\"✅ Deploy exitoso: $CI_PROJECT_NAME a $ENVIRONMENT\"}"
      $SLACK_WEBHOOK_URL'
  when: on_success

notify_failure:
  script:
    - 'curl -X POST -H "Content-type: application/json"
      --data "{\"text\":\"❌ Falló pipeline: $CI_PROJECT_NAME - $CI_PIPELINE_URL\"}"
      $SLACK_WEBHOOK_URL'
  when: on_failure
```

---

## Buenas Prácticas

### ✅ Hacer

- Ejecutar lint y tests **antes** de construir la imagen.
- Usar tags inmutables basados en commit SHA.
- Almacenar secretos en el vault del CI/CD.
- Definir timeouts para cada etapa.

### ❌ Evitar

- Hardcodear credenciales en el repositorio.
- Saltarse tests para "ir más rápido".
- Usar `:latest` como tag de imagen.
- Hacer deploys manuales a producción.

---

### Temas Relacionados

- [Control de Versiones y Git](./git)
- [Despliegue en GCP](./gcp)
