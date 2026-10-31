/* ===== DustyInSide - Main JS ===== */

// ---------- i18n ----------
const translations = {
  ru: {
    nav_home: "Главная",
    nav_projects: "Проекты",
    nav_tools: "Инструменты",
    nav_prompts: "Промпты",
    nav_skills: "Навыки",
    hero_title: "Коллекция полезных инструментов и проектов",
    hero_desc: "Нейросети, софт, промпты, навыки и мои разработки — всё в одном месте.",
    section_projects: "Мои проекты",
    section_projects_sub: "Игры, программы и другие разработки",
    section_tools: "Инструменты и Нейросети",
    section_tools_sub: "Полезные сервисы и софт под разные задачи",
    section_prompts: "Сборники промптов",
    section_prompts_sub: "Готовые промпты для разных задач",
    section_skills: "Навыки для НН",
    section_skills_sub: "Полезные скиллы и инструкции",
    more: "Подробнее",
    open: "Открыть",
    close: "Закрыть",
    coming_soon: "Скоро будет добавлено",
    footer_text: "Сделано с ♥ · DustyInSide",
    placeholder_title: "Заглушка",
    placeholder_desc: "Контент будет добавлен позже",
  },
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_tools: "Tools",
    nav_prompts: "Prompts",
    nav_skills: "Skills",
    hero_title: "Collection of useful tools & projects",
    hero_desc: "AI tools, software, prompts, skills and my projects — all in one place.",
    section_projects: "My Projects",
    section_projects_sub: "Games, apps and other creations",
    section_tools: "Tools & AI",
    section_tools_sub: "Useful services and software for different tasks",
    section_prompts: "Prompt Collections",
    section_prompts_sub: "Ready-to-use prompts for various tasks",
    section_skills: "AI Skills",
    section_skills_sub: "Useful skills and instructions",
    more: "Learn more",
    open: "Open",
    close: "Close",
    coming_soon: "Coming soon",
    footer_text: "Made with ♥ · DustyInSide",
    placeholder_title: "Placeholder",
    placeholder_desc: "Content will be added later",
  },
};

// ---------- State ----------
let currentLang = localStorage.getItem("lang") || "ru";
let currentTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// ---------- Theme ----------
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  currentTheme = theme;

  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

// ---------- Language ----------
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update lang button text
  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.textContent = lang === "ru" ? "EN" : "RU";
  }
}

function toggleLang() {
  applyLang(currentLang === "ru" ? "en" : "ru");
}

// ---------- Mobile menu ----------
function toggleMenu() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menu-toggle");
  if (nav) nav.classList.toggle("open");
  if (toggle) toggle.classList.toggle("active");
}

// ---------- Modal ----------
function openModal(data) {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;

  const iconEl = overlay.querySelector(".modal-icon");
  const titleEl = overlay.querySelector(".modal-title");
  const bodyEl = overlay.querySelector(".modal-body");
  const actionsEl = overlay.querySelector(".modal-actions");

  if (iconEl) iconEl.textContent = data.icon || "📂";
  if (titleEl) titleEl.textContent = data.title || "";
  if (bodyEl) bodyEl.innerHTML = data.body || "";

  if (actionsEl) {
    actionsEl.innerHTML = "";
    if (data.link) {
      const a = document.createElement("a");
      a.href = data.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "btn btn-primary";
      a.textContent = translations[currentLang].open;
      actionsEl.appendChild(a);
    }
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal on overlay click / Escape
document.addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);
  applyLang(currentLang);

  // Theme button
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Lang button
  const langBtn = document.getElementById("lang-btn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.remove("open");
    });
  });

  // Card click handlers (example)
  document.querySelectorAll("[data-modal]").forEach((card) => {
    card.addEventListener("click", () => {
      const data = JSON.parse(card.getAttribute("data-modal"));
      openModal(data);
    });
  });
});
