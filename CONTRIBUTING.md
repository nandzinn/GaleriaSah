# Como Contribuir — Galeria Multi-Usuário

Guia para manter o projeto organizado ao fazer commits e alterações.

---

## Fluxo recomendado antes de cada commit

```
1. Faça as alterações nos arquivos
2. Atualize o CHANGELOG.md
3. git add .
4. git commit -m "tipo: descrição curta"
5. git push
```

---

## Como escrever a mensagem do commit

Use o padrão **Conventional Commits** (muito adotado no GitHub):

```
tipo(escopo opcional): descrição curta em minúsculas
```

### Tipos de commit

| Tipo       | Quando usar |
|------------|-------------|
| `feat`     | Nova funcionalidade |
| `fix`      | Correção de bug |
| `docs`     | Mudança apenas em documentação |
| `style`    | Mudança de CSS/visual sem alterar lógica |
| `refactor` | Reescrita de código sem mudar comportamento |
| `chore`    | Tarefas de manutenção (atualizar dependências, etc.) |

### Exemplos

```bash
# Nova funcionalidade
git commit -m "feat: adicionar filtro por data nas galerias"

# Correção de bug
git commit -m "fix: corrigir erro ao excluir foto sem legenda"

# Mudança visual
git commit -m "style: ajustar cores do header no mobile"

# Documentação
git commit -m "docs: adicionar comentários em gallery.html"
```

---

## Como atualizar o CHANGELOG.md

Abra o [CHANGELOG.md](./CHANGELOG.md) e siga este modelo:

### Para alterações ainda em desenvolvimento

Adicione em `[Não lançado]`:

```markdown
## [Não lançado]

### Adicionado
- Filtro de galerias por data de criação

### Corrigido
- Bug onde a foto não aparecia após upload em conexão lenta
```

### Ao lançar uma versão

Mova o conteúdo de `[Não lançado]` para uma nova seção:

```markdown
## [1.2.0] — 2026-07-20

### Adicionado
- Filtro de galerias por data de criação
...
```

---

## Estrutura de arquivos do projeto

```
Galeria_sah/
├── index.html          → Roteador (redireciona conforme login)
├── auth.html           → Login, cadastro, verificação de e-mail
├── onboarding.html     → Configuração inicial do perfil
├── gallery.html        → Página principal com galerias e fotos
├── profile.html        → Edição de perfil e exclusão de conta
├── js/
│   └── firebase-config.js  → Credenciais e inicialização do Firebase
├── CHANGELOG.md        → Histórico de todas as alterações
└── CONTRIBUTING.md     → Este arquivo
```

---

## Regras de versionamento (SemVer X.Y.Z)

| Número    | Quando incrementar |
|-----------|--------------------|
| `X` (Major) | Mudança que quebra o que existia (ex: nova estrutura do banco, login obrigatório) |
| `Y` (Minor) | Nova funcionalidade sem quebrar nada (ex: adicionar filtro, nova tela) |
| `Z` (Patch) | Correção de bug ou ajuste pequeno (ex: fix de cor, texto errado) |

**Exemplos:**
- `1.0.0 → 1.0.1`: corrigiu um bug de login
- `1.0.1 → 1.1.0`: adicionou a tela de colaboradores
- `1.1.0 → 2.0.0`: mudou como as galerias são armazenadas (quebra a estrutura anterior)
