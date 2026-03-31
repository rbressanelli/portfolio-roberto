# [Portfólio](https://rbressanelli.github.io/portfolio-roberto/)

Trata-se de um portfólio onde mostro minhas habilidades, projetos e trajetória profissional. O projeto é dinâmico, permitindo a edição de todo o conteúdo através de um painel administrativo integrado ao Supabase.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário.
- **TypeScript** - Tipagem estática para maior segurança no desenvolvimento.
- **Vite** - Build tool ultrarrápido.
- **Material UI (MUI)** - Biblioteca de componentes de interface.
- **Supabase** - Backend-as-a-Service para banco de dados (PostgreSQL), autenticação e storage.
- **React Router** - Gerenciamento de rotas.
- **GitHub Pages** - Hospedagem da aplicação.

## 🛠️ Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rbressanelli/portfolio-roberto.git
   cd portfolio-roberto
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as suas credenciais do Supabase (use o `.env.example` como base):
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## ⚙️ Configurações Necessárias

Para que o sistema funcione corretamente com o seu próprio backend, você precisa realizar as seguintes configurações:

### 1. Supabase (Banco de Dados e Storage)
- Crie uma tabela chamada `portfolio_data` com as colunas:
  - `id`: int8 (Primary Key)
  - `content`: jsonb
- Insira uma linha inicial com `id: 1` e o conteúdo JSON padrão (encontrado em `src/data/defaultContent.ts`).
- Crie um bucket de Storage chamado `portfolio` e configure as políticas de acesso (RLS) para permitir leitura pública e escrita apenas para usuários autenticados.

### 2. E-mail Administrativo
O acesso ao painel `/admin` é restrito por e-mail via Magic Link. 
- Abra o arquivo `src/pages/AdminPage.tsx`.
- Localize e altere o e-mail `rbressanelli@gmail.com` para o seu e-mail cadastrado no Supabase Auth.

---
Desenvolvido por [Roberto Bressanelli](https://github.com/rbressanelli).