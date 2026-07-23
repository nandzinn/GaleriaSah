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

## ✅ Sessão de 23/07/2026 — Cor de fundo personalizável

### O que foi implementado

| Funcionalidade | Arquivo | Status |
|---|---|---|
| Seção "Aparência" no formulário de edição do perfil | `profile.html` | ✅ Feito |
| 8 swatches pré-definidos curados | `profile.html` | ✅ Feito |
| Color picker nativo do navegador (cor livre) | `profile.html` | ✅ Feito |
| Preview em tempo real da cor ao hover/selecionar | `profile.html` | ✅ Feito |
| Bolinha de preview ao lado do label "Cor de fundo" | `profile.html` | ✅ Feito |
| Cor salva em `users/{uid}.bgColor` no Firestore | `profile.html` | ✅ Feito |
| Cache `gal_bg` no `localStorage` (sem flash entre páginas) | todos | ✅ Feito |
| Aplicar cor ao carregar: `gallery.html` | `gallery.html` | ✅ Feito |
| Aplicar cor ao carregar: `explore.html` | `explore.html` | ✅ Feito |
| Aplicar cor ao carregar: `public_profile.html` (visitante) | `public_profile.html` | ✅ Feito |

### Detalhes técnicos importantes

- **Campo Firestore**: `users/{uid}.bgColor` → string hex (ex: `#070d1f`)
- **localStorage key**: `gal_bg` — lida antes do Firebase carregar para aplicação instantânea (sem flash)
- **Função**: `applyBgColor(hex, save)` no `profile.html` — aplica na CSS var `--bg-main`, atualiza o header, o preview dot e os swatches
- **`public_profile.html`**: aplica a cor do **visitante logado** (não do dono do perfil), lida do `localStorage`
- **Swatches pré-definidos**: `#070d1f` (Navy/padrão), `#0d0d1f`, `#0f0d1e`, `#0a1a0f`, `#1a0a0a`, `#0d120d`, `#141414`, `#0c0c0c`

---

## 🐛 Bugs encontrados e corrigidos na sessão de 23/07/2026

> Detectados ao testar ao vivo após o commit da cor de fundo. Três bugs em cadeia travavam a tela principal.

---

### Bug 1 — IIFE antes de `import` em módulos ES6

**Arquivos afetados**: `gallery.html`, `explore.html`, `public_profile.html`

**O que acontecia**: a tela ficava presa mostrando o spinner de carregamento indefinidamente. O header aparecia, mas o conteúdo nunca carregava.

**Causa técnica**: ao inserir o bloco de cor de fundo cacheada (`(function(){ localStorage... })()`), ele foi colocado **antes das declarações `import`** dentro do `<script type="module">`.

Em módulos ES6, as declarações `import` **precisam ser as primeiras instruções do módulo** — qualquer código executável antes delas é uma **violação de sintaxe**. O browser rejeita o módulo inteiro silenciosamente (sem mensagem óbvia), então o Firebase nunca era inicializado e a tela nunca saía do loading.

```js
// ❌ ERRADO — como estava
<script type="module">
    (function() { localStorage... })();  // ← IIFE antes do import = ERRO
    import { auth } from './firebase-config.js';
```

```js
// ✅ CORRETO — como ficou
<script type="module">
    import { auth } from './firebase-config.js';
    // ... outros imports ...
    (function() { localStorage... })();  // ← IIFE depois dos imports = OK
```

**Regra para o futuro**: em `<script type="module">`, **nunca coloque código executável antes dos `import`**.

---

### Bug 2 — Query Firestore com `where` + `orderBy` sem índice composto

**Arquivo afetado**: `gallery.html` — funções `initGalleries()` e `listenPhotos()`

**O que acontecia**: mesmo após corrigir o Bug 1, a galeria continuava em branco. Nenhum card aparecia — nem as galerias reais, nem os 3 placeholders com `+`.

**Causa técnica**: as queries do Firestore usavam `where` + `orderBy` juntos:

```js
// initGalleries — galerias
query(galleriesRef,
  where('ownerId', '==', uid),
  orderBy('order', 'asc')   // ← exige índice composto
);

// listenPhotos — fotos por galeria
query(collection(db, 'photos'),
  where('galleryId', '==', id),
  orderBy('order', 'asc')   // ← exige índice composto
);
```

O Firestore exige um **índice composto** (criado manualmente no Firebase Console) para qualquer query que combine `where` + `orderBy` em campos diferentes. Como o índice não existia, o Firestore recusava as queries → caía no error handler → nenhuma galeria era carregada.

Este é o **mesmo bug** que já havia acontecido no `public_profile.html` (sessão de 20/07). A solução foi a mesma: remover o `orderBy` da query e ordenar no cliente.

```js
// ✅ CORRETO — sem orderBy na query, ordena no cliente
query(galleriesRef, where('ownerId', '==', uid))
// depois: .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
```

**Regra para o futuro**: **nunca combinar `where` + `orderBy` em campos diferentes** no Firestore sem criar o índice composto no Firebase Console. Prefira sempre ordenar no cliente.

---

### Bug 3 — Error handler de `initGalleries` não chamava `updatePageState()`

**Arquivo afetado**: `gallery.html`

**O que acontecia**: mesmo quando havia um erro no Firestore, o loading desaparecia mas a tela ficava completamente vazia — os 3 cards placeholder com `+` não apareciam.

**Causa técnica**: o error handler do `onSnapshot` chamava apenas `hideLoading()`, omitindo `updatePageState()`:

```js
// ❌ ANTES
}, (err) => {
  console.error('Galleries listener error:', err);
  hideLoading();   // ← os placeholders nunca aparecem!
});
```

`renderPlaceholders()` é chamado dentro de `updatePageState()`. Sem essa chamada, o container ficava vazio.

```js
// ✅ DEPOIS
}, (err) => {
  console.error('Galleries listener error:', err);
  updatePageState();  // ← garante que os 3 placeholders apareçam sempre
  hideLoading();
});
```

**Regra para o futuro**: o error handler de `initGalleries` **sempre** deve chamar `updatePageState()` antes de `hideLoading()`.

---

## 📌 Para a próxima sessão — começar aqui

### 🔜 Próximas features da v1.2.0 — conforme ROADMAP

A galeria está **totalmente funcional**. Os 3 bugs foram resolvidos e verificados ao vivo. Próximas features:

1. **Busca de usuários** — campo de busca por username na navbar/explore
2. **Feed de atividade** — timeline com curtidas e novos seguidores
3. **Notificações in-app** — toast/badge quando alguém curte ou segue

Ver `docs/ROADMAP.md` para a lista completa.

---

## 💡 Padrão de trabalho decidido

- **Documentar cada alteração** no `CHANGELOG.md` antes de commitar
- **Comentar cada bloco de código** em português
- **Atualizar este arquivo** ao final de cada sessão com o resumo e os próximos passos
- ⚠️ **Em módulos ES6**: nunca colocar código executável antes dos `import`
- ⚠️ **No Firestore**: nunca combinar `where` + `orderBy` sem índice composto — preferir ordenar no cliente

---

*Sessão de 23/07/2026 encerrada. Até a próxima! 💙*
