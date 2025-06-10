document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simular base de datos local
            const agentes = JSON.parse(localStorage.getItem('agentes')) || [];

            // Admin en duro
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('usuario', JSON.stringify({ rol: 'admin', username }));
                window.location.href = 'dashboard-admin.html';
                return;
            }

            const encontrado = agentes.find(a =>
                (a.email === username || a.telefono === username) && a.password === password
            );

            if (encontrado) {
                localStorage.setItem('usuario', JSON.stringify({ rol: 'agente', id: encontrado.id }));
                window.location.href = 'dashboard-agente.html';
            } else {
                alert('Credenciales incorrectas');
            }
        });
    }

    const recoveryForm = document.getElementById('recoveryForm');
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Se enviaron instrucciones al correo');
            window.location.href = 'index.html';
        });
    }
});
