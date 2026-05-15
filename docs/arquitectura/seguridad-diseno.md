---
sidebar_position: 7
sidebar_label: Seguridad por Diseño
---

# Seguridad por Diseño (Security by Design)

La Seguridad por Diseño implica que las consideraciones de seguridad se integran desde la fase inicial de arquitectura del software, en lugar de aplicarse como un parche antes de salir a producción.

:::info Referencia
Para información detallada sobre vulnerabilidades específicas, autenticación y secretos, consulte la sección de **[Seguridad](/docs/seguridad/intro)**.
:::

## Principio de Mínimo Privilegio

Cada componente (usuario, microservicio, proceso) debe tener únicamente los permisos estrictamente necesarios para cumplir su función, y solo durante el tiempo que sea requerido.

- **IAM Roles:** No asignar permisos `admin` o `editor` generales a servicios. Crear roles específicos.
- **Bases de datos:** Un servicio de lectura no debe usar credenciales que permitan escrituras o eliminación de tablas.

## Defense in Depth (Defensa en Profundidad)

No confiar en una sola barrera de seguridad. Se requiere protección en múltiples capas:

- **Red:** VPCs cerradas, subredes privadas, WAF (Web Application Firewall).
- **Aplicación:** Autenticación sólida (JWT/OAuth), autorización (RBAC), validación de inputs, rate limiting.
- **Datos:** Cifrado en reposo y en tránsito, enmascaramiento de PII (Personally Identifiable Information).

## Threat Modeling Básico

El Modelado de Amenazas es el proceso de identificar vulnerabilidades antes de escribir código.

- **Cuándo hacerlo:** Durante la etapa de diseño de una nueva arquitectura o un feature significativo.
- **Plantilla STRIDE:**
  - **S**poofing: ¿Alguien puede hacerse pasar por otro? (Requiere: Autenticación fuerte).
  - **T**ampering: ¿Alguien puede alterar los datos? (Requiere: Integridad, validación de firmas).
  - **R**epudiation: ¿Alguien puede negar una acción que hizo? (Requiere: Logs inmutables y trazabilidad).
  - **I**nformation Disclosure: ¿Pueden filtrarse datos sensibles? (Requiere: Cifrado y control de acceso).
  - **D**enial of Service: ¿Puede alguien tumbar el sistema? (Requiere: Rate limiting, escalado automático).
  - **E**levation of Privilege: ¿Puede un usuario normal obtener permisos de administrador? (Requiere: RBAC robusto).

## Secure Defaults vs Opt-in Security

La seguridad debe ser el comportamiento por defecto.

- **Secure Defaults (Recomendado):** Un endpoint nuevo requiere autenticación por defecto a menos que se marque explícitamente como público.
- **Opt-in Security (Anti-patrón):** Los endpoints son públicos por defecto y el desarrollador debe recordar agregar el middleware de seguridad.

:::danger
No depender de que el desarrollador "recuerde" aplicar las políticas. Construir el framework interno para que falle si las reglas de seguridad no se cumplen.
:::

## Checklist de Seguridad para una Nueva API

| Validación | Descripción |
| :--- | :--- |
| **Transporte** | ¿Toda la comunicación es a través de HTTPS/TLS? |
| **Autenticación** | ¿El endpoint valida correctamente el token (ej. JWT)? |
| **Autorización** | ¿Se valida que el usuario tiene permisos para el recurso específico? |
| **Inputs** | ¿Se validan todos los datos de entrada contra un schema estricto? |
| **Secretos** | ¿Se utiliza un Secret Manager en lugar de variables hardcodeadas? |
| **Rate Limiting** | ¿El endpoint está protegido contra abuso y fuerza bruta? |
| **Logging** | ¿Se registran las acciones importantes sin incluir contraseñas o PII? |
