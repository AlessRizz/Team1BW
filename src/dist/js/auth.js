(function initAuth() {
  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const saved = localStorage.getItem("fluxr_user");
  const user = saved ? JSON.parse(saved) : null;

  // Selettori mirati partendo dall'avatar per evitare conflitti con altri dropdown (es. Categorie)
  const profileAvatarContainer = document.querySelector(".profile-avatar");
  const profileDropdown = profileAvatarContainer ? profileAvatarContainer.closest(".dropdown").querySelector(".dropdown-menu") : null;
  const profileLabel = profileAvatarContainer ? profileAvatarContainer.closest(".dropdown-toggle").querySelector("span") : null;
  const profileIcon = profileAvatarContainer ? profileAvatarContainer.querySelector("i") : null;

  if (!profileDropdown) return;

  if (user) {
    const safeName = escapeHtml(user.name);
    const safeEmail = escapeHtml(user.email);
    const firstInitial = escapeHtml((user.name || "U").charAt(0).toUpperCase());

    if (profileLabel) {
      profileLabel.textContent = user.name;
    }

    if (profileIcon) {
      const avatar = profileIcon.closest(".profile-avatar");
      if (avatar) {
        avatar.innerHTML = `<span class="text-white fw-bold">${firstInitial}</span>`;
        avatar.classList.remove("bg-secondary");
        avatar.style.background = (".profile-avatar");
      }
    }

    // Aggiorna il menu dropdown
    profileDropdown.innerHTML = `
      <li>
        <span class="dropdown-item text-light small fw-bold">
          <i class="bi bi-person-circle me-1"></i> ${safeName}
        </span>
      </li>
      <li><span class="dropdown-item small text-secondary">${safeEmail}</span></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-1"></i> Esci</a></li>
    `;

    // Bottone Esci
    document.getElementById("logoutBtn").addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("fluxr_user");
      window.location.reload();
    });

  } else {
    profileDropdown.innerHTML = `
      <li><a class="dropdown-item" href="login.html">Accedi</a></li>
      <li><a class="dropdown-item" href="./register.html">Iscrizione Fluxr</a></li>
      <li><hr class="dropdown-divider"></li>
    `;
  }
})();