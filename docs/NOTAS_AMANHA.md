# 📝 Notas — Continuar Amanhã

> Atualizado em: 2026-07-20 | Sessão com o Antigravity

---

## ✅ Sessão de 19/07/2026 — Planejamento

- Lemos e analisamos o **Google Doc** da pesquisa de mercado e o **Google Forms** (37 respostas)
- Entendemos que o projeto estava na **v1.1.0** — base completa + comentários em todo o código
- Criamos o **ROADMAP** com versões definidas (veja `docs/ROADMAP.md`)
- Atualizamos o **CHANGELOG** com a entrada da sessão de planejamento

---

## ✅ Sessão de 20/07/2026 — v1.2.0 (início)

### O que foi implementado

| Funcionalidade | Arquivo | Status |
|---|---|---|
| Página de perfil público visitável | `public_profile.html` (novo) | ✅ Feito |
| Visitante precisa estar logado para ver perfis | `public_profile.html` | ✅ Feito |
| Layout igual ao `gallery.html` (carrosséis) | `public_profile.html` | ✅ Feito |
| Lightbox no perfil público | `public_profile.html` | ✅ Feito |
| Estado "Perfil privado" | `public_profile.html` | ✅ Feito |
| Estado "Usuário não encontrado" | `public_profile.html` | ✅ Feito |
| Botão "Ver como público" no `profile.html` | `profile.html` | ✅ Feito |
| Sempre mostrar mínimo 3 galerias (placeholders) | `gallery.html` | ✅ Feito |
| Botão "+" no fim do carrossel (após as fotos) | `gallery.html` | ✅ Feito |
| Renomear galeria clicando no nome diretamente | `gallery.html` | ✅ Feito |
| Fix: tela travada no loading (`orderBy` + índice) | `public_profile.html` | ✅ Feito |

### Detalhes técnicos importantes

- **URL do perfil público**: `public_profile.html?user=USERNAME`
- **Bug corrigido**: queries Firestore com `orderBy` + `where` exigem índice composto no Firebase Console — foi removido o `orderBy` de `public_profile.html` para evitar o problema
- **Galerias placeholder**: controladas pela constante `MIN_GALLERIES = 3` em `gallery.html`; ao atingir 3 galerias reais, os placeholders somem
- **Renomear via clique**: função `quickRenameGallery(galleryId)` \— clicar no nome da galeria abre o modal de renomear diretamente

---

## ✅ Sessão de 21/07/2026 — Curtidas nas fotos

### O que foi implementado

| Funcionalidade | Arquivo | Status |
|---|---|---|
| Botão de coração em cada card de foto | `public_profile.html` | ✅ Feito |
| Toggle curtir/descurtir com feedback visual | `public_profile.html` | ✅ Feito |
| Contador de curtidas ao lado do ícone | `public_profile.html` | ✅ Feito |
| Animação de pulsação ao curtir | `public_profile.html` | ✅ Feito |
| Atualização otimista da UI (resposta imediata) | `public_profile.html` | ✅ Feito |
| Rollback automático em caso de erro do servidor | `public_profile.html` | ✅ Feito |
| Dono não pode curtir as próprias fotos | `public_profile.html` | ✅ Feito |
| Dados persistidos em `likedBy` (arrayUnion/arrayRemove) | `public_profile.html` | ✅ Feito |
| Lock de clique duplo simultâneo (`likeLock`) | `public_profile.html` | ✅ Feito |

### Detalhes técnicos importantes

- **Campo Firestore**: `photos/{photoId}.likedBy` → array de UIDs dos usuários que curtiram
- **Concorrência segura**: usa `arrayUnion` (curtir) e `arrayRemove` (descurtir) — o Firestore garante atomicidade
- **Otimismo**: a UI atualiza antes da resposta do servidor; reverte se der erro
- **Dono bloqueado**: compara `loggedUser.uid === targetUid` — o botão fica `disabled` para o dono
- **Regra Firestore recomendada** (adicionar no Firebase Console):
  ```
  allow update: if request.auth != null
    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likedBy']);
  ```

---

## 🔜 Próximos passos — Retomar aqui

### 1. ~~❤️ Curtidas nas fotos~~ ← ✅ CONCLUÍDO (sessão 21/07)

### 2. ~~👥 Seguir usuários~~ ← ✅ CONCLUÍDO (sessão 21/07)

### 3. ~~🔒 Regras do Firestore~~ ← ✅ Publicado no Firebase Console em 22/07 (14:08)

### 4. ~~🔲 SEO — meta tags em todos os arquivos~~ ← ✅ CONCLUÍDO (sessão 22/07)

### 5. ~~🔲 PWA — manifest.json + ícone na tela inicial~~ ← ✅ CONCLUÍDO (sessão 22/07)

---

## ✅ Sessão de 22/07/2026 — SEO + PWA

### O que foi implementado

| Funcionalidade | Arquivo(s) | Status |
|---|---|---|
| Regras Firestore publicadas no Console | Firebase Console | ✅ Feito |
| `<title>` descritivo por página | todos os 6 HTMLs | ✅ Feito |
| `<meta description>` único por página | todos os 6 HTMLs | ✅ Feito |
| `<meta robots>` (noindex nas privadas, index no perfil público) | todos os 6 HTMLs | ✅ Feito |
| Open Graph completo (`og:type`, `og:title`, etc.) | todos os 6 HTMLs | ✅ Feito |
| Twitter Card completo | todos os 6 HTMLs | ✅ Feito |
| `manifest.json` PWA criado | raiz do projeto | ✅ Feito |
| `icon-512.png` e `icon-192.png` gerados | raiz do projeto | ✅ Feito |
| `og-cover.png` (1200×630) criado | raiz do projeto | ✅ Feito |
| `<link rel="manifest">` + `<link rel="apple-touch-icon">` | todos os 6 HTMLs | ✅ Feito |

### Detalhes técnicos importantes

- **PWA**: `display: standalone` → o app abre sem barra de endereço, como app nativo
- **Ícones**: `icon-512.png` (gerado por IA) redimensionado para `icon-192.png` via .NET
- **robots**: só `public_profile.html` tem `index, follow` — as demais páginas são autenticadas e não devem ser indexadas
- **og:image**: aponta para `og-cover.png` hospedado no Firebase Hosting

---

## 📌 Para a próxima sessão — começar aqui

### 🔜 Próxima etapa da v1.2.0 — conforme ROADMAP

Ver `docs/ROADMAP.md` para a lista completa. As próximas features sugeridas são:

1. **Busca de usuários** — campo de busca por username na navbar
2. **Feed de atividade** — timeline com curtidas e novos seguidores
3. **Notificações in-app** — toast/badge quando alguém curte ou segue

---

## 💡 Padrão de trabalho decidido

- **Documentar cada alteração** no `CHANGELOG.md` antes de commitar
- **Comentar cada bloco de código** em português
- **Atualizar este arquivo** ao final de cada sessão com o resumo e os próximos passos

---

*Sessão de 22/07/2026 encerrada. Até a próxima! 💙*
