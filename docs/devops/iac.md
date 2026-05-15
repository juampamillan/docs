---
sidebar_position: 7
sidebar_label: Infrastructure as Code
---

# Infrastructure as Code (IaC)

La Infraestructura como Código (IaC) permite definir, provisionar y gestionar la infraestructura cloud mediante archivos de configuración legibles y versionables, en lugar de clics manuales en consolas web.

## Por qué IaC

- **Reproducibilidad:** Se puede crear un entorno idéntico (ej. Staging vs Producción) en minutos.
- **Detección de Drift:** Herramientas como Terraform detectan si alguien hizo un cambio manual en producción que difiere del código.
- **Code Review:** Los cambios en infraestructura pasan por Pull Requests, evitando errores humanos catastróficos.

## Terraform: Conceptos Clave

Terraform es el estándar de facto.

- **Provider:** El plugin de la nube (AWS, GCP, Azure).
- **Resource:** El componente físico o lógico (instancia EC2, bucket S3).
- **State:** Archivo que relaciona la configuración de Terraform con los recursos reales en la nube.
- **Module:** Conjunto de recursos empaquetados para ser reutilizados.

## Estructura de Repositorio

```text
├── main.tf           # Lógica principal y recursos
├── variables.tf      # Variables de entrada
├── outputs.tf        # Salidas (ej. IPs, URLs generadas)
├── provider.tf       # Configuración del proveedor de cloud
└── backend.tf        # Configuración del state remoto
```

## Ejemplo: Cloud Run genérico en GCP

```hcl
resource "google_cloud_run_service" "api_service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = var.image_url
        resources {
          limits = {
            memory = "512Mi"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
```

## Remote State y Locking

:::danger Estado Remoto
Nunca comitees el archivo `terraform.tfstate` en Git. Contiene información sensible e impide la colaboración en equipo.
:::

Utilizar un backend remoto (como AWS S3, Google Cloud Storage) con locking (mediante DynamoDB o características nativas de GCS) para asegurar que dos procesos no modifiquen el state al mismo tiempo.

## Alternativas a Terraform

| Herramienta | Enfoque | Casos de uso |
| :--- | :--- | :--- |
| **Terraform** | HCL (Lenguaje declarativo) | Estándar de la industria, multi-cloud. |
| **Pulumi / CDK** | Lenguajes de programación (TS, Python) | Equipos de desarrolladores que prefieren programar su infraestructura con constructos lógicos. |
| **Bicep / ARM** | Declarativo nativo | Plataformas puramente Azure. |

## IaC en CI/CD

El proceso estándar de GitOps para infraestructura:

1. **Pull Request:** Ejecutar `terraform plan`. Publicar la salida como un comentario en el PR para que los reviewers vean qué se va a crear/destruir.
2. **Merge a Main:** Ejecutar `terraform apply -auto-approve`.
