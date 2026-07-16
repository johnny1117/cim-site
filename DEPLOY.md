# Deploy do site CIM — Vercel + Supabase

Este guia leva o site do zero ao ar. O banco e o código já foram preparados.

## O que mudou no projeto

- **Banco de dados**: saiu do `data.json` e foi para o **Supabase (Postgres)**. Tabelas: `news`, `breaking_news`, `videos`, `admin_users`.
- **Imagens enviadas pelo painel**: vão para o **Supabase Storage** (bucket `uploads`), não mais para o disco — porque o Vercel é serverless (disco somente-leitura).
- **Login do admin**: passou a usar **cookie assinado** (stateless), que funciona em serverless. A senha continua com hash scrypt.
- **Entrypoint serverless**: `api/index.ts` + `vercel.json` empacotam o NestJS e as views.
- O usuário admin (`jonathancim`) já foi migrado para o Supabase. Notícias/vídeos começam vazios — você republica pelo painel.

---

## Pré-requisitos

- Conta no **GitHub** (gratuita).
- Conta no **Vercel** (gratuita) — pode entrar com o GitHub.
- A senha do banco / chaves estão no painel do Supabase (projeto **cim-site**).

---

## Passo 1 — (Opcional) testar local

```bash
npm install            # instala o novo @supabase/supabase-js
# crie um arquivo .env na raiz com as variáveis (veja o Passo 4)
npm run start:dev
# abra http://localhost:3000
```

## Passo 2 — Subir o projeto no GitHub

Se ainda não é um repositório Git:

```bash
git init
git add .
git commit -m "Site CIM com Supabase, pronto para Vercel"
```

Crie um repositório novo no GitHub (pode ser **privado**) e envie:

```bash
git remote add origin https://github.com/SEU_USUARIO/cim-site.git
git branch -M main
git push -u origin main
```

> O `.gitignore` já evita subir `node_modules`, `.env` e o `data.json` antigo.

## Passo 3 — Importar no Vercel

1. Acesse https://vercel.com → **Add New… → Project**.
2. Conecte sua conta do GitHub e selecione o repositório `cim-site`.
3. O Vercel detecta o `vercel.json` automaticamente. **Não** mude o framework (deixe "Other").
4. **Antes de clicar em Deploy**, abra **Environment Variables** e adicione as do Passo 4.

## Passo 4 — Variáveis de ambiente (no Vercel)

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | `https://qlaoissrkpjifxenimvx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | *(copiar do Supabase — veja abaixo)* |
| `SESSION_SECRET` | *(uma string longa aleatória — veja abaixo)* |
| `NODE_ENV` | `production` |

**Onde pegar a `SUPABASE_SERVICE_ROLE_KEY`:**
Supabase → projeto **cim-site** → ⚙️ **Project Settings** → **API** → seção *Project API keys* → **`service_role`** → *Reveal* e copie.
⚠️ Essa chave é secreta: use só nas variáveis do Vercel, nunca no front-end nem no Git.

**Como gerar a `SESSION_SECRET`:**
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```
Cole o resultado no valor da variável.

## Passo 5 — Deploy

Clique em **Deploy**. O Vercel instala as dependências e publica. Ao terminar, você recebe uma URL (ex.: `https://cim-site.vercel.app`).

## Passo 6 — Pós-deploy

1. Acesse `https://SUA-URL.vercel.app` — o site deve carregar (home, /noticias, /sobre).
2. Entre no painel em `https://SUA-URL.vercel.app/admin/login` com **jonathancim** e a senha atual.
3. Publique uma notícia de teste com imagem para validar o upload (a imagem deve abrir a partir de uma URL `...supabase.co/storage/...`).
4. Recomendo **trocar a senha do admin** (posso te ajudar a gerar o novo hash e atualizar no Supabase).

---

## Observações importantes

- **Não consegui testar o build aqui** (meu ambiente estava indisponível). O código foi escrito seguindo o padrão de NestJS no Vercel, mas o primeiro deploy é o teste real. Se algo falhar, me manda o log de build do Vercel que eu corrijo.
- **Se os arquivos estáticos (CSS, logos) derem 404**: o ponto de ajuste é o caminho em `api/index.ts` (`process.cwd()` → `__dirname`). Me avisa que ajusto.
- **Upload de imagem**: limite de ~4 MB por imagem (restrição do Vercel). Para imagens maiores, dá pra usar upload direto ao Storage depois.
- **Custos**: Supabase e Vercel no plano gratuito cobrem bem um site deste porte (US$ 0).
- As pastas `public/projetos`, `public/equipe`, `public/eventos` ainda esperam as imagens (logos/fotos) que você vai soltar lá — isso é independente do deploy.
