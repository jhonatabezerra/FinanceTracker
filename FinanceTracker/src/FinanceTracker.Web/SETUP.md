# Instruções de Configuração

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Navegue até a pasta do projeto:
```bash
cd FinanceTracker/src/FinanceTracker.Web
```

2. Instale as dependências:
```bash
npm install
```

## Configuração da API

Edite o arquivo `src/environments/environment.ts` e configure a URL da sua API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7000' // Ajuste conforme a URL da sua API
};
```

## Executar o Projeto

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

## Endpoints da API Necessários

O frontend espera os seguintes endpoints no backend:

### Autenticação
- `POST /auth/login` - Login do usuário
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string, user: User }`

### Transações
- `GET /transaction` - Listar todas as transações
- `GET /transaction/{id}` - Obter transação por ID
- `POST /transaction` - Criar nova transação
- `PUT /transaction/{id}` - Atualizar transação
- `DELETE /transaction/{id}` - Excluir transação
- `GET /transaction/range?startDate={date}&endDate={date}` - Transações por período

### Categorias
- `GET /category` - Listar todas as categorias
- `GET /category/{id}` - Obter categoria por ID
- `POST /category` - Criar nova categoria
- `PUT /category/{id}` - Atualizar categoria
- `DELETE /category/{id}` - Excluir categoria

### Usuários (apenas Admin)
- `GET /user` - Listar todos os usuários
- `GET /user/{id}` - Obter usuário por ID
- `PUT /user/{id}/role` - Atualizar perfil do usuário
  - Body: `{ role: number }`
- `DELETE /user/{id}` - Excluir usuário

## Notas Importantes

1. O backend deve retornar tokens JWT no formato esperado pelo interceptor de autenticação
2. Todos os endpoints (exceto login) devem estar protegidos por autenticação
3. O endpoint de gerenciamento de usuários deve verificar se o usuário é administrador
4. As datas devem ser enviadas no formato ISO (YYYY-MM-DD)

