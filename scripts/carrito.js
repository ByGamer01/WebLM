/* ============================================================
   GESTIÓN DEL CARRITO
   Guarda y recupera los productos añadidos por el usuario en
   localStorage para que persistan entre páginas y recargas.
   ============================================================ */

// Clave que se utiliza en localStorage para almacenar el carrito.
var CLAVE_CARRITO = "forza_carrito";

// Recupera la lista de identificadores de productos guardados
// en el carrito. Si todavía no hay nada, devuelve una lista vacía.
function obtenerCarrito() {
    var datos = localStorage.getItem(CLAVE_CARRITO);
    if (datos === null || datos === "") {
        return [];
    }
    return JSON.parse(datos);
}

// Guarda la lista de identificadores en localStorage.
function guardarCarrito(lista) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lista));
}

// Añade un producto al carrito si todavía no estaba dentro.
// Devuelve true si se ha añadido, false si ya estaba presente.
function anadirAlCarrito(idProducto) {
    var carrito = obtenerCarrito();
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i] === idProducto) {
            return false;
        }
    }
    carrito.push(idProducto);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    return true;
}

// Elimina un producto del carrito a partir de su id.
function eliminarDelCarrito(idProducto) {
    var carrito = obtenerCarrito();
    var nuevoCarrito = [];
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i] !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    guardarCarrito(nuevoCarrito);
    actualizarContadorCarrito();
}

// Indica cuántos productos hay actualmente en el carrito.
function contarProductosCarrito() {
    return obtenerCarrito().length;
}

// Refresca el número que aparece junto al icono del carrito
// en la cabecera. Se llama al cargar la página y cada vez que
// se añade o se elimina un producto.
function actualizarContadorCarrito() {
    var contador = document.getElementById("contador-carrito");
    if (contador !== null) {
        contador.textContent = contarProductosCarrito();
    }
}
