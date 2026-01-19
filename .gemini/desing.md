# 📘 Guía de UI / UX para Documentación Técnica (Docusaurus)

## 🎯 Objetivo del Documento

Establecer lineamientos claros de **UI y UX** para un proyecto de documentación técnica construido con **Docusaurus**, enfocado en:

- Claridad conceptual
- Navegación intuitiva
- Lectura cómoda de contenido técnico
- Escalabilidad del contenido
- Experiencia consistente para desarrolladores

La documentación debe sentirse como **una herramienta de trabajo**, no como un blog ni un wiki informal.

---

## 👤 Audiencia Objetivo

- Desarrolladores en proceso de aprendizaje
- Ingenieros con experiencia que buscan referencia rápida
- Usuarios técnicos que llegan desde issues, PRs o soporte

Diseñar siempre para alguien que:
- Llega con una pregunta concreta
- Tiene poco tiempo
- Necesita precisión, no marketing

---

## 🧠 Principios de UX Fundamentales

### 1. Claridad sobre estética

- Priorizar legibilidad por encima de efectos visuales
- Evitar animaciones innecesarias
- El contenido es el protagonista

> Si algo distrae de la lectura, sobra.

---

### 2. Jerarquía visual estricta

- Un solo título `H1` por página
- Subtítulos bien estructurados (`H2`, `H3`)
- Evitar saltos de nivel (no pasar de `H2` a `H4`)
- El lector debe poder escanear la página en segundos

---

### 3. Lectura cómoda para contenido largo

- Ancho de línea controlado (no texto muy extendido)
- Espaciado generoso entre secciones
- Evitar párrafos excesivamente largos
- Código siempre separado visualmente del texto

---

## 🧭 Navegación y Estructura

### Sidebar

- Estructura basada en **progresión lógica**, no en carpetas técnicas
- Agrupar por conceptos, no por archivos
- Evitar sidebars excesivamente profundas
- Mantener títulos cortos y descriptivos

Ejemplo correcto:
- Introducción
- Conceptos Básicos
- Arquitectura
- Guías Prácticas
- Referencia

---

### Breadcrumbs y contexto

- El usuario siempre debe saber:
  - Dónde está
  - Qué está leyendo
  - Qué sigue después

La documentación no debe sentirse como un laberinto.

---

## ✍️ Lineamientos de Contenido

### Escritura técnica clara

- Frases cortas
- Un concepto por párrafo
- Explicar términos técnicos la primera vez que aparecen
- Evitar suposiciones sobre conocimiento previo

---

### Uso de código

- Código siempre con syntax highlighting
- Fragmentos pequeños y enfocados
- Explicar **por qué existe el código**, no solo qué hace
- Evitar bloques de código gigantes sin contexto

---

### Advertencias y notas

Usar patrones consistentes para:

- ⚠️ Advertencias: riesgos, errores comunes
- ℹ️ Notas: aclaraciones importantes
- 💡 Tips: buenas prácticas

No abusar de estos bloques. Si todo es importante, nada lo es.

---

## 🎨 UI Visual (Docusaurus)

### Tipografía

- Priorizar tipografías sans-serif legibles
- Buen contraste entre texto y fondo
- Tamaño de fuente cómodo para lectura prolongada

---

### Tema claro / oscuro

- Ambos temas deben:
  - Tener el mismo nivel de contraste
  - Mantener legibilidad en bloques de código
- El modo oscuro no es decorativo, es funcional

---

### Colores

- Paleta limitada
- Colores usados para:
  - Enlaces
  - Estados activos
  - Callouts importantes
- Evitar colores saturados para grandes áreas

---

## 🧱 Componentes Reutilizables

Crear y usar componentes consistentes para:

- Bloques de advertencia
- Ejemplos
- Pasos numerados
- Diagramas

Evitar mezclar estilos distintos para el mismo tipo de información.

---

## 🔍 UX para Búsqueda

- La búsqueda debe ser visible y accesible
- Resultados relevantes por contenido, no solo títulos
- Buen snippet del texto encontrado

La búsqueda es una función crítica, no un extra.

---

## 📱 Responsive y Accesibilidad

### Mobile

- Sidebar colapsable clara
- No esconder contenido importante
- Código legible sin hacer zoom excesivo

---

### Accesibilidad

- Contraste adecuado
- Navegación por teclado
- Estructura semántica correcta
- Evitar depender solo del color para comunicar información

---

## ⚠️ Errores Comunes a Evitar

- Documentación escrita como blog personal
- Páginas demasiado largas sin secciones
- Código sin explicación
- Sidebars infinitos
- Estilo inconsistente entre páginas

---

## 🧭 Principio Rector

> Una buena documentación no demuestra cuánto sabes,  
> demuestra **qué tan fácil haces que otros entiendan y usen el sistema**.
