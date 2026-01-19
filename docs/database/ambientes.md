---
sidebar_position: 4
sidebar_label: Especificaciones por Ambiente
---

# Especificaciones por Ambiente

Esta guía define las configuraciones recomendadas para instancias de Cloud SQL según el ambiente de despliegue (Dev, QA, Prod).

---

## Resumen de Configuración

| Parámetro               | Dev            | QA          | Prod                   |
| :---------------------- | :------------- | :---------- | :--------------------- |
| **vCPU**                | 2              | 2           | 4+                     |
| **RAM**                 | 8 GB           | 8 GB        | 16+ GB                 |
| **Storage**             | 10 GB          | 20 GB       | 50+ GB                 |
| **Auto-increase**       | ✅             | ✅          | ✅                     |
| **Alta Disponibilidad** | Opcional       | Regional    | Regional (Obligatoria) |
| **IP Pública**          | ✅ (whitelist) | ❌          | ❌                     |
| **IP Privada**          | ✅             | ✅          | ✅                     |
| **Backups Automáticos** | ✅ (7 días)    | ✅ (7 días) | ✅ (30 días)           |
| **PITR**                | Opcional       | ✅          | ✅                     |

---

## Desarrollo (Dev)

### Propósito

Ambiente para desarrollo y pruebas locales. Prioriza **accesibilidad** y **bajo costo** sobre alta disponibilidad.

### Configuración

```bash
gcloud sql instances create myapp-usersdb-dev \
  --database-version=POSTGRES_17 \
  --edition=ENTERPRISE \
  --cpu=2 \
  --memory=8GB \
  --region=us-central1 \
  --availability-type=ZONAL \
  --storage-size=10 \
  --storage-auto-increase \
  --root-password=$(gcloud secrets versions access latest --secret=SUPERADMIN_PASSWORD) \
  --network=projects/$PROJECT_ID/global/networks/$VPC_NAME \
  --assign-ip \
  --authorized-networks="$DEV_IP_1/32,$DEV_IP_2/32"
```

### Características

| Característica     | Configuración                                      |
| :----------------- | :------------------------------------------------- |
| **Disponibilidad** | Zonal (sin failover)                               |
| **IP Pública**     | Habilitada con whitelist de IPs de desarrolladores |
| **IP Privada**     | Habilitada                                         |
| **Backups**        | Automáticos, retención 7 días                      |
| **PITR**           | Opcional                                           |

### Conectividad

Los desarrolladores pueden conectarse directamente desde sus máquinas locales usando la IP pública.

```bash
# Conexión directa
psql -h 34.x.x.x -U developer@company.com -d myapp_users_dev
```

:::warning Seguridad
Solo agregar IPs estáticas conocidas al whitelist. Revisar y limpiar IPs no utilizadas regularmente.
:::

---

## Calidad / UAT (QA)

### Propósito

Ambiente para pruebas de integración, QA y validación de usuario. Simula la configuración de producción pero con menor escala.

### Configuración

```bash
gcloud sql instances create myapp-usersdb-qa \
  --database-version=POSTGRES_17 \
  --edition=ENTERPRISE \
  --cpu=2 \
  --memory=8GB \
  --region=us-central1 \
  --availability-type=REGIONAL \
  --storage-size=20 \
  --storage-auto-increase \
  --root-password=$(gcloud secrets versions access latest --secret=SUPERADMIN_PASSWORD) \
  --network=projects/$PROJECT_ID/global/networks/$VPC_NAME \
  --no-assign-ip
```

### Características

| Característica     | Configuración                        |
| :----------------- | :----------------------------------- |
| **Disponibilidad** | Regional (con failover automático)   |
| **IP Pública**     | **Deshabilitada**                    |
| **IP Privada**     | Habilitada (única forma de conexión) |
| **Backups**        | Automáticos, retención 7 días        |
| **PITR**           | Habilitado                           |

### Conectividad

Solo accesible desde dentro de la VPC (Cloud Run, GKE, VMs en la misma red).

```bash
# Conexión desde Cloud Shell o VM en la VPC
psql -h 10.x.x.x -U cloudrun_user -d myapp_users_qa
```

---

## Producción (Prod)

### Propósito

Ambiente de producción con máxima disponibilidad, seguridad y capacidad de recuperación.

### Configuración

```bash
gcloud sql instances create myapp-usersdb-prod \
  --database-version=POSTGRES_17 \
  --edition=ENTERPRISE \
  --cpu=4 \
  --memory=16GB \
  --region=us-central1 \
  --availability-type=REGIONAL \
  --storage-size=50 \
  --storage-auto-increase \
  --root-password=$(gcloud secrets versions access latest --secret=SUPERADMIN_PASSWORD) \
  --network=projects/$PROJECT_ID/global/networks/$VPC_NAME \
  --no-assign-ip
```

### Características

| Característica     | Configuración                                        |
| :----------------- | :--------------------------------------------------- |
| **Disponibilidad** | Regional (con failover automático) - **Obligatoria** |
| **IP Pública**     | **Deshabilitada** - **Prohibida**                    |
| **IP Privada**     | Habilitada (única forma de conexión)                 |
| **Backups**        | Automáticos, retención 30 días                       |
| **PITR**           | Habilitado (recuperación a cualquier punto)          |

### Conectividad

**Ningún acceso directo permitido.** Solo los servicios de Cloud Run con la identidad de servicio correcta pueden conectarse.

```python
# Conexión desde Cloud Run usando Cloud SQL Connector
from google.cloud.sql.connector import Connector

connector = Connector()

def get_connection():
    return connector.connect(
        "project:region:myapp-usersdb-prod",
        "pg8000",
        user="cloudrun_user",
        password=os.getenv("DB_PASSWORD"),
        db="myapp_users_prod"
    )
```

---

## Backups y Recuperación

### Configuración por Ambiente

| Ambiente | Retención | PITR             | Backup On-demand            |
| :------- | :-------- | :--------------- | :-------------------------- |
| Dev      | 7 días    | Opcional         | Antes de cambios mayores    |
| QA       | 7 días    | Sí               | Antes de tests destructivos |
| Prod     | 30 días   | Sí (Obligatorio) | Antes de deploys            |

### Point-in-Time Recovery (PITR)

PITR permite recuperar la base de datos a cualquier momento dentro del período de retención de transaction logs.

```bash
# Restaurar a un momento específico
gcloud sql instances restore-backup myapp-usersdb-prod \
  --restore-time="2024-01-15T10:30:00Z"
```

---

## Monitoreo y Alertas

### Métricas Recomendadas

| Métrica              | Umbral Warning  | Umbral Critical |
| :------------------- | :-------------- | :-------------- |
| CPU Utilization      | > 70% por 5 min | > 90% por 5 min |
| Memory Utilization   | > 80% por 5 min | > 95% por 5 min |
| Disk Usage           | > 80%           | > 90%           |
| Connections          | > 80% del max   | > 95% del max   |
| Replication Lag (HA) | > 10 segundos   | > 60 segundos   |

### Configurar Alertas

```bash
gcloud monitoring alerting-policies create \
  --display-name="DB CPU High" \
  --condition="metric.type=\"cloudsql.googleapis.com/database/cpu/utilization\" > 0.9"
```

---

## Checklist de Creación por Ambiente

### Dev

- [ ] Alta disponibilidad opcional (para reducir costos).
- [ ] IP pública habilitada con whitelist actualizado.
- [ ] Backups automáticos configurados.
- [ ] Secretos en Secret Manager.

### QA

- [ ] Alta disponibilidad regional habilitada.
- [ ] IP pública **deshabilitada**.
- [ ] PITR habilitado.
- [ ] Datos de prueba cargados.

### Prod

- [ ] Alta disponibilidad regional **obligatoria**.
- [ ] IP pública **prohibida**.
- [ ] PITR **obligatorio**.
- [ ] Alertas de monitoreo configuradas.
- [ ] Backup on-demand antes del primer deploy.

---

### Temas Relacionados

- [Gestión de Permisos](./permisos)
- [Convención de Nombres](./convenciones)
