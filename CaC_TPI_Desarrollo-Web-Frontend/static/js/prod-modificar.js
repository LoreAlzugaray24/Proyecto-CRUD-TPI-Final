
// Variable global para almacenar el código del producto
let codigoProducto = '';

//Variables de estado para controlar la visibilidad y los datos del formulario
let codigo = '';
let nombre = '';
let descripcion = '';
let precio = '';
let categoria = '';
let imagen_url = '';
let imagenSeleccionada = null;
let imagenUrlTemp = null;

document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);
document.getElementById('nuevaImagen').addEventListener('change', seleccionarImagen);

/*Función para obtener el código del producto desde una tabla.
  Se ejecuta al hacer click en el btn Editar de la columna acciones.*/
function obtenerDatosProd(elemento) {    
    const fila = elemento.closest('tr'); //Obtener el elemento <tr> padre del botón que fue clickeado       
    const codigoProducto = fila.querySelector('.td-cod').textContent.trim(); //Encontrar el elemento <td> con el código dentro de la fila

    // Guardar el código del producto en la variable global
    codigoProductoGlobal = codigoProducto;

    obtenerProducto(codigoProducto); // Llama a la funcion obtenerProducto con el código obtenido
}

//Realiza una solicitud GET a la API y obtiene los datos del producto correspondiente al código.
function obtenerProducto(codigo) {
    fetch(URL + 'productos/' + codigo)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al obtener los datos del producto.')
        }
    })
    .then(data => {
        // Asignar datos a las variables globales
        nombre = data.nombre;
        descripcion = data.descripcion;
        precio = data.precio;        
        imagen_url = data.imagen_url;
        categoria = data.categoria;
        mostrarFormulario();
    })
    .catch(error => {
        alert('Código no encontrado.');
    });
}
//Muestra el formulario con los datos del producto
function mostrarFormulario() {
        document.getElementById('nombreModificar').value = nombre;
        document.getElementById('descripcionModificar').value = descripcion;
        document.getElementById('precioModificar').value = precio;
        document.getElementById('catModificar').value = categoria;

        const imagenActual = document.getElementById('imagen-actual');        
        if (imagen_url && !imagenSeleccionada) { // Verifica si imagen_url no está vacía y no se ha seleccionado una imagen
            imagenActual.src = 'https://cafecentral.pythonanywhere.com/static/imagenes/' + imagen_url;
            imagenActual.style.display = 'block'; // Muestra la imagen actual
        } else {
            imagenActual.style.display = 'none'; //Oculta la imagen si no hay URL
        }
        // Muestra el backdrop y el modal
        document.getElementById('backdrop').style.display = 'block';
        document.getElementById('datos-producto').style.display = 'block';
}

// Se activa cuando el usuario selecciona una imagen para cargar.
function seleccionarImagen(event) {
    const file = event.target.files[0];
    imagenSeleccionada = file;    

    if (window.URL) {
        imagenUrlTemp = window.URL.createObjectURL(file); // Crear URL temporal para la vista previa
    } else {
        console.error('window.URL.createObjectURL no está disponible en este navegador.');
        return;
    }
    
    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.src = imagenUrlTemp;
    imagenVistaPrevia.style.display = 'block';

    // Mostrar solo la imagen de vista previa y ocultar la imagen actual
    const imagenActual = document.getElementById('imagen-actual');
    imagenActual.style.display = 'none';
}


// Función para manejar el evento change en el input de tipo file (para todos los formularios)
function manejarCambioArchivo(inputId, spanId, pId) {
    const inputFile = document.getElementById(inputId);
    const nombreArchivoSpan = document.getElementById(spanId);
    const mensajeArchivoP = document.getElementById(pId);

    if (!inputFile || !nombreArchivoSpan || !mensajeArchivoP) {
        console.error(`No se encontró el input o span con los IDs proporcionados: ${inputId}, ${spanId}, ${pId}`);
        return;
    }

    inputFile.addEventListener('change', function() {
        if (inputFile.files.length > 0) {
            // Mostrar el nombre del archivo seleccionado en el span y ocultar el mensaje de archivo en el párrafo
            nombreArchivoSpan.textContent = inputFile.files[0].name;
            nombreArchivoSpan.style.display = 'inline'; // Mostrar el span
            mensajeArchivoP.style.display = 'none'; // Ocultar el párrafo
        } else {
            // Mostrar el mensaje de archivo en el párrafo y ocultar el span
            mensajeArchivoP.style.display = 'inline'; // Mostrar el párrafo
            nombreArchivoSpan.style.display = 'none'; // Ocultar el span
        }
    });
}
// Llama a la función para el primer formulario
manejarCambioArchivo('imagenProducto', 'nombre-archivoFA', 'mensaje-archivoFA');
// Llama a la función para el segundo formulario
manejarCambioArchivo('nuevaImagen', 'nombre-archivoFM', 'mensaje-archivoFM');


// Se activa cuando el usuario cancela la selección de una imagen.
function cancelarSeleccionImagen() {
    // Limpiar la vista previa y resetear las variables relacionadas
    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.src = '';
    imagenVistaPrevia.style.display = 'none';     

    // Limpiar el nombre del archivo mostrado en el span
    const nombreArchivoSpanM = document.getElementById('nombre-archivoFM');
    if (nombreArchivoSpanM) {
        nombreArchivoSpanM.textContent = '';
    }

    // Mostrar el mensaje de la etiqueta <p>
    const mensajeArchivoFM = document.getElementById('mensaje-archivoFM');
    if (mensajeArchivoFM) {
        mensajeArchivoFM.style.display = 'block'; 
    }

    // Limpiar el input de tipo file
    const inputFileM = document.getElementById('nuevaImagen');
    if (inputFileM) {
        inputFileM.value = '';       
    }    

    //Mostrar la imagen actual si existe
    const imagenActual = document.getElementById('imagen-actual');
    if (imagenActual.src) {
        imagenActual.style.display = 'block';
    }
    
    imagenSeleccionada = null;
    imagenUrlTemp = null;
}

// Se usa para enviar los datos modificados del producto al servidor.
function guardarCambios(event) {
    event.preventDefault();
    
    const codigoProducto = codigoProductoGlobal; // Obtener el código del producto desde la variable global

    const formData = new FormData();
    
    //formData.append('codigo', codigo);
    formData.append('nombre', document.getElementById('nombreModificar').value);
    formData.append('descripcion', document.getElementById('descripcionModificar').value);    
    formData.append('precio', document.getElementById('precioModificar').value);
    formData.append('categoria', document.getElementById('catModificar').value);
    // Si se ha seleccionado una imagen nueva, la añade al formData.
    if (imagenSeleccionada) {
        formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
    }

    fetch(URL + `productos/${codigoProducto}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al actualizar el producto.')
        }
    })
    .then(data => {
        alert('Producto actualizado correctamente.');
        limpiarFormulario();
    })
    .catch(error => {
        //console.error('Error:', error.message);
        alert('Error al guardar los cambios del producto.');
    });
}

//Limpiar el formulario y ocultar el dialog (cerrar el formulario)
function limpiarFormulario() {
    // Limpiar todos los campos del formulario y ocultar la imagen actual y la vista previa
    document.getElementById('codigo').value = '';
    document.getElementById('nombreModificar').value = '';
    document.getElementById('descripcionModificar').value = '';    
    document.getElementById('precioModificar').value = '';
    document.getElementById('catModificar').value = '';
    document.getElementById('nuevaImagen').value = '';

    const imagenActual = document.getElementById('imagen-actual');
    imagenActual.style.display = 'none';

    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.style.display = 'none';

    // Restablecer variables a sus valores iniciales, lo que efectivamente "limpia" el formulario.
    codigo = '';
    nombre = '';
    descripcion = '';    
    precio = '';
    categoria = '';
    imagen_url = '';
    imagenSeleccionada = null;
    imagenUrlTemp = null;

    // Oculta el backdrop y el modal
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById('datos-producto').style.display = 'none';

    // Recarga la página listado.html para mostrar el producto modificado
    location.reload(); 
}