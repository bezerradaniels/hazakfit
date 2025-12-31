# Mapeamento de Botões - Hazak Fit

Este documento contém o mapeamento completo de todos os botões interativos do site Hazak Fit com seus respectivos IDs únicos.

## Componente: Header (`src/components/Header.tsx`)

| ID | Tipo | Descrição | Ação |
|----|------|-----------|------|
| `mobile-menu-toggle` | `<button>` | Botão hambúrguer para menu mobile | Abre/fecha menu de navegação mobile |
| `header-assine-agora-btn` | `<a>` | Botão "Assine Agora" no header desktop | Abre WhatsApp com mensagem pré-definida |
| `mobile-assine-agora-btn` | `<a>` | Botão "Assine Agora" no menu mobile | Abre WhatsApp com mensagem pré-definida |

## Componente: Team (`src/components/Team.tsx`)

| ID | Tipo | Descrição | Ação |
|----|------|-----------|------|
| `team-prev-btn` | `<button>` | Botão seta esquerda (navegação) | Navega para o membro anterior da equipe |
| `team-next-btn` | `<button>` | Botão seta direita (navegação) | Navega para o próximo membro da equipe |

## Componente: Plans (`src/components/Plans.tsx`)

| ID | Tipo | Descrição | Ação |
|----|------|-----------|------|
| `plan-monthly-btn` | `<button>` | Botão "Mensal" (mobile) | Seleciona plano mensal na view mobile |
| `plan-quarterly-btn` | `<button>` | Botão "Trimestral" (mobile) | Seleciona plano trimestral na view mobile |
| `plan-yearly-btn` | `<button>` | Botão "Anual" (mobile) | Seleciona plano anual na view mobile |
| `plan-monthly-cta-btn` | `<a>` | Botão "Começar Agora" plano mensal | Abre WhatsApp para assinar plano mensal |
| `plan-quarterly-cta-btn` | `<a>` | Botão "Começar Agora" plano trimestral | Abre WhatsApp para assinar plano trimestral |
| `plan-yearly-cta-btn` | `<a>` | Botão "Começar Agora" plano anual | Abre WhatsApp para assinar plano anual |
| `plans-contact-btn` | `<a>` | Botão "Conhecer outros planos" | Abre WhatsApp para saber mais sobre planos |

## Componente: Gallery (`src/components/Gallery.tsx`)

| ID | Tipo | Descrição | Ação |
|----|------|-----------|------|
| `gallery-prev-btn` | `<button>` | Botão seta esquerda (navegação) | Navega para imagem anterior |
| `gallery-next-btn` | `<button>` | Botão seta direita (navegação) | Navega para próxima imagem |
| `gallery-dot-0-btn` | `<button>` | Botão dot 1 (navegação) | Navega para primeira imagem |
| `gallery-dot-1-btn` | `<button>` | Botão dot 2 (navegação) | Navega para segunda imagem |
| `gallery-dot-2-btn` | `<button>` | Botão dot 3 (navegação) | Navega para terceira imagem |
| `gallery-dot-n-btn` | `<button>` | Botão dot n (navegação) | Navega para imagem n (dinâmico) |

## Componente: Toast (`src/components/Toast.tsx`)

| ID | Tipo | Descrição | Ação |
|----|------|-----------|------|
| `toast-close-btn` | `<button>` | Botão X (fechar) | Fecha a notificação toast |

## Total de Botões

- **Header**: 3 botões
- **Team**: 2 botões  
- **Plans**: 7 botões
- **Gallery**: 4+ botões (depende do número de imagens)
- **Toast**: 1 botão

## Observações

1. **IDs Dinâmicos**: Alguns IDs são gerados dinamicamente baseados no conteúdo:
   - `plan-{id}-btn`: Para seleção de planos mobile
   - `plan-{id}-cta-btn`: Para CTAs de planos específicos
   - `gallery-dot-{index}-btn`: Para navegação por dots da galeria

2. **Links Externos**: Botões que abrem WhatsApp usam tags `<a>` com `target="_blank"` e `rel="noopener noreferrer"`

3. **Acessibilidade**: Todos os botões possuem classes CSS que indicam estados hover e focus para melhor acessibilidade

4. **Responsividade**: Alguns botões só aparecem em dispositivos móveis (mobile) ou desktop

## Uso para Automação/Testes

Para testes automatizados ou analytics, você pode selecionar os botões usando:
```javascript
// Por ID
document.getElementById('mobile-menu-toggle')

// Por seletor de atributo
document.querySelector('[id^="plan-"]') // Todos os botões de planos
document.querySelector('[id^="gallery-dot-"]') // Todos os dots da galeria
```
