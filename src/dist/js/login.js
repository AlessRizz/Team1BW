document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("fluxr_user");
  if (saved) {
    window.location.href = "./index.html";
    return;
  }

  const form = document.getElementById("loginForm");
  if (!form) return;

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

    if (honeypot && honeypot.value.trim() !== "") {
      formError.textContent = "Invio non valido.";
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

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
    } else if (password.length < 8) {
      passwordError.textContent = "La password deve avere almeno 8 caratteri.";
      passwordInput.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) return;

    const userData = localStorage.getItem(email);

    if (!userData) {
      emailError.textContent = "Utente non trovato.";
      emailInput.classList.add("is-invalid");
      return;
    }

    const user = JSON.parse(userData);

    if (user.password !== password) {
      formError.textContent = "Email o password non corretti.";
      passwordInput.classList.add("is-invalid");
      return;
    }

    localStorage.setItem(
      "fluxr_user",
      JSON.stringify({
        email: user.email,
        name: user.name
      })
    );

    formSuccess.textContent = "Login effettuato! Reindirizzamento in corso...";

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  });
});