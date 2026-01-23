# juampamillan.docs

> Technical documentation & Engineering manuals.

Este repositorio contiene la documentación oficial de estándares de ingeniería, guías técnicas y mejores prácticas para el desarrollo de software de alto rendimiento.

## 🎯 Contexto y Objetivo del Proyecto

El objetivo principal de este proyecto es centralizar y democratizar el conocimiento técnico del equipo, estableciendo una línea base de calidad para todos los desarrollos. Documentamos las **mejores prácticas de ingeniería de software** implementadas en proyectos de producción a gran escala.

### Filosofía de Ingeniería
Nuestra arquitectura y decisiones técnicas se basan en los siguientes pilares:

*   **Microservicios Desacoplados**: Sistemas autónomos que evolucionan de forma independiente.
*   **Clean Architecture**: Separación estricta de la lógica de negocio de la infraestructura y frameworks.
*   **Microfrontends**: Interfaces de usuario modulares utilizando Module Federation.
*   **Cloud Native**: Infraestructura optimizada para la nube (GCP) para maximizar disponibilidad y escalabilidad.

## 📚 Estructura de la Documentación

La documentación está organizada por dominios técnicos en el directorio `docs/`:

*   **Arquitectura (`/docs/arquitectura`)**: Principios de diseño, patrones de comunicación y decisiones arquitectónicas de alto nivel.
*   **Frontend (`/docs/frontend`)**: Estándares para React, Microfrontends y gestión de estado.
*   **Backend (`/docs/backend`)**: Guías para Python/FastAPI, diseño de APIs y Clean Architecture.
*   **DevOps (`/docs/devops`)**: Estrategias de CI/CD, Gitflow y despliegues en Google Cloud.
*   **Database (`/docs/database`)**: Gestión de datos, migraciones y PostgreSQL.
*   **Gobernanza (`/docs/gobernanza`)**: Políticas, estándares y procesos de revisión.

## 🛠️ Guía Técnica

Este sitio está construido con [Docusaurus 2](https://docusaurus.io/), un generador de sitios estáticos moderno.

### Requisitos Previos

*   **Node.js**: Versión 22.x (verificada en `package.json`).

### Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

### Ejecución Local

Para levantar el servidor de desarrollo y visualizar la documentación en tiempo real:

```bash
npm start
```

El sitio estará disponible en `http://localhost:3000`. Cualquier cambio en los archivos Markdown se reflejará automáticamente.

### Construcción para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```

Los archivos generados se encontrarán en el directorio `build/`.

### Comprobación de la Build

Para servir la versión compilada localmente y verificar que todo funciona como en producción:

```bash
npm run serve
```

## 📝 Cómo Contribuir

1.  Crea una nueva rama para tu contribución.
2.  Agrega o edita archivos Markdown en el directorio `docs/` correspondiente.
3.  Asegúrate de que el frontmatter (encabezado del archivo) tenga un `id`, `title`, y `sidebar_position` correctos si es necesario.
4.  Genera un Pull Request para revisión.

## ✍️ Autores

*   **Juampa Millan** ([pablomillansotelo](https://github.com/pablomillansotelo))
