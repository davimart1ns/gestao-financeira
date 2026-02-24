# Gestão Financeira - Laravel + React

Aplicação web para controle de finanças pessoais desenvolvida com Laravel 12 e React.

## 🚀 Tecnologias

- **Backend:** Laravel 12, MySQL, Laravel Starter Kit React
- **Frontend:** React, TypeScript, Inertia.js, TailwindCSS, shadcn/ui
- **Autenticação:** Laravel Built-in / WorkOS AuthKit
- **Ferramentas:** Vite, ESLint, Prettier

## 📋 Funcionalidades

### Fase 1 - Básico

- [ ] Autenticação de usuários
- [ ] Dashboard com resumo financeiro
- [ ] CRUD de transações (receitas/despesas)
- [ ] Categorias personalizáveis

### Fase 2 - Intermediário

- [ ] Contas bancárias múltiplas
- [ ] Transferências entre contas
- [ ] Relatórios mensais
- [ ] Gráficos interativos

### Fase 3 - Avançado

- [ ] Metas de economia
- [ ] Orçamentos mensais
- [ ] Importação de extratos
- [ ] Backup/exportação de dados

## 🛠️ Como executar

Siga estes passos para configurar o projeto localmente.

### 1. Pré-requisitos

- PHP >= 8.2
- Composer
- Extensão PHP para `sqlite3`

### 2. Passos

1. Clone o repositório: `[https://github.com/davimart1ns/gestao-financeira.git](https://github.com/davimart1ns/gestao-financeira.git)`

2. Instale as dependências: `npm install`
3. Configure o `.env`: `cp .env.example .env`
4. Crie o arquivo do banco: `touch database/database.sqlite`
5. Rode as migrations e seeders: `php artisan migrate`
6. Inicie o servidor: `php artisan serve`
