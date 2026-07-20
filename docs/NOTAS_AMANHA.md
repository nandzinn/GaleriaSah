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

## 🔜 Próximos passos — Retomar aqui

### 1. ❤️ Curtidas nas fotos

**O que é:** O visitante de um perfil público pode curtir fotos individuais.

**Onde implementar:**
- `public_profile.html`: adicionar ícone de coração em cada card de foto
- Firestore: criar campo `likes: { [userId]: true }` dentro de cada documento `photos/{photoId}`
  - Usar `updateDoc` com `arrayUnion` / `arrayRemove` para adicionar/remover curtida

**Lógica:**
```js
// Curtir
await updateDoc(doc(db,'photos', photoId), {
  likedBy: arrayUnion(currentUser.uid)
});

// Descurtir
await updateDoc(doc(db,'photos', photoId), {
  likedBy: arrayRemove(currentUser.uid)
});
```

**UI:**
- Coração vazio `favorite_border` → coração cheio `favorite` (toggle)
- Contador de curtidas ao lado do ícone
- Animação de "pulsar" ao curtir (CSS keyframe)
- O dono da foto **não** pode curtir a própria foto
- Mostrar a contagem de curtidas no card (`gallery.html`) também (opcional, v1.3)

**Regras de segurança Firestore a adicionar:**
```
allow update: if request.auth != null
  && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likedBy']);
```

---

### 2. 👥 Seguir usuários

**O que é:** O visitante pode seguir um usuário para acompanhar suas atualizações.

**Onde implementar:**
- `public_profile.html`: botão "Seguir / Deixar de seguir" no card de perfil
- Firestore: coleção `follows/{followerId_followingId}` com campos:
  ```js
  { followerId: uid, followingId: uid, createdAt: serverTimestamp() }
  ```
  - Ou: campo `following: [uid1, uid2]` no documento do usuário (mais simples, mas não escala bem)

**Lógica:**
```js
const followId = `${currentUser.uid}_${targetUid}`;

// Seguir
await setDoc(doc(db,'follows', followId), {
  followerId: currentUser.uid,
  followingId: targetUid,
  createdAt: serverTimestamp()
});

// Deixar de seguir
await deleteDoc(doc(db,'follows', followId));

// Verificar se já segue
const snap = await getDoc(doc(db,'follows', followId));
const isFollowing = snap.exists();
```

**UI:**
- Botão no card de perfil: `"Seguir"` → `"Seguindo ✓"` (toggle)
- Contador de seguidores nas estatísticas do perfil (`statFollowers`)
- O dono do perfil **não** vê o botão de seguir no próprio perfil

**Onde adicionar o stat de seguidores:**
- `public_profile.html`: adicionar `<div>` de seguidores no bloco `.profile-stats`
- Buscar contagem com query: `where('followingId','==', targetUid)`

---

### 3. 🔧 Coisas técnicas pendentes (da sessão anterior)

- [ ] Adicionar `<meta>` SEO correto em todos os arquivos (title, description, og:image)
- [ ] Criar arquivo `manifest.json` para PWA básico (ícone + nome na tela inicial)
- [ ] Decidir domínio personalizado (hoje está no GitHub Pages)
- [ ] Regras do Firestore (`firestore.rules`) para segurança de dados

---

## 💡 Padrão de trabalho decidido

- **Documentar cada alteração** no `CHANGELOG.md` antes de commitar
- **Comentar cada bloco de código** em português
- **Atualizar este arquivo** ao final de cada sessão com o resumo e os próximos passos

---

*Até a próxima sessão! 💙*
