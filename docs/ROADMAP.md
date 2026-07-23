# 🗺️ Roadmap — Galeria Online

> Baseado na pesquisa de mercado (37 respostas, jul/2026).
> Meta: lançamento completo em **Dezembro 2026**.

---

## ✅ v1.1.0 — Base Completa (lançado 17/07/2026)

- Autenticação completa (login, cadastro, verificação, recuperação)
- Roteamento inteligente (index → auth/onboarding/galeria)
- Onboarding de 4 passos (foto, username, bio, privacidade)
- Perfil do usuário (editar, estatísticas, excluir conta)
- Galerias em carrosséis com upload, lightbox, colaboradores
- Atualização em tempo real via Firestore `onSnapshot`
- Comentários explicativos em todo o código

---

## 🔵 v1.2.0 — Descoberta & Social *(próxima versão)*

*Transformar a galeria privada numa plataforma onde pessoas se encontram.*

### Planejado
- [ ] **Feed/Explorar** — página para ver galerias públicas de outros usuários
- [ ] **Curtidas** (❤️) — nas fotos, persistidas no Firestore
- [ ] **Comentários** — campo de texto + listagem por foto
- [ ] **Seguir usuários** — coleção `followers`/`following` no Firestore
- [ ] **Perfil público visitável** — `/u/username` ou `?user=username`

---

## 🟣 v1.3.0 — Monetização *(estimativa: out/2026)*

*Modelo de negócios para tornar o projeto sustentável.*

### Planejado
- [ ] **Sistema de pagamentos** (Stripe ou Mercado Pago)
- [ ] **Plano Gratuito**: 3 galerias, 30 fotos/galeria
- [ ] **Plano PRO**: galerias ilimitadas, 100+ fotos, colaboradores, analytics
- [ ] **Badge PRO** no perfil
- [ ] **Galerias em destaque** (feature paga)

---

## 🟢 v1.4.0 — Experiência Avançada *(estimativa: nov/2026)*

*Reter usuários e aumentar engajamento.*

### Planejado
- [ ] **Notificações** (curtidas, comentários, novos seguidores)
- [ ] **Coleções salvas** — salvar fotos de outros para ver depois
- [ ] **Compartilhamento** — link direto para foto ou galeria
- [ ] **Tags/categorias** nas galerias
- [ ] **Modo apresentação** — slideshow automático
- [ ] **Analytics do criador** — visualizações, curtidas, seguidores no tempo

---

## 🔴 v2.0.0 — Plataforma *(estimativa: dez/2026)*

*Escala e comunidade.*

### Planejado
- [ ] **Exploração por tags** (fotografia, arte digital, moda, etc.)
- [ ] **Sistema de denúncia** de conteúdo
- [ ] **Painel administrativo** básico
- [ ] **PWA** — instalar na tela inicial do celular

---

## 💡 Backlog de Ideias (sem versão definida)

Ideias levantadas — avaliar onde encaixar:

- 📸 **Álbum compartilhado em eventos** — casamento, aniversário, todo mundo manda foto pro mesmo álbum
- 🎨 **Tema por galeria** — cada carrossel com sua paleta de cores
- 🔗 **QR Code de galeria** — imprimir e levar para eventos físicos
- 🔒 **Galeria com PIN** — acesso protegido por senha simples
- 📹 **Vídeos curtos** além de fotos
- 🤖 **IA para legendas** — sugestão automática ao subir foto
- 📲 **Integração com Instagram** — importar fotos diretamente

---

*Mantido por [@sahzinha](https://github.com/nandzinn) — Última atualização: 2026-07-19*
