# API Marketplace - AV2 Desenvolvimento de Sistemas Web

## 📋 Descrição
API REST completa para marketplace usando Node.js, Express, Prisma e MySQL com relacionamentos entre User, Store e Product.

## 🚀 Tecnologias
- **Node.js** + **Express**: Servidor e rotas REST
- **Prisma ORM**: Modelagem e acesso ao banco de dados
- **MySQL**: Banco de dados relacional
- **CORS**: Habilitação de requisições cross-origin

## 📊 Estrutura do Banco
```
User (1) ←→ (1) Store (1) ←→ (N) Product
```

### Modelos:
- **User**: `id`, `name`, `email`, `createdAt`, `updatedAt`
- **Store**: `id`, `name`, `userId`, `createdAt`, `updatedAt`
- **Product**: `id`, `name`, `price`, `storeId`, `createdAt`, `updatedAt`

## 🔧 Instalação e Configuração

### 1. Instalar dependências:
```bash
npm install
```

### 2. Configurar banco de dados:
Edite o arquivo `.env` com sua URL do MySQL:
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

### 3. Gerar Prisma Client e sincronizar banco:
```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Executar o servidor:
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### 👤 Users
- **POST** `/users` - Criar usuário
- **GET** `/users` - Listar todos usuários (com lojas e produtos)
- **GET** `/users/:id` - Buscar usuário por ID (com loja e produtos)
- **PUT** `/users/:id` - Atualizar usuário
- **DELETE** `/users/:id` - Deletar usuário

### 🏪 Stores
- **POST** `/stores` - Criar loja
- **GET** `/stores` - Listar todas lojas (com dono e produtos)
- **GET** `/stores/:id` - Buscar loja por ID (com dono e produtos)
- **PUT** `/stores/:id` - Atualizar loja
- **DELETE** `/stores/:id` - Deletar loja

### 📦 Products
- **POST** `/products` - Criar produto
- **GET** `/products` - Listar todos produtos (com loja e dono)
- **GET** `/products/:id` - Buscar produto por ID (com loja e dono)
- **PUT** `/products/:id` - Atualizar produto
- **DELETE** `/products/:id` - Deletar produto

## 🧪 Exemplos de Requisições

### Criar Usuário:
```json
POST /users
{
  "name": "João Silva",
  "email": "joao@email.com"
}
```

### Criar Loja:
```json
POST /stores
{
  "name": "Loja do João",
  "userId": 1
}
```

### Criar Produto:
```json
POST /products
{
  "name": "Smartphone",
  "price": 1200.50,
  "storeId": 1
}
```

### Resposta Padrão de Sucesso:
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { /* dados do objeto */ }
}
```

### Resposta Padrão de Erro:
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

## ⚡ Scripts Disponíveis
- `npm run dev` - Executa o servidor em modo desenvolvimento (nodemon)
- `npm start` - Executa o servidor em modo produção
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:push` - Sincroniza o schema com o banco

## 🔍 Testando a API
Use **Insomnia**, **Postman** ou qualquer cliente REST para testar os endpoints.

Exemplo de fluxo completo:
1. **POST** `/users` → Criar usuário
2. **POST** `/stores` → Criar loja vinculada ao usuário
3. **POST** `/products` → Criar produtos na loja
4. **GET** `/products` → Listar produtos com relacionamentos

## 📝 Regras de Negócio
- ✅ E-mail único por usuário
- ✅ Um usuário pode ter apenas uma loja
- ✅ Produtos devem estar vinculados a uma loja existente
- ✅ Relacionamentos automáticos via Prisma
- ✅ Validações de entrada obrigatórias
