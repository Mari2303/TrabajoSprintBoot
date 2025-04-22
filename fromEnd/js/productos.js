document.addEventListener('DOMContentLoaded', function () {
    const API_BASE = 'http://localhost:8080'; // Cambia esta URL si tu backend está en otro lado
    const lista = document.getElementById('productos-lista');

    function cargarProductos() {
        fetch(`${API_BASE}/api/productos`)
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = '';
                data.forEach(producto => {
                    const li = document.createElement('li');
                    li.textContent = `${producto.id} - ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad} - Categoría: ${producto.categoria}`;
                    lista.appendChild(li);
                });
            });
    }

    cargarProductos();

    document.getElementById('crear-producto-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre-producto').value;
        const precio = document.getElementById('precio-producto').value;
        const cantidad = document.getElementById('cantidad-producto').value;
        const categoria = document.getElementById('categoria-producto').value;

        fetch(`${API_BASE}/api/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, precio, cantidad, categoria })
        }).then(response => response.json())
          .then(() => {
              cargarProductos();
              document.getElementById('crear-producto-form').reset();
          });
    });

    document.getElementById('modificar-producto-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('id-producto-modificar').value;
        const nombre = document.getElementById('nombre-producto-modificar').value;
        const precio = document.getElementById('precio-producto-modificar').value;
        const cantidad = document.getElementById('cantidad-producto-modificar').value;
        const categoria = document.getElementById('categoria-producto-modificar').value;

        fetch(`${API_BASE}/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, precio, cantidad, categoria })
        }).then(response => {
            if (response.ok) {
                cargarProductos();
                document.getElementById('modificar-producto-form').reset();
            } else {
                alert('Producto no encontrado');
            }
        });
    });

    document.getElementById('eliminar-producto-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('id-producto-eliminar').value;
        fetch(`${API_BASE}/api/productos/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                cargarProductos();
                document.getElementById('eliminar-producto-form').reset();
            } else {
                alert('Producto no encontrado');
            }
        });
    });
});

