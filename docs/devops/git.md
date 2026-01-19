---
sidebar_position: 2
sidebar_label: Control de Versiones
---

# Control de Versiones y Git

Esta guía describe el modelo de branching, las estrategias de merge y las mejores prácticas para mantener un historial de Git limpio y profesional.

---

## Modelo de Branching (Staging)

Utilizamos un modelo de **staging con Fast-Forward obligatorio** entre ramas de ambiente. Esto garantiza que el código probado en un ambiente sea **exactamente el mismo** que se despliega en el siguiente.

### Estructura de Ramas

```
main ──────────────────────────────────┐
  ↑                                    │
  │ Fast Forward                       │
qa ───────────────────────────────┐    │
  ↑                               │    │
  │ Fast Forward                  │    │
dev ─────────────────────┐        │    │
  ↑                      │        │    │
  │ Fast Forward         │        │    │
merge ──────────┐        │        │    │
  ↑             │        │        │    │
  │             │        │        │    │
feat/...     fix/...   ...      ...   ...
```

### Ramas Principales

| Rama    | Ambiente           | Descripción                            |
| :------ | :----------------- | :------------------------------------- |
| `main`  | Producción         | Última versión release estable.        |
| `qa`    | Pre-release (UAT)  | Validación final antes de producción.  |
| `dev`   | Desarrollo (Cloud) | Ambiente de desarrollo e integración.  |
| `merge` | Integración local  | Punto de partida para nuevas features. |

### Ramas de Trabajo

**Formato:** `{tipo}/{ticket-id}-{descripcion}`

**Ejemplos:**

- `feat/PROJ-84-pantalla-consulta`
- `fix/PROJ-92-correccion-calculo`
- `refactor/PROJ-101-mejora-queries`

**Origen:** Todas las ramas de trabajo **nacen desde `merge`**.

---

## Estrategias de Merge

### 1. Fast-Forward (Para Staging)

Es la **única estrategia permitida** entre ramas de ambiente (`merge → dev → qa → main`).

```bash
git checkout qa
git merge --ff-only dev
git push origin qa
```

**¿Por qué Fast-Forward?**

- No genera commits de merge adicionales.
- Mantiene la historia completamente lineal.
- Garantiza que el código sea idéntico entre ambientes.

:::warning Fast-Forward Fallido
Si `--ff-only` falla, significa que la rama de destino tiene cambios que no están en el origen. Esto indica una **ruptura del flujo de staging** que debe corregirse.
:::

### 2. Rebase (Para Features)

Antes de integrar una feature en `merge`, usar rebase para mantener el historial limpio.

```bash
# En tu rama de feature
git fetch origin
git rebase origin/merge

# Si hay conflictos, resolverlos y continuar
git add .
git rebase --continue

# Push con force (solo en tu rama personal)
git push --force-with-lease
```

**¿Por qué Rebase?**

- Tu feature parece desarrollada desde el código más reciente.
- Facilita la revisión de código en Pull Requests.
- Evita commits de merge innecesarios en la historia.

:::important Regla de Oro
**NUNCA** hacer rebase sobre ramas compartidas (`merge`, `dev`, `qa`, `main`). Solo sobre **tu propia rama de feature**.
:::

### 3. Merge (Solo para Conflictos)

Usar merge tradicional solo cuando hay conflictos complejos que requieren resolución manual visible en el historial.

```bash
git merge feature/mi-rama
```

---

## Workflow Completo

### 1. Crear Nueva Feature

```bash
# Actualizar merge
git checkout merge
git pull origin merge

# Crear rama desde merge
git checkout -b feat/PROJ-84-pantalla-consulta

# Trabajar y hacer commits
git commit -m "feat: Crear componente tabla"
git commit -m "feat: Agregar filtros de búsqueda"
```

### 2. Integrar en Merge

```bash
# Actualizar tu feature con los últimos cambios
git fetch origin
git rebase origin/merge

# Resolver conflictos si los hay, luego:
git checkout merge
git merge feat/PROJ-84-pantalla-consulta
git push origin merge
```

### 3. Promover a Dev

```bash
git checkout dev
git merge --ff-only merge
git push origin dev
```

### 4. Promover a QA

```bash
git checkout qa
git merge --ff-only dev
git push origin qa
```

### 5. Release a Producción

```bash
git checkout main
git merge --ff-only qa

# Crear tag de release
git tag -a v1.2.0 -m "Release 1.2.0: Nueva funcionalidad X"

git push origin main
git push origin --tags
```

---

## Convenciones de Commits

Seguimos el estándar **Conventional Commits** para mensajes claros y automatización de changelogs.

### Prefijos

| Prefijo    | Uso                                   | Ejemplo                                |
| :--------- | :------------------------------------ | :------------------------------------- |
| `feat`     | Nueva funcionalidad                   | `feat: Agregar filtro de búsqueda`     |
| `fix`      | Corrección de error                   | `fix: Corregir cálculo de totales`     |
| `refactor` | Mejora de código sin cambio funcional | `refactor: Extraer lógica a hook`      |
| `docs`     | Solo documentación                    | `docs: Actualizar README`              |
| `chore`    | Tareas de mantenimiento               | `chore: Actualizar dependencias`       |
| `test`     | Agregar o modificar tests             | `test: Agregar tests para UserService` |
| `style`    | Cambios de formato (sin lógica)       | `style: Aplicar prettier`              |

### Formato Completo

```
{tipo}({alcance opcional}): {descripción corta}

{cuerpo opcional con más contexto}

{pie opcional: referencias a tickets, breaking changes}
```

**Ejemplo:**

```
feat(auth): Agregar autenticación con Azure AD

Se implementa el flujo de OAuth 2.0 con MSAL para
autenticar usuarios corporativos.

Closes #84
```

---

## Comandos Útiles

```bash
# Ver estado del rebase
git status

# Abortar rebase si algo sale mal
git rebase --abort

# Ver diferencias antes de commit
git diff --staged

# Rehacer el último commit (sin push aún)
git commit --amend

# Ver historial limpio
git log --oneline --graph

# Limpiar ramas locales ya mergeadas
git branch --merged | grep -v "main\|dev\|qa\|merge" | xargs git branch -d
```

---

### Temas Relacionados

- [Pipelines de CI/CD](./pipelines)
- [Despliegue en GCP](./gcp)
