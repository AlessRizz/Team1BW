
import { catalog } from "./player/catalog.js";

const SECTIONS = [
  { containerId: "cards-serie",  catalogKey: "serie"  },
  { containerId: "cards-film",   catalogKey: "film"   },
  { containerId: "cards-sport",  catalogKey: "sport"  },
];


SECTIONS.forEach(({ containerId, catalogKey }) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const videos = catalog[catalogKey] ?? [];
  container.innerHTML = videos.map(video => buildCard(video)).join("");
});

function buildCard(video) {
  const playerURL = `./player/player.html?id=${encodeURIComponent(video.id)}`;
  const badge = video.type === "youtube"
    ? `<span class="badge bg-danger mb-2"><i class="bi bi-youtube"></i> Trailer</span>`
    : `<span class="badge bg-primary mb-2"><i class="bi bi-play-circle"></i> HD</span>`;
  return `
    <div class="card min-w-15">
      <img
        src="${escapeHtml(video.poster)}"
        class="card-img-top"
        alt="${escapeHtml(video.title)}"
        onerror="this.src='../assets/img/placeholder.webp'"
      />
      <div class="card-body d-flex flex-column">
        ${badge}
        <h5 class="card-title">${escapeHtml(video.title)}</h5>
        <p class="card-text small flex-grow-1">${escapeHtml(video.description)}</p>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <small class="text-muted">${video.year} · ${escapeHtml(video.duration)}</small>
          <a href="${playerURL}" class="btn btn-primary btn-sm">
            <i class="bi bi-play-fill"></i> Guarda
          </a>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}