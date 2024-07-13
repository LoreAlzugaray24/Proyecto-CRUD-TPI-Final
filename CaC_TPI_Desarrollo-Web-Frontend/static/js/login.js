// Simulación de datos registrados (correo y contraseña)
const registeredEmail = "usuario@correo.com";
const registeredPassword = "usuario";

const form = document.querySelector("form"),
  emailField = form.querySelector(".email-field"),
  emailInput = emailField.querySelector(".email"),
  passField = form.querySelector(".password-field"),
  passInput = passField.querySelector(".password");

// Mostrar mensajes de error
function showError(field, message) {
  const errorElement = field.querySelector(".error-text");
  errorElement.textContent = message;
}

// Limpiar mensajes de error
function clearError(field) {
  const errorElement = field.querySelector(".error-text");

  errorElement.textContent = "";
}

// Validar el formato de correo electrónico
function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Email Validación
function checkEmail() {
  const emailValue = emailInput.value.trim();
  
  if (emailValue === "") {
    emailField.classList.add("invalid");
    showError(emailField, "Ingrese el correo electrónico");
  } else if (!isEmail(emailValue)) {
    emailField.classList.add("invalid");
    showError(emailField, "Correo electrónico incorrecto.");
  } else if (emailValue !== registeredEmail) {
    emailField.classList.add("invalid");
    showError(emailField, "Correo electrónico no registrado.");
  } else {
    emailField.classList.remove("invalid");
    clearError(emailField);
  }
}

// Validación de Contraseña
function validatePassword() {
  const passwordValue = passInput.value.trim();
  
  if (passwordValue === "") {
    passField.classList.add("invalid");
    showError(passField, "Ingrese la contraseña");
  } else if (passwordValue !== registeredPassword) {
    passField.classList.add("invalid");
    showError(passField, "Contraseña incorrecta.");
  } else {
    passField.classList.remove("invalid");
    clearError(passField);
  }
}

// Mostrar/Ocultar Contraseña
const eyeIcon = passField.querySelector(".show-hide");

eyeIcon.addEventListener("click", () => {
  if (passInput.type === "password") {
    eyeIcon.classList.replace("fa-hide", "fa-show");
    passInput.type = "text";
  } else {
    eyeIcon.classList.replace("fa-show", "fa-hide");
    passInput.type = "password";
  }
});

// Llamar a las funciones en el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar envío automático del formulario
  
  // Validar email y contraseña (solo al enviar el formulario)
  checkEmail();
  validatePassword();
  
  // Verificar si ambos campos son válidos
  if (!emailField.classList.contains("invalid") && !passField.classList.contains("invalid")) {
    //console.log("Formulario válido. Redirigiendo a la página principal...");
    //window.location.href = "/";
    
    // Autenticación exitosa, establecer marcador en localStorage (Simulación Backend)
    localStorage.setItem('loggedIn', true);
    window.location.href = '/'; // Redirigir a la página principal
  } else {
    alert('Credenciales incorrectas'); // Mensaje de error en caso de credenciales incorrectas   
  }
});

// Limpiar mensajes de error al hacer focus en los inputs
emailInput.addEventListener("focus", () => {
  if (emailField.classList.contains("invalid")) {
    emailField.classList.remove("invalid");
    clearError(emailField);
  }
});

passInput.addEventListener("focus", () => {
  if (passField.classList.contains("invalid")) {
    passField.classList.remove("invalid");
    clearError(passField);
  }
});

// Llamar funciones en el evento keyup para validación en tiempo real (opcional)
//emailInput.addEventListener("keyup", checkEmail);
//passInput.addEventListener("keyup", validatePassword);