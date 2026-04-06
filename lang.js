/* KONKRET Haiti — Multilingual Toggle (FR default, EN, KR/Kreyol) */
(function () {
  'use strict';

  var STORAGE_KEY = 'konkret-lang';
  var LANGS = ['fr', 'en', 'kr'];
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'fr';
  if (LANGS.indexOf(currentLang) === -1) currentLang = 'fr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    /* Remove all lang classes, add current */
    LANGS.forEach(function (l) { document.body.classList.remove('lang-' + l); });
    document.body.classList.add('lang-' + lang);

    /* Swap data-fr / data-en / data-kr text content (inline mode) */
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      if (el.hasAttribute('data-' + lang)) {
        el.textContent = el.getAttribute('data-' + lang);
      }
    });

    /* Show/hide blocks with data-lang attribute */
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });

    /* Update toggle button labels */
    var labels = { fr: 'EN', en: 'FR', kr: 'FR' };
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = labels[lang] || 'EN';
    });

    /* Trilingual cycle buttons (KR/FR/EN) */
    var triLabels = { fr: 'KR', kr: 'EN', en: 'FR' };
    document.querySelectorAll('.lang-cycle').forEach(function (btn) {
      btn.textContent = triLabels[lang] || 'FR';
    });

    document.documentElement.setAttribute('lang', lang === 'kr' ? 'ht' : lang);
  }

  /* Two-way toggle (storefront pages) */
  function toggle() {
    applyLang(currentLang === 'fr' ? 'en' : 'fr');
  }

  /* Three-way cycle: FR -> KR -> EN -> FR (youth portal) */
  function cycle() {
    var order = { fr: 'kr', kr: 'en', en: 'fr' };
    applyLang(order[currentLang] || 'fr');
  }

  /* Expose globally */
  window.konkretLang = { apply: applyLang, toggle: toggle, cycle: cycle, current: function() { return currentLang; } };

  /* Bind toggle buttons once DOM is ready */
  function init() {
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
    document.querySelectorAll('.lang-cycle').forEach(function (btn) {
      btn.addEventListener('click', cycle);
    });
    applyLang(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Hamburger menu toggle */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-toggle')) {
      var links = document.querySelector('.nav-links');
      if (links) links.classList.toggle('open');
    }
    /* Portal sidebar toggle */
    if (e.target.closest('.sidebar-toggle')) {
      var sidebar = document.querySelector('.portal-sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    }
  });
})();
