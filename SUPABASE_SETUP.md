# Configuração do Supabase - HazakFit

## 📋 Passos para configurar o banco de dados

### 1. Executar o SQL Schema
1. Acesse o dashboard do Supabase: https://supabase.com/dashboard
2. Vá para o seu projeto
3. No menu lateral, clique em **SQL Editor**
4. Copie todo o conteúdo do arquivo `supabase-schema.sql`
5. Cole no editor e clique em **Run**

### 2. Configurar o Storage (Bucket de Imagens)
1. No dashboard do Supabase, vá em **Storage**
2. O bucket **"Imagens"** já deve estar criado (conforme as imagens fornecidas)
3. Certifique-se de que ele está configurado como **público**
4. Crie as seguintes pastas dentro do bucket:
   - `gallery/` - para imagens da galeria
   - `team/` - para fotos dos membros da equipe

### 3. Estrutura do Banco de Dados

#### Tabela: `plans`
```sql
- id (TEXT, PK)
- name (TEXT)
- price (TEXT)
- features (JSONB)
- highlight (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Tabela: `team`
```sql
- id (UUID, PK)
- name (TEXT)
- role (TEXT)
- photo (TEXT) - URL da imagem
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Tabela: `admins`
```sql
- id (UUID, PK)
- username (TEXT, UNIQUE)
- password_hash (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 4. Configurações de Segurança (RLS)

As políticas de segurança já estão configuradas no schema:
- **Leitura pública**: Qualquer pessoa pode ler `plans` e `team`
- **Escrita protegida**: Apenas usuários autenticados podem modificar dados
- **Admins**: Acesso restrito a usuários autenticados

### 5. Credenciais Configuradas

```
Project URL: https://yrwpyemyvmaeuvalraux.supabase.co
API Key (anon/public): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlyd3B5ZW15dm1hZXV2YWxyYXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTYyMDIsImV4cCI6MjA4MDMzMjIwMn0.IO33B2YvLDBzj5E1YBk-euuEdrCzCDohr90RNWwsDO0
Bucket: Imagens
```

### 6. Funcionalidades Implementadas

#### Gallery Context
- ✅ Carrega imagens do bucket `Imagens/gallery/`
- ✅ Upload de novas imagens (máximo 10)
- ✅ Remoção de imagens
- ✅ URLs públicas geradas automaticamente

#### Plans Context
- ✅ Carrega planos da tabela `plans`
- ✅ Atualiza preços
- ✅ Atualiza features
- ✅ Sincronização em tempo real

#### Team Context
- ✅ Carrega membros da tabela `team`
- ✅ Upload de fotos para `Imagens/team/`
- ✅ Adicionar novos membros
- ✅ Atualizar membros existentes
- ✅ Remover membros (remove também a foto)

### 7. Próximos Passos

1. Execute o SQL no Supabase
2. Teste o carregamento dos planos iniciais
3. Faça upload de algumas imagens de teste na galeria
4. Adicione membros da equipe através do Dashboard

### 8. Notas Importantes

- As imagens antigas armazenadas localmente continuarão funcionando como fallback
- O bucket precisa estar público para as URLs funcionarem
- Certifique-se de que as políticas RLS estão ativas
- Os dados iniciais dos planos são inseridos automaticamente
