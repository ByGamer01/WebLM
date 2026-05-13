var CLAVE_CARRITO = "forza_carrito";

// Recupera los ids del carrito desde localStorage, o [] si está vacío
function obtenerCarrito() {
    var datos = localStorage.getItem(CLAVE_CARRITO);
    if (datos === null || datos === "") {
        return [];
    }
    return JSON.parse(datos);
}

// Guarda la lista de identificadores en localStorage
function guardarCarrito(lista) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lista));
}

// Añade un producto si no estaba; devuelve true si se añadió, false si ya existía
function anadirAlCarrito(idProducto) {
    var carrito = obtenerCarrito();
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i] === idProducto) {
            return false;
        }
    }
    carrito.push(idProducto);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    return true;
}

// Elimina un producto del carrito a partir de su id
function eliminarDelCarrito(idProducto) {
    var carrito = obtenerCarrito();
    var nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i] !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    guardarCarrito(nuevoCarrito);
    actualizarContadorCarrito();
}

// Indica cuántos productos hay actualmente en el carrito
function contarProductosCarrito() {
    return obtenerCarrito().length;
}

// Refresca el contador del icono de carrito en la cabecera
function actualizarContadorCarrito() {
    var contador = document.getElementById("contador-carrito");
    if (contador !== null) {
        contador.textContent = contarProductosCarrito();
    }
}
