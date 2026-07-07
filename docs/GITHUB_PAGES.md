# 🌐 Como Publicar no GitHub Pages

Guia passo a passo para deixar a galeria online e acessível pelo celular.

---

## Pré-requisitos

- Conta no [GitHub](https://github.com) (gratuita)
- Os arquivos do projeto prontos no seu computador

---

## Passo 1 — Criar o Repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** (ou **"+"** no canto superior direito → New repository)
3. Preencha:
   - **Repository name:** `galeria-sah` (ou qualquer nome sem espaços)
   - **Visibility:** Public ✅ *(obrigatório para GitHub Pages gratuito)*
4. Clique em **"Create repository"**

---

## Passo 2 — Fazer Upload dos Arquivos

### Pelo site do GitHub (mais fácil):

1. Na página do repositório recém-criado, clique em **"uploading an existing file"**
2. Arraste **todos** os arquivos e pastas da pasta `Galeria_sah`:
   - ✅ `index.html`
   - ✅ Pasta `fotos/` (com todas as `.jpeg`)
   - ✅ `README.md`
   - ✅ Pasta `docs/`
3. Escreva uma mensagem de commit (ex: *"Galeria inicial"*)
4. Clique em **"Commit changes"**

> ⚠️ **Atenção:** O GitHub não aceita upload de pastas pelo site diretamente. Para subir a pasta `fotos/`, compacte tudo em um `.zip` e use o GitHub Desktop, ou arraste os arquivos da pasta `fotos/` individualmente após criá-la.

### Pelo GitHub Desktop (recomendado para pastas):

1. Baixe o [GitHub Desktop](https://desktop.github.com/) (gratuito)
2. Clique em **"Clone a repository"** → escolha o repositório criado
3. Copie os arquivos da `Galeria_sah/` para a pasta clonada
4. No GitHub Desktop, clique em **"Commit to main"** → **"Push origin"**

---

## Passo 3 — Ativar o GitHub Pages

1. No repositório, clique em **"Settings"** (aba no topo)
2. No menu lateral esquerdo, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - Branch: **main**
   - Pasta: **/ (root)**
4. Clique em **"Save"**
5. Aguarde ~1–2 minutos

---

## Passo 4 — Acessar a Galeria

Após ativar, o link aparecerá na própria página de Settings → Pages:

```
https://seuusuario.github.io/galeria-sah/
```

Compartilhe esse link com ela! 💙

---

## ❓ Perguntas Frequentes

**As fotos trocadas pelo celular aparecem para todo mundo?**
Não. Edições feitas pelo celular (trocar foto, adicionar, arquivar) ficam salvas **só no navegador daquele celular**. Para que as mudanças apareçam para todos, seria necessário reeditar os arquivos e fazer novo upload.

**Posso usar o link no celular?**
Sim! É um site responsivo, funciona perfeitamente em qualquer dispositivo.

**Preciso pagar algo?**
Não. GitHub Pages é 100% gratuito para repositórios públicos.

**Posso mudar o endereço?**
Sim — adquirindo um domínio próprio e configurando em Settings → Pages → Custom domain. Mas o `.github.io` já funciona muito bem.
