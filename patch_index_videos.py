import os

with open('views/index.hbs', 'r', encoding='utf-8') as f:
    idx_content = f.read()

start_tag = '<!-- VIDEOS -->'
end_tag = '</section>'

start_idx = idx_content.find(start_tag)
if start_idx != -1:
    end_idx = idx_content.find(end_tag, start_idx) + len(end_tag)
    
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
              <div class="video-thumb-inner" style="background: linear-gradient(135deg, var(--green-dark), var(--blue-dark)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎥</div>
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
    
    idx_content = idx_content[:start_idx] + replacement_videos + idx_content[end_idx:]
    with open('views/index.hbs', 'w', encoding='utf-8') as f:
        f.write(idx_content)
    print("Patched index.hbs videos successfully")
else:
    print("Could not find <!-- VIDEOS -->")
