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

/* ============================================================
   CIMPLIFICA — chat do mascote (canto inferior direito)
   Por enquanto responde com uma mensagem padrão. Para ligar a um
   atendimento de verdade depois, basta registrar uma função:
     window.CIMPLIFICA.setResponder(async function (pergunta) {
       return 'resposta em texto';
     });
   ============================================================ */
(function () {
  if (window.CIMPLIFICA) return;

  var responder = function () {
    return Promise.resolve(
      'Recebi sua dúvida! Ainda estou em fase de testes e em breve vou conseguir responder por aqui.\n\n' +
      'Enquanto isso, a equipe do CIM-UFPB atende pelo Instagram @cimufpb ou pelo e-mail cimufpb@gmail.com.'
    );
  };

  window.CIMPLIFICA = {
    setResponder: function (fn) { if (typeof fn === 'function') responder = fn; },
    open: function () { setOpen(true); },
    close: function () { setOpen(false); }
  };

  var root, panel, msgs, input, sendBtn, fab, hint, opened = false, greeted = false, busy = false;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function addMsg(text, who) {
    var m = el('div', 'cimp-msg ' + who);
    m.textContent = text; // sempre texto puro: nada do usuário vira HTML
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
    return m;
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg('Oi! Eu sou o CIMPLIFICA, o mascote do CIM-UFPB. 💊', 'bot');
    addMsg('Envie sua dúvida sobre medicamentos que eu te ajudo a entender.', 'bot');
  }

  function setOpen(v) {
    if (!root) return;
    opened = v;
    root.classList.toggle('open', v);
    fab.setAttribute('aria-expanded', v ? 'true' : 'false');
    fab.setAttribute('aria-label', v ? 'Fechar o chat do CIMPLIFICA' : 'Abrir o chat do CIMPLIFICA');
    panel.setAttribute('aria-hidden', v ? 'false' : 'true');
    if (v) {
      greet();
      hideHint(true);
      setTimeout(function () { input.focus(); }, 60);
    } else {
      fab.focus();
    }
  }

  function hideHint(remember) {
    if (hint) hint.classList.remove('show');
    if (remember) { try { sessionStorage.setItem('cimp-hint', '1'); } catch (e) {} }
  }

  function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    sendBtn.disabled = !input.value.trim() || busy;
  }

  function send() {
    var text = input.value.trim();
    if (!text || busy) return;
    busy = true;
    addMsg(text, 'user');
    input.value = '';
    autosize();
    var typing = el('div', 'cimp-msg bot', '<span class="cimp-typing" aria-label="Digitando"><i></i><i></i><i></i></span>');
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;
    Promise.resolve()
      .then(function () { return new Promise(function (r) { setTimeout(r, 700); }); })
      .then(function () { return responder(text); })
      .then(function (reply) {
        typing.remove();
        addMsg(String(reply || ''), 'bot');
      })
      .catch(function () {
        typing.remove();
        addMsg('Ops, não consegui responder agora. Tente de novo daqui a pouco.', 'bot');
      })
      .then(function () { busy = false; autosize(); });
  }

  function build() {
    root = el('div', 'cimp');
    root.innerHTML =
      '<div class="cimp-panel" id="cimp-panel" role="dialog" aria-label="Chat com o CIMPLIFICA" aria-hidden="true">' +
        '<div class="cimp-head">' +
          '<div class="cimp-avatar"><img src="/mascote/cimplifica-2.webp" alt=""></div>' +
          '<div class="cimp-title"><strong>CIMPLIFICA</strong><small>Tire suas dúvidas com o CIM-UFPB</small></div>' +
          '<button type="button" class="cimp-close" aria-label="Fechar chat"><svg class="icon" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
        '</div>' +
        '<div class="cimp-msgs" aria-live="polite"></div>' +
        '<form class="cimp-form" autocomplete="off">' +
          '<label for="cimp-input" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Envie sua dúvida</label>' +
          '<textarea id="cimp-input" class="cimp-input" rows="1" maxlength="1000" placeholder="Envie sua dúvida"></textarea>' +
          '<button type="submit" class="cimp-send" aria-label="Enviar" disabled><svg class="icon" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg></button>' +
        '</form>' +
        '<div class="cimp-foot">As respostas não substituem a orientação de um profissional de saúde.</div>' +
      '</div>' +
      '<span class="cimp-hint" aria-hidden="true">Dúvidas? Fale comigo!</span>' +
      '<button type="button" class="cimp-fab" aria-controls="cimp-panel" aria-expanded="false" aria-label="Abrir o chat do CIMPLIFICA">' +
        '<img src="/mascote/cimplifica.webp" alt=""><span class="cimp-dot"></span>' +
      '</button>';
    document.body.appendChild(root);

    panel = root.querySelector('.cimp-panel');
    msgs = root.querySelector('.cimp-msgs');
    input = root.querySelector('.cimp-input');
    sendBtn = root.querySelector('.cimp-send');
    fab = root.querySelector('.cimp-fab');
    hint = root.querySelector('.cimp-hint');

    fab.addEventListener('click', function () { setOpen(!opened); });
    root.querySelector('.cimp-close').addEventListener('click', function () { setOpen(false); });
    root.querySelector('.cimp-form').addEventListener('submit', function (e) { e.preventDefault(); send(); });
    input.addEventListener('input', autosize);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && opened) setOpen(false);
    });

    // balãozinho de convite: aparece uma vez por sessão, depois de alguns segundos
    var seen = false;
    try { seen = sessionStorage.getItem('cimp-hint') === '1'; } catch (e) {}
    if (!seen) {
      setTimeout(function () { if (!opened) hint.classList.add('show'); }, 2500);
      setTimeout(function () { hideHint(true); }, 9000);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
