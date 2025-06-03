# ClinicAPP - Aplicativo para Agendamento de Consultas em Clínica

O ClinicAPP é um aplicativo desenvolvido em React Native com Expo que permite aos usuários agendar consultas em clínicas, acompanhar seu histórico de atendimentos e acessar informações sobre profissionais e serviços. O app oferece uma experiência intuitiva para pacientes e clínicas, com integração ao Firebase para armazenamento seguro dos dados.



---

## 🚀 Funcionalidades

- 🐶 **Pets para Adoção** — Visualização dos animais disponíveis, filtragem por categorias (Cachorros, Gatos, Aves, Outros) e favoritos.
- 🏥 **Nossa Clínica** — Informações sobre serviços veterinários, agendamento de consultas e localização.
- ❤️ **Favoritos** — Permite que o usuário salve seus pets favoritos.
- 🔍 **Busca por Categoria** — Filtragem rápida e intuitiva dos pets.
- ☁️ **Integração com Firebase** — Backend utilizando Firestore, Authentication.


---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- [React Navigation](https://reactnavigation.org/)
- Expo Vector Icons (Ionicons, FontAwesome, AntDesign e outros)

---

## 📦 Instalação e Execução do Projeto

### 1️⃣ Clone o repositório

```bash
git clone 
cd seu-repositorio
```

### 2️⃣ Instale as dependências

npm install

### 3️⃣ Configure o Firebase

Crie um projeto no Firebase Console.

Ative os serviços:

Authentication (modo Email/Senha ou outro de sua escolha)

Firestore Database

Storage (opcional, para armazenar imagens dos pets)

Localize o arquivo:
```bash
./src/services/firebase.js
```
O projeto está com o firebaseConfig teste da minha conta do firebase. ( caso quando for atualizar o seu e não consiga fazer o login, continue com o teste que já está no projeto)
Atualize com suas credenciais do Firebase:
```
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```
### 4️⃣ Execute o app

npx expo start

### 🗂️ Estrutura de Pastas

```
├── assets/                # Imagens, animações e ícones
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── navigation/        # Configuração das rotas
│   ├── screens/           # Telas do aplicativo
│   ├── services/          # Configuração do Firebase e API de pets
│   └── hooks/             # Hooks customizados (se aplicável)
├── App.js                 # Arquivo principal
├── package.json           # Dependências e scripts
```

### 🧠 Observações Importantes

Este projeto foi desenvolvido como trabalho acadêmico, MVP ou uso pessoal.
O app pode ser expandido para incluir funcionalidades como notificações, avaliações, integração com agenda do dispositivo, entre outras.










