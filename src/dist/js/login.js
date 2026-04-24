
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const honeypot = document.getElementById("website");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";
  formSuccess.textContent = "";
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();
  if (honeypot && honeypot.value !== "") return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let valid = true;

  if (!email) {
    emailError.textContent = "Inserisci la tua email.";
    emailInput.classList.add("is-invalid");
    valid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Formato email non valido.";
    emailInput.classList.add("is-invalid");
    valid = false;
  }

  if (!password) {
    passwordError.textContent = "Inserisci la password.";
    passwordInput.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) return;

  const userData = localStorage.getItem(email.toLowerCase());

  if (!userData) {
    formError.textContent = "Utente non trovato.";
    return;
  }

  const user = JSON.parse(userData);

  if (user.password !== password) {
    formError.textContent = "Email o password non corretti.";
    return;
  }

  localStorage.setItem(
    "fluxr_user",
    JSON.stringify({ email: user.email, name: user.name })
  );

  formSuccess.textContent = "Login effettuato! Reindirizzamento…";

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 800);
});
(function checkAlreadyLogged() {
  const saved = localStorage.getItem("fluxr_user");
  if (saved) {
    window.location.href = "./index.html";
  }
})();
