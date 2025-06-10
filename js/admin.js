document.addEventListener('DOMContentLoaded', () => {

  
    const form = document.getElementById('formAgente');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const departamento = document.getElementById('departamento').value;
            const password = document.getElementById('password').value.trim();

            if (!nombre || !apellido || !email || !telefono || !departamento || !password) {
                alert('Todos los campos son obligatorios');
                return;
            }

            const nuevoAgente = {
                id: Date.now(),
                nombre,
                apellido,
                email,
                telefono,
                departamento,
                password
            };

            const agentes = JSON.parse(localStorage.getItem('agentes')) || [];
            agentes.push(nuevoAgente);
            localStorage.setItem('agentes', JSON.stringify(agentes));

            alert('Agente agregado exitosamente');
            window.location.href = 'dashboard-admin.html';
        });
    }

    // Mostrar Agentes
    const tabla = document.getElementById('tablaAgentes');
    if (tabla) {
        const agentes = JSON.parse(localStorage.getItem('agentes')) || [];

        if (agentes.length === 0) {
            tabla.innerHTML = '<tr><td colspan="5">No hay agentes registrados</td></tr>';
        } else {
            tabla.innerHTML = '';
            agentes.forEach(agente => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <tr>
                        <td>${agente.id}</td>
                        <td>${agente.nombre} ${agente.apellido}</td>
                        <td>${agente.email}</td>
                        <td>0</td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="eliminarAgente(${agente.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tabla.appendChild(fila);
            });
        }
    }
});

function eliminarAgente(id) {
    const confirmacion = confirm('¿Estás seguro de eliminar este agente?');
    if (!confirmacion) return;

    const agentes = JSON.parse(localStorage.getItem('agentes')) || [];
    const actualizados = agentes.filter(agente => agente.id !== id);
    localStorage.setItem('agentes', JSON.stringify(actualizados));
    location.reload();
}

const password = document.getElementById('password').value.trim();

const nuevoAgente = {
    id: Date.now(),
    nombre,
    apellido,
    email,
    telefono,
    departamento,
    password
};
