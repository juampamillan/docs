---
sidebar_position: 6
sidebar_label: Contenedores y Docker
---

# Contenedores y Docker

Los contenedores empaquetan el código con sus dependencias para garantizar consistencia entre entornos.

## Anatomía de un Dockerfile (Multi-stage Build)

Los multi-stage builds permiten tener una imagen final limpia y pequeña, separando las herramientas de compilación de las dependencias de ejecución.

### Ejemplo: FastAPI (Python)

```dockerfile
# Etapa 1: Builder
FROM python:3.11-slim as builder
WORKDIR /app
# Instalar dependencias del sistema necesarias para compilar paquetes
RUN apt-get update && apt-get install -y gcc
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Etapa 2: Producción
FROM python:3.11-slim
WORKDIR /app
# Crear un usuario no root
RUN useradd -m appuser && chown -R appuser /app
# Copiar solo los wheels compilados y la aplicación
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache /wheels/*
COPY ./src ./src
# Ejecutar como no root
USER appuser
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Ejemplo: App React/Vite con Nginx

```dockerfile
# Etapa 1: Construcción (Node)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine
# Copiar el build estático generado
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar configuración custom de nginx (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

:::tip Optimización de Caché
Ordenar las sentencias COPY en el Dockerfile asegura el uso eficiente de las capas cacheadas, lo cual acelera enormemente los builds recurrentes.
:::

## Docker Compose para Desarrollo Local

El `docker-compose.yml` estandariza el entorno de desarrollo para todo el equipo sin ensuciar la máquina host.

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./src:/app/src
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app_db
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
```

## Mejores Prácticas

- **Usuario No Root:** Nunca correr procesos como `root` en la imagen final.
- **.dockerignore:** Evitar enviar `node_modules`, `.git`, o entornos virtuales de Python al demonio de Docker.
- **Capas de caché:** Copiar los archivos de dependencias (`package.json`, `requirements.txt`) ANTES que el código fuente, para no invalidar la caché de instalación cuando cambia el código.

## Comandos Útiles

| Comando | Descripción |
| :--- | :--- |
| `docker build -t mi-app .` | Construye una imagen y la etiqueta. |
| `docker run -p 8080:80 mi-app` | Ejecuta la imagen mapeando el puerto 8080 del host al 80 del contenedor. |
| `docker exec -it <id> sh` | Abre una consola interactiva dentro de un contenedor en ejecución. |
| `docker compose up -d` | Levanta todos los servicios en background. |
| `docker system prune` | Limpia contenedores detenidos, redes y capas dangling. |
