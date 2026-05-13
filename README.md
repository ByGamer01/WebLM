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
6. [Modelo de datos](#modelo-de-datos)
7. [Persistencia (sesión y carrito)](#persistencia-sesión-y-carrito)
8. [Validación del formulario de login](#validación-del-formulario-de-login)
9. [Diseño visual y responsive](#diseño-visual-y-responsive)
10. [Convenciones de código](#convenciones-de-código)
11. [Cómo extender la web](#cómo-extender-la-web)
12. [Pruebas manuales recomendadas](#pruebas-manuales-recomendadas)
13. [Limitaciones conocidas](#limitaciones-conocidas)

---

## Descripción del proyecto

**FORZA** es una web ficticia que vende programas de entrenamiento personal
(fuerza, cardio, flexibilidad, HIIT, funcional, yoga). Cubre toda la
experiencia mínima de un e-commerce: catálogo, detalle, carrito,
inicio de sesión y páginas informativas.

Tecnologías:

- **HTML5** semántico (`header`, `main`, `section`, `article`, `footer`, `nav`).
- **CSS3** con Flexbox, Grid y media queries.
- **JavaScript** vainilla (ES5 compatible, sin módulos ni `class`), creado por
  completo por nosotros.
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
| Botón **Añadir al carrito** + acceso al detalle del producto           | ✅ |
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
    ├── datos.js            ← Catálogo + buscarProductoPorId
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
o `localStorage` cuando se abre con el protocolo `file://`. Si notas que no
guarda el carrito o que el detalle no encuentra el id, usa la opción B.

### Opción B — Servidor local rápido

Desde la carpeta del proyecto, cualquiera de estos:

```bash
# Con Python 3
python -m http.server 8000

# Con Node (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Después, abre [http://localhost:8000](http://localhost:8000).

### Opción C — Extensión "Live Server" de VS Code

Click derecho sobre `index.html` → *Open with Live Server*.

---

## Páginas

### `index.html` — Inicio
- Hero con eslogan y CTA al catálogo.
- Cuatro productos destacados pintados con `inicio.js` desde `productos`.
- Cada tarjeta: imagen, badge de categoría, nombre, descripción, precio,
  botón **Añadir al carrito** y enlace **Ver detalles**.

### `entrenamientos.html` — Listado de productos
- Catálogo completo (todos los productos).
- Filtros (`listado.js`):
  - Búsqueda por nombre (input de texto, en vivo).
  - Filtro por categoría (select rellenado dinámicamente).
- Mensaje "no hay resultados" si los filtros no encuentran nada.

### `producto.html` — Detalle del producto
- Lee `?id=N` de la URL con `URLSearchParams`.
- Pinta foto, badge, nombre, descripción, precio y lista de detalles
  (categoría, nivel, duración).
- Botón **Añadir al carrito** que llama a `anadirAlCarrito(id)`.
- Si el id no existe, muestra un aviso.

### `sobre-nosotros.html` — Página informativa
- Tres bloques: ¿Quiénes somos?, ¿Qué hacemos?, Conócenos.
- Lista de valores (cercanía, profesionalidad, resultados).
- Estática, sin lógica JS específica.

### `contacto.html` — Contacto
- Email, teléfono, dirección y horario.

### `login.html` — Inicio de sesión
- Formulario con usuario y contraseña.
- Botón ojo (`👁 / 🙈`) para mostrar/ocultar la contraseña.
- Validación en vivo mientras se escribe + validación final al enviar.
- Al éxito guarda `usuario` en `sessionStorage` y vuelve a `index.html`.
- Avatar yeti animado encima del formulario (sigue al cursor al escribir
  el usuario y se tapa los ojos al enfocar la contraseña). Animación
  adaptada de [https://codepen.io/m3eu/pen/VwYBbwO](https://codepen.io/m3eu/pen/VwYBbwO).

### `carrito.html` — Carrito
- Lista los productos cuyo id está en `localStorage`.
- Cada fila: foto, nombre, badge, precio, botón **Eliminar**.
- Total acumulado y CTA "Seguir comprando".
- Si está vacío, muestra mensaje "Tu carrito está vacío".

---

## Modelo de datos

`scripts/datos.js` define el array global `productos`:

```js
{
    id: 1,
    nombre: "Entrenamiento de Fuerza",
    descripcion: "Ejercicios de levantamiento de pesas...",
    categoria: "Fuerza",
    nivel: "Intermedio",
    duracion: "60 min",
    precio: 39.99,
    imagen: "img-fuerza"   // clase CSS con un degradado
}
```

La función `buscarProductoPorId(id)` recorre el array y devuelve el producto
o `null`. Es la única forma de localizar productos: ningún script accede a
`productos[index]` directamente más allá de iterar.

> Las imágenes son **degradados CSS** definidos en `style.css`
> (`.img-fuerza`, `.img-cardio`…). Esto permite que el proyecto funcione
> sin descargar imágenes externas ni romper si falta un archivo.

---

## Persistencia (sesión y carrito)

| Dato        | Dónde vive       | Clave             | Cuándo se borra              |
|-------------|------------------|-------------------|------------------------------|
| Usuario     | `sessionStorage` | `usuario`         | Cerrar sesión o cerrar pestaña |
| Carrito     | `localStorage`   | `forza_carrito`   | Solo si el usuario lo limpia |

### API del carrito (`scripts/carrito.js`)

| Función                      | Qué hace                                                  |
|------------------------------|-----------------------------------------------------------|
| `obtenerCarrito()`           | Devuelve el array de ids guardado (o `[]`).               |
| `guardarCarrito(lista)`      | Serializa con `JSON.stringify` y guarda.                  |
| `anadirAlCarrito(id)`        | Añade si no existe. Devuelve `true`/`false`.              |
| `eliminarDelCarrito(id)`     | Quita el id del array y guarda.                           |
| `contarProductosCarrito()`   | Devuelve la longitud actual.                              |
| `actualizarContadorCarrito()`| Refresca el `<span id="contador-carrito">` de la cabecera.|

### API de sesión (`scripts/sesion.js`)

| Función                  | Qué hace                                          |
|--------------------------|---------------------------------------------------|
| `obtenerUsuarioActivo()` | Devuelve el nombre o `null`.                      |
| `iniciarSesionUsuario(n)`| Guarda en `sessionStorage`.                       |
| `cerrarSesionUsuario()`  | Lo elimina.                                       |
| `construirCabecera()`    | Pinta idiomas, icono carrito y zona de usuario.   |

---

## Validación del formulario de login

Implementada en `scripts/login.js` mediante la función `validarPassword(clave)`
que devuelve un mensaje de error o `""` si todo es correcto. Reglas:

1. Longitud entre **6 y 12** caracteres.
2. Al menos **una letra mayúscula** (`/[A-Z]/`).
3. Al menos **una letra minúscula** (`/[a-z]/`).
4. Al menos **un número** (`/[0-9]/`).

Se valida:

- **En vivo**, en cada `input` mientras el usuario escribe.
- **Al enviar**, antes de guardar la sesión.

Además:
- El campo de contraseña usa `type="password"` (asteriscos por defecto).
- El botón ojo cambia entre `password` y `text` para mostrar/ocultar.

---

## Diseño visual y responsive

- **Tipografía:** Arial / sans-serif (más una local `SongOfValentine` opcional).
- **Paleta:** negro `#222` (cabecera/footer), rojo `#e63946` (acento),
  blanco hueso `#f5f5f5` (fondo).
- **Layouts:**
  - Cabecera con `flex` (logo, nav, sesión).
  - Catálogo con `grid` `repeat(auto-fill, minmax(250px, 1fr))`.
  - Detalle de producto con `flex` (imagen + info).
- **Breakpoints:**
  - `768px` — cabecera apilada, layout de producto en columna, filtros 100%.
  - `480px` — botones de tarjeta en columna.
- **Hover en tarjetas:** elevación con `box-shadow` y `translateY(-2px)`.

---

## Convenciones de código

- **Idioma:** todo en español, incluidos identificadores y comentarios.
- **Sin `class` ni `import/export`:** los scripts se cargan en orden por
  `<script>` y comparten globales (`productos`, `obtenerCarrito`, etc.).
- **Orden de carga obligatorio** en cada HTML que use productos:
  1. `datos.js`
  2. `carrito.js`
  3. `sesion.js`
  4. (opcional) `inicio.js` — define `crearTarjetaProducto` reutilizada por listado y carrito.
  5. Script específico de la página (`listado.js`, `producto.js`, …).
- **Construcción de DOM:** siempre con `document.createElement` y
  `textContent` (nunca `innerHTML`) para evitar XSS.
- **Comentarios:** se explica el *por qué*, no el *qué* obvio.

---

## Cómo extender la web

### Añadir un producto nuevo
1. Edita `scripts/datos.js` y añade un objeto al array `productos`.
2. Si quieres una imagen propia para él, añade una clase nueva en
   `css/style.css` con el patrón `.img-mi-categoria { background: ...; }` y
   ponla en el campo `imagen` del producto.
3. Listo. Aparecerá automáticamente en home y listado.

### Añadir una categoría nueva al filtro
No hace falta tocar nada: `obtenerCategoriasUnicas()` en `listado.js` lee
todas las categorías presentes en el catálogo.

### Añadir un nuevo idioma
En `sesion.js`, dentro de `construirCabecera`, añade:
```js
idiomas.appendChild(crearBotonIdioma("FR", false));
```
La traducción real de los textos no está implementada (es una funcionalidad
fuera del alcance del enunciado).

### Añadir una página nueva
1. Copia un HTML existente.
2. Cambia título, contenido del `<main>` y `class="active"` del `nav`.
3. Mantén la inclusión de `datos.js` + `carrito.js` + `sesion.js` para que
   la cabecera dinámica siga funcionando.

---

## Pruebas manuales recomendadas

Antes de entregar, recomiendo recorrer estos casos:

**Cabecera y sesión**
- [ ] Sin usuario: aparece el icono 👤 que enlaza a `login.html`.
- [ ] El icono 🛒 está visible en todas las páginas con el contador.
- [ ] Tras login: aparece "Hola, X" y "Cerrar Sesión".
- [ ] Cerrar Sesión vuelve a mostrar el icono de login.

**Login**
- [ ] Contraseña con 5 caracteres → error de longitud.
- [ ] `abcdef` → error de mayúscula.
- [ ] `ABCDEF` → error de minúscula.
- [ ] `Abcdef` → error de número.
- [ ] `Abcdef1` → válido.
- [ ] Botón ojo cambia entre asteriscos y texto.

**Catálogo**
- [ ] Home muestra cuatro tarjetas.
- [ ] Listado muestra los seis productos.
- [ ] Filtro por categoría reduce el listado.
- [ ] Búsqueda por texto funciona en vivo.
- [ ] Filtro vacío muestra el aviso.

**Producto**
- [ ] `producto.html?id=3` muestra "Entrenamiento de Flexibilidad".
- [ ] `producto.html?id=999` muestra "El producto solicitado no existe".
- [ ] Añadir desde el detalle incrementa el contador 🛒.

**Carrito**
- [ ] Sin productos: mensaje de carrito vacío.
- [ ] Con productos: aparecen, total correcto, eliminar funciona.
- [ ] El total se recalcula al eliminar.
- [ ] El carrito **persiste** al cerrar y abrir el navegador (localStorage).

**Responsive**
- [ ] A 360px de ancho: cabecera apilada, tarjetas a una columna,
      botones a ancho completo.
- [ ] A 768px: dos columnas en el grid.
- [ ] Detalle de producto en columna en móvil.

---

## Limitaciones conocidas

- **No hay backend.** El "login" simplemente guarda el nombre en
  `sessionStorage`. No verifica contra ninguna base de datos.
- **Idiomas decorativos.** El selector cambia el botón activo pero no
  traduce el contenido.
- **Imágenes simuladas.** Son degradados CSS, no fotos reales.
- **Sin frameworks.** Es intencionado: es un requisito del enunciado.
- **Compatibilidad:** probado en Chrome/Edge/Firefox modernos. No se
  garantiza IE11.

---

© 2026 FORZA — Práctica final. Todos los textos, datos y estilos son
ficticios y se han creado únicamente con fines académicos.
