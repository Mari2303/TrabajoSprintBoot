document.addEventListener('DOMContentLoaded', function () {
    const API_BASE = 'http://localhost:8080'; // Cambia esta URL si tu backend está en otro lado
    const lista = document.getElementById('usuarios-lista');

    function cargarUsuarios() {
        fetch(`${API_BASE}/api/usuarios`)
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = '';
                data.forEach(usuario => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.numeroDocumento}</td>
                        <td>${usuario.numeroCelular}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="mostrarEditarModal(${usuario.id}, '${usuario.nombre}', '${usuario.apellido}', '${usuario.numeroCelular}')">Modificar</button>
                        </td>
                    `;
                    lista.appendChild(fila);
                });
            })
            .catch(error => {
                console.error('Error al cargar usuarios:', error);
                alert('No se pudo cargar la lista de usuarios.');
            });
    }

    cargarUsuarios();

    // Crear usuario
    document.getElementById('crear-usuario-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre-usuario').value;
        const apellido = document.getElementById('apellido-usuario').value;
        const numeroDocumento = document.getElementById('numero-documento-usuario').value;
        const numeroCelular = document.getElementById('numero-celular-usuario').value;

        fetch(`${API_BASE}/api/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, numeroDocumento, numeroCelular })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(() => {
            alert("Usuario creado exitosamente");
            cargarUsuarios();
            document.getElementById('crear-usuario-form').reset();
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
    });

    // Mostrar modal editar
    window.mostrarEditarModal = function (id, nombre, apellido, numeroCelular) {
        document.getElementById('editar-id').value = id;
        document.getElementById('editar-nombre').value = nombre;
        document.getElementById('editar-apellido').value = apellido;
        document.getElementById('editar-numero-celular').value = numeroCelular;
        const modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal'));
        modal.show();
    };

    // Editar usuario
    document.getElementById('editar-usuario-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const id = document.getElementById('editar-id').value;
        const nombre = document.getElementById('editar-nombre').value;
        const apellido = document.getElementById('editar-apellido').value;
        const numeroCelular = document.getElementById('editar-numero-celular').value;

        fetch(`${API_BASE}/api/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, numeroCelular })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
            return response.json();
        })
        .then(() => {
            alert('Usuario actualizado con éxito');
            cargarUsuarios();
            const modal = bootstrap.Modal.getInstance(document.getElementById('editarUsuarioModal'));
            modal.hide();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo actualizar el usuario.');
        });
    });

    // Actualizar documento
    document.getElementById('actualizar-numero-documento-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const numeroDocumentoActual = document.getElementById('numero-documento-actual').value;
        const nuevoNumeroDocumento = document.getElementById('nuevo-numero-documento').value;

        fetch(`${API_BASE}/api/usuarios/documento/${numeroDocumentoActual}/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoNumeroDocumento)
        }).then(response => {
            if (response.ok) {
                alert('Número de documento actualizado');
                cargarUsuarios();
                document.getElementById('actualizar-numero-documento-form').reset();
            } else {
                alert('Usuario no encontrado');
            }
        });
    });

    // Eliminar usuario
    document.getElementById('eliminar-usuario-documento-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const numeroDocumento = document.getElementById('numero-documento-eliminar').value;

        fetch(`${API_BASE}/api/usuarios/documento/${numeroDocumento}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                alert('Usuario eliminado');
                cargarUsuarios();
                document.getElementById('eliminar-usuario-documento-form').reset();
            } else {
                alert('Usuario no encontrado');
            }
        });
    });

    // Buscar usuario
    window.buscarUsuario = function () {
        const keyword = document.getElementById('busqueda').value.trim();

        if (keyword === "") {
            alert("Ingrese un término de búsqueda.");
            return;
        }

        fetch(`${API_BASE}/api/usuarios/buscar?keyword=${encodeURIComponent(keyword)}`)
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("usuarios-lista");
                tbody.innerHTML = "";

                if (data.length === 0) {
                    tbody.innerHTML = "<tr><td colspan='6' class='text-center'>No se encontraron usuarios</td></tr>";
                    return;
                }

                data.forEach(usuario => {
                    const fila = `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.numeroDocumento}</td>
                        <td>${usuario.numeroCelular}</td>
                    </tr>`;
                    tbody.innerHTML += fila;
                });
            })
            .catch(error => console.error('Error al buscar usuarios:', error));
    };
});
