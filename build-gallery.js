// build-gallery.js
// Generates gallery.manifest.json by scanning assets/images/* folders

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BASE_DIR = path.join(ROOT, "assets", "images");
const OUT_FILE = path.join(ROOT, "gallery.manifest.json");

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const VID_EXT = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);

function isMedia(file) {
  const ext = path.extname(file).toLowerCase();
  if (IMG_EXT.has(ext)) return "image";
  if (VID_EXT.has(ext)) return "video";
  return null;
}

function walkFolder(folderAbs, folderRel) {
  const items = fs.readdirSync(folderAbs, { withFileTypes: true });
  const files = [];
  items.forEach((it) => {
    if (it.name.startsWith(".")) return; // ignore hidden files
    const abs = path.join(folderAbs, it.name);
    const rel = path.join(folderRel, it.name).replace(/\\/g, "/");
    if (it.isFile()) {
      const type = isMedia(it.name);
      if (type) files.push({ type, src: rel, name: it.name });
    }
    // (optional) support nested subfolders:
    if (it.isDirectory()) {
      files.push(...walkFolder(abs, rel));
    }
  });
  // sort by name so slides appear in time order
  files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return files;
}

function build() {
  if (!fs.existsSync(BASE_DIR)) {
    console.error("Missing folder:", BASE_DIR);
    process.exit(1);
  }

  const folders = {};
  const dirs = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory());

  dirs.forEach(dir => {
    const rel = dir.name;
    const abs = path.join(BASE_DIR, rel);
    const files = walkFolder(abs, `assets/images/${rel}`);
    if (files.length) folders[rel] = files;
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    baseDir: "assets/images",
    folders, // { "VBS2025": [ {type:"image", src:"assets/images/VBS2025/xxx.jpg"} ] }
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Wrote ${OUT_FILE} with ${Object.keys(folders).length} folder(s).`);
}

build();
