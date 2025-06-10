document.addEventListener('DOMContentLoaded', () => {
    const formAgente = document.getElementById('formAgente');
    if (formAgente) {
        formAgente.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const telefonoRegex = /^[0-9]{9}$/;

            if (!emailRegex.test(email)) {
                alert('Email inválido');
                e.preventDefault();
            }

            if (!telefonoRegex.test(telefono)) {
                alert('Teléfono debe tener 9 dígitos');
                e.preventDefault();
            }
        });
    }

    const formLlamada = document.getElementById('formLlamada');
    if (formLlamada) {
        formLlamada.addEventListener('submit', function(e) {
            const duracion = parseInt(document.getElementById('duracion').value);
            if (isNaN(duracion) || duracion <= 0) {
                alert('Ingrese una duración válida');
                e.preventDefault();
            }
        });
    }
});