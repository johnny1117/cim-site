import os

# 1. Update index.hbs to use dynamic homeVideos
with open('views/index.hbs', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# Make the Videos tab dynamic in index.hbs
target_videos = '''<!-- VIDEOS -->
<section class="videos-section" id="videos">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">▶ Vídeos</h2>
      <a href="#" class="see-all" style="color:var(--green-light)">Ver canal →</a>
    </div>
    <div class="videos-grid">
      <div class="video-card" onclick="window.open('https://www.instagram.com/reel/DVjsWlvE2tQ/','_blank')">
        <div class="video-thumb">
          <div class="video-thumb-inner">📸</div>
          <div class="play-btn">
            <div class="play-circle"><div class="play-icon"></div></div>
          </div>
          <div class="video-duration">1:15</div>
        </div>
        <div class="video-body">
          <div class="video-channel">Instagram</div>
          <div class="video-title">Tudo sobre a Ritalina</div>
          <div class="video-desc">Neste vídeo curto explicamos para que serve e os cuidados.</div>
          <div class="video-meta">
            <span>Há 2 dias</span>
            <span>2.1k visualizações</span>
          </div>
        </div>
      </div>

      <div class="video-card" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank')">
        <div class="video-thumb">
          <div class="video-thumb-inner">🎥</div>
          <div class="play-btn">
            <div class="play-circle"><div class="play-icon"></div></div>
          </div>
          <div class="video-duration">12:30</div>
        </div>
        <div class="video-body">
          <div class="video-channel">YouTube</div>
          <div class="video-title">Seminário: Uso Racional de Medicamentos</div>
          <div class="video-desc">Gravação completa do nosso seminário mensal sobre prescrição.</div>
          <div class="video-meta">
            <span>Há 1 semana</span>
            <span>850 visualizações</span>
          </div>
        </div>
      </div>

      <div class="video-card" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank')">
        <div class="video-thumb">
          <div class="video-thumb-inner">🎥</div>
          <div class="play-btn">
            <div class="play-circle"><div class="play-icon"></div></div>
          </div>
          <div class="video-duration">4:20</div>
        </div>
        <div class="video-body">
          <div class="video-channel">YouTube</div>
          <div class="video-title">Alergias Comuns a Analgésicos</div>
          <div class="video-desc">Saiba identificar e o que fazer em caso de reação.</div>
          <div class="video-meta">
            <span>Há 2 semanas</span>
            <span>1.2k visualizações</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>'''

replacement_videos = '''<!-- VIDEOS -->
<section class="videos-section" id="videos">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">▶ Vídeos</h2>
      <a href="/videos" class="see-all" style="color:var(--green-light)">Ver todos →</a>
    </div>
    <div class="videos-grid">
      {{#if homeVideos.length}}
        {{#each homeVideos}}
        <div class="video-card" onclick="window.open('{{this.link}}','_blank')">
          <div class="video-thumb">
            {{#if this.mainImage.url}}
              <img src="{{this.mainImage.url}}" style="width:100%;height:100%;object-fit:cover;opacity:0.8;">
            {{else}}
              <div class="video-thumb-inner">🎥</div>
            {{/if}}
            <div class="play-btn">
              <div class="play-circle"><div class="play-icon"></div></div>
            </div>
          </div>
          <div class="video-body">
            <div class="video-channel">{{this.author}}</div>
            <div class="video-title">{{this.title}}</div>
            <div class="video-desc" style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">{{this.subtitle}}</div>
            <div class="video-meta">
              <span>{{this.date}}</span>
            </div>
          </div>
        </div>
        {{/each}}
      {{else}}
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px 0;">
          Nenhum vídeo publicado no momento.
        </div>
      {{/if}}
    </div>
  </div>
</section>'''

if target_videos in idx_content:
    idx_content = idx_content.replace(target_videos, replacement_videos)
    with open('views/index.hbs', 'w', encoding='utf-8') as f:
        f.write(idx_content)
else:
    print("Videos target block not found in index.hbs!")

# 2. Extract Navbar and Footer logic from index.hbs to use in noticias.hbs
with open('views/noticias.hbs', 'r', encoding='utf-8') as f:
    not_content = f.read()

# Replace the simple navbar CSS with full CSS from index
target_css_start = "/* ===== NAVBAR SIMPLES ===== */"
target_css_end = "/* ===== BANNER NOTÍCIAS ===== */"

start_idx = not_content.find(target_css_start)
end_idx = not_content.find(target_css_end)

css_replacement = """
    :root {
      --green: #1a7a4a;
      --green-light: #25a062;
      --green-dark: #0f5533;
      --blue: #1a6ea8;
      --blue-light: #2488cc;
      --blue-dark: #0f4a72;
      --white: #ffffff;
      --bg: #f4f7f4;
      --card-bg: #ffffff;
      --text: #1a1a2e;
      --text-muted: #5a6872;
      --border: #d4e4d4;
      --nav-bg: #ffffff;
      --section-alt: #eef5ee;
      --footer-bg: #0f1f17;
      --shadow: 0 4px 24px rgba(26,122,74,0.10);
      --shadow-card: 0 2px 12px rgba(26,122,74,0.08);
      
      --verde-escuro: var(--green);
      --verde-medio: var(--green-light);
      --verde-claro: var(--section-alt);
      --azul-cim: var(--blue);
      --branco: var(--white);
      --fundo: var(--bg);
      --preto: var(--text);
      --cinza-texto: var(--text-muted);
      --cinza-borda: var(--border);
      --vermelho: #e63946;
    }

    [data-theme="dark"] {
      --bg: #0d1a13;
      --card-bg: #162211;
      --text: #e8f4ec;
      --text-muted: #8aad97;
      --border: #1e3a25;
      --nav-bg: #0a1510;
      --section-alt: #101d16;
      --shadow: 0 4px 24px rgba(0,0,0,0.4);
      --shadow-card: 0 2px 12px rgba(0,0,0,0.3);
    }
    
    body {
        transition: background 0.3s, color 0.3s;
    }

    /* ===== NAVBAR ===== */
    nav {
        position: sticky; top: 0; z-index: 100;
        background: var(--nav-bg);
        border-bottom: 3px solid var(--green);
        box-shadow: 0 2px 16px rgba(26,122,74,0.12);
        transition: background 0.3s;
    }
    .nav-inner {
        max-width: 1200px; margin: 0 auto;
        display: flex; align-items: center;
        padding: 0 24px; height: 70px; gap: 16px;
    }
    .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
    .nav-logo img { height: 44px; width: 44px; border-radius: 50%; }
    .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--green); line-height: 1.1; }
    .nav-logo-text span { display: block; font-size: 0.62rem; font-family: 'Source Sans 3', sans-serif; font-weight: 400; color: var(--blue); letter-spacing: 0.08em; text-transform: uppercase; }
    .nav-links { display: flex; gap: 4px; margin-left: auto; }
    .nav-links a {
        text-decoration: none; font-weight: 600; font-size: 0.88rem;
        color: var(--text); padding: 8px 16px; border-radius: 6px;
        letter-spacing: 0.03em; text-transform: uppercase;
        transition: all 0.2s;
    }
    .nav-links a:hover { background: var(--green); color: #fff; }
    .nav-links a.active { color: var(--green); }
    .theme-btn {
        background: var(--section-alt); border: 1px solid var(--border);
        border-radius: 20px; cursor: pointer; padding: 6px 14px;
        font-size: 0.78rem; font-weight: 600; color: var(--text-muted);
        display: flex; align-items: center; gap: 6px;
        transition: all 0.2s; flex-shrink: 0;
    }
    .theme-btn:hover { border-color: var(--green); color: var(--green); }

    /* ===== FOOTER ===== */
    footer { background: var(--footer-bg); color: #8aad97; padding: 56px 0 0; margin-top: 60px;}
    .footer-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-brand { border-left: 3px solid var(--green); padding-left: 18px; }
    .footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .footer-logo img { height: 52px; width: 52px; border-radius: 50%; }
    .footer-logo-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.1; }
    .footer-logo-name span { display: block; font-size: 0.6rem; font-family: 'Source Sans 3', sans-serif; color: var(--green-light); letter-spacing: 0.1em; text-transform: uppercase; }
    .footer-about { font-size: 0.85rem; line-height: 1.7; color: #5a9070; }
    .footer-col h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #fff; margin-bottom: 16px; border-bottom: 1px solid #1e3a25; padding-bottom: 8px; }
    .footer-col ul { list-style: none; padding: 0; margin: 0;}
    .footer-col ul li { margin-bottom: 10px; }
    .footer-col ul li a { text-decoration: none; font-size: 0.85rem; color: #5a9070; transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--green-light); }
    .footer-contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .contact-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
    .contact-icon.ig { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white;}
    .contact-icon.email { background: var(--blue-dark); color: white;}
    .footer-contact-text { font-size: 0.82rem; color: #5a9070; }
    .footer-contact-text a { color: #5a9070; text-decoration: none; }
    .footer-contact-text a:hover { color: var(--green-light); }
    .footer-bottom { border-top: 1px solid #1e3a25; padding: 18px 0; display: flex; align-items: center; justify-content: space-between; }
    .footer-copyright { font-size: 0.78rem; color: #3d6650; }
    .footer-tagline { font-size: 0.75rem; color: #3d6650; font-style: italic; }
    
    @media (max-width: 900px) {
        .footer-grid { grid-template-columns: 1fr 1fr; }
        .nav-links a { padding: 6px 10px; font-size: 0.78rem; }
    }
"""

if start_idx != -1 and end_idx != -1:
    not_content = not_content[:not_content.find(':root {')] + css_replacement + not_content[end_idx:]

# Extract Nav and Footer HTML from index
nav_start = idx_content.find('<!-- NAVBAR -->')
nav_end = idx_content.find('</nav>') + 6
nav_html = idx_content[nav_start:nav_end]
nav_html = nav_html.replace('href="#noticias"', 'href="/noticias"').replace('href="#videos"', 'href="/videos"')

footer_start = idx_content.find('<!-- FOOTER -->')
footer_end = idx_content.find('</footer>') + 9
footer_html = idx_content[footer_start:footer_end]

# Replace in noticias.hbs
old_nav_start = not_content.find('<nav class="navbar">')
old_nav_end = not_content.find('</nav>') + 6
if old_nav_start != -1:
    not_content = not_content[:old_nav_start] + nav_html + not_content[old_nav_end:]

# Add script at the end for toggling theme
theme_script = """
<script>
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('cim_theme', newTheme);
    document.getElementById('theme-icon').textContent = newTheme === 'light' ? '🌙' : '☀️';
  }

  const savedTheme = localStorage.getItem('cim_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-icon').textContent = savedTheme === 'light' ? '🌙' : '☀️';
  
  function openTab(tabId, btn) {
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      
      document.getElementById(tabId).classList.add('active');
      btn.classList.add('active');
  }
</script>
</body>
"""
not_content = not_content.replace('</body>', footer_html + '\n' + theme_script)
not_content = not_content.replace('<html lang="pt-BR">', '<html lang="pt-BR" data-theme="light">')

# Modify Tabs
old_tabs = '''        <div class="tabs-container">
            <button class="tab-btn {{#if activeTabBreaking}}{{else}}active{{/if}}" onclick="openTab('tab-noticias', this)">Notícias</button>
            <button class="tab-btn {{#if activeTabBreaking}}active{{/if}}" onclick="openTab('tab-breaking', this)">Breaking News</button>
        </div>'''
new_tabs = '''        <div class="tabs-container">
            <button class="tab-btn {{#if activeTabVideos}}{{else}}{{#if activeTabBreaking}}{{else}}active{{/if}}{{/if}}" onclick="openTab('tab-noticias', this)">Notícias</button>
            <button class="tab-btn {{#if activeTabBreaking}}active{{/if}}" onclick="openTab('tab-breaking', this)">Breaking News</button>
            <button class="tab-btn {{#if activeTabVideos}}active{{/if}}" onclick="openTab('tab-videos', this)">Vídeos</button>
        </div>'''
not_content = not_content.replace(old_tabs, new_tabs)

old_noticias_tab = '<div id="tab-noticias" class="tab-content {{#if activeTabBreaking}}{{else}}active{{/if}}">'
new_noticias_tab = '<div id="tab-noticias" class="tab-content {{#if activeTabVideos}}{{else}}{{#if activeTabBreaking}}{{else}}active{{/if}}{{/if}}">'
not_content = not_content.replace(old_noticias_tab, new_noticias_tab)

videos_tab = '''
        <div id="tab-videos" class="tab-content {{#if activeTabVideos}}active{{/if}}">
            <div class="news-list">
                {{#if videos.length}}
                    {{#each videos}}
                    <div class="news-card" onclick="window.open('{{this.link}}','_blank')" style="cursor: pointer;">
                        {{#if this.mainImage.url}}
                        <img src="{{this.mainImage.url}}" alt="{{this.mainImage.description}}" class="news-card-img">
                        {{else}}
                        <div class="news-card-img" style="background: linear-gradient(135deg, var(--verde-escuro), var(--azul-cim)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎥</div>
                        {{/if}}
                        <div class="news-card-content">
                            <div class="news-card-tags">
                                {{#if this.tags.length}}
                                    {{#each this.tags}}
                                    <span class="news-tag">{{this}}</span>
                                    {{/each}}
                                {{else}}
                                    <span class="news-tag">Vídeo</span>
                                {{/if}}
                            </div>
                            <h2 class="news-card-title">{{this.title}}</h2>
                            <p class="news-card-subtitle">{{this.subtitle}}</p>
                            <div class="news-card-meta">
                                <span>{{this.date}}</span> • 
                                <span style="color:var(--cinza-texto);">{{this.author}}</span>
                            </div>
                        </div>
                    </div>
                    {{/each}}
                {{else}}
                    <div style="text-align: center; color: var(--cinza-texto); padding: 40px 0;">
                        Nenhum vídeo publicado ainda.
                    </div>
                {{/if}}
            </div>
        </div>
'''

not_content = not_content.replace('<!-- Script Handlebars -->', videos_tab + '\n<!-- Script Handlebars -->')

# Remove the old openTab function script inside the body
old_open_tab = '''    <script>
        function openTab(tabId, btn) {
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            btn.classList.add('active');
        }
    </script>'''
not_content = not_content.replace(old_open_tab, '')

with open('views/noticias.hbs', 'w', encoding='utf-8') as f:
    f.write(not_content)

print("Done syncing navbar/footer and updating views!")
