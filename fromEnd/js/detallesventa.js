const API_BASE = 'http://localhost:8080'; // Cambia esta URL si tu backend está en otro lado

document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById('detalles-venta-lista');

    function cargarDetallesVenta() {
        fetch(`${API_BASE}/api/detalles_venta`)
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = '';
                data.forEach(detalle => {
                    const li = document.createElement('li');
                    li.textContent = `${detalle.id} - Venta ID: ${detalle.venta.id} - Producto ID: ${detalle.producto.id} - Cantidad: ${detalle.cantidad} - Precio: $${detalle.precio}`;
                    lista.appendChild(li);
                });
            });
    }

    cargarDetallesVenta();

    document.getElementById('crear-detalle-venta-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const idVenta = document.getElementById('id-venta').value;
        const idProducto = document.getElementById('id-producto').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;

        fetch(`${API_BASE}/api/detalles_venta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                venta: { id: idVenta },
                producto: { id: idProducto },
                cantidad,
                subtotal: precio
            })
        }).then(response => response.json())
          .then(() => {
              cargarDetallesVenta();
              document.getElementById('crear-detalle-venta-form').reset();
          });
    });

    document.getElementById('modificar-detalle-venta-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('id-detalle-venta-modificar').value;
        const idVenta = document.getElementById('id-venta-modificar').value;
        const idProducto = document.getElementById('id-producto-modificar').value;
        const cantidad = document.getElementById('cantidad-modificar').value;
        const precio = document.getElementById('precio-modificar').value;

        fetch(`${API_BASE}/api/detalles_venta/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                venta: { id: idVenta },
                producto: { id: idProducto },
                cantidad,
                subtotal: precio
            })
        }).then(response => {
            if (response.ok) {
                cargarDetallesVenta();
                document.getElementById('modificar-detalle-venta-form').reset();
            } else {
                alert('Detalle de venta no encontrado');
            }
        });
    });

    document.getElementById('eliminar-detalle-venta-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('id-detalle-venta-eliminar').value;

        fetch(`${API_BASE}/api/detalles_venta/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                cargarDetallesVenta();
                document.getElementById('eliminar-detalle-venta-form').reset();
            } else {
                alert('Detalle de venta no encontrado');
            }
        });
    });
});
