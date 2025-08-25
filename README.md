# 🐾 Pet Pamper - Sistema de Agendamento para Pet Shop

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-2.56.0-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

## 📝 Descrição

Pet Pamper é uma aplicação web moderna e completa para agendamento de serviços em pet shops. O sistema oferece uma experiência intuitiva para proprietários de pets agendarem serviços como banho, tosa, spa e cuidados especializados para seus animais de estimação.

### ✨ Principais Características

- 🔐 **Autenticação Segura** - Sistema completo de login/cadastro com Supabase Auth
- 📅 **Agendamento Inteligente** - Interface intuitiva para reservar serviços
- 👤 **Dashboard Personalizado** - Painel exclusivo para cada usuário
- 📱 **Design Responsivo** - Otimizado para desktop, tablet e mobile
- 🎨 **UI Moderna** - Interface elegante com sistema de design consistente
- 🔄 **Tempo Real** - Atualizações instantâneas de reservas
- 📧 **Notificações** - Confirmações automáticas por email
- 🌙 **Tema Escuro** - Suporte completo a dark/light mode

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para construção de interfaces
- **TypeScript 5.8.3** - Tipagem estática para JavaScript
- **Vite 5.4.19** - Build tool moderna e rápida
- **React Router Dom 6.30.1** - Roteamento SPA

### UI/UX
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **shadcn/ui** - Componentes React reutilizáveis
- **Radix UI** - Primitivos acessíveis para UI
- **Lucide React 0.462.0** - Ícones modernos
- **Next Themes 0.3.0** - Gerenciamento de temas

### Backend & Database
- **Supabase 2.56.0** - Backend-as-a-Service
  - Autenticação
  - Banco de dados PostgreSQL
  - Row Level Security (RLS)
  - Edge Functions
  - Storage

### Formulários & Validação
- **React Hook Form 7.61.1** - Gerenciamento de formulários
- **Zod 3.25.76** - Validação de schemas
- **@hookform/resolvers 3.10.0** - Integração Zod + RHF

### Estado & Queries
- **TanStack Query 5.83.0** - Gerenciamento de estado servidor

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── Hero.tsx         # Seção hero da landing page
│   ├── Services.tsx     # Exibição dos serviços
│   ├── About.tsx        # Seção sobre nós
│   ├── Footer.tsx       # Rodapé
│   ├── BookingForm.tsx  # Formulário de agendamento
│   ├── UserBookings.tsx # Lista de reservas do usuário
│   └── PrivateRoute.tsx # Proteção de rotas
├── contexts/            # Contexts do React
│   └── AuthContext.tsx  # Contexto de autenticação
├── hooks/               # Custom hooks
│   ├── use-mobile.tsx   # Hook para detectar mobile
│   └── use-toast.ts     # Hook para toasts
├── integrations/        # Integrações externas
│   └── supabase/        # Configuração Supabase
├── lib/                 # Utilitários
│   └── utils.ts         # Funções auxiliares
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Landing page
│   ├── Auth.tsx         # Login/Cadastro
│   ├── Dashboard.tsx    # Dashboard do usuário
│   └── NotFound.tsx     # Página 404
└── assets/              # Recursos estáticos
    ├── hero-pets.jpg    # Imagem hero
    └── services-illustration.jpg
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório

```bash
git clone <YOUR_GIT_URL>
cd pet-pamper
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas do banco de dados (veja seção [Schema](#-schema-do-banco-de-dados))
3. Ative a autenticação por email
4. Configure as variáveis de ambiente:

```bash
# .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Execute o projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

A aplicação estará disponível em `http://localhost:5173`

## 🔐 Funcionalidades Detalhadas

### Landing Page
- **Hero Section** - Apresentação do serviço com call-to-action
- **Serviços** - Lista completa de serviços oferecidos
- **Sobre Nós** - Informações sobre a empresa
- **Contato** - Informações de contato e localização

### Sistema de Autenticação
- Cadastro de novos usuários
- Login com email e senha
- Confirmação por email
- Logout seguro
- Proteção de rotas privadas

### Dashboard do Usuário
- **Agendamento** - Formulário para nova reserva
- **Minhas Reservas** - Visualização de agendamentos
- **Histórico** - Reservas passadas e canceladas
- **Perfil** - Informações do usuário

### Serviços Disponíveis
- 🛁 **Banho Básico** - R$ 30,00 (30 min)
- ✨ **Banho Premium** - R$ 50,00 (45 min) 
- ✂️ **Tosa Simples** - R$ 40,00 (60 min)
- 💅 **Tosa + Banho** - R$ 70,00 (90 min)
- 🧴 **Spa Completo** - R$ 100,00 (120 min)
- 🏥 **Consulta Veterinária** - R$ 80,00 (30 min)

## 🗃️ Schema do Banco de Dados

### Tabela `profiles`
```sql
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  display_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabela `bookings`
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  service_name TEXT NOT NULL,
  pet_name TEXT NOT NULL,
  pet_breed TEXT,
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)
- Usuários só podem ver/editar seus próprios dados
- Políticas de segurança configuradas para todas as tabelas
- Autenticação obrigatória para operações

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Build para desenvolvimento
npm run build:dev

# Lint do código
npm run lint

# Preview da build de produção
npm run preview
```

## 🚀 Deploy

### Deploy no Lovable

1. Conecte seu repositório GitHub ao Lovable
2. Clique em "Publish" no editor Lovable
3. Sua aplicação será automaticamente deployada

### Deploy Manual

1. Execute o build:
```bash
npm run build
```

2. Faça deploy da pasta `dist` para seu provedor preferido:
- Vercel
- Netlify
- Supabase Hosting
- AWS S3 + CloudFront

### Variáveis de Ambiente em Produção

Configure as seguintes variáveis no seu provedor de hosting:

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🎨 Sistema de Design

### Cores Principais
- **Primary**: HSL(330, 85%, 60%) - Rosa vibrante
- **Secondary**: HSL(340, 40%, 92%) - Rosa suave
- **Accent**: HSL(345, 75%, 85%) - Rosa claro
- **Background**: HSL(333, 20%, 97%) - Branco rosado

### Tipografia
- **Fonte**: Inter (sistema-ui como fallback)
- **Heading**: Pesos bold para títulos
- **Body**: Peso regular para texto

### Componentes
- Design system consistente
- Tokens semânticos para cores
- Suporte completo a dark mode
- Animações suaves e elegantes

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript em todos os arquivos
- Siga as convenções do ESLint configurado
- Componentes devem ser funcionais com hooks
- Use o sistema de design para estilos
- Testes são bem-vindos

## 📞 Suporte e Contato

- **Website**: [Pet Pamper](https://your-domain.com)
- **Email**: contato@petpamper.com
- **Telefone**: (11) 99999-9999
- **GitHub**: [Repositório do Projeto](https://github.com/your-username/pet-pamper)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Feito com ❤️ para nossos amigos de quatro patas 🐾</p>
  <p><strong>Pet Pamper - Onde seu pet é tratado como realeza!</strong></p>
</div>