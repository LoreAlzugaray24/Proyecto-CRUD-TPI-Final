let productoAgregado = false; //Variables global para registrar si se ha agregado al menos un producto

//Capturar el evento de envío del formulario
document
  .getElementById("formularioA")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //Evitar que se envie el form

    var formData = new FormData(this);
    //Realizar la solicitud POST al servidor
    fetch(URL + "productos", {
      method: "POST",
      body: formData, //Enviar formData. Dado que formData puede contener archivos, no se utiliza JSON
    })
      //Utilizar el método then() para manejar la respuesta del servidor
      .then(function (response) {
        if (response.ok) {
          return response.json(); //Si la respuesta es exitosa, convertir los datos de la respuesta a formato JSON
        } else {
          throw new Error("Error al agregar el producto."); //Si hubo un error, lanzar explícitamente una excepción
        }
      })
      //Respuesta OK, mostrar una alerta
      .then(function (data) {
        alert("Producto agregado correctamente.");
        limpiarFormularioA(); // Limpiar los campos del formulario después de la presentación exitosa
        productoAgregado = true; // Actualizar la bandera para indicar que se ha agregado un producto        
      })
      //En caso de error, mostrar una alerta con un mensaje de error
      .catch(function (error) {
        alert("Error al agregar el producto.");
      });
  });

//Limpiar el formulario en ambos casos (éxito o error)
function limpiarFormularioA() {
  document.getElementById("nombreProducto").value = "";
  document.getElementById("descripcionProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("imagenProducto").value = "";
  document.getElementById("categoriaProducto").value = "";

  cancelarSeleccionImagenFormA()

  // Mostrar el mensaje seleccionar archivo
  var mensajeArchivoFA = document.getElementById("mensaje-archivoFA");
  if (mensajeArchivoFA) {
     mensajeArchivoFA.style.display = 'block';
  }
}

// Se activa cuando el usuario cierra el formulario
function cancelarSeleccionImagenFormA() {
  // Limpiar el nombre del archivo seleccionado
  const nombreArchivoSpanA = document.getElementById("nombre-archivoFA");
  if (nombreArchivoSpanA) {
    nombreArchivoSpanA.textContent = "";
  }

  // Reiniciar el valor del input de tipo file
  const inputFileA = document.getElementById("imagenProducto");
  if (inputFileA) {
    inputFileA.value = "";
  }
}

function cerrarFormA() {
  // Limpiar los campos del formulario si no se ha agregado ningún producto aún
  if (!productoAgregado) {
    limpiarFormularioA();
  }

  // Recargar la página solo si se ha agregado al menos un producto
  if (productoAgregado) {
    location.reload(); // Recargar la página para reflejar los productos agregados
  }
}
