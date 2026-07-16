const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'index.hbs');
let content = fs.readFileSync(filePath, 'utf8');

const startTag = '      <!-- Main story -->';
const endTag = '    </div>\r\n  </div>\r\n</section>';
const endTagAlt = '    </div>\n  </div>\n</section>';

const startIndex = content.indexOf(startTag);
let endIndex = content.indexOf(endTag, startIndex);
let usedEndTag = endTag;

if (endIndex === -1) {
    endIndex = content.indexOf(endTagAlt, startIndex);
    usedEndTag = endTagAlt;
}

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `      <!-- Main story -->
      {{#if mainNews}}
      <div class="hero-main" onclick="window.location.href='/news/{{mainNews.id}}'" style="cursor:pointer;">
        {{#if mainNews.mainImage.url}}
        <img id="hero-pills-img" src="{{mainNews.mainImage.url}}" alt="{{mainNews.mainImage.description}}">
        {{else}}
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--verde-escuro), var(--azul-cim));"></div>
        {{/if}}
        <div class="hero-main-overlay">
          {{#if mainNews.tags.[0]}}
          <span class="hero-tag">{{mainNews.tags.[0]}}</span>
          {{else}}
          <span class="hero-tag">Notícia</span>
          {{/if}}
          <h1 class="hero-main-title">{{mainNews.title}}</h1>
          <p class="hero-main-desc">{{mainNews.subtitle}}</p>
          <div class="hero-meta">
            <span>🕐 {{mainNews.date}}</span>
            <span>✍️ {{mainNews.author}}</span>
          </div>
        </div>
      </div>
      {{else}}
      <div class="hero-main">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--verde-escuro), var(--azul-cim)); display:flex; align-items:center; justify-content:center; color:white; font-family: 'Playfair Display'; font-size: 24px;">Nenhuma notícia publicada ainda.</div>
      </div>
      {{/if}}

      <!-- Side stories -->
      <div class="hero-side">
        {{#each sideNews}}
        <div class="side-card" onclick="window.location.href='/news/{{this.id}}'" style="cursor:pointer;">
          {{#if this.mainImage.url}}
          <img class="side-card-img" src="{{this.mainImage.url}}" alt="{{this.mainImage.description}}" style="width:90px;height:80px;object-fit:cover;flex-shrink:0;">
          {{else}}
          <div class="side-card-img" style="background:linear-gradient(135deg,#25a062,#1a6ea8);display:flex;align-items:center;justify-content:center;font-size:1.5rem;width:90px;height:80px;flex-shrink:0;">📰</div>
          {{/if}}
          <div class="side-card-body">
            {{#if this.tags.[0]}}
            <div class="side-tag">{{this.tags.[0]}}</div>
            {{else}}
            <div class="side-tag">Notícia</div>
            {{/if}}
            <div class="side-title">{{this.title}}</div>
            <div class="side-time">{{this.date}}</div>
          </div>
        </div>
        {{/each}}
      </div>\n`;
    
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Substituido com sucesso usando fallback script!");
} else {
    console.log("Nao foi possivel achar as tags: start=" + startIndex + ", end=" + endIndex);
}
