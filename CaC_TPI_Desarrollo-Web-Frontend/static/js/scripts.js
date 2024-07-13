// Expandir/Minimizar Sidebar
const expand_btn = document.querySelector(".expand-btn");
let sidebarCollapsed = false;

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
  sidebarCollapsed = !sidebarCollapsed;

  // Ajustar el margen del main al cambiar el estado del sidebar
  const main = document.querySelector("#show__pages");
  if (sidebarCollapsed) {
    main.style.marginLeft = "4.8rem";
  } else {
    main.style.marginLeft = "12.2rem";
  }
});

//Gestionar la navegación y la carga dinámica de contenido
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.sidebar-links a');

  links.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();

          // Obtener la URL de destino del atributo href
          const url = this.getAttribute('href');

          // Actualizar el src del iframe con la nueva URL
          document.querySelector('iframe[name="paginas"]').src = url;

          // Actualizar el título de la página (opcional)
          const pageTitle = this.getAttribute('title');
          document.title = `Café Central - ${pageTitle}`;

          // Agregar la URL al historial del navegador
          window.history.pushState({ path: url }, '', url);

          // Opcional: Cambiar estilos o clases activas para el enlace seleccionado
          // Puedes añadir una clase activa para resaltar el enlace seleccionado, etc.
          links.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
      });
  });
});


/*Alternativo*/
/**const expand_btn = document.querySelector(".expand-btn");
let activeIndex;

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

const current = window.location.href;
const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    const hrefLinkClick = elem.href;

    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});*/

// Simulación Backend
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si el usuario está autenticado
  const isLoggedIn = localStorage.getItem('loggedIn');

  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!isLoggedIn) {
      window.location.href = '/templates/login.html';
  }
});

// Cerrar sesión (simulación Backend)
function cerrarSesion() {
  localStorage.removeItem("loggedIn"); // Limpiar la marca de inicio de sesión
  window.location.href = "/templates/login.html"; // Redirigir a la página de inicio de sesión
}
