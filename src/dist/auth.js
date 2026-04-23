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
        avatar.innerHTML = `<span class="text-white fw-bold" style="font-size: 14px;">${user.name.charAt(0).toUpperCase()}</span>`;
        avatar.classList.remove("bg-secondary");
        avatar.style.background = "linear-gradient(135deg, #7b2ff7, #c471ed)";
      }
    }

    // Aggiorna il menu dropdown
    profileDropdown.innerHTML = `
      <li>
        <span class="dropdown-item-text text-light small">
          <i class="bi bi-person-circle me-1"></i> ${user.name}
        </span>
      </li>
      <li><span class="dropdown-item-text text-muted small">${user.email}</span></li>
      <li><hr class="dropdown-divider bg-secondary"></li>
      <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-1"></i> Esci</a></li>
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
