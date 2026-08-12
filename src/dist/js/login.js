
(function checkAlreadyLogged() {
  const saved = localStorage.getItem("fluxr_user");
  if (saved) {
    window.location.href = "./index.html";
  }
})();

document.addEventListener("DOMContentLoaded", () => {
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
    if (emailError) emailError.textContent = "";
    if (passwordError) passwordError.textContent = "";
    if (formError) formError.textContent = "";
    if (formSuccess) formSuccess.textContent = "";
    if (emailInput) emailInput.classList.remove("is-invalid");
    if (passwordInput) passwordInput.classList.remove("is-invalid");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    if (honeypot && honeypot.value !== "") return;

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    let valid = true;

    if (!email) {
      if (emailError) emailError.textContent = "Inserisci la tua email.";
      if (emailInput) emailInput.classList.add("is-invalid");
      valid = false;
    } else if (!isValidEmail(email)) {
      if (emailError) emailError.textContent = "Formato email non valido.";
      if (emailInput) emailInput.classList.add("is-invalid");
      valid = false;
    }

    if (!password) {
      if (passwordError) passwordError.textContent = "Inserisci la password.";
      if (passwordInput) passwordInput.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) return;

    const userData = localStorage.getItem(email.toLowerCase());

    if (!userData) {
      if (formError) formError.textContent = "Utente non trovato.";
      return;
    }

    let user;
    try {
      user = JSON.parse(userData);
    } catch (err) {
      console.error("Errore nel parsing dei dati utente:", err);
      if (formError) formError.textContent = "Errore interno nei dati salvati.";
      return;
    }

    if (user.password !== password) {
      if (formError) formError.textContent = "Email o password non corretti.";
      return;
    }

    localStorage.setItem(
      "fluxr_user",
      JSON.stringify({ email: user.email, name: user.name })
    );

    if (formSuccess) formSuccess.textContent = "Login effettuato! Reindirizzamento…";

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 800);
  });
});