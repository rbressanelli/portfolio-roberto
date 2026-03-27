import aboutImage from "../assets/user.jpg";
import homeImage from "../assets/code.avif";
import projectImage from '../assets/projects.jpg'

export const defaultContent = {
  home: {
    greetingTitle: "Olá, seja bem-vindo ao meu portfólio",
    greetingText:
      "Fico feliz pela sua visita. Aqui você encontra um pouco da minha trajetória, das tecnologias com as quais trabalhei e de alguns projetos que representam minha experiência com desenvolvimento web.",
    heroImage:
      homeImage,
  },
  about: {
    title: "Sobre mim",
    text: "Sou desenvolvedor web full stack, com formação em Engenharia Eletrônica e atuação em projetos de front-end e back-end. Ao longo da minha trajetória, trabalhei com aplicações web, APIs, interfaces e integrações, buscando manter um código claro, organizado e alinhado com boas práticas de desenvolvimento.",
    photo:
      aboutImage,
  },
  projectsPage: {
    title: "Projetos",
    text: "Nesta seção estão alguns projetos que ajudam a mostrar a variedade de tecnologias com as quais já trabalhei, além de diferentes contextos de negócio e tipos de solução.",
    image: projectImage ,
  },
  technologies: [
    {
      id: 1,
      name: "React",
      icon: "⚛️",
      url: "https://react.dev/",
    },
    {
      id: 2,
      name: "Next.js",
      icon: "▲",
      url: "https://nextjs.org/",
    },
    {
      id: 3,
      name: "TypeScript",
      icon: "📘",
      url: "https://www.typescriptlang.org/",
    },
    {
      id: 4,
      name: "JavaScript",
      icon: "🟨",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    },
    {
      id: 5,
      name: "Python",
      icon: "🐍",
      url: "https://www.python.org/",
    },
    {
      id: 6,
      name: "Django",
      icon: "🌿",
      url: "https://www.djangoproject.com/",
    },
    {
      id: 7,
      name: "FastAPI",
      icon: "⚡",
      url: "https://fastapi.tiangolo.com/",
    },
    {
      id: 8,
      name: "PostgreSQL",
      icon: "🐘",
      url: "https://www.postgresql.org/",
    },
    {
      id: 9,
      name: "Angular",
      icon: "🅰️",
      url: "https://angular.dev/",
    },
    {
      id: 10,
      name: "React Native",
      icon: "📱",
      url: "https://reactnative.dev/",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Sistema de Gestão de Chamados",
      description:
        "Aplicação para abertura, acompanhamento e atualização de ordens de serviço com foco em produtividade e organização do atendimento.",
      stack: "React, MUI, Django REST Framework",
      link: "https://github.com/",
    },
    {
      id: 2,
      title: "Dashboard Administrativo",
      description:
        "Painel com indicadores, filtros e visualização de informações relevantes para tomada de decisão em ambiente corporativo.",
      stack: "Next.js, Mantine UI, APIs REST",
      link: "https://github.com/",
    },
    {
      id: 3,
      title: "Portal do Cliente",
      description:
        "Interface voltada ao usuário final com consulta de dados, acompanhamento de solicitações e experiência responsiva.",
      stack: "Angular, Material UI, TypeScript",
      link: "https://github.com/",
    },
    {
      id: 4,
      title: "API de Usuários",
      description:
        "API com operações de cadastro, listagem, filtro e paginação, seguindo boas práticas de modelagem e versionamento.",
      stack: "FastAPI, SQLAlchemy, PostgreSQL",
      link: "https://github.com/",
    },
    {
      id: 5,
      title: "App Mobile Operacional",
      description:
        "Aplicativo para uso em campo com foco em agilidade de registro, consulta e atualização de dados.",
      stack: "React Native, Expo, Context API",
      link: "https://github.com/",
    },
    {
      id: 6,
      title: "Módulo de Autenticação",
      description:
        "Implementação de autenticação com regras de acesso, controle de sessão e experiência integrada ao restante do sistema.",
      stack: "React, Node.js, JWT",
      link: "https://github.com/",
    },
    {
      id: 7,
      title: "Sistema de Formulários Dinâmicos",
      description:
        "Construção de formulários baseados em configuração, com validações condicionais e reaproveitamento de componentes.",
      stack: "React, TypeScript, MUI",
      link: "https://github.com/",
    },
    {
      id: 8,
      title: "Integração com Serviços Externos",
      description:
        "Projeto com consumo de APIs de terceiros, tratamento de respostas e organização de fluxos assíncronos.",
      stack: "Python, Flask, Requests",
      link: "https://github.com/",
    },
  ],
};
