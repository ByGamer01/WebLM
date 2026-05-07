/* ============================================================
   PÁGINA DE LA CISTELLA
   Muestra los productos que el usuario ha añadido al carrito y
   permite eliminarlos uno a uno. Calcula el precio total.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    pintarCistella();
});

// Pinta la lista de productos del carrito dentro del contenedor
// "lista-cistella". Si está vacío, muestra un mensaje.
function pintarCistella() {
    var contenedor = document.getElementById("lista-cistella");
    var totalContenedor = document.getElementById("total-cistella");
    if (contenedor === null) {
        return;
    }
    contenedor.textContent = "";

    var ids = obtenerCarrito();

    if (ids.length === 0) {
        var aviso = document.createElement("p");
        aviso.className = "aviso-vacio";
        aviso.textContent = "Tu cistella está vacía.";
        contenedor.appendChild(aviso);
        if (totalContenedor !== null) {
            totalContenedor.textContent = "";
        }
        return;
    }

    var total = 0;
    for (var i = 0; i < ids.length; i++) {
        var producto = buscarProductoPorId(ids[i]);
        if (producto !== null) {
            contenedor.appendChild(crearFilaCistella(producto));
            total = total + producto.precio;
        }
    }

    if (totalContenedor !== null) {
        totalContenedor.textContent = "Total: " + formatearPrecio(total);
    }
}

// Crea la fila visual que representa un producto dentro del carrito,
// con su imagen, nombre, precio y botón para eliminarlo.
function crearFilaCistella(producto) {
    var fila = document.createElement("article");
    fila.className = "fila-cistella";

    var imagen = document.createElement("div");
    imagen.className = "fila-img " + producto.imagen;
    fila.appendChild(imagen);

    var datos = document.createElement("div");
    datos.className = "fila-datos";

    var nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;
    datos.appendChild(nombre);

    var categoria = document.createElement("span");
    categoria.className = "badge";
    categoria.textContent = producto.categoria;
    datos.appendChild(categoria);

    var precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = formatearPrecio(producto.precio);
    datos.appendChild(precio);

    fila.appendChild(datos);

    var botonEliminar = document.createElement("button");
    botonEliminar.className = "btn-eliminar";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function () {
        eliminarDelCarrito(producto.id);
        pintarCistella();
    });
    fila.appendChild(botonEliminar);

    return fila;
}
