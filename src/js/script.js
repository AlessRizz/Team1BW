const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const website = document.getElementById("website");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    formError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    if (website.value.trim() !== "") {
      formError.textContent = "Invio non valido.";
      return;
    }

    if (email.value.trim() === "") {
      emailError.textContent = "Inserisci l'email.";
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      emailError.textContent = "Email non valida.";
      isValid = false;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Inserisci la password.";
      isValid = false;
    } else if (password.value.trim().length < 8) {
      passwordError.textContent = "La password deve avere almeno 8 caratteri.";
      isValid = false;
    }

    if (!isValid) return;

    formSuccess.textContent = "Form valido. Login simulato riuscito.";
  });
}