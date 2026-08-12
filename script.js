document.addEventListener('DOMContentLoaded', () => {
  // ============ DICCIONARIO DE TRADUCCIONES ============
  const translations = {
    es: {
      // Navegación principal
      "nav.home": "./inicio",
      "nav.services": "./a_que_me_dedico",
      "nav.projects": "./proyectos_contacto",

      // Interfaz general
      "theme.label": "modo",
      "footer.exit": "process exited (0)",

      // Inicio (index.html)
      "hero.lead": "Soy n0shell. Desarrollador. Me muevo entre código, sistemas y proyectos pequeños que hago con las manos, de principio a fin.",
      "hero.sub": "Esta web reúne quién soy, a qué me dedico y en qué ando trabajando.",
      "about.p1": "Llevo años metido en sistemas, código y seguridad, casi siempre por curiosidad antes que por trabajo. Me gusta entender cómo funciona algo por dentro y luego construirlo yo mismo, sin florituras.",
      "about.p2": "Fuera del código, también monto proyectos pequeños y físicos: desde webs a medida hasta chips NFC que la gente usa en el día a día. Todo lo que hago intento que sea simple, útil y que funcione sin dar problemas.",
      "nav.dedico.title": "A qué me dedico",
      "nav.dedico.desc": "Páginas web y chips NFC.",
      "nav.proyectos.title": "Proyectos & contacto",
      "nav.proyectos.desc": "Lo que he construido y cómo escribirme.",

      // A qué me dedico (servicios.html)
      "dedico.intro": "Dos cosas en las que puedo ayudarte ahora mismo:",
      "dedico.web.title": "Páginas web",
      "dedico.web.desc": "Desarrollo webs y landings a medida: rápidas, ligeras y sin nada de sobra. Desde la idea hasta que quede publicada.",
      "dedico.web.note": "¿Necesitas una web? Escríbeme.",
      "dedico.nfc.title": "Chips NFC",
      "dedico.nfc.desc": "Vendo chips NFC configurados y listos para usar: reseñas de Google, tarjetas digitales y más, con un solo toque.",
      "dedico.nfc.note": "Envíos solo dentro de España.",
      "dedico.cta": "contactar →",

      // Proyectos & Contacto (proyectos.html)
      "projects.text": "La mayoría del código vive en abierto. Repos, pruebas de concepto y herramientas sueltas.",
      "contact.lead": "Para páginas web o chips NFC (España), escríbeme por cualquiera de estos canales:"
    },
    en: {
      // Navegación principal
      "nav.home": "./home",
      "nav.services": "./what_i_do",
      "nav.projects": "./projects_contact",

      // Interfaz general
      "theme.label": "mode",
      "footer.exit": "process exited (0)",

      // Inicio (index.html)
      "hero.lead": "I am n0shell. Developer. I build across code, systems, and hands-on projects, from concept to deployment.",
      "hero.sub": "This site covers who I am, what I do, and what I'm currently working on.",
      "about.p1": "I've spent years immersed in systems, code, and security—driven by curiosity first. I like understanding how things work under the hood and building them myself cleanly.",
      "about.p2": "Beyond software, I craft practical real-world projects: custom websites and NFC tags used in daily workflows. Everything I build aims to be simple, useful, and reliable.",
      "nav.dedico.title": "What I do",
      "nav.dedico.desc": "Websites and NFC chips.",
      "nav.proyectos.title": "Projects & contact",
      "nav.proyectos.desc": "What I've built and how to reach me.",

      // A qué me dedico (servicios.html)
      "dedico.intro": "Two main areas I can assist you with right now:",
      "dedico.web.title": "Websites",
      "dedico.web.desc": "Custom websites and landing pages: fast, lightweight, and bloat-free. From initial idea to final deployment.",
      "dedico.web.note": "Need a website? Get in touch.",
      "dedico.nfc.title": "NFC Chips",
      "dedico.nfc.desc": "Pre-configured and ready-to-use NFC tags: Google reviews, digital contact cards, and more with a single tap.",
      "dedico.nfc.note": "Shipping within Spain only.",
      "dedico.cta": "contact →",

      // Proyectos & Contacto (proyectos.html)
      "projects.text": "Most of my code is open source. Repos, proof of concepts, and standalone tools.",
      "contact.lead": "For custom web projects or NFC tags (Spain), reach out through any of these channels:"
    }
  };

  // ============ ESTADO Y ELEMENTOS ============
  let currentLang = localStorage.getItem('n0shell-lang') || 'es';
  const langToggleBtn = document.getElementById('langToggle');
  const themeToggleBtn = document.getElementById('themeToggle');
  const clockElement = document.getElementById('clock');
  const yearElement = document.getElementById('year');

  // ============ LÓGICA DE IDIOMA ============
  function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('n0shell-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Actualizar todos los elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Actualizar los indicadores del botón de idioma
    const currentSpan = langToggleBtn.querySelector('[data-lang-current]');
    const otherSpan = langToggleBtn.querySelector('[data-lang-other]');
    if (currentSpan && otherSpan) {
      currentSpan.textContent = lang.toUpperCase();
      otherSpan.textContent = (lang === 'es' ? 'en' : 'es').toUpperCase();
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      updateLanguage(newLang);
    });
  }

  // Inicializar idioma almacenado o por defecto
  updateLanguage(currentLang);

  // ============ LÓGICA DE TEMA (CLARO/OSCURO) ============
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('n0shell-theme', newTheme);
    });
  }

  // ============ RELOJ EN TIEMPO REAL ============
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ============ AÑO AUTOMÁTICO EN EL FOOTER ============
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});