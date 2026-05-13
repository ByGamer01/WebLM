document.addEventListener("DOMContentLoaded", function () {
    pintarDetalleProducto();
});

// Recupera el parámetro "id" de la URL y lo convierte a número.
// Si no llega un id válido, devuelve 1 como valor por defecto.
function obtenerIdDeUrl() {
    var parametros = new URLSearchParams(window.location.search);
    var idTexto = parametros.get("id");
    if (idTexto === null) {
        return 1;
    }
    var idNumero = parseInt(idTexto, 10);
    if (isNaN(idNumero)) {
        return 1;
    }
    return idNumero;
}

// Localiza el producto pedido y rellena la página con sus datos.
function pintarDetalleProducto() {
    var contenedor = document.getElementById("detalle-producto");
    if (contenedor === null) {
        return;
    }

    var producto = buscarProductoPorId(obtenerIdDeUrl());
    if (producto === null) {
        var aviso = document.createElement("p");
        aviso.textContent = "El producto solicitado no existe.";
        contenedor.appendChild(aviso);
        return;
    }

    // Cambiamos el título de la pestaña del navegador.
    document.title = producto.nombre + " — FORZA";

    // Imagen lateral.
    var imagen = document.createElement("div");
    imagen.className = "producto-img " + producto.imagen;
    contenedor.appendChild(imagen);

    // Bloque con la información del producto.
    var info = document.createElement("div");
    info.className = "producto-info";

    var etiqueta = document.createElement("span");
    etiqueta.className = "badge";
    etiqueta.textContent = producto.categoria;
    info.appendChild(etiqueta);

    var titulo = document.createElement("h1");
    titulo.textContent = producto.nombre;
    info.appendChild(titulo);

    var descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    info.appendChild(descripcion);

    var precio = document.createElement("p");
    precio.className = "precio-grande";
    precio.textContent = formatearPrecio(producto.precio);
    info.appendChild(precio);

    var lista = document.createElement("ul");
    lista.className = "lista-detalles";
    lista.appendChild(crearLineaDetalle("Categoría", producto.categoria));
    lista.appendChild(crearLineaDetalle("Nivel", producto.nivel));
    lista.appendChild(crearLineaDetalle("Duración", producto.duracion));
    info.appendChild(lista);

    var botonAnadir = document.createElement("button");
    botonAnadir.className = "btn";
    botonAnadir.textContent = "Añadir al carrito";
    botonAnadir.addEventListener("click", function () {
        gestionarAnadirAlCarrito(producto, botonAnadir);
    });
    info.appendChild(botonAnadir);

    contenedor.appendChild(info);
}

// Crea un elemento <li> con la forma "Etiqueta: valor".
function crearLineaDetalle(etiqueta, valor) {
    var li = document.createElement("li");
    var negrita = document.createElement("strong");
    negrita.textContent = etiqueta + ": ";
    li.appendChild(negrita);
    li.appendChild(document.createTextNode(valor));
    return li;
}
