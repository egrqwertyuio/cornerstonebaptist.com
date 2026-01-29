const DEFAULT_ALBUM = "VBS2025";

function showError(msg) {
  const host = document.getElementById("vbsCarousel") || document.body;
  const el = document.createElement("p");
  el.style.color = "crimson";
  el.style.marginTop = "12px";
  el.style.fontWeight = "700";
  el.textContent = "VBS gallery error: " + msg;
  host.appendChild(el);
  console.error(msg);
}

async function getManifest() {
  let res;
  try {
    res = await fetch("assets/gallery.json", { cache: "no-cache" });
  } catch (e) {
    showError("Failed to fetch assets/gallery.json (serve over http, not file://).");
    throw e;
  }
  if (!res.ok) {
    showError(`assets/gallery.json returned HTTP ${res.status}.`);
    throw new Error("Bad status " + res.status);
  }
  return res.json();
}

function pickAlbum(manifest) {
  const params = new URLSearchParams(location.search);
  const requested = params.get("album") || DEFAULT_ALBUM;
  const albums = manifest.albums || Object.keys(manifest.data || {});
  if (!albums.length) {
    showError("No albums found in gallery.json. Did you run the build script?");
    return { name: null, assets: [] };
  }
  if (manifest.data?.[requested]?.length) return { name: requested, assets: manifest.data[requested] };

  const vbsCandidate = albums.find(a => a.toLowerCase().includes("vbs"));
  if (vbsCandidate && manifest.data[vbsCandidate]?.length) return { name: vbsCandidate, assets: manifest.data[vbsCandidate] };

  const firstNonEmpty = albums.find(a => (manifest.data[a] || []).length > 0);
  if (firstNonEmpty) {
    showError(`Album "${requested}" empty/missing. Showing "${firstNonEmpty}" instead.`);
    return { name: firstNonEmpty, assets: manifest.data[firstNonEmpty] };
  }
  showError("All albums are empty. Add media to assets/images/<Album>/ and rebuild.");
  return { name: null, assets: [] };
}

function makeSlide(item) {
  const li = document.createElement("div");
  li.className = "carousel-slide";
  li.setAttribute("role", "listitem");
  if (item.kind === "image") {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = item.url;
    img.alt = item.name;
    li.appendChild(img);
  } else {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    const src = document.createElement("source");
    src.src = item.url;
    video.appendChild(src);
    li.appendChild(video);
  }
  return li;
}

function initDots(count, onJump) {
  const dots = document.getElementById("carouselDots");
  dots.innerHTML = "";
  const els = [];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("button");
    b.className = "dot";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => onJump(i));
    dots.appendChild(b);
    els.push(b);
  }
  return els;
}

function setupCarousel(assets) {
  const track = document.getElementById("carouselTrack");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  track.innerHTML = "";
  assets.forEach(a => track.appendChild(makeSlide(a)));

  const slides = Array.from(track.children);
  let index = 0;
  const dots = initDots(slides.length, jump);

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }
  function next() { index = (index + 1) % slides.length; update(); }
  function prev() { index = (index - 1 + slides.length) % slides.length; update(); }
  function jump(i) { index = i; update(); }

  const hasMultiple = slides.length > 1;
  nextBtn.disabled = !hasMultiple;
  prevBtn.disabled = !hasMultiple;
  nextBtn.onclick = hasMultiple ? next : null;
  prevBtn.onclick = hasMultiple ? prev : null;

  window.addEventListener("keydown", (e) => { if (hasMultiple && (e.key === "ArrowRight" || e.key === "ArrowLeft")) (e.key === "ArrowRight" ? next : prev)(); });

  let startX = null;
  track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    startX = null;
  });

  update();
}

async function init() {
  try {
    const manifest = await getManifest();
    const { name, assets } = pickAlbum(manifest);
    if (!assets.length) return;
    console.log(`VBS: rendering album "${name}" with ${assets.length} item(s).`);
    setupCarousel(assets);
  } catch { /* errors already shown */ }
}

document.addEventListener("DOMContentLoaded", init);
