# FORZA — Web de Entrenamiento Personal

Práctica final de la asignatura. Web completa, semántica y responsive, hecha
**solo con HTML, CSS y JavaScript vainilla** (sin librerías ni frameworks).
Toda la lógica, los nombres de funciones y los comentarios están en español.

---

## Índice

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Cumplimiento del enunciado](#cumplimiento-del-enunciado)
3. [Estructura de carpetas](#estructura-de-carpetas)
4. [Cómo ejecutar la web](#cómo-ejecutar-la-web)
5. [Páginas](#páginas)
6. [Validación del formulario de login](#validación-del-formulario-de-login)
7. [Diseño visual y responsive](#diseño-visual-y-responsive)
8. [Limitaciones conocidas](#limitaciones-conocidas)

---

## Descripción del proyecto

**FORZA** es una web ficticia que vende programas de entrenamiento personal
(fuerza, cardio, flexibilidad, HIIT, funcional, yoga). Cubre toda la
experiencia mínima de un e-commerce: catálogo, detalle, carrito,
inicio de sesión y páginas informativas.

Tecnologías:

- **HTML5** semántico (`header`, `main`, `section`, `article`, `footer`, `nav`).
- **CSS3** con Flexbox, Grid y media queries.
- **JavaScript** vainilla (sin módulos ni `class`).
- **localStorage** para el carrito y **sessionStorage** para la sesión.

---

## Cumplimiento del enunciado

| Requisito                                                                 | Cumplido |
|---------------------------------------------------------------------------|:--------:|
| Web semántica con CSS y JS separados de HTML                              | ✅ |
| Carpetas `css/`, `scripts/`, `img/`                                       | ✅ |
| Responsive y adaptada a móvil                                             | ✅ |
| Favicon                                                                   | ✅ |
| Cabecera con logo, idiomas, icono de login e icono de carrito visible     | ✅ |
| Menú con Inicio, Listado de productos, Sobre Nosotros (y Contacto extra)  | ✅ |
| Login en HTML aparte con validación de contraseña                         | ✅ |
| Validaciones: 6-12, mayúscula, minúscula, número                          | ✅ |
| Botón Login que guarda usuario en sesión                                  | ✅ |
| Botón Cerrar Sesión                                                       | ✅ |
| Home con visión general y listado breve de productos (Grid/Flexbox)       | ✅ |
| Botón **Añadir al carrito** + acceso al detalle del producto              | ✅ |
| Página de listado completo con la misma información mínima                | ✅ |
| Filtro por categoría/nombre (opcional)                                    | ✅ |
| Detalle de producto con foto, nombre, descripción, categoría y precio     | ✅ |
| Botón añadir que guarda en `localStorage`                                 | ✅ |
| Página Sobre Nosotros informativa                                         | ✅ |
| Página de carrito con eliminación de productos                            | ✅ |
| Footer con copyright siempre visible                                      | ✅ |
| Sin librerías ni frameworks                                               | ✅ |

> Animaciones del login y de la página 404 implementadas con GSAP, usadas con autorización expresa de la profesora.

---

## Estructura de carpetas

```
WebLM/
├── index.html              ← Inicio (productos destacados)
├── entrenamientos.html     ← Listado completo de productos + filtros
├── producto.html           ← Detalle dinámico (?id=N)
├── sobre-nosotros.html     ← Página informativa
├── contacto.html           ← Datos de contacto
├── login.html              ← Formulario de inicio de sesión
├── carrito.html            ← Carrito con productos añadidos
├── producto.json           ← Representación JSON (entrega anterior)
├── producto.schema.json    ← JSON Schema asociado
├── producto.xml            ← Representación XML (entrega anterior)
├── producto.xsd            ← XSD de validación
│
├── css/
│   └── style.css           ← Hoja de estilos completa
│
├── img/
│   └── favicon.svg         ← Favicon vectorial
│
├── fonts/                  ← Tipografías locales
│
└── scripts/
    ├── datos.js            ← Catálogo de productos
    ├── carrito.js          ← Gestión del carrito (localStorage)
    ├── sesion.js           ← Cabecera dinámica + sesión (sessionStorage)
    ├── login.js            ← Validación del formulario de login
    ├── inicio.js           ← Render de productos destacados (home)
    ├── listado.js          ← Render del catálogo + filtros
    ├── producto.js         ← Render del detalle a partir de ?id=
    └── pagina-carrito.js   ← Render del carrito y eliminación
```

---

## Cómo ejecutar la web

No hay paso de compilación. Basta con servir los archivos estáticos.

### Opción A — Abrir el `index.html` directamente

Funciona en la mayoría de navegadores, pero algunos bloquean parámetros de URL
o `localStorage` con el protocolo `file://`. Si el carrito no guarda o el
detalle no encuentra el id, usar la opción B.

### Opción B — Servidor local rápido

Desde la carpeta del proyecto:

```bash
# Con Python 3
python -m http.server 8000

# Con Node (npx)
npx serve .
```

Después, abrir [http://localhost:8000](http://localhost:8000).

### Opción C — Extensión "Live Server" de VS Code

Click derecho sobre `index.html` → *Open with Live Server*.

---

## Páginas

### `index.html` — Inicio
- Hero con eslogan y CTA al catálogo.
- Cuatro productos destacados con imagen, badge de categoría, nombre, precio,
  botón **Añadir al carrito** y enlace **Ver detalles**.

### `entrenamientos.html` — Listado de productos
- Catálogo completo con búsqueda por nombre (en vivo) y filtro por categoría.
- Mensaje "no hay resultados" si los filtros no encuentran nada.

### `producto.html` — Detalle del producto
- Lee `?id=N` de la URL y pinta foto, badge, nombre, descripción, precio y
  ficha técnica (categoría, nivel, duración).
- Botón **Añadir al carrito**. Si el id no existe, muestra un aviso.

### `sobre-nosotros.html` — Página informativa
- Tres bloques: ¿Quiénes somos?, ¿Qué hacemos?, Conócenos.
- Lista de valores (cercanía, profesionalidad, resultados).

### `contacto.html` — Contacto
- Email, teléfono, dirección y horario.

### `login.html` — Inicio de sesión
- Formulario con usuario y contraseña, botón ojo para mostrar/ocultar.
- Validación en vivo y al enviar. Al éxito guarda el usuario en
  `sessionStorage` y redirige a `index.html`.
- Avatar yeti animado con GSAP (autorizado por la profesora), adaptado de
  [codepen.io/m3eu/pen/VwYBbwO](https://codepen.io/m3eu/pen/VwYBbwO).

### `carrito.html` — Carrito
- Lista los productos guardados en `localStorage`.
- Cada fila: foto, nombre, badge, precio, botón **Eliminar**.
- Total acumulado. Si está vacío, muestra "Tu carrito está vacío".

---

## Validación del formulario de login

Reglas implementadas en `scripts/login.js`:

1. Longitud entre **6 y 12** caracteres.
2. Al menos **una letra mayúscula** (`/[A-Z]/`).
3. Al menos **una letra minúscula** (`/[a-z]/`).
4. Al menos **un número** (`/[0-9]/`).

Se valida en vivo mientras se escribe y de nuevo al enviar el formulario.

---

## Diseño visual y responsive

- **Tipografía:** Arial / sans-serif (más la local `SongOfValentine` para títulos).
- **Paleta:** negro `#222` (cabecera/footer), rojo `#e63946` (acento), blanco hueso `#f5f5f5` (fondo).
- **Layouts:** cabecera con `flex`, catálogo con `grid` (`repeat(auto-fill, minmax(250px, 1fr))`), detalle con `flex`.
- **Breakpoints:** `768px` (cabecera apilada, producto en columna) y `480px` (botones a ancho completo).

---

## Limitaciones conocidas

- **No hay backend.** El login guarda el nombre en `sessionStorage`, sin verificar contra ninguna base de datos.
- **Idiomas decorativos.** El selector marca el botón activo pero no traduce el contenido.
- **Sin frameworks.** Es un requisito del enunciado.
- **Compatibilidad:** probado en Chrome, Edge y Firefox modernos.

---

© 2026 FORZA — Práctica final. Todos los textos, datos y estilos son ficticios y se han creado únicamente con fines académicos.
