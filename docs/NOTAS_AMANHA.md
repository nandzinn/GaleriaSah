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

- Botão Seguir/Seguindo no card de perfil público
- Coleção `follows/{followerId_followingId}` no Firestore
- Stat de seguidores via `getCountFromServer` (eficiente)
- Dono não vê o botão no próprio perfil
- UI otimista + rollback + toast

---

### 3. 🔧 Coisas técnicas pendentes (próximo passo)

- [ ] **Regras do Firestore** (`firestore.rules`) para segurança de dados
  - Curtidas: só o campo `likedBy` pode ser atualizado
  - Follows: só o próprio usuário pode criar/deletar seu follow
- [ ] Adicionar `<meta>` SEO correto em todos os arquivos (title, description, og:image)
- [ ] Criar arquivo `manifest.json` para PWA básico (ícone + nome na tela inicial)
- [ ] Decidir domínio personalizado (hoje está no GitHub Pages)

---

## 💡 Padrão de trabalho decidido

- **Documentar cada alteração** no `CHANGELOG.md` antes de commitar
- **Comentar cada bloco de código** em português
- **Atualizar este arquivo** ao final de cada sessão com o resumo e os próximos passos

---

*Até a próxima sessão! 💙*
