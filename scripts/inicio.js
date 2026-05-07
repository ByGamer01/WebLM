/* ============================================================
   PÁGINA DE INICIO
   Muestra una selección destacada de productos en la home y
   permite añadir cualquiera al carrito directamente desde aquí.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    pintarProductosDestacados();
});

// Pinta los primeros cuatro productos del catálogo dentro del
// contenedor con id "grid-inicio". Cada tarjeta tiene un botón
// para añadir el producto al carrito y otro para ver detalles.
function pintarProductosDestacados() {
    var grid = document.getElementById("grid-inicio");
    if (grid === null) {
        return;
    }

    // Limpiamos el contenedor antes de añadir nada.
    grid.textContent = "";

    var maximo = Math.min(4, productos.length);
    for (var i = 0; i < maximo; i++) {
        grid.appendChild(crearTarjetaProducto(productos[i]));
    }
}

// Crea una tarjeta visual para un producto del catálogo.
function crearTarjetaProducto(producto) {
    var tarjeta = document.createElement("article");
    tarjeta.className = "card";

    var imagen = document.createElement("div");
    imagen.className = "card-img " + producto.imagen;
    tarjeta.appendChild(imagen);

    var cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    var etiqueta = document.createElement("span");
    etiqueta.className = "badge";
    etiqueta.textContent = producto.categoria;
    cuerpo.appendChild(etiqueta);

    var titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;
    cuerpo.appendChild(titulo);

    var descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    cuerpo.appendChild(descripcion);

    var precio = document.createElement("span");
    precio.className = "precio";
    precio.textContent = formatearPrecio(producto.precio);
    cuerpo.appendChild(precio);

    var acciones = document.createElement("div");
    acciones.className = "acciones";

    var botonAnadir = document.createElement("button");
    botonAnadir.className = "btn btn-pequeno";
    botonAnadir.textContent = "Añadir a la cistella";
    botonAnadir.addEventListener("click", function () {
        gestionarAnadirAlCarrito(producto, botonAnadir);
    });
    acciones.appendChild(botonAnadir);

    var enlaceDetalle = document.createElement("a");
    enlaceDetalle.className = "enlace-detalle";
    enlaceDetalle.href = "producto.html?id=" + producto.id;
    enlaceDetalle.textContent = "Ver detalles →";
    acciones.appendChild(enlaceDetalle);

    cuerpo.appendChild(acciones);
    tarjeta.appendChild(cuerpo);
    return tarjeta;
}

// Devuelve el precio con dos decimales y el símbolo del euro.
function formatearPrecio(valor) {
    return valor.toFixed(2) + " €";
}

// Lógica común para los botones "Añadir a la cistella": añade
// el producto, da retroalimentación visual y bloquea el botón
// si ya estaba dentro del carrito.
function gestionarAnadirAlCarrito(producto, boton) {
    var anadido = anadirAlCarrito(producto.id);
    if (anadido) {
        boton.textContent = "✓ Añadido";
        boton.disabled = true;
    } else {
        boton.textContent = "Ya está en la cistella";
        boton.disabled = true;
    }
}
