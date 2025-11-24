# Guia de Deploy - Hostinger

## ✅ Checklist de Deploy

### 1. Verificar Build Local
- [x] Arquivo `.htaccess` existe em `dist/` (1.4 KB)
- [x] Arquivo `index.php` existe em `dist/` (500 bytes) - FALLBACK
- [x] Arquivo `index.html` existe em `dist/`
- [x] Pasta `assets/` existe em `dist/`

### 2. Upload para Hostinger

**IMPORTANTE:** Você deve fazer upload de TODO o conteúdo da pasta `dist/` para o diretório `/new/` no servidor.

**ARQUIVOS CRÍTICOS QUE DEVEM SER ENVIADOS:**
- ✅ `.htaccess` (1.4 KB) - Configuração de roteamento
- ✅ `index.php` (500 bytes) - Fallback caso .htaccess não funcione
- ✅ `index.html` - Aplicação React
- ✅ `_redirects` - Para Netlify (pode ignorar na Hostinger)
- ✅ pasta `assets/` completa

#### Via File Manager (Painel Hostinger):
1. Acesse o File Manager
2. Navegue até o diretório `/new/` (ou crie se não existir)
3. **DELETE todos os arquivos antigos** em `/new/`
4. Faça upload de TODOS os arquivos de `dist/`:
   - **`.htaccess`** ← MUITO IMPORTANTE! (pode estar oculto)
   - **`index.php`** ← FALLBACK IMPORTANTE!
   - `_redirects`
   - `index.html`
   - pasta `assets/` (com todo o conteúdo)

#### Via FTP/SFTP:
```bash
# Conecte ao servidor e navegue até /new/
# Delete arquivos antigos
# Faça upload de todo o conteúdo de dist/
```

### 3. Verificar Estrutura no Servidor

A estrutura final deve ser:
```
/new/
  ├── .htaccess          ← Arquivo DEVE estar aqui!
  ├── _redirects
  ├── index.html
  └── assets/
      ├── index-[hash].css
      ├── index-[hash].js
      ├── hazak-hero-[hash].jpg
      ├── hazak-about-[hash].jpg
      ├── operating-hours-bg-[hash].png
      ├── 1-[hash].png
      ├── 2-[hash].png
      ├── 3-[hash].png
      ├── 4-[hash].png
      ├── 5-[hash].png
      ├── 6-[hash].png
      └── [fontes .woff e .woff2]
```

### 4. Verificar Permissões

O arquivo `.htaccess` precisa ter permissões corretas:
- Permissão recomendada: `644` (rw-r--r--)

### 5. Testar URLs

Após o upload, teste estas URLs (substitua `seudominio.com`):

- ✅ `https://seudominio.com/new/` → Deve mostrar a Home
- ✅ `https://seudominio.com/new/login` → Deve mostrar a página de Login
- ✅ `https://seudominio.com/new/admin` → Deve mostrar o Dashboard (após login)

### 6. Problemas Comuns

#### Se `/new/login` retorna 404:

**Causa 1:** Arquivo `.htaccess` não foi enviado
- Solução: Verifique se o arquivo está no servidor em `/new/.htaccess`
- Nota: Arquivos começando com `.` podem estar ocultos no File Manager

**Causa 2:** Servidor não está lendo `.htaccess`
- Solução: Verifique se o módulo `mod_rewrite` está ativado
- Entre em contato com suporte Hostinger se necessário

**Causa 3:** Permissões incorretas
- Solução: Defina permissão `644` para `.htaccess`

**Causa 4:** Caminho incorreto no `.htaccess`
- Se você NÃO está usando `/new/` como subdiretório, o `.htaccess` precisa ser ajustado

### 7. Comandos para Verificar (via SSH, se disponível)

```bash
# Verificar se .htaccess existe
ls -la /caminho/para/new/.htaccess

# Verificar conteúdo do .htaccess
cat /caminho/para/new/.htaccess

# Verificar permissões
ls -l /caminho/para/new/.htaccess
```

### 8. Alternativa: Se `.htaccess` não funcionar

Se o Hostinger não suportar `.htaccess`, você pode precisar configurar no painel de controle:
1. Vá em "Configurações Avançadas" ou "Redirects"
2. Configure redirect de `/*` para `/new/index.html`

## 🆘 Precisa de Ajuda?

Se ainda não funcionar, me informe:
1. Qual URL você está acessando? (ex: `https://seudominio.com/new/login`)
2. O arquivo `.htaccess` está visível no File Manager do Hostinger?
3. Você tem acesso SSH ao servidor?
