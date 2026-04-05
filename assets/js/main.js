const publications = [
  {
    title: "Interpretable Human-AI Collaboration in Creative Tasks",
    authors: "Haoyang Liu, A. Smith, B. Lee",
    year: 2025,
    url: "https://example.com/paper-1",
    venue: "CHI 2025"
  },
  {
    title: "Designing Trust Signals for Everyday AI Assistants",
    authors: "Haoyang Liu, C. Wang",
    year: 2024,
    url: "https://example.com/paper-2",
    venue: "UIST 2024"
  },
  {
    title: "A Study of Multimodal Feedback in Learning Interfaces",
    authors: "Haoyang Liu, D. Zhou, E. Martin",
    year: 2023,
    url: "https://example.com/paper-3",
    venue: "CSCW 2023"
  }
];

const photos = [
  { src: "assets/images/photo-01.svg", alt: "Conference hall with presentation screen", caption: "Conference Talk" },
  { src: "assets/images/photo-02.svg", alt: "A notebook and coffee on a desk", caption: "Research Notes" },
  { src: "assets/images/photo-03.svg", alt: "Campus path under trees", caption: "Campus Walk" },
  { src: "assets/images/photo-04.svg", alt: "Team photo after workshop", caption: "Workshop Team" }
];

const i18n = {
  zh: {
    navHome: "首页",
    navPublications: "论文",
    navGallery: "照片",
    navContact: "联系",
    heroResearchArea: "研究方向：开放集识别、数据挖掘、机器学习",
    heroDescription: "欢迎来到我的个人主页。你可以在这里查看我的论文、照片以及联系方式。",
    pubTitle: "论文发表",
    pubLead: "已选论文，按年份从新到旧排序。",
    pubView: "查看论文",
    galleryTitle: "照片相册",
    galleryLead: "研究现场与日常记录。",
    contactTitle: "联系方式",
    contactLead: "欢迎邮件联系，交流合作与研究问题。"
  },
  en: {
    navHome: "Home",
    navPublications: "Publications",
    navGallery: "Gallery",
    navContact: "Contact",
    heroResearchArea: "Research Area: Open Set Recognition, Data Mining, and Machine Learning",
    heroDescription: "Welcome to my personal website. Here you can find my publications, photos, and ways to connect.",
    pubTitle: "Publications",
    pubLead: "Selected papers sorted by year (latest first).",
    pubView: "Read Paper",
    galleryTitle: "Gallery",
    galleryLead: "Research moments and daily snapshots.",
    contactTitle: "Contact",
    contactLead: "Feel free to reach out for collaboration and academic discussions."
  }
};

let currentLang = "zh";
let currentPhotoIndex = 0;

const publicationsList = document.getElementById("publicationsList");
const galleryGrid = document.getElementById("galleryGrid");
const langToggle = document.getElementById("langToggle");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

function renderPublications() {
  const sortedPubs = [...publications].sort((a, b) => b.year - a.year);
  const viewText = i18n[currentLang].pubView;

  publicationsList.innerHTML = sortedPubs
    .map((pub) => {
      const venue = pub.venue ? ` · ${pub.venue}` : "";
      return `
        <article class="publication-card">
          <h3 class="publication-title">${pub.title}</h3>
          <p class="publication-meta">${pub.authors}</p>
          <p class="publication-meta">${pub.year}${venue}</p>
          <a class="publication-link" href="${pub.url}" target="_blank" rel="noreferrer">${viewText}</a>
        </article>
      `;
    })
    .join("");
}

function renderGallery() {
  galleryGrid.innerHTML = photos
    .map((photo, index) => `
      <button class="gallery-item" type="button" data-index="${index}" aria-label="${photo.alt}">
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
      </button>
    `)
    .join("");
}

function applyLanguage() {
  const dictionary = i18n[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });

  langToggle.textContent = currentLang === "zh" ? "EN" : "中";
  renderPublications();
}

function openLightbox(index) {
  currentPhotoIndex = index;
  const photo = photos[currentPhotoIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function moveLightbox(step) {
  currentPhotoIndex = (currentPhotoIndex + step + photos.length) % photos.length;
  openLightbox(currentPhotoIndex);
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  applyLanguage();
});

galleryGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest(".gallery-item");
  if (!trigger) return;
  openLightbox(Number(trigger.dataset.index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

renderGallery();
applyLanguage();
closeLightbox();
