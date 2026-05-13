document.addEventListener("DOMContentLoaded", function () {
    prepararFiltros();
    pintarListadoCompleto(productos);
});

// Rellena el desplegable de categorías con las categorías que
// existen realmente en el catálogo y conecta los eventos de
// búsqueda y filtrado.
function prepararFiltros() {
    var selectorCategoria = document.getElementById("filtro-categoria");
    var entradaBusqueda = document.getElementById("filtro-busqueda");
    if (selectorCategoria === null || entradaBusqueda === null) {
        return;
    }

    var categorias = obtenerCategoriasUnicas();
    for (let i = 0; i < categorias.length; i++) {
        var opcion = document.createElement("option");
        opcion.value = categorias[i];
        opcion.textContent = categorias[i];
        selectorCategoria.appendChild(opcion);
    }

    selectorCategoria.addEventListener("change", aplicarFiltros);
    entradaBusqueda.addEventListener("input", aplicarFiltros);
}

// Devuelve la lista de categorías distintas que hay en el catálogo.
function obtenerCategoriasUnicas() {
    var resultado = [];
    for (let i = 0; i < productos.length; i++) {
        var c = productos[i].categoria;
        var yaEsta = false;
        for (let j = 0; j < resultado.length; j++) {
            if (resultado[j] === c) {
                yaEsta = true;
                break;
            }
        }
        if (!yaEsta) {
            resultado.push(c);
        }
    }
    return resultado;
}

// Toma los valores actuales de los filtros y vuelve a pintar
// solo los productos que cumplen las condiciones.
function aplicarFiltros() {
    var categoria = document.getElementById("filtro-categoria").value;
    var texto = document.getElementById("filtro-busqueda").value
        .toLowerCase()
        .trim();

    var filtrados = [];
    for (let i = 0; i < productos.length; i++) {
        var p = productos[i];
        var coincideCategoria =
            categoria === "todas" || p.categoria === categoria;
        var coincideTexto =
            texto === "" || p.nombre.toLowerCase().indexOf(texto) !== -1;
        if (coincideCategoria && coincideTexto) {
            filtrados.push(p);
        }
    }
    pintarListadoCompleto(filtrados);
}

// Pinta dentro del contenedor "grid-listado" todas las tarjetas
// que se le pasen. Si la lista está vacía, muestra un aviso.
function pintarListadoCompleto(lista) {
    var contenedor = document.getElementById("grid-listado");
    if (contenedor === null) {
        return;
    }
    contenedor.textContent = "";

    if (lista.length === 0) {
        var aviso = document.createElement("p");
        aviso.className = "aviso-vacio";
        aviso.textContent = "No se han encontrado productos con esos filtros.";
        contenedor.appendChild(aviso);
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        // Reutilizamos crearTarjetaProducto definido en inicio.js.
        contenedor.appendChild(crearTarjetaProducto(lista[i]));
    }
}
