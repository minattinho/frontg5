# Sistema de Gestão de Cursos

Sistema simples de gestão de cursos desenvolvido como trabalho de faculdade usando React e JSON Server.

## Funcionalidades

- ✅ Sistema de login com autenticação
- ✅ CRUD completo de usuários (5 campos: nome, email, senha, tipo, status)
- ✅ CRUD completo de cursos/serviços (5 campos: nome, descrição, categoria, preço, status)
- ✅ Layout responsivo e agradável
- ✅ Navbar e Footer fixos
- ✅ Navegação SPA com React Router
- ✅ Persistência de dados com JSON Server
- ✅ Tratamento de exceções nas requisições HTTP

## Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o JSON Server (em um terminal)

```bash
npm run server
```

O servidor será iniciado em `http://localhost:3001`

### 3. Iniciar o React (em outro terminal)

```bash
npm run dev
```

A aplicação será iniciada em `http://localhost:5173`

## Usuários para Teste

- **Administrador**: admin@admin.com / 123456
- **Usuário**: joao@email.com / 123456

## Estrutura do Projeto

```
src/
├── components/
│   ├── Login.jsx          # Tela de login
│   ├── Login.css
│   ├── Navbar.jsx         # Navegação principal
│   ├── Navbar.css
│   ├── Footer.jsx         # Rodapé fixo
│   ├── Footer.css
│   ├── Inicio.jsx         # Dashboard inicial
│   ├── Inicio.css
│   ├── Users.jsx          # CRUD de usuários
│   ├── Users.css
│   ├── Cursos.jsx         # CRUD de cursos
│   └── Cursos.css
├── App.jsx                # Configuração de rotas
├── App.css
└── main.jsx
```

## Tecnologias Utilizadas

- **React 19** - Framework JavaScript
- **React Router** - Navegação SPA
- **JSON Server** - API REST simulada
- **CSS Puro** - Estilização responsiva
- **Vite** - Build tool

## Características do Sistema

- **Simples**: Interface limpa e intuitiva
- **Responsivo**: Funciona em desktop e mobile
- **Funcional**: CRUD completo para usuários e cursos
- **Seguro**: Autenticação básica com localStorage
- **Escalável**: Estrutura organizada para futuras expansões

## Endpoints da API

- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Excluir usuário

- `GET /servicos` - Listar cursos
- `POST /servicos` - Criar curso
- `PUT /servicos/:id` - Atualizar curso
- `DELETE /servicos/:id` - Excluir curso

## Desenvolvido por

Estudante de faculdade - Trabalho de desenvolvimento web
