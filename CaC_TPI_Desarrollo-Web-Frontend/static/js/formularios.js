// Validación

// Limitar la cantidad de dígitos permitidos
// Función para limitar los caracteres
function limitarCaracteres(inputPrecio) {
    var maxLength = 7; // Establecer el número máximo de dígitos permitidos, incluyendo el separador decimal

    // Ajustar maxLength si el valor contiene un separador decimal
    if (inputPrecio.value.indexOf('.') !== -1 || inputPrecio.value.indexOf(',') !== -1) {
        maxLength++;
    }

    // Si el campo está vacío, salir de la función sin hacer cambios
    if (inputPrecio.value === '') {
        return;
    }

    // Si contiene un separador decimal, aplicar la restricción mencionada
    if (inputPrecio.value.indexOf('.') !== -1 || inputPrecio.value.indexOf(',') !== -1) {
        let valor = inputPrecio.value.trim();
        let separador = valor.indexOf('.') !== -1 ? '.' : ','; // Determinar el tipo de separador usado
        let partes = valor.split(separador);
        let parteEntera = partes[0];
        let parteDecimal = partes[1] || ''; // Manejar el caso donde no haya parte decimal

        // Restringir la parte entera a 5 dígitos
        if (parteEntera.length > 5) {
            parteEntera = parteEntera.slice(0, 5);
        }

        // Limitar la parte decimal a dos dígitos
        parteDecimal = parteDecimal.slice(0, 2);

        // Revisar y formatear nuevamente el valor final con el separador correcto y los dos dígitos en la parte decimal
        let valorFinal = parteEntera + separador + parteDecimal;
        inputPrecio.value = valorFinal;

    } else {
        // Restringir a 5 dígitos si no contiene un separador decimal
        if (inputPrecio.value.length > 5) {
            inputPrecio.value = inputPrecio.value.slice(0, 5);
        }
    }
}

// Primer formulario (Agregar Producto)
const precioProductoInput = document.getElementById('precioProducto');
precioProductoInput.addEventListener('input', function() {
    limitarCaracteres(this);
});

// Segundo formulario (Modificar Producto)
const precioModificarInput = document.getElementById('precioModificar');
precioModificarInput.addEventListener('input', function() {
    limitarCaracteres(this);
});