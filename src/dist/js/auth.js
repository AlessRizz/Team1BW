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
        avatar.classList.remove("bg-secondary");
        avatar.classList.add("avatar-gradient");
      }
    }

    // Aggiorna il menu dropdown con un look più premium
    profileDropdown.innerHTML = `
      <div class="dropdown-header-user px-3 py-2 mb-2 border-bottom border-secondary">
        <div class="fw-bold text-white small">${user.name}</div>
        <div class="text-muted small">${user.email}</div>
      </div>
      <li><a class="dropdown-item py-2" href="#"><i class="bi bi-person me-2"></i> Il mio profilo</a></li>
      <li><a class="dropdown-item py-2" href="#"><i class="bi bi-gear me-2"></i> Impostazioni</a></li>
      <li><hr class="dropdown-divider bg-secondary"></li>
      <li>
        <a class="dropdown-item py-2 logout-item" href="#" id="logoutBtn">
          <i class="bi bi-box-arrow-right me-2"></i> <strong>Esci</strong>
        </a>
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