# G5 Educação - Plataforma de Cursos Online

## sobre o projeto

esse é um projeto de uma plataforma de cursos online chamada G5 Educação. é tipo um netflix de cursos, sabe? tem admin que gerencia tudo e usuários que fazem os cursos.

## como funciona

- **admin**: pode ver estatísticas, gerenciar usuários e cursos
- **usuário normal**: só pode ver os cursos e usar o fórum pra fazer perguntas

## estrutura dos arquivos

### componentes principais

- `App.jsx` - componente principal, controla as rotas e autenticação
- `Login.jsx` - tela de login onde todo mundo entra
- `Navbar.jsx` - menu de navegação que fica no topo
- `Cursos.jsx` - página onde os admin gerenciam cursos e usuários veem eles
- `Users.jsx` - página só pra admin gerenciar usuários
- `Forum.jsx` - fórum onde usuários fazem perguntas
- `Inicio.jsx` - dashboard do admin com estatísticas
- `Footer.jsx` - rodapé com créditos

### dados

- `db.json` - banco de dados fake com usuários, cursos e perguntas
- `package.json` - configurações do projeto e dependências

## como rodar

### instalar dependências

```bash
npm install
```

### rodar o servidor fake (banco de dados)

```bash
npm run server
```

### rodar a aplicação

```bash
npm run dev
```

## usuários de teste

- **admin**: admin@admin.com / admin123
- **usuário**: Gabriel@email.com / gabriel123

## tecnologias usadas

- React 19
- React Router (pra navegação)
- Vite (pra build)
- JSON Server (banco fake)
- CSS puro (sem framework)

## funcionalidades

- ✅ login/logout
- ✅ proteção de rotas
- ✅ gerenciamento de usuários (admin)
- ✅ gerenciamento de cursos (admin)
- ✅ visualização de cursos (usuários)
- ✅ fórum de perguntas (usuários)
- ✅ dashboard com estatísticas (admin)

## observações

- o banco é fake, então os dados não ficam salvos quando reinicia
- não tem validação muito robusta, é mais pra demonstração
- o design é simples mas funcional
- tudo comentado com linguagem informal pra facilitar o entendimento
