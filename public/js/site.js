/* CIM-UFPB — comportamento compartilhado do site público */
(function () {
  // ---- Tema (persistente) ----
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('cim-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  window.toggleTheme = function () {
    var dark = root.getAttribute('data-theme') === 'dark';
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('cim-theme', next); } catch (e) {}
    syncThemeButtons();
  };

  function syncThemeButtons() {
    var dark = root.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.querySelector('.ic-sun') && (el.querySelector('.ic-sun').style.display = dark ? 'block' : 'none');
      el.querySelector('.ic-moon') && (el.querySelector('.ic-moon').style.display = dark ? 'none' : 'block');
    });
  }

  // ---- Menu mobile ----
  window.toggleMenu = function (force) {
    var m = document.getElementById('mobileMenu');
    if (!m) return;
    var open = typeof force === 'boolean' ? force : !m.classList.contains('open');
    m.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  document.addEventListener('DOMContentLoaded', function () {
    syncThemeButtons();

    // data por extenso na topbar
    var d = document.getElementById('today');
    if (d) {
      try {
        d.textContent = new Date().toLocaleDateString('pt-BR', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
      } catch (e) {}
    }

    // fecha menu mobile ao clicar em link / scrim
    var mm = document.getElementById('mobileMenu');
    if (mm) {
      mm.addEventListener('click', function (e) {
        if (e.target.matches('a, .scrim, [data-close]')) window.toggleMenu(false);
      });
    }
  });
})();
