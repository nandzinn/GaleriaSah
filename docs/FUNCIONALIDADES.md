# ⚙️ Funcionalidades Técnicas

Documento de referência para quem quiser entender ou modificar o código.

---

## 🏗️ Arquitetura

A galeria é um **Single Page Application (SPA) estático** — todo o código roda no navegador do visitante, sem servidor.

```
index.html
├── <style>  — Todo o CSS (variáveis de tema, animações, layout)
├── <body>   — Estrutura HTML das 6 páginas + modais
└── <script> — Toda a lógica JavaScript (19 módulos comentados)
```

---

## 💾 Armazenamento (localStorage)

Todos os dados são salvos na chave `galeria_sah_v3` do `localStorage` do navegador.

### Estrutura do estado:
```json
{
  "photos": [
    {
      "id": "abc123",
      "src": "fotos/fotos1.jpeg",
      "caption": "Legenda da foto",
      "section": "portraits",
      "archived": false,
      "deleted": false,
      "deletedAt": null,
      "createdAt": 1720000000000
    }
  ],
  "sections": [
    { "id": "portraits", "name": "Retratos", "cardWidth": 175, "aspectRatio": "2/3", "bar": "var(--color-primary)" }
  ],
  "favorites": ["abc123", "__hero__"],
  "hero": "data:image/jpeg;base64,...",
  "profilePhoto": "data:image/jpeg;base64,...",
  "theme": "blue"
}
```

### Limites de armazenamento:
- `localStorage` suporta ~5–10 MB por domínio
- Fotos são comprimidas automaticamente (máx 1400px, qualidade 82%) antes de salvar
- Fotos das fileiras padrão (`fotos/fotosX.jpeg`) **não** ocupam localStorage — são arquivos locais

---

## 🎨 Sistema de Temas

Todos os temas são definidos no objeto `THEMES` no JavaScript. Cada tema é um conjunto de **CSS Custom Properties** que sobrescreve as variáveis do `:root`.

### Variáveis disponíveis:
| Variável | Uso |
|---|---|
| `--bg-main` | Fundo principal da página |
| `--bg-surface` | Modais, action sheet |
| `--bg-card` | Cards de foto |
| `--color-primary` | Cor de destaque principal |
| `--color-mid` | Cor intermediária |
| `--color-deep` | Acento forte |
| `--text-main` | Texto principal |
| `--text-muted` | Texto secundário |
| `--text-dim` | Textos discretos |
| `--rgb-primary` | Valor RGB de `--color-primary` (para uso em `rgba()`) |
| `--rgb-mid` | Valor RGB de `--color-mid` |

### Como adicionar um novo tema:
Acrescente uma entrada no objeto `THEMES` no JavaScript:
```javascript
minhatema: {
  label: '🌺 Meu Tema',
  swatch: 'linear-gradient(135deg, #cor1, #cor2)',
  vars: {
    '--bg-main':       '#hexfundo',
    '--bg-surface':    '#hexsurface',
    '--bg-card':       '#hexcard',
    '--color-primary': '#hexdestaque',
    '--color-mid':     '#hexmedio',
    '--color-deep':    '#hexforte',
    '--color-soft':    '#hexsuave',
    '--color-pale':    '#hexpale',
    '--text-main':     '#hextexto',
    '--text-muted':    '#hextextosec',
    '--text-dim':      '#hextextodim',
    '--rgb-primary':   'r,g,b',
    '--rgb-mid':       'r,g,b',
  },
},
```

---

## 📷 Sistema de Upload e Compressão

```
Usuário seleciona arquivo
       ↓
compressImg(file, maxPx=1400, quality=0.82)
       ↓
Canvas API redimensiona (se > 1400px)
       ↓
canvas.toDataURL('image/jpeg', 0.82)
       ↓
base64 salvo no estado + localStorage
```

---

## 📱 Páginas e Navegação

| ID | Aba | Ícone |
|---|---|---|
| `page-home` | Início | `grid_view` |
| `page-search` | Busca | `search` |
| `page-favorites` | Favoritos | `favorite` |
| `page-archive` | Arquivo | `inventory_2` |
| `page-trash` | Lixeira | — (sem aba, acessada pelo Arquivo) |
| `page-profile` | Perfil | `person` |

---

## 🔧 Módulos JavaScript (comentados no código)

| Nº | Nome | Função |
|---|---|---|
| 1 | THEMES | Definição dos 6 temas de cores |
| 2 | DEFAULT DATA | Seções e fotos padrão (seed) |
| 3 | STORE | CRUD no localStorage |
| 4 | THEME MANAGER | Aplica tema via CSS vars |
| 5 | COMPRESS | Compressão via Canvas API |
| 6 | UPLOAD | Gerencia input de arquivo |
| 7 | RENDER HOME | Renderiza carrosséis dinamicamente |
| 8 | ACTION SHEET | Menu de opções do card |
| 9 | MODAL ADD | Modal de adicionar foto |
| 10 | MODAL CAPTION | Modal de editar legenda |
| 11 | MODAL CONFIRM | Confirmação de ações destrutivas |
| 12 | LIGHTBOX | Visualização em tela cheia |
| 13 | FAVORITES | Sistema de favoritos |
| 14 | OTHER PAGES | Busca, Favoritos, Arquivo, Lixeira |
| 15 | NAVIGATION | Troca de páginas |
| 16 | DRAG SCROLL | Arrastar carrosséis |
| 17 | KEYBOARD | Atalhos de teclado |
| 18 | TOAST | Notificações em tela |
| 19 | INIT | Inicialização geral |
