// ╔══════════════════════════════════════════════════════════════╗
// ║  CONFIGURAÇÃO DO FIREBASE — Galeria Multi-Usuário           ║
// ║                                                              ║
// ║  Este arquivo conecta o app ao Firebase (backend da Google). ║
// ║  É importado por todos os outros arquivos HTML.              ║
// ║                                                              ║
// ║  ⚠️  SUBSTITUA OS VALORES ABAIXO PELAS SUAS CREDENCIAIS     ║
// ║                                                              ║
// ║  Como obter:                                                 ║
// ║  1. Acesse https://console.firebase.google.com              ║
// ║  2. Crie um projeto (ou use um existente)                    ║
// ║  3. Vá em Configurações do projeto → Seus apps → Web        ║
// ║  4. Copie o objeto firebaseConfig e cole aqui               ║
// ╚══════════════════════════════════════════════════════════════╝

// ── Importações dos módulos do Firebase (carregados da CDN do Google) ──
// initializeApp   → função que inicializa o app Firebase com as credenciais
// getAuth         → serviço de autenticação (login, cadastro, logout)
// getFirestore    → banco de dados (armazena usuários, galerias, fotos)
// getStorage      → armazenamento de arquivos (fotos, avatar)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage }    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ──────────────────────────────────────────────────────────────
//  🔴 SUBSTITUA ESTES VALORES PELAS SUAS CREDENCIAIS FIREBASE
//  Cada campo identifica unicamente o seu projeto no Firebase
// ──────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCkndDOfuObWaTLS-x10e3BRP8Fh2-ODFI",           // chave de acesso à API
  authDomain: "galeria-online-72eda.firebaseapp.com",           // domínio de autenticação
  projectId: "galeria-online-72eda",                            // ID do projeto
  storageBucket: "galeria-online-72eda.firebasestorage.app",    // bucket de armazenamento de arquivos
  messagingSenderId: "181801125210",                            // ID do remetente de mensagens
  appId: "1:181801125210:web:93c45b9753b872a5a49f63"           // ID do app web
};
// ──────────────────────────────────────────────────────────────

// Inicializa o Firebase com as credenciais acima
// "app" é a instância principal — os serviços abaixo dependem dela
const app = initializeApp(firebaseConfig);

// Exporta os serviços para que outros arquivos possam importá-los com:
// import { auth, db, storage } from './js/firebase-config.js'
export const auth    = getAuth(app);     // autenticação de usuários
export const db      = getFirestore(app); // banco de dados Firestore
export const storage = getStorage(app);  // armazenamento de arquivos
export default app;                       // exporta o app principal (raramente usado diretamente)
