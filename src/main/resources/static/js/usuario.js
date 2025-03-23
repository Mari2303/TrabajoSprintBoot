document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('usuarios-lista');

    function cargarUsuarios() {
        fetch('/api/usuarios')
            .then(response => response.json())
            .then(data => {
                const lista = document.getElementById('usuarios-lista');
                lista.innerHTML = ''; // Limpiar la tabla antes de llenarla
                data.forEach(usuario => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.numeroDocumento}</td>
                        <td>${usuario.numeroCelular}</td>
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
        
            fetch('/api/usuarios', {
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
                cargarUsuarios(); // Recargar la lista de usuarios
                document.getElementById('crear-usuario-form').reset();
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
        });
        

    document.getElementById('modificar-nombre-documento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const numeroDocumento = document.getElementById('numero-documento-modificar').value;
    const nombre = document.getElementById('nombre-usuario-modificar-documento').value;
    const apellido = document.getElementById('apellido-usuario-modificar-documento').value;
    const numeroCelular = document.getElementById('numero-celular-modificar-documento').value;

    fetch(`/api/usuarios/documento/${numeroDocumento}/nombre`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, numeroCelular })
    }).then(response => {
        if (response.ok) {
            alert('Usuario actualizado correctamente');
            cargarUsuarios();
            document.getElementById('modificar-nombre-documento-form').reset();
        } else {
            alert('Usuario no encontrado');
        }
    });
});

            
// modificar nuemro de documento por uno nuevo 
document.getElementById('actualizar-numero-documento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const numeroDocumentoActual = document.getElementById('numero-documento-actual').value;
    const nuevoNumeroDocumento = document.getElementById('nuevo-numero-documento').value;

    fetch(`/api/usuarios/documento/${numeroDocumentoActual}/actualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoNumeroDocumento) // Enviar solo el número
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
// eliminar con numero de documento
            document.getElementById('eliminar-usuario-documento-form').addEventListener('submit', function(event) {
                event.preventDefault();
                const numeroDocumento = document.getElementById('numero-documento-eliminar').value;

                fetch(`/api/usuarios/documento/${numeroDocumento}`, {
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
        });
        function buscarUsuario() {
            const keyword = document.getElementById('busqueda').value.trim();
        
            if (keyword === "") {
                alert("Ingrese un término de búsqueda.");
                return;
            }
        
            fetch(`/api/usuarios/buscar?keyword=${encodeURIComponent(keyword)}`)
                .then(response => response.json())
                .then(data => {
                    const tbody = document.getElementById("usuarios-lista");
                    tbody.innerHTML = ""; // Limpiar la tabla antes de mostrar los resultados
        
                    if (data.length === 0) {
                        tbody.innerHTML = "<tr><td colspan='5' class='text-center'>No se encontraron usuarios</td></tr>";
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
        }
        