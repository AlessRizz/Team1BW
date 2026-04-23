import { findById } from "./catalog.js";


const params  = new URLSearchParams(window.location.search);
const videoId = params.get("id");           // es. "film-01"

const video = findById(videoId);


const playerSection = document.getElementById("player-section");
const playerError   = document.getElementById("player-error");
const metaTitle     = document.getElementById("meta-title");
const metaSubtitle  = document.getElementById("meta-subtitle");
const btnBack       = document.getElementById("btn-back");


if (!video) {
  playerSection?.classList.add("d-none");
  playerError?.classList.remove("d-none");

  console.warn(`[FLUXR Player] Nessun video trovato per id="${videoId}"`);

} else {


  document.title = `${video.title} — FLUXR`;

  if (metaTitle)    metaTitle.textContent = video.title;
  if (metaSubtitle) {
    const parts = [video.year, video.duration, video.category].filter(Boolean);
    metaSubtitle.textContent = parts.join("  ·  ");
  }


  if (video.type === "youtube") {
    initYouTube(video.src);                 
  } else {
    initVideoJS(video.src, video.poster);  
  }
}



btnBack?.addEventListener("click", () => {

  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = "../index.html";
  }
});


function initYouTube(youtubeId) {
  let id = extractYouTubeId(youtubeId);

  document.getElementById("yt-wrapper")?.classList.remove("d-none");
  document.getElementById("vjs-wrapper")?.classList.add("d-none");

  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src   = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  function extractYouTubeId(input) {
    if (/^[\w-]{11}$/.test(input)) return input;
    const match = input.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : input;
  }

  window.onYouTubeIframeAPIReady = function () {

    new YT.Player("yt-player", {
      videoId: id,
      playerVars: {
        autoplay:       1,  
        rel:            0,   
        modestbranding: 1,  
        playsinline:    1,   
        cc_load_policy: 1,  
      },
      events: {
        onReady: (event) => {
          console.log("[FLUXR] YouTube Player pronto →", id);
        },
        onError: (event) => {
          console.error("[FLUXR] YouTube Player errore →", event.data);
          showPlayerError(`Impossibile riprodurre il video (codice ${event.data}).`);
        }
      }
    });
  };

  if (window.YT && window.YT.Player) {
    window.onYouTubeIframeAPIReady();
  }
}


function initVideoJS(src, poster) {

  document.getElementById("yt-wrapper")?.classList.add("d-none");
  document.getElementById("vjs-wrapper")?.classList.remove("d-none");

  const videoEl = document.querySelector("#vjs-wrapper video");

  if (!videoEl) {
    console.error("[FLUXR] Elemento <video> non trovato in #vjs-wrapper");
    return;
  }

  videoEl.src   = src;
  if (poster) videoEl.poster = poster;

  console.log("[FLUXR] Video.js v10 — src impostato →", src);
}

function showPlayerError(msg) {
  const el = document.getElementById("player-error");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("d-none");
}