# 🏥 Clínica Saúde Total - Sistema de Agendamentos

Sistema completo de gerenciamento de consultas e agendamentos médicos desenvolvido com Next.js 14, TypeScript e Tailwind CSS 3.

## ✨ Funcionalidades Principais

### 📊 Dashboard
- Visão geral de consultas do dia
- Estatísticas em tempo real
- Fila de atendimento
- Próximas consultas
- Status de profissionais

### 📅 Sistema de Agendamentos
- Wizard de agendamento em múltiplos passos
- Seleção por especialidade
- Escolha de profissional
- Visualização de horários disponíveis
- Gestão completa de consultas

### 📆 Calendário
- Visualizações: Mês, Semana e Dia
- Código de cores por profissional
- Filtros avançados
- Informações detalhadas de cada consulta

### 👥 Gestão de Pacientes
- Cadastro completo de pacientes
- Histórico médico
- Informações de convênio
- Dados de emergência
- Estatísticas de atendimento

### 👨‍⚕️ Profissionais de Saúde
- Perfis detalhados
- Especialidades
- Horários de trabalho
- Valores de consulta
- Convênios aceitos

### 🔔 Central de Notificações
- Notificações em tempo real
- Push notifications do navegador
- Sistema de prioridades
- Histórico de notificações

### 📈 Relatórios e Análises
- Receita total e por especialidade
- Performance de profissionais
- Estatísticas de atendimento
- Exportação de relatórios

### Funcionalidades Avançadas

#### 🎥 Telemedicina
- Consultas virtuais (em desenvolvimento)
- Videochamadas integradas
- Compartilhamento de documentos

#### 💉 Controle de Vacinação
- Carteira de vacinação digital
- Campanhas de vacinação
- Alertas de doses pendentes

#### 🧪 Resultados de Exames
- Portal de exames laboratoriais
- Upload de resultados
- Histórico de exames

#### 📦 Gestão de Estoque
- Controle de materiais médicos
- Alertas de estoque baixo
- Controle de validade

#### 💰 Financeiro
- Controle de receitas
- Contas a receber
- Relatórios financeiros
- Múltiplas formas de pagamento

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3** - Estilização utility-first
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas
- **Zustand** - Gerenciamento de estado
- **React Query** - Gerenciamento de dados assíncronos

## 📦 Instalação

1. Clone o repositório:
\`\`\`bash
git clone <repository-url>
cd appoitment-system
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Estrutura do Projeto

\`\`\`
appoitment-system/
├── app/                          # Páginas e rotas (App Router)
│   ├── appointments/            # Sistema de agendamentos
│   ├── calendar/                # Visualização de calendário
│   ├── patients/                # Gestão de pacientes
│   ├── professionals/           # Profissionais de saúde
│   ├── notifications/           # Central de notificações
│   ├── reports/                 # Relatórios e análises
│   ├── telemedicine/            # Telemedicina
│   ├── vaccination/             # Controle de vacinação
│   ├── lab-results/             # Resultados de exames
│   ├── inventory/               # Gestão de estoque
│   ├── financial/               # Financeiro
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Dashboard
│   └── providers.tsx            # Providers (React Query, etc.)
├── components/                   # Componentes reutilizáveis
│   └── layout/                  # Componentes de layout
│       ├── Sidebar.tsx          # Menu lateral
│       └── TopBar.tsx           # Barra superior
├── lib/                         # Utilitários e helpers
│   └── mockData.ts              # Dados mock brasileiros
├── types/                       # Definições de tipos TypeScript
│   └── index.ts                 # Interfaces principais
├── public/                      # Arquivos estáticos
│   ├── service-worker.js        # Service Worker (PWA)
│   └── manifest.json            # Manifest PWA
└── tailwind.config.ts           # Configuração Tailwind CSS
\`\`\`

## 📱 PWA (Progressive Web App)

O sistema está configurado como PWA, permitindo:

- Instalação no dispositivo
- Funcionamento offline (cache)
- Notificações push
- Experiência nativa no mobile

### Ativando Notificações

As notificações push são solicitadas automaticamente após 3 segundos do primeiro acesso. O Service Worker gerencia:

- Push notifications
- Cache de recursos
- Sincronização em background
- Atualização de dados offline

## 🎨 Tema e Cores

O sistema utiliza uma paleta de cores profissional para área da saúde:

- **Primary**: Azul (#0ea5e9) - Confiança e profissionalismo
- **Success**: Verde (#22c55e) - Confirmações e sucesso
- **Warning**: Amarelo (#f59e0b) - Alertas
- **Danger**: Vermelho (#ef4444) - Erros e urgências

## 📊 Dados Mock

O sistema inclui dados mock realistas brasileiros:

- 100+ pacientes com dados brasileiros (CPF, endereços, telefones)
- 10 profissionais de saúde com diversas especialidades
- 1000+ agendamentos (passados e futuros)
- Convênios médicos brasileiros
- Valores em Reais (R$)

## 🔐 Segurança e Conformidade

O sistema foi projetado considerando:

- LGPD (Lei Geral de Proteção de Dados)
- Controle de acesso por perfil de usuário
- Criptografia de dados sensíveis
- Auditoria de ações
- Consentimento de dados

## 🚧 Próximos Passos

- [ ] Integração com banco de dados real
- [ ] Sistema de autenticação
- [ ] API backend
- [ ] Integração com WhatsApp
- [ ] Integração com gateways de pagamento
- [ ] Módulo de telemedicina completo
- [ ] Prontuário eletrônico
- [ ] Integração com sistemas EMR brasileiros

## 📝 Licença

Este projeto é um exemplo/portfólio e não possui licença específica.

## 👨‍💻 Desenvolvido por

Sistema desenvolvido como exemplo de aplicação completa para gestão de clínicas médicas.

---

**Nota**: Este é um projeto de demonstração com dados fictícios. Para uso em produção, é necessário implementar backend, autenticação, banco de dados e conformidade com regulamentações médicas e de privacidade.
"# appointment-system" 
