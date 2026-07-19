# 📝 Notas — Continuar Amanhã

> Criado em: 2026-07-19 | Sessão com o Antigravity

---

## 📊 O que foi feito hoje

- Lemos e analisamos o **Google Doc** da pesquisa de mercado e o **Google Forms** (37 respostas)
- Entendemos que o projeto está na **v1.1.0** — base completa + comentários em todo o código
- Criamos o **ROADMAP** com versões definidas (veja `docs/ROADMAP.md`)
- Atualizamos o **CHANGELOG** com a entrada da sessão de planejamento

---

## 🚀 O que conversar amanhã

### 1. Qual é o próximo passo concreto?

O roadmap sugere a **v1.2.0 — Descoberta & Social**. Mas precisa decidir:

- 👁️ **Feed público** (ver galerias de outros usuários) — âncora principal?
- ❤️ **Curtidas nas fotos** — vem junto ou depois?
- 👥 **Seguir usuários** — essencial para o v1.2 ou pode ficar para depois?

> **Pergunta pra você**: O que você quer que o usuário consiga fazer na v1.2 que hoje ele não consegue?

---

### 2. Sistema de Pagamentos (v1.3)

A Sah listou isso como uma das próximas coisas a fazer. Pontos a discutir:

- Qual plataforma? **Stripe** é o padrão mundial, mas tem opções nacionais (Pagar.me, Mercado Pago)
- O que diferencia o plano GRÁTIS do plano PRO? (sugestão abaixo)

| | Gratuito | PRO |
|---|---------|-----|
| Galerias | 3 | Ilimitado |
| Fotos por galeria | 30 | 100+ |
| Colaboradores | — | ✅ |
| Perfil em destaque | — | ✅ |
| Analytics | — | ✅ |

---

### 3. Ideias do backlog para avaliar

Estas ideias surgiram na conversa de hoje — avaliar qual encaixa melhor em qual versão:

- 📸 **Álbum compartilhado em eventos** (casamento, aniversário) — muitas pessoas mandam fotos para o mesmo álbum
- 🎨 **Tema por galeria** — cada carrossel com sua paleta de cores própria
- 🔗 **QR Code de galeria** — imprimir e levar para eventos físicos
- 🔒 **Galeria com PIN** — acesso protegido por senha simples
- 📹 **Vídeos curtos** além de fotos
- 🤖 **IA para legendas automáticas** — sugestão de texto ao subir foto

---

### 4. Coisas técnicas a implementar

- [ ] Adicionar `<meta>` SEO correto em todos os arquivos (title, description, og:image)
- [ ] Criar arquivo `manifest.json` para PWA básico (ícone + nome na tela inicial)
- [ ] Decidir domínio personalizado (hoje está no GitHub Pages)
- [ ] Regras do Firestore (`firestore.rules`) para segurança de dados

---

## 💡 Padrão de trabalho decidido

- **Documentar cada alteração** no `CHANGELOG.md` antes de commitar
- **Comentar cada bloco de código** em português
- **Conversar sobre novas ideias** aqui neste documento ou criando uma nova sessão

---

*Boa noite! Até amanhã 💙*
