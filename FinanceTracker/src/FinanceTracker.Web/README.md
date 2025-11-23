# Finance Tracker - Frontend

Frontend Angular 20 para o sistema de gerenciamento financeiro.

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL da API no arquivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7000' // Ajuste conforme necessário
};
```

3. Execute o projeto:
```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

## Estrutura do Projeto

- `src/app/pages/` - Páginas principais (Login, Dashboard, Transações, Relatórios, Gerenciamento de Usuários)
- `src/app/core/` - Serviços, guards e interceptors
- `src/app/models/` - Modelos de dados
- `src/environments/` - Configurações de ambiente

## Funcionalidades

- **Login**: Autenticação de usuários
- **Dashboard**: Página principal com acesso aos serviços
- **Transações**: Adicionar e gerenciar gastos/ganhos
- **Relatórios**: Visualização de gráficos e análises
- **Gerenciamento de Usuários**: Configuração de acesso (apenas para administradores)

## Tecnologias

- Angular 20
- Chart.js / ng2-charts para gráficos
- RxJS para programação reativa
- TypeScript

