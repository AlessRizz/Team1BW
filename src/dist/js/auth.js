(function initAuth() {
  const saved = localStorage.getItem("fluxr_user");
  const user = saved ? JSON.parse(saved) : null;

  const profileDropdown = document.querySelector(".navbar .dropdown-menu-end");
  const profileLabel = document.querySelector(".navbar .dropdown-toggle span");
  const profileIcon = document.querySelector(".navbar .profile-avatar i");

  if (!profileDropdown) return;

  if (user) {
    if (profileLabel) {
      profileLabel.textContent = user.name;
    }

    if (profileIcon) {
      const avatar = profileIcon.closest(".profile-avatar");
      if (avatar) {
        avatar.innerHTML = `<span class="text-white fw-bold avatar-letter">${user.name.charAt(0).toUpperCase()}</span>`;
        avatar.innerHTML = `<span class="text-white fw-bold">${user.name.charAt(0).toUpperCase()}</span>`;
        avatar.classList.remove("bg-secondary");
        avatar.classList.add("avatar-gradient");
        avatar.style.background = (".profile-avatar");
      }
    }

    // Aggiorna il menu dropdown con un look più premium
    profileDropdown.innerHTML = `
      <li>
        <span class="dropdown-item-text text-light small">
          <i class="bi bi-person-circle me-1"></i> ${user.name}
        </span>
      </li>
    `;

    // Bottone Esci
    document.getElementById("logoutBtn").addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("fluxr_user");
      window.location.reload();
    });

  } else {
    const accediLink = profileDropdown.querySelector('a[href="login.html"]');
    if (!accediLink) {
      profileDropdown.innerHTML = `
        <li><a class="dropdown-item" href="login.html">Accedi</a></li>
        <li><a class="dropdown-item" href="#">Iscrizione Fluxr</a></li>
        <li><hr class="dropdown-divider bg-secondary"></li>
      `;
    }
  }
})();