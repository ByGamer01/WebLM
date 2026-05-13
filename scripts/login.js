document.addEventListener("DOMContentLoaded", function () {
    inicializarFormularioLogin();
});

// Conecta los eventos del formulario y los inputs
function inicializarFormularioLogin() {
    var formulario = document.getElementById("login-form");
    var inputUsuario = document.getElementById("usuario");
    var inputPassword = document.getElementById("password");
    var botonOjo = document.getElementById("toggle-password");
    var mensajeError = document.getElementById("error-msg");

    if (formulario === null) {
        return;
    }

    // Validación en vivo mientras el usuario escribe la contraseña
    inputPassword.addEventListener("input", function () {
        mensajeError.textContent = validarPassword(inputPassword.value);
    });

    // Botón para mostrar u ocultar la contraseña
    if (botonOjo !== null) {
        botonOjo.addEventListener("click", function () {
            if (inputPassword.type === "password") {
                inputPassword.type = "text";
                botonOjo.textContent = "🙈";
            } else {
                inputPassword.type = "password";
                botonOjo.textContent = "👁";
            }
        });
    }

    // Validación final al enviar el formulario
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nombre = inputUsuario.value.trim();
        var clave = inputPassword.value;

        if (nombre === "") {
            mensajeError.textContent = "Debes introducir un nombre de usuario.";
            return;
        }

        var errorClave = validarPassword(clave);
        if (errorClave !== "") {
            mensajeError.textContent = errorClave;
            return;
        }

        // Guardamos el nombre en sessionStorage y volvemos al inicio
        iniciarSesionUsuario(nombre);
        window.location.href = "index.html";
    });
}

// Valida la contraseña (6-12 chars, mayúscula, minúscula, número); devuelve "" si es correcta
function validarPassword(clave) {
    if (clave.length < 6 || clave.length > 12) {
        return "La contraseña debe tener entre 6 y 12 caracteres.";
    }
    if (!/[A-Z]/.test(clave)) {
        return "La contraseña debe tener al menos una letra mayúscula.";
    }
    if (!/[a-z]/.test(clave)) {
        return "La contraseña debe tener al menos una letra minúscula.";
    }
    if (!/[0-9]/.test(clave)) {
        return "La contraseña debe tener al menos un número.";
    }
    return "";
}
