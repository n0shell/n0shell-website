/* ==========================================================
   ./n0shell — script.js (compartido por index / subweb1 / subweb2)
   Sin dependencias. Vanilla ES6+.
   ========================================================== */

(() => {
  'use strict';

  /* ==========================================================
     i18n — diccionario ES / EN
     ========================================================== */
  const STRINGS = {
    es: {
      'theme.label': 'modo',
      'hero.lead': 'Soy n0shell. Desarrollador. Me muevo entre código, sistemas y proyectos pequeños que hago con las manos, de principio a fin.',
      'hero.sub': 'Esta web reúne quién soy, a qué me dedico y en qué ando trabajando.',
      'about.p1': 'Llevo años metido en sistemas, código y seguridad, casi siempre por curiosidad antes que por trabajo. Me gusta entender cómo funciona algo por dentro y luego construirlo yo mismo, sin florituras.',
      'about.p2': 'Fuera del código, también monto proyectos pequeños y físicos: desde webs a medida hasta chips NFC que la gente usa en el día a día. Todo lo que hago intento que sea simple, útil y que funcione sin dar problemas.',
      'nav.dedico.title': 'A qué me dedico',
      'nav.dedico.desc': 'Páginas web y chips NFC.',
      'nav.proyectos.title': 'Proyectos & contacto',
      'nav.proyectos.desc': 'Lo que he construido y cómo escribirme.',
      'dedico.intro': 'Dos cosas en las que puedo ayudarte ahora mismo:',
      'dedico.web.title': 'Páginas web',
      'dedico.web.desc': 'Desarrollo webs y landings a medida: rápidas, ligeras y sin nada de sobra. Desde la idea hasta que quede publicada.',
      'dedico.web.note': '¿Necesitas una web? Escríbeme.',
      'dedico.nfc.title': 'Chips NFC',
      'dedico.nfc.desc': 'Vendo chips NFC configurados y listos para usar: reseñas de Google, tarjetas digitales y más, con un solo toque.',
      'dedico.nfc.note': 'Envíos solo dentro de España.',
      'dedico.cta': 'contactar &rarr;',
      'projects.text': 'La mayoría del código vive en abierto. Repos, pruebas de concepto y herramientas sueltas.',
      'contact.lead': 'Para páginas web o chips NFC (España), escríbeme por cualquiera de estos canales:',
      'footer.exit': 'process exited (0)',
    },
    en: {
      'theme.label': 'mode',
      'hero.lead': "I'm n0shell. Developer. I move between code, systems and small projects I build with my own hands, start to finish.",
      'hero.sub': 'This site brings together who I am, what I do and what I\'m currently working on.',
      'about.p1': "I've spent years in systems, code and security, usually out of curiosity more than work. I like understanding how something works underneath and then building it myself, no frills.",
      'about.p2': 'Outside of code I also run small, physical projects: from custom websites to NFC chips people use day to day. Everything I make, I try to keep simple, useful and reliable.',
      'nav.dedico.title': 'What I do',
      'nav.dedico.desc': 'Web pages and NFC chips.',
      'nav.proyectos.title': 'Projects & contact',
      'nav.proyectos.desc': 'What I have built and how to reach me.',
      'dedico.intro': 'Two things I can help you with right now:',
      'dedico.web.title': 'Web pages',
      'dedico.web.desc': 'I build custom websites and landing pages: fast, light and with nothing extra. From the idea to it going live.',
      'dedico.web.note': 'Need a website? Get in touch.',
      'dedico.nfc.title': 'NFC chips',
      'dedico.nfc.desc': 'I sell NFC chips, configured and ready to use: Google reviews, digital cards and more, with a single tap.',
      'dedico.nfc.note': 'Shipping within Spain only.',
      'dedico.cta': 'contact &rarr;',
      'projects.text': 'Most of the code lives in the open. Repos, proofs of concept and loose tools.',
      'contact.lead': 'For web pages or NFC chips (Spain), reach me through any of these channels:',
      'footer.exit': 'process exited (0)',
    },
  };

  const LANG_KEY = 'n0shell-lang';
  const THEME_KEY = 'n0shell-theme';
  const SUPPORTED_LANGS = ['es', 'en'];

  const getSavedLang = () => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    } catch (e) { /* localStorage no disponible */ }
    const browserLang = (navigator.language || 'es').slice(0, 2);
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'es';
  };

  let currentLang = getSavedLang();

  const applyTranslations = (lang) => {
    const dict = STRINGS[lang] || STRINGS.es;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    const currentEl = document.querySelector('[data-lang-current]');
    const otherEl = document.querySelector('[data-lang-other]');
    if (currentEl && otherEl) {
      const other = lang === 'es' ? 'en' : 'es';
      currentEl.textContent = lang.toUpperCase();
      otherEl.textContent = other.toUpperCase();
    }

    document.documentElement.setAttribute('lang', lang);
  };

  const setLang = (lang) => {
    currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'es';
    applyTranslations(currentLang);
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) { /* localStorage no disponible */ }
  };

  applyTranslations(currentLang);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLang(currentLang === 'es' ? 'en' : 'es');
    });
  }

  /* ==========================================================
     Tema claro / oscuro
     ========================================================== */
  const themeToggle = document.getElementById('themeToggle');

  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* localStorage no disponible */ }
    return document.documentElement.getAttribute('data-theme') || 'dark';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* localStorage no disponible */ }
  };

  setTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ==========================================================
     Reloj del titlebar
     ========================================================== */
  const clockEl = document.getElementById('clock');
  const tickClock = () => {
    if (!clockEl) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  /* ==========================================================
     Año en footer
     ========================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ==========================================================
     Efecto de escritura en el prompt — comando distinto por página
     ========================================================== */
  const typedCmdEl = document.getElementById('typedCmd');

  const COMMANDS_BY_PAGE = {
    'index.html': './whoami',
    '': './whoami',
    'subweb1.html': './a_que_me_dedico --list',
    'subweb2.html': './proyectos --show',
  };

  const currentPage = window.location.pathname.split('/').pop();
  const HERO_COMMAND = COMMANDS_BY_PAGE[currentPage] || './whoami';

  const typeCommand = (el, text, speed = 90) => {
    if (!el) return;
    let i = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.textContent = text;
      return;
    }
    const step = () => {
      el.textContent = text.slice(0, i);
      i += 1;
      if (i <= text.length) {
        setTimeout(step, speed);
      }
    };
    step();
  };

  typeCommand(typedCmdEl, HERO_COMMAND);

  /* ==========================================================
     Si llegamos con #contact desde otra página, deslizamos suave
     ========================================================== */
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      window.addEventListener('load', () => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
})();
