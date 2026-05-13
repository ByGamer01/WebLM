var productos = [
    {
        id: 1,
        nombre: "Entrenamiento de Fuerza",
        descripcion: "Ejercicios de levantamiento de pesas para aumentar la masa muscular de forma progresiva y segura.",
        categoria: "Fuerza",
        nivel: "Intermedio",
        duracion: "60 min",
        precio: 39.99,
        imagen: "img-fuerza"
    },
    {
        id: 2,
        nombre: "Entrenamiento Cardiovascular",
        descripcion: "Ejercicios de cardio para mejorar la resistencia y la salud del corazón.",
        categoria: "Cardio",
        nivel: "Principiante",
        duracion: "45 min",
        precio: 24.99,
        imagen: "img-cardio"
    },
    {
        id: 3,
        nombre: "Entrenamiento de Flexibilidad",
        descripcion: "Ejercicios de estiramiento para mejorar la flexibilidad y prevenir lesiones.",
        categoria: "Flexibilidad",
        nivel: "Avanzado",
        duracion: "30 min",
        precio: 19.99,
        imagen: "img-flex"
    },
    {
        id: 4,
        nombre: "Entrenamiento HIIT",
        descripcion: "Alta intensidad con periodos de descanso cortos para quemar grasa y mejorar la resistencia.",
        categoria: "HIIT",
        nivel: "Intermedio",
        duracion: "20 min",
        precio: 29.99,
        imagen: "img-hiit"
    },
    {
        id: 5,
        nombre: "Entrenamiento Funcional",
        descripcion: "Movimientos naturales que mejoran la coordinación y la fuerza para el día a día.",
        categoria: "Funcional",
        nivel: "Principiante",
        duracion: "40 min",
        precio: 27.99,
        imagen: "img-funcional"
    },
    {
        id: 6,
        nombre: "Entrenamiento de Yoga",
        descripcion: "Sesiones de yoga para mejorar la postura, la respiración y reducir el estrés.",
        categoria: "Flexibilidad",
        nivel: "Principiante",
        duracion: "50 min",
        precio: 22.99,
        imagen: "img-yoga"
    }
];

// Devuelve el producto por id, o null si no existe
function buscarProductoPorId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }
    return null;
}
