document.addEventListener("DOMContentLoaded", function () {
    activarRedireccion404();
});

// Engancha un manejador a todos los enlaces internos del documento.
function activarRedireccion404() {
    var enlaces = document.querySelectorAll("a[href]");
    for (let i = 0; i < enlaces.length; i++) {
        var enlace = enlaces[i];
        if (esEnlaceInterno(enlace)) {
            enlace.addEventListener("click", manejarClic);
        }
    }
}

// Comprueba si un enlace apunta a una página HTML del propio sitio.
function esEnlaceInterno(enlace) {
    var destino = enlace.getAttribute("href");
    if (destino === null || destino === "") {
        return false;
    }
    if (destino.indexOf("#") === 0) {
        return false;
    }
    if (destino.indexOf("mailto:") === 0 || destino.indexOf("tel:") === 0) {
        return false;
    }
    if (destino.indexOf("http://") === 0 || destino.indexOf("https://") === 0) {
        return false;
    }
    // Solo redirigimos si es un .html o una ruta sin extensión.
    if (destino.indexOf(".html") === -1 && destino.indexOf(".") !== -1) {
        return false;
    }
    return true;
}

// Si el enlace apunta a una página inexistente, redirige al 404.
function manejarClic(evento) {
    var destino = evento.currentTarget.getAttribute("href");

    // En file:// no se puede hacer fetch fiablemente, así que
    // dejamos navegar normalmente y el navegador mostrará su error.
    if (window.location.protocol === "file:") {
        return;
    }

    evento.preventDefault();

    fetch(destino, { method: "HEAD" })
        .then(function (respuesta) {
            if (respuesta.ok) {
                window.location.href = destino;
            } else {
                window.location.href = "404.html";
            }
        })
        .catch(function () {
            window.location.href = "404.html";
        });
}
