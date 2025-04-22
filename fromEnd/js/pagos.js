
    const API_BASE = 'http://localhost:8080'; // Cambia esta URL si tu backend está en otro lado

    document.addEventListener('DOMContentLoaded', function () {
        const lista = document.getElementById('pagos-lista');

        function cargarPagos() {
            fetch(`${API_BASE}/api/pagos`)
                .then(response => response.json())
                .then(data => {
                    lista.innerHTML = '';
                    data.forEach(pago => {
                        const li = document.createElement('li');
                        li.textContent = `${pago.id} - Venta ID: ${pago.venta.id} - Método: ${pago.metodoPago} - Monto: $${pago.monto} - Fecha: ${pago.fechaPago}`;
                        lista.appendChild(li);
                    });
                });
        }

        cargarPagos();

        document.getElementById('crear-pago-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const idVenta = document.getElementById('id-venta').value;
            const metodoPago = document.getElementById('metodo-pago').value;
            const monto = document.getElementById('monto-pago').value;

            fetch(`${API_BASE}/api/pagos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ venta: { id: idVenta }, metodoPago, monto })
            }).then(response => response.json())
                .then(() => {
                    cargarPagos();
                    document.getElementById('crear-pago-form').reset();
                });
        });

        document.getElementById('modificar-pago-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const id = document.getElementById('id-pago-modificar').value;
            const idVenta = document.getElementById('id-venta-modificar').value;
            const metodoPago = document.getElementById('metodo-pago-modificar').value;
            const monto = document.getElementById('monto-pago-modificar').value;

            fetch(`${API_BASE}/api/pagos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ venta: { id: idVenta }, metodoPago, monto })
            }).then(response => {
                if (response.ok) {
                    cargarPagos();
                    document.getElementById('modificar-pago-form').reset();
                } else {
                    alert('Pago no encontrado');
                }
            });
        });

        document.getElementById('eliminar-pago-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const id = document.getElementById('id-pago-eliminar').value;

            fetch(`${API_BASE}/api/pagos/${id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    cargarPagos();
                    document.getElementById('eliminar-pago-form').reset();
                } else {
                    alert('Pago no encontrado');
                }
            });
        });
    });












    // MODAL 

    function abrirModal(id) {
        document.getElementById(id).style.display = 'flex';
      }
  
      function cerrarModal(id) {
        document.getElementById(id).style.display = 'none';
      }
  
      window.onclick = function (event) {
        const modales = ['modalModificar', 'modalEliminar'];
        modales.forEach(id => {
          const modal = document.getElementById(id);
          if (event.target === modal) {
            cerrarModal(id);
          }
        });
      };
