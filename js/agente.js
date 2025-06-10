
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.rol !== 'agente') {
        alert('Sesión no válida');
        window.location.href = 'index.html';
        return;
    }

  
    const formCliente = document.getElementById('formCliente');
    if (formCliente) {
        formCliente.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('clienteNombre').value.trim();
            const telefono = document.getElementById('clienteTelefono').value.trim();
            if (!nombre || !telefono) return alert('Completa todos los campos');

            const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
            const nuevo = {
                id: Date.now(),
                nombre,
                telefono,
                agenteId: usuario.id,
                ultima: '--'
            };
            clientes.push(nuevo);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            alert('Cliente agregado');
            location.reload();
        });
    }

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const asignados = clientes.filter(c => c.agenteId === usuario.id);

    const tabla = document.getElementById('tablaClientes');
    if (tabla) {
        tabla.innerHTML = '';
        asignados.forEach(c => {
            const fila = `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.nombre}</td>
                    <td>${c.telefono}</td>
                    <td>${c.ultima}</td>
                    <td><button class="btn btn-sm btn-outline-secondary" onclick="iniciarLlamada(${c.id})">Llamar</button></td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
        document.getElementById('clientesAsignados').textContent = asignados.length;
    }

 
    mostrarLlamadas();
});

function iniciarLlamada(clienteId) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;

    const resultado = prompt(`Registrar gestión para ${cliente.nombre} (Ej: resuelto, pendiente, etc):`);
    if (!resultado) return;

    cliente.ultima = new Date().toLocaleDateString();
    localStorage.setItem('clientes', JSON.stringify(clientes));

    const gestion = {
        clienteId: cliente.id,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        resultado,
        agenteId: cliente.agenteId,
        timestamp: new Date().toLocaleString()
    };

    const gestiones = JSON.parse(localStorage.getItem('gestiones')) || [];
    gestiones.unshift(gestion);
    localStorage.setItem('gestiones', JSON.stringify(gestiones));

    mostrarLlamadas();
}

function mostrarLlamadas() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const gestiones = JSON.parse(localStorage.getItem('gestiones')) || [];
    const lista = document.getElementById('ultimasLlamadas');
    if (lista) {
        lista.innerHTML = '';
        gestiones.filter(g => g.agenteId === usuario.id).slice(0, 5).forEach(g => {
            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.textContent = `${g.nombre} - ${g.resultado} (${g.timestamp})`;
            lista.appendChild(item);
        });
        document.getElementById('llamadasHoy').textContent = gestiones.filter(g => g.agenteId === usuario.id).length;
    }
}