/* ============================================================
   GESTIÓN DE SESIÓN Y CABECERA
   Construye la parte derecha de la cabecera con el selector de
   idioma, el icono de la cistella y los enlaces de inicio o
   cierre de sesión, dependiendo de si hay un usuario activo.
   ============================================================ */

// Clave usada para guardar el nombre de usuario en sessionStorage.
var CLAVE_USUARIO = "usuario";

// Devuelve el nombre del usuario activo, o null si no hay sesión.
function obtenerUsuarioActivo() {
    return sessionStorage.getItem(CLAVE_USUARIO);
}

// Guarda el nombre del usuario en la sesión.
function iniciarSesionUsuario(nombre) {
    sessionStorage.setItem(CLAVE_USUARIO, nombre);
}

// Elimina al usuario de la sesión.
function cerrarSesionUsuario() {
    sessionStorage.removeItem(CLAVE_USUARIO);
}

// Cuando se carga el DOM, montamos la cabecera dinámica.
document.addEventListener("DOMContentLoaded", function () {
    construirCabecera();
    actualizarContadorCarrito();
});

// Construye los elementos del bloque .sesion en la cabecera:
// idiomas, icono carrito (con contador) y zona de usuario.
function construirCabecera() {
    var contenedor = document.getElementById("sesion");
    if (contenedor === null) {
        return;
    }

    // Selector de idiomas (decorativo, sin recargar contenido).
    var idiomas = document.createElement("div");
    idiomas.className = "idiomas";
    idiomas.appendChild(crearBotonIdioma("ES", true));
    idiomas.appendChild(crearBotonIdioma("EN", false));
    idiomas.appendChild(crearBotonIdioma("CA", false));
    contenedor.appendChild(idiomas);

    // Enlace al carrito siempre visible, con contador de productos.
    var enlaceCarrito = document.createElement("a");
    enlaceCarrito.href = "carrito.html";
    enlaceCarrito.className = "icono-carrito";
    enlaceCarrito.title = "Ver cistella";
    var iconoCarro = document.createTextNode("🛒");
    enlaceCarrito.appendChild(iconoCarro);
    var contador = document.createElement("span");
    contador.className = "contador";
    contador.id = "contador-carrito";
    contador.textContent = "0";
    enlaceCarrito.appendChild(contador);
    contenedor.appendChild(enlaceCarrito);

    // Zona del usuario: distinta según haya o no sesión activa.
    var zonaUsuario = document.createElement("div");
    zonaUsuario.className = "zona-usuario";

    var usuarioActivo = obtenerUsuarioActivo();
    if (usuarioActivo !== null) {
        var saludo = document.createElement("span");
        saludo.className = "saludo";
        saludo.textContent = "Hola, " + usuarioActivo;
        zonaUsuario.appendChild(saludo);

        var botonSalir = document.createElement("button");
        botonSalir.className = "btn-logout";
        botonSalir.textContent = "Cerrar Sesión";
        botonSalir.addEventListener("click", function () {
            cerrarSesionUsuario();
            window.location.reload();
        });
        zonaUsuario.appendChild(botonSalir);
    } else {
        var iconoLogin = document.createElement("a");
        iconoLogin.href = "login.html";
        iconoLogin.className = "icono-login";
        iconoLogin.title = "Iniciar sesión";
        iconoLogin.textContent = "👤";
        zonaUsuario.appendChild(iconoLogin);
    }
    contenedor.appendChild(zonaUsuario);
}

// Crea un botón pequeño para el selector de idioma.
function crearBotonIdioma(codigo, activo) {
    var boton = document.createElement("button");
    boton.className = "btn-idioma" + (activo ? " activo" : "");
    boton.textContent = codigo;
    boton.addEventListener("click", function () {
        // Marca como activo el idioma pulsado y desmarca el resto.
        var botones = document.querySelectorAll(".btn-idioma");
        for (var i = 0; i < botones.length; i++) {
            botones[i].classList.remove("activo");
        }
        boton.classList.add("activo");
    });
    return boton;
}
