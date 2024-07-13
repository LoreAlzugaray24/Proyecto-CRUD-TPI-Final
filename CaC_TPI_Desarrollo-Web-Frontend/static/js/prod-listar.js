// Listado
const URL = "https://cafecentral.pythonanywhere.com/"; 

//Realizar solicitud GET al servidor para obtener todos los productos.
fetch(URL + "productos")
  .then(function (response) {
    if (response.ok) {
      //Convertir la respuesta de formato JSON a un objeto JavaScript y pasar estos datos a la siguiente promesa then.
      return response.json();
    } else {
      throw new Error("Error al obtener los productos."); //Si hubo un error, lanzar explícitamente una excepción para ser "catcheada" más adelante
    }
  })
  //Función para manejar los datos convertidos del JSON.
  .then(function (data) {
    let tablaProductos = document.getElementById("tablaProductos"); //Selecciona el elemento del DOM donde se mostrarán los productos.

    //Iterar sobre cada producto y agrega filas a la tabla
    for (let producto of data) {
      let fila = document.createElement("tr"); //Crea una nueva fila de tabla (<tr>) para cada producto.
      fila.innerHTML =
        '<td id="codigo" class="td-cod">' +
        producto.codigo +
        "</td>" +
        '<td class="td-text td-name">' +
        producto.nombre +
        "</td>" +
        '<td class="td-text">' +
        producto.descripcion +
        "</td>" +
        '<td class="td-precio">' +
        producto.precio +
        "</td>" +
        '<td class="td-imgP"><img src="https://cafecentral.pythonanywhere.com/static/imagenes/' +
        producto.imagen_url +
        '" alt="Imagen del producto"></td>' +
        '<td class="td-cat">' +
        producto.categoria +
        "</td>" +
        '<td class="td-acciones">' +
        '<div class="td_btns"><button id="btn-editar" class="btnOpen-formM btn-oF btn-edit td-btn" title="Editar" onclick="obtenerDatosProd(this)"><svg xmlns="http://www.w3.org/2000/svg" class="i-edit" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"/></svg></button>' +
        '<button id="btn-eliminar" class="btn-delete td-btn" title="Eliminar" onclick="quitarProducto(this)"><svg xmlns="http://www.w3.org/2000/svg" class="i-delete" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg></button></div>' +
        '</td>';

      //Creada la fila con el contenido del producto, se agrega a la tabla utilizando el método appendChild del elemento tablaProductos.
      tablaProductos.appendChild(fila);
    }
  })
  //Captura y manejo de errores, mostrando un alerta en caso de error al obtener los productos.
  .catch(function (error) {
    console.error('Error:', error);
    alert("Error al obtener los productos.");
  });

// Abrir/Cerrar Formularios
const formA = document.querySelector("#add-prod-form");
const openFormA = document.querySelector(".btnOpen-formA");
const closeFormA = document.querySelector(".btnClose-formA");

openFormA.addEventListener("click", () => {
  formA.showModal();  
});

closeFormA.addEventListener("click", () => {
  formA.close();
});


const formM = document.querySelector("#datos-producto");
const closeFormM = document.querySelector(".btnClose-formM");
const closeBackdrop = document.querySelector(".backdrop")

closeFormM.addEventListener("click", () => {
  formM.style.display = "none";
  closeBackdrop.style.display = 'none';
});

// Desabilitar porque causa conflicto debido a la función mostrarFormulario() en prod-modificar.js
//const openFormM = document.querySelector(".btnOpen-formM");
/*openFormM.addEventListener("click", () => {
  formM.style.display = "block";
});*/
