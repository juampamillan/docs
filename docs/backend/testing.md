---
sidebar_position: 7
sidebar_label: Estrategia de Testing
---

# Estrategia de Testing

El testing automatizado no es un lujo, es una validación continua que previene regresiones. La estrategia recomendada se basa en la pirámide de testing.

## La Pirámide de Testing

- **Unit Tests (Base ancha):** Validan la lógica de negocio aislada. Son rápidos y abundantes.
- **Integration Tests (Medio):** Validan la interacción entre el código y sistemas reales (base de datos, caché). Son más lentos.
- **E2E Tests (Punta):** Validan flujos críticos completos simulando un cliente. Son frágiles y lentos. Se reservan para el "happy path" principal.

## Reglas de Mocking

- **NO mockear:** Base de datos en los tests de integración (usar bases de datos temporales/testcontainers), utilidades simples, validadores de dominio.
- **SÍ mockear:** Llamadas a APIs de terceros (pasarelas de pago, servicios externos), envío de correos, eventos de mensajería (Pub/Sub).

## Ejemplo: Test Unitario (Pytest + Mock)

Validación de lógica sin tocar dependencias externas.

```python
from unittest.mock import Mock
import pytest

def procesar_orden(orden_id, repo):
    orden = repo.obtener(orden_id)
    if not orden:
        raise ValueError("Orden no encontrada")
    if orden.estado != "NUEVA":
        raise ValueError("Estado inválido")
    orden.estado = "PROCESADA"
    repo.guardar(orden)
    return orden

def test_procesar_orden_exitosa():
    # Arrange
    mock_repo = Mock()
    mock_repo.obtener.return_value = Mock(estado="NUEVA")

    # Act
    resultado = procesar_orden("123", mock_repo)

    # Assert
    assert resultado.estado == "PROCESADA"
    mock_repo.guardar.assert_called_once()
```

## Ejemplo: Test de Integración (FastAPI + TestClient + DB)

Prueba un endpoint HTTP completo con base de datos real.

```python
from fastapi.testclient import TestClient
from mi_app.main import app

client = TestClient(app)

def test_crear_usuario(db_session_test):
    # db_session_test es un fixture que provee una DB vacía
    response = client.post(
        "/usuarios/",
        json={"email": "test@example.com", "nombre": "Test"}
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
```

## Ejemplo: Test E2E Básico (Playwright)

Valida un flujo crítico desde la perspectiva del usuario.

```typescript
import { test, expect } from '@playwright/test';

test('flujo de login exitoso', async ({ page }) => {
  await page.goto('https://miapp.com/login');

  await page.fill('input[name="email"]', 'usuario@test.com');
  await page.fill('input[name="password"]', 'secreta123');
  await page.click('button[type="submit"]');

  // Validar que entramos al dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('h1')).toContainText('Bienvenido');
});
```

## Coverage (Cobertura)

:::warning Obsesión por el Coverage
El objetivo no es alcanzar el 100% de cobertura forzando tests inútiles. El coverage es una métrica para encontrar código *no* testeado, no una prueba de que el código está *bien* testeado.
:::

- **Umbral recomendado:** Apuntar a un 70-80% general.
- **Enfoque:** La lógica de dominio y los cálculos críticos deben tener cobertura cercana al 100%. Los controladores simples y DTOs necesitan menos esfuerzo.
