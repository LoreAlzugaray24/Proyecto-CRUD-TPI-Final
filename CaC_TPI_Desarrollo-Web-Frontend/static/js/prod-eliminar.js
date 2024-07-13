// Eliminar producto

// Función para obtener los datos del producto
function quitarProducto(elemento) {
  // Obtener el elemento <tr> padre del botón que fue clickeado
  const fila = elemento.closest("tr");

  // Encontrar el elemento <td> con el código dentro de la fila
  const codigoProd = fila.querySelector(".td-cod").textContent.trim();

  // Test: Aquí se puede usar 'codigo' para realizar las operaciones necesarias en el Front-End
  //console.log('Código obtenido:', codigo);

  //Llamar a la funcion
  eliminarProducto(codigoProd);
}

function eliminarProducto(codigo) {
  // Mostrar un diálogo de confirmación antes de eliminar
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    fetch(URL + `productos/${codigo}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          alert("Producto eliminado correctamente.");
          location.reload();
        } else {
          throw new Error("Error al eliminar el producto.");
        }
      })
      //En caso de error, mostramos una alerta con un mensaje de error.
      .catch((error) => {
        alert(error.message);
      });
  }
}
