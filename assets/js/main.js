const publications = [
  {
    title: "DSPL: Dual-space prompt learning with context bias decoupling for open set recognition",
    authors: "<strong>Haoyang Liu</strong>, Xuegang Hu, Yaojin Lin, Peipei Li",
    year: 2026,
    url: "https://ieeexplore.ieee.org/document/11516266",
    venue: "IEEE Transactions on Knowledge and Data Engineering, 38(8): 5041-5054 (CCF-A)"
  },
  {
    title: "Dual-module collaborative learning for open-set recognition with noisy labels",
    authors: "<strong>Haoyang Liu</strong>, Yaojin Lin, Peipei Li, Xuegang Hu",
    year: 2026,
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0031320326009301",
    venue: "Pattern Recognition, 180: 113965 (CCF-B)"
  },
  {
    title: "Multi-granularity decision information integration network for hierarchical classification via local and global constraints",
    authors: "<strong>Haoyang Liu</strong>, Peipei Li, Xuegang Hu, Shengxing Bai, Yaojin Lin",
    year: 2025,
    url: "https://link.springer.com/article/10.1007/s10489-025-06611-1",
    venue: "Applied Intelligence, 55(10): 756 (CCF-C)"
  },
  {
    title: "Class-specific semantic generation and reconstruction learning for open set recognition",
    authors: "<strong>Haoyang Liu</strong>, Yaojin Lin, Peipei Li, Jun Hu, Xuegang Hu",
    year: 2024,
    url: "https://www.ijcai.org/proceedings/2024/226",
    venue: "Proceedings of IJCAI 2024: 2045-2053 (CCF-A)"
  },
  {
    title: "Semantic-gap-oriented feature selection in hierarchical classification learning",
    authors: "<strong>Haoyang Liu</strong>, Yaojin Lin, Chenxi Wang, Lei Guo, Jinkun Chen",
    year: 2023,
    url: "https://www.sciencedirect.com/science/article/pii/S0020025523008265",
    venue: "Information Sciences, 642: 119241 (CCF-B)"
  },
  {
    title: "Hierarchical Feature Selection Based on Label Distribution Learning",
    authors: "Yaojin Lin, <strong>Haoyang Liu</strong>, Hong Zhao, Qinghua Hu, Xingquan Zhu, Xindong Wu",
    year: 2023,
    url: "https://ieeexplore.ieee.org/document/9780159/",
    venue: "IEEE Transactions on Knowledge and Data Engineering, 35(6): 5964-5976 (CCF-A)"
  },
  {
    title: "由粗到细的分层特征选择",
    authors: "<strong>刘浩阳</strong>, 林耀进, 刘景华, 吴镒潾, 毛煜, 李绍滋",
    year: 2022,
    url: "https://ejournal.org.cn/thesisDetails#10.12263/DZXB.20211263&lang=zh",
    venue: "电子学报, 2022, 50(11): 2778-2789 (CCF-A)"
  }
];

const photos = [
  { src: "assets/images/ijcai24_1.jpg", alt: "IJCAI 2024 conference venue", caption: "Conference Venue / 会场" },
  { src: "assets/images/ijcai24_2.jpg", alt: "IJCAI 2024 presentation", caption: "Presentation / 汇报" },
  { src: "assets/images/ijcai24_3.jpg", alt: "IJCAI 2024 banquet", caption: "Banquet / 晚宴" }
];

const i18n = {
  zh: {
    navHome: "首页",
    navPublications: "论文",
    navGallery: "照片",
    navContact: "联系",
    heroResearchArea: "研究方向：开放集识别、数据挖掘、机器学习",
    heroDescription: "欢迎来到我的个人主页。你可以在这里查看我的论文、照片以及联系方式。",
    pubTitle: "论文成果",
    pubLead: "",
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
    pubTitle: "Research Outputs",
    pubLead: "",
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
const navLinks = [...document.querySelectorAll(".nav-list a")];
const revealNodes = [...document.querySelectorAll(".reveal")];

function splitVenueAndBadge(venue) {
  const match = venue.match(/^(.*)\s\((CCF-[A-Z])\)$/);
  if (!match) {
    return { venueText: venue, badge: "" };
  }

  return {
    venueText: match[1],
    badge: match[2]
  };
}

function renderPublications() {
  const sortedPubs = [...publications].sort((a, b) => b.year - a.year);
  const viewText = i18n[currentLang].pubView;

  publicationsList.innerHTML = sortedPubs
    .map((pub) => {
      const { venueText, badge } = splitVenueAndBadge(pub.venue || "");
      const venueLine = venueText
        ? `<div class="publication-venue-row">
             <p class="publication-meta">${venueText}</p>
             ${badge ? `<span class="publication-badge">${badge}</span>` : ""}
           </div>`
        : "";

      return `
        <article class="publication-card">
          <div class="publication-year">${pub.year}</div>
          <div class="publication-body">
            <h3 class="publication-title">${pub.title}</h3>
            <p class="publication-meta">${pub.authors}</p>
            ${venueLine}
            <a class="publication-link" href="${pub.url}" target="_blank" rel="noreferrer">${viewText}</a>
          </div>
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

function setActiveNavLink() {
  const sections = [...document.querySelectorAll("main section[id]")];
  let activeId = sections[0]?.id || "home";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom > 140) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealNodes.forEach((node) => observer.observe(node));
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
setupReveal();
setActiveNavLink();
document.addEventListener("scroll", setActiveNavLink, { passive: true });
