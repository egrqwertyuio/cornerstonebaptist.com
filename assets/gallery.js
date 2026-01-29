async function fetchGallery() {
  const res = await fetch("assets/gallery.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to load assets/gallery.json");
  return res.json();
}

function renderAlbumSelector(albums) {
  const sel = document.getElementById("albumSelect");
  if (!sel) return;
  sel.innerHTML = "";
  for (const a of albums) {
    const opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    sel.appendChild(opt);
  }
}

function makeLightbox() {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">Close</button>
    <div class="lightbox-content" role="dialog" aria-modal="true"></div>
  `;
  document.body.appendChild(lb);

  lb.querySelector(".lightbox-close").addEventListener("click", () => lb.classList.remove("open"));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });

  return {
    open(contentEl) {
      const target = lb.querySelector(".lightbox-content");
      target.innerHTML = "";
      target.appendChild(contentEl);
      lb.classList.add("open");
    }
  };
}

function renderGallery(assets, lightbox) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  for (const item of assets) {
    const card = document.createElement("div");
    card.className = "gallery-card";

    if (item.kind === "image") {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = item.url;
      img.alt = item.name;
      card.appendChild(img);
      card.addEventListener("click", () => {
        const full = document.createElement("img");
        full.src = item.url;
        full.alt = item.name;
        lightbox.open(full);
      });
    } else {
      const video = document.createElement("video");
      video.controls = true;
      video.preload = "metadata";
      const src = document.createElement("source");
      src.src = item.url;
      video.appendChild(src);
      card.appendChild(video);
      card.addEventListener("click", () => {
        const big = document.createElement("video");
        big.controls = true;
        big.autoplay = true;
        const s = document.createElement("source");
        s.src = item.url;
        big.appendChild(s);
        lightbox.open(big);
      });
    }

    grid.appendChild(card);
  }
}

let galleryData = null;

async function initGallery() {
  try {
    galleryData = await fetchGallery();
  } catch (e) {
    console.error(e);
    return;
  }
  const albums = galleryData.albums || Object.keys(galleryData.data || {});
  if (!albums.length) return;

  renderAlbumSelector(albums);
  const select = document.getElementById("albumSelect");
  const lightbox = makeLightbox();

  function refresh() {
    const assets = galleryData.data[select.value] || [];
    renderGallery(assets, lightbox);
  }

  select.addEventListener("change", refresh);
  select.value = albums[0];
  refresh();
}

document.addEventListener("DOMContentLoaded", initGallery);
