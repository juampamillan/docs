---
sidebar_position: 4
sidebar_label: Gestión de Secretos
---

# Gestión de Secretos

La credencial más segura es aquella que ningún humano conoce.

## La Jerarquía de Madurez

1. **Nivel 0 (Peligro Crítico):** Secretos hardcodeados en el código o en un archivo `.env` subido al repositorio Git.
2. **Nivel 1 (Básico):** Uso de variables de entorno configuradas a mano en el servidor o pasadas por el pipeline de CI/CD. (Problema: Difícil rotación y auditoría).
3. **Nivel 2 (Estándar):** Almacenamiento externo centralizado (Secret Manager).

:::danger Regla de Oro
Ningún secreto, API Key, o contraseña debe existir jamás dentro del repositorio de código. Un secreto comprometido en Git es público para siempre a menos que se reescriba la historia o se rote la llave inmediatamente.
:::

## Secret Managers

Servicios dedicados a almacenar, versionar y auditar el acceso a información sensible (Google Secret Manager, AWS Secrets Manager, HashiCorp Vault).

### Ejemplo Genérico de Integración

En lugar de leer directamente de `os.getenv`, la aplicación pide el secreto en tiempo de arranque.

```python
import os
from google.cloud import secretmanager

def obtener_secreto(secret_id, version_id="latest"):
    # En desarrollo local usamos variables de entorno normales
    if os.getenv("ENVIRONMENT") == "local":
        return os.getenv(secret_id)

    # En producción usamos el Secret Manager
    client = secretmanager.SecretManagerServiceClient()
    project_id = os.getenv("GCP_PROJECT")
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Arranque de la app
DB_PASSWORD = obtener_secreto("DB_PASSWORD_PROD")
```

## Rotación de Secretos

Los secretos expiran. Una política sólida implica rotarlos proactivamente (ej. cada 90 días), no solo como reacción a una filtración. Secret Managers en nubes permiten configurar automatizaciones (Lambdas/Cloud Functions) que rotan las contraseñas de las Bases de Datos automáticamente.

## Detección en Código (Shift-Left)

Impedir que el secreto suba mediante comprobaciones locales o en el pre-commit hook:

- Herramientas: `git-secrets`, `trufflehog`, `detect-secrets`.
- Configurar el pipeline CI/CD para rechazar PRs si detectan cadenas que parezcan llaves RSA o patrones de API Keys (ej. `AKIA...` para AWS).
