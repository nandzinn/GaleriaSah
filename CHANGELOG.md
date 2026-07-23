# Changelog — Galeria Multi-Usuário

Todas as mudanças notáveis deste projeto serão documentadas aqui.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e o projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## Guia rápido de categorias

Cada versão usa estas seções para classificar as alterações:

| Categoria   | Quando usar |
|-------------|-------------|
| `Adicionado` | Nova funcionalidade que não existia antes |
| `Alterado`   | Mudança em algo que já existia (comportamento, visual, lógica) |
| `Corrigido`  | Correção de um bug ou erro |
| `Removido`   | Funcionalidade ou arquivo que foi deletado |
| `Segurança`  | Correção de vulnerabilidade ou melhoria de segurança |
| `Deprecado`  | Algo que ainda funciona mas será removido em breve |

---

## [Não lançado] — 2026-07-23

### Adicionado
- **Cor de fundo personalizável** (`profile.html` + todas as páginas autenticadas):
  - Nova seção **"Aparência"** no formulário de edição do perfil
  - 8 swatches pré-definidos curados (Navy, Midnight Blue, Deep Purple, Dark Forest, Dark Crimson, Midnight Green, Charcoal, Pure Dark)
  - Botão com ícone conta-gotas abre o color picker nativo do navegador para cor totalmente livre
  - Preview em tempo real da cor enquanto o usuário hover/seleciona (sem precisar salvar)
  - Bolinha de preview ao lado do label "Cor de fundo" indicando a cor ativa
  - Cor salva em `users/{uid}.bgColor` no Firestore
  - Cache em `localStorage` com chave `gal_bg` para aplicação instantânea (sem flash) ao navegar entre páginas
  - Aplicado em: `gallery.html`, `explore.html`, `public_profile.html` (cor do visitante logado)

### Corrigido
- **Bug 1 — IIFE antes de `import` em módulos ES6** (`gallery.html`, `explore.html`, `public_profile.html`):
  - **Causa**: ao adicionar o bloco `(function(){ localStorage... })()` de aplicação da cor de fundo, o código foi posicionado *antes* das declarações `import` dentro do `<script type="module">`. Em módulos ES6, os `import` precisam ser as primeiras instruções — código executável antes deles é uma violação de sintaxe.
  - **Efeito**: o browser rejeitava o módulo inteiro silenciosamente. O Firebase nunca era inicializado, `onAuthStateChanged` nunca era registrado, e a tela ficava travada mostrando "Carregando…" indefinidamente.
  - **Correção**: mover o bloco IIFE para *depois* de todos os `import`.

- **Bug 2 — Query Firestore com `where` + `orderBy` sem índice composto** (`gallery.html` — `initGalleries` e `listenPhotos`):
  - **Causa**: as queries `where('ownerId') + orderBy('order')` (galerias) e `where('galleryId') + orderBy('order')` (fotos) exigem um **índice composto** no Firebase Console que não havia sido criado.
  - **Efeito**: o Firestore recusava as queries e caia no error handler. Como resultado, nenhuma galeria era carregada e os cards placeholder com `+` (que deveriam aparecer sempre) não eram exibidos.
  - **Correção**: remover o `orderBy` das queries do Firestore e ordenar os resultados no cliente (`.sort((a, b) => a.order - b.order)`). Resultado final idêntico, zero dependência de índice composto.

- **Bug 3 — Error handler de `initGalleries` não chamava `updatePageState()`** (`gallery.html`):
  - **Causa**: o bloco `catch` do `onSnapshot` chamava apenas `hideLoading()`, omitindo `updatePageState()`.
  - **Efeito**: mesmo que o overlay de loading sumisse, os placeholders nunca apareciam porque `renderPlaceholders()` só é chamado dentro de `updatePageState()`.
  - **Correção**: adicionar `updatePageState()` antes de `hideLoading()` no error handler, garantindo que os 3 cards com `+` apareçam sempre, mesmo em caso de erro.

---

## [1.2.0] - 2026-07-22

### Adicionado
- **Feed / Explorar (`explore.html`)**:
  - Nova página para exibir todas as galerias públicas da plataforma.
  - Ordenação decrescente (mais recentes primeiro).
  - Cards de galeria responsivos mostrando a capa (primeira foto), título, contagem de fotos, avatar e nome do dono.
  - Links diretos para o perfil público do criador a partir do card.
  - Abas de navegação no header (`Minhas` / `Explorar`) integradas no `gallery.html`.
  - Link "Explorar" adicionado ao dropdown de usuário no `public_profile.html`.
- **Sistema de Comentários (`public_profile.html`)**:
  - Nova coleção `comments` no Firestore com regras de segurança rigorosas.
  - UI em formato de "Bottom Sheet" (painel deslizante de baixo para cima) acessível via ícone 💬 no card da foto ou no Lightbox.
  - Contador em tempo real do número de comentários na foto.
  - Textarea com auto-resize para escrever comentários (máx. 300 caracteres).
  - Formatação de data/hora relativa (ex: "há 5 min").
  - Exclusão de comentários restrita ao autor do comentário ou ao dono do perfil visitado.
- **SEO** — meta tags completas em todos os 6 arquivos HTML (`index.html`, `auth.html`, `onboarding.html`, `profile.html`, `gallery.html`, `public_profile.html`):
  - `<title>` descritivo com nome do app ("Galeria da Sah") em cada página
  - `<meta name="description">` com texto único por página
  - `<meta name="robots">`: `noindex, nofollow` para páginas privadas; `index, follow` para `public_profile.html`
  - `<meta name="theme-color" content="#070d1f">` — cor da barra do navegador mobile
  - Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`) em todos
  - Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) em todos
- **PWA** — app instalável na tela inicial de celulares e desktops:
  - `manifest.json` criado na raiz com `name`, `short_name`, `display: standalone`, `theme_color`, `background_color` e lista de ícones
  - `icon-512.png` e `icon-192.png` gerados (ícone com câmera estilizada em fundo navy)
  - `og-cover.png` (1200×630) para Open Graph/Twitter Card ao compartilhar links
  - `<link rel="manifest">` e `<link rel="apple-touch-icon">` adicionados nos 6 HTMLs


- `public_profile.html`: ❤️ **Curtidas nas fotos** — visitantes podem curtir/descurtir fotos de perfis públicos
  - Botão de coração no canto inferior direito de cada card de foto
  - Coração vazio `favorite_border` → coração cheio `favorite` ao curtir
  - Contador de curtidas exibido ao lado do ícone (oculto quando 0)
  - Animação de pulsação (`likePoP`) ao curtir
  - **Atualização otimista de UI**: a tela responde instantaneamente, sem esperar o Firestore
  - Rollback automático se o Firestore retornar erro
  - O dono do próprio perfil **não pode curtir** suas fotos (botão desabilitado)
  - Dados persistidos em `photos/{photoId}.likedBy` (array de UIDs)
  - Usa `arrayUnion` / `arrayRemove` do Firestore para concorrência segura
  - Lock de clique duplo simultâneo (`likeLock`) para evitar inconsistências
- `public_profile.html`: 👥 **Seguir usuários** — visitantes podem seguir/deixar de seguir perfis
  - Botão **"Seguir"** azul preenchido e **"Seguindo ✓"** ghost no card de perfil
  - Hover no "Seguindo" muda para vermelho (indicação de deixar de seguir)
  - Spinner mini dentro do botão enquanto aguarda o Firestore
  - Dados persistidos em `follows/{followerId_followingId}` com `followerId` e `followingId`
  - Contagem de seguidores em tempo real via `getCountFromServer` (eficiente, não baixa documentos)
  - **4º stat** adicionado ao card de perfil: **Seguidores**
  - O próprio dono **não vê o botão** de seguir no próprio perfil
  - UI otimista com rollback automático em caso de erro
  - Lock de duplo clique (`followLock`)
  - Toast de confirmação ao seguir/deixar de seguir
- `firestore.rules` (**novo arquivo**): 🔒 **Regras de segurança do Firestore** cobrindo todas as coleções
  - **`users`**: leitura pública (autenticados), escrita/edição/exclusão só pelo próprio usuário; `createdAt` imutável
  - **`galleries`**: leitura respeitando `isPrivate`; criação requer `ownerId == uid`; colaboradores não podem excluir nem mudar `ownerId`
  - **`photos`**: criação requer `uploadedBy == uid`; atualização de `likedBy` isolada (qualquer verificado, exceto dono da foto); exclusão só por quem fez upload
  - **`follows`**: criação requer `followerId == uid` e formato correto do ID; atualização bloqueada (`false`); exclusão só pelo próprio seguidor
  - Função auxiliar `isVerified()` garante e-mail verificado em todas as operações
  - Função auxiliar `onlyChanges()` isola campos permitidos em updates parciais

---

## [Não lançado — sessão anterior]

> Alterações feitas em 20/07/2026.

### Adicionado
- `docs/ROADMAP.md`: roadmap completo do projeto com versões planejadas (v1.2 até v2.0), baseado na pesquisa de mercado (37 respostas no Google Forms)
- `docs/NOTAS_AMANHA.md`: notas da sessão de planejamento de 19/07/2026 com pontos a discutir nas próximas etapas
- `public_profile.html`: nova página de **perfil público visitável** (início da v1.2.0 — Descoberta & Social)
  - Acesso via `public_profile.html?user=USERNAME`
  - Exige que o visitante esteja **logado** para visualizar
  - Exibe: avatar, username, bio, estatísticas (galerias, fotos, membro desde)
  - Lista as **galerias públicas** do usuário em carrosséis horizontais (idênticos ao `gallery.html`)
  - Lightbox para ver fotos em tela cheia com navegação ← → e teclas de seta
  - Tela de **"Perfil privado"** para perfis com `isProfilePrivate: true`
  - Tela de **"Usuário não encontrado"** para usernames inexistentes
  - Proteção XSS com `escHtml()` em todos os dados externos
  - Arrastar carrosséis com mouse (drag scroll)

### Alterado
- `profile.html`: adicionado botão **"Ver como público"** no modo de visualização
  - Abre `public_profile.html?user=USERNAME` em nova aba
  - Fica oculto automaticamente quando o perfil está configurado como privado
  - Função `viewPublicProfile()` adicionada ao JS
- `gallery.html`: **galerias placeholder** — sempre exibe no mínimo 3 galerias na tela
  - Se o usuário tem 0 galerias reais → exibe 3 placeholders com card "+"
  - Se tem 1 real → exibe 2 placeholders; se tem 2 → exibe 1 placeholder
  - Clicar no `+` ou no lápis do placeholder abre o modal "Nova Galeria"
  - Constante `MIN_GALLERIES = 3` controla o mínimo; facilmente ajustável
- `gallery.html`: **botão "+" movido para o fim do carrossel**
  - Antes ficava fixo no início; agora sempre aparece após a última foto
  - Cada foto adicionada empurra o "+" para o final
  - Desaparece automaticamente quando a galeria atinge 100 fotos (limite)
- `gallery.html`: **renomear galeria clicando no nome**
  - O nome da galeria agora é clicável (hover com sublinhado pontilhado azul)
  - Clique abre diretamente o modal de renomear, sem passar pelas configurações (⋮)
  - Função `quickRenameGallery(galleryId)` adicionada ao JS
  - O `⋮` continua com todas as opções (renomear, privacidade, colaboradores, excluir)

### Corrigido
- `public_profile.html`: corrigido bug onde a tela ficava presa no spinner de carregamento
  - **Causa**: queries Firestore com `orderBy` + `where` exigem índice composto (não criado)
  - **Correção**: removido `orderBy` das queries de galerias e fotos no perfil público
  - O estado de perfil agora é exibido antes das galerias carregarem (melhor UX)

---

## [1.1.0] — 2026-07-17

### Adicionado
- Comentários explicativos em português em **todos os arquivos** do projeto:
  - `js/firebase-config.js`: documentadas todas as importações e os campos de configuração do Firebase
  - `index.html`: diagrama do fluxo de redirecionamento e explicação do roteador
  - `auth.html`: explicação das 4 views (login, cadastro, verificação, recuperação), variáveis CSS e lógica JS
  - `onboarding.html`: documentação dos 4 steps, barra de progresso, debounce de username e salvamento no Firestore
  - `profile.html`: carregamento de perfil, modo edição, upload de avatar e exclusão de conta em cascata
  - `gallery.html`: arquitetura de dados (Firestore), todos os 6 modais, lightbox, arrastar carrossel e proteção XSS via `escHtml()`

### Alterado
- Nenhuma funcionalidade alterada nesta versão — apenas documentação interna (comentários)

---

## [1.0.0] — 2026-07-17

> Versão inicial do projeto. Base completa da aplicação funcional.

### Adicionado

#### Autenticação (`auth.html`)
- Tela de **login** com e-mail e senha
- Tela de **cadastro** com validação de senha e indicador de força
- Tela de **verificação de e-mail** com botão "Já confirmei" e reenvio
- Tela de **recuperação de senha** com envio de link por e-mail
- Tradução de todos os erros do Firebase Auth para português
- Botão para mostrar/ocultar senha (ícone olho) em todos os campos de senha

#### Roteamento (`index.html`)
- Roteador inteligente com 3 regras: não logado → auth, perfil incompleto → onboarding, completo → galeria
- Spinner de carregamento enquanto verifica o estado de autenticação

#### Configuração Inicial do Perfil (`onboarding.html`)
- Fluxo de 4 passos: foto de perfil, nome de usuário, bio e privacidade
- Barra de progresso animada com bolinhas indicadoras de step
- Upload de avatar com preview instantâneo (max 5MB)
- Verificação de disponibilidade do username em tempo real (debounce 600ms)
- Contador de caracteres na bio (máx. 200)
- Toggle de perfil privado/público
- Salvamento do perfil completo no Firestore com `profileComplete: true`

#### Perfil do Usuário (`profile.html`)
- Visualização do avatar, username, bio e badge de privacidade
- Edição inline de username, bio, data de nascimento e privacidade
- Troca de foto de perfil com upload instantâneo e preview
- Estatísticas: número de galerias, número de fotos e data de membro
- Verificação de disponibilidade de username ao editar (otimizada: não verifica se não mudou)
- **Zona de perigo**: exclusão de conta com confirmação dupla (dialog + prompt "EXCLUIR")
- Exclusão em cascata: fotos → Storage, documentos Firestore, conta Firebase Auth
- Botão de logout no header fixo

#### Galerias e Fotos (`gallery.html`)
- Listagem de galerias em carrosséis horizontais com scroll por arrastar
- Limite de 10 galerias por usuário
- Limite de 100 fotos por galeria
- Criar nova galeria via FAB (botão flutuante)
- Modal de configurações por galeria (renomear, privacidade, colaboradores, excluir)
- Upload de fotos com preview antes de confirmar (max 15MB)
- Edição de legenda de foto
- Exclusão de foto com confirmação
- Exclusão de galeria em cascata (fotos + Storage + Firestore em `writeBatch`)
- Colaboradores: adicionar e remover usuários por username
- Lightbox de visualização em tela cheia com navegação ← → e teclas de seta
- Dropdown do usuário no header (perfil / sair)
- Atualização em tempo real via `onSnapshot` (sem precisar recarregar)
- Proteção contra XSS com função `escHtml()` em todos os dados do usuário

#### Firebase (`js/firebase-config.js`)
- Inicialização do Firebase App
- Configuração e exportação de: `auth` (autenticação), `db` (Firestore), `storage` (Storage)

#### Design e UX (todos os arquivos)
- Tema escuro com paleta de azuis em variáveis CSS `--color-*`
- Efeito glassmorphism (fundo translúcido + blur) nos cards e modais
- Orbs animados no fundo (decoração com gradientes e blur)
- Animações de entrada (`slideUp`, `fadeIn`) em cards e modais
- Bottom sheets (modais deslizando de baixo para cima)
- Toast de notificação flutuante em todas as ações
- Skeletons de carregamento animados (shimmer)
- Totalmente responsivo para mobile (max-width 440px–480px)
- Fontes Google: Inter e Material Symbols Outlined

---

## Como atualizar este arquivo

Ao fazer um commit com alterações no projeto, adicione uma entrada neste arquivo **antes** do commit:

```
1. Identifique a data atual (formato AAAA-MM-DD)
2. Se for uma alteração pequena: adicione em [Não lançado]
3. Se for um lançamento: crie uma nova seção [X.Y.Z] — AAAA-MM-DD
4. Classifique a alteração na categoria correta
5. Escreva uma frase clara descrevendo O QUÊ mudou e POR QUÊ (se relevante)
```

### Regras de versionamento (SemVer)
- `MAJOR` (ex: 1→2): mudança que quebra compatibilidade com versão anterior
- `MINOR` (ex: 1.0→1.1): nova funcionalidade que não quebra nada existente
- `PATCH` (ex: 1.0.0→1.0.1): correção de bug ou ajuste pequeno

---

*Mantido por [@sahzinha](https://github.com/) — Projeto Galeria Multi-Usuário*
