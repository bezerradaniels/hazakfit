# Guia de Deploy - Hazak Fit

Este projeto foi reestruturado para ser uma aplicação **Single Page Application (SPA)** limpa, utilizando **Vite + React + Tailwind**.

## 🚀 Como fazer Deploy

### Opção 1: Vercel / Netlify / Cloudflare Pages (Recomendado)

Estas plataformas detectam automaticamente configurações de Vite.

1. Conecte seu repositório Git.
2. As configurações de build serão detectadas automaticamente:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Configuração de Roteamento:**
   - Se usar **Netlify**, crie um arquivo `_redirects` na pasta `public` com o conteúdo: `/* /index.html 200`
   - Se usar **Vercel**, adicione um arquivo `vercel.json` com rewrites.

### Opção 2: Hostinger / Apache / Nginx

Para hospedar em servidores tradicionais (como Hostinger), você precisa garantir que todas as rotas sejam redirecionadas para o `index.html`.

1. Faça o build localmente:
   ```bash
   npm run build
   ```
2. Faça upload do conteúdo da pasta `dist/` para o servidor (pasta `public_html` ou subdiretório).
3. **Importante:** Configure o servidor para redirecionar todas as requisições para `index.html`.
   - Se for Apache, crie um arquivo `.htaccess` na raiz do site com:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```

## 📦 Estrutura do Projeto

- `src/` - Código fonte React
- `public/` - Arquivos estáticos
- `dist/` - Arquivos gerados para produção (após build)
- `vite.config.ts` - Configuração do Vite (limpa)
