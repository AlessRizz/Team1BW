(function checkAlreadyLogged() {
  const saved = localStorage.getItem("fluxr_user");
  if (saved) {
    try {
      JSON.parse(saved);
      window.location.href = "./index.html";
    } catch {
      localStorage.removeItem("fluxr_user");
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsInput = document.getElementById('terms');
    const websiteInput = document.getElementById('website');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');

    function clearErrors() {
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      confirmPasswordError.textContent = '';
      termsError.textContent = '';
      formError.textContent = '';
      formSuccess.textContent = '';
      [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => input.classList.remove('is-invalid'));
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
      // Almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password);
    }

    async function hashPassword(str) {
      const msgUint8 = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const terms = termsInput.checked;
      const website = websiteInput.value;

      if (website) return; // Honeypot

      let valid = true;

      if (!name) {
        nameError.textContent = 'Inserisci un nome utente.';
        nameInput.classList.add('is-invalid');
        valid = false;
      } else if (name.length < 3) {
        nameError.textContent = 'Il nome utente deve avere almeno 3 caratteri.';
        nameInput.classList.add('is-invalid');
        valid = false;
      }

      if (!email) {
        emailError.textContent = 'Inserisci la tua email.';
        emailInput.classList.add('is-invalid');
        valid = false;
      } else if (!isValidEmail(email)) {
        emailError.textContent = 'Inserisci un indirizzo email valido.';
        emailInput.classList.add('is-invalid');
        valid = false;
      }

      if (!password) {
        passwordError.textContent = 'Inserisci una password.';
        passwordInput.classList.add('is-invalid');
        valid = false;
      } else if (!isValidPassword(password)) {
        passwordError.textContent = 'La password deve avere almeno 8 caratteri, includere una maiuscola, una minuscola, un numero e un carattere speciale.';
        passwordInput.classList.add('is-invalid');
        valid = false;
      }

      if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Le password non corrispondono.';
        confirmPasswordInput.classList.add('is-invalid');
        valid = false;
      }

      if (!terms) {
        termsError.textContent = 'Devi accettare i termini e le condizioni.';
        valid = false;
      }

      if (!valid) return;

      const accountKey = "fluxr_account_" + email.toLowerCase();
      const userExists = localStorage.getItem(accountKey) || localStorage.getItem(email.toLowerCase());
      if (userExists) {
        emailError.textContent = 'Questa email è già registrata.';
        emailInput.classList.add('is-invalid');
        return;
      }

      const hashedPassword = await hashPassword(password);
      const userData = { name, email, password: hashedPassword };
      localStorage.setItem(accountKey, JSON.stringify(userData));

      formSuccess.textContent = 'Registrazione avvenuta con successo! Reindirizzamento in corso...';

      setTimeout(() => {
        window.location.href = './login.html';
      }, 1500);
    });
  }
});