import { catalog } from "../player/catalog.js";

const SECTIONS = [
  { containerId: "cards-serie", catalogKey: "serie" },
  { containerId: "cards-film", catalogKey: "film" },
  { containerId: "cards-sport", catalogKey: "sport" },
];

SECTIONS.forEach(({ containerId, catalogKey }) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const videos = catalog[catalogKey] ?? [];
  container.innerHTML = videos.map((video) => buildCard(video)).join("");
});

// Auto-scroll when hovering a card at the edge of the container (with throttle cooldown)
document.querySelectorAll(".categories").forEach((container) => {
  let isScrolling = false;
  container.addEventListener("mousemove", (e) => {
    if (isScrolling) return;

    const card = e.target.closest(".card");
    if (!card) return;

    const cRect = container.getBoundingClientRect();
    const kRect = card.getBoundingClientRect();

    // Card is at/past the right edge → scroll right
    if (kRect.right > cRect.right - 30) {
      isScrolling = true;
      container.scrollBy({ left: 320, behavior: "smooth" });
      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }
    // Card is at/past the left edge → scroll left
    else if (kRect.left < cRect.left + 30) {
      isScrolling = true;
      container.scrollBy({ left: -320, behavior: "smooth" });
      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }
  });
});

// Image fallback error listener (avoids inline onerror & infinite loops)
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG" && e.target.classList.contains("card-img-top")) {
      if (!e.target.dataset.fallbackAttempted) {
        e.target.dataset.fallbackAttempted = "true";
        e.target.src = "./assets/img/placeholder.webp";
      }
    }
  },
  true
);

function buildCard(video) {
  const playerURL = `./player/player.html?id=${encodeURIComponent(video.id)}`;
  const badge =
    video.type === "youtube"
      ? `<span class="badge bg-danger"><i class="bi bi-youtube"></i> Trailer</span>`
      : `<span class="badge bg-primary"><i class="bi bi-play-circle"></i> HD</span>`;
  return `
    <div class="card min-w-15">
      <a href="${playerURL}" class="card-poster-link" aria-label="${escapeHtml(video.title)}">
        <img
          src="${escapeHtml(video.poster)}"
          class="card-img-top"
          alt="${escapeHtml(video.title)}"
        />
      </a>
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="d-flex align-items-center justify-content-between mb-1">
          ${badge}
          <small class="text-grigio-chiaro">${escapeHtml(video.year)} · ${escapeHtml(video.duration)}</small>
        </div>
        <div class="flex-grow-1 overflow-hidden my-1">
          <h5 class="card-title mb-1">${escapeHtml(video.title)}</h5>
          <p class="card-text small mb-0">${escapeHtml(video.description)}</p>
        </div>
        <div class="d-flex justify-content-end mt-1">
          <a href="${playerURL}" class="btn mio-bottone btn-sm">
            <i class="bi bi-play-fill text-grigio-chiaro"></i> Guarda
          </a>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");

  if (e.target.closest("a")) return;

  if (card) {
    document.querySelectorAll(".card.card-active").forEach((c) => {
      if (c !== card) c.classList.remove("card-active");
    });
    card.classList.toggle("card-active");
  } else {
    document.querySelectorAll(".card.card-active").forEach((c) => {
      c.classList.remove("card-active");
    });
  }
});