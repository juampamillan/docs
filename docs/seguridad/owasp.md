---
sidebar_position: 2
sidebar_label: OWASP Top 10
---

# OWASP Top 10

El Open Web Application Security Project (OWASP) publica regularmente las 10 vulnerabilidades más críticas en aplicaciones web. Integrar este conocimiento es fundamental.

## La Lista OWASP Top 10 (2021)

1. **A01: Broken Access Control:** Fallas al restringir qué pueden hacer los usuarios autenticados.
2. **A02: Cryptographic Failures:** Exposición de datos sensibles por falta o debilidad de cifrado.
3. **A03: Injection:** Datos no confiables interpretados maliciosamente como comandos (SQLi, XSS, OS Command).
4. **A04: Insecure Design:** Fallas arquitectónicas previas a la escritura de código.
5. **A05: Security Misconfiguration:** Configuraciones inseguras por defecto, encabezados faltantes, cuentas por defecto.
6. **A06: Vulnerable and Outdated Components:** Uso de librerías de terceros con CVEs conocidos.
7. **A07: Identification and Authentication Failures:** Errores en login, gestión de sesiones, contraseñas débiles.
8. **A08: Software and Data Integrity Failures:** Confianza en software no firmado, CI/CD comprometido, deserialización insegura.
9. **A09: Security Logging and Monitoring Failures:** Falta de trazabilidad y alertas frente a brechas activas.
10. **A10: Server-Side Request Forgery (SSRF):** El servidor obtiene un recurso de una URL arbitraria sin validar el destino.

## Ejemplos de Prioridades Clave

### A01: Broken Access Control (Insecure Direct Object Reference - IDOR)

**Vulnerable:** Asumir que si alguien conoce la URL `/api/users/892/profile`, tiene permiso de verla.

```python
# Malo: Solo confía en la URL
@app.get("/users/{user_id}/profile")
def get_profile(user_id: int, db=Depends(get_db)):
    return db.query(Profile).filter(Profile.user_id == user_id).first()
```

**Seguro:** Verificar que el usuario que hace la petición coincide con el recurso (o es admin).

```python
# Bueno: Verifica autorización (ABAC/RBAC)
@app.get("/users/{user_id}/profile")
def get_profile(user_id: int, current_user=Depends(get_current_user), db=Depends(get_db)):
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="No autorizado")
    return db.query(Profile).filter(Profile.user_id == user_id).first()
```

### A03: Injection (SQL Injection)

**Vulnerable:** Concatenar strings directamente en la consulta SQL.

```python
# Malo
db.execute(f"SELECT * FROM users WHERE email = '{user_email}'")
```

**Seguro:** Usar parámetros vinculados (Prepared Statements) u ORMs modernos como SQLAlchemy.

```python
# Bueno
db.execute("SELECT * FROM users WHERE email = %s", (user_email,))
```

### A09: Logging Failures

**Vulnerable:** Registrar información sensible o registrar el error sin contexto para una investigación post-incidente.

```python
# Malo
logger.error("Error al procesar pago: %s", payload) # Podría loguear la tarjeta de crédito
```

**Seguro:** Omitir datos sensibles y agregar rastreabilidad.

```python
# Bueno
logger.error("Error al procesar pago. userId=%s, orderId=%s. Motivo: %s", user_id, order_id, error_msg)
```

:::danger Atención
La vulnerabilidad A01 (Broken Access Control) es históricamente la más reportada. Una autenticación robusta no sirve de nada si las rutas no están correctamente protegidas por reglas de autorización.
:::

## Integración en el Ciclo de Desarrollo

- **SAST (Static Application Security Testing):** Analizar el código fuente en el pipeline de CI/CD (SonarQube, Bandit para Python).
- **DAST (Dynamic Application Security Testing):** Escanear la aplicación en ejecución contra ataques OWASP estándar.
- **Code Review:** Revisar específicamente el chequeo de permisos y validaciones de input durante el flujo de PRs.
