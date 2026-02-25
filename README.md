💰 Gestão Financeira Pessoal

Aplicação completa para controle de finanças pessoais desenvolvida com Laravel 12 e React.
Este projeto foi criado para ajudar usuários a gerenciar suas finanças de forma simples e intuitiva,
com visualização clara de receitas, despesas e saldo.

🎯 Objetivo
Oferecer uma ferramenta prática para o dia a dia financeiro, com interface amigável e dados em tempo real.

🚀 Principais funcionalidades

- Cadastro e gerenciamento de contas (bancos, carteiras, etc.)
- Registro de transações (receitas/despesas)
- Categorização de gastos
- Dashboard com gráficos e resumos
- Relatórios mensais
- Histórico completo de movimentações

🛠️ Stack utilizada

- Backend: Laravel 12 (PHP 8.2)
- Frontend: React 19 + TypeScript
- Roteamento e comunicação: Inertia.js
- Estilização: TailwindCSS + shadcn/ui
- Banco de dados: MySQL (ou SQLite em desenvolvimento)
- Autenticação: Laravel Breeze com React

📊 Estrutura do banco de dados

- users: informações dos usuários
- accounts: contas bancárias/carteiras
- categories: categorias de transações
- transactions: receitas e despesas

📈 Próximos passos

- [ ] Gráficos interativos
- [ ] Metas de economia
- [ ] Orçamentos mensais
- [ ] Importação de extratos bancários
- [ ] Backup e exportação de dados

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

