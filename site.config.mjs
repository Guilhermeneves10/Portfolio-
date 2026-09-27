// TODO antes da publicação: informar a URL final, incluindo eventual subdiretório.
export const site = {
  url: '',
  name: 'Guilherme Neves',
  github: 'https://github.com/Guilhermeneves10',
  linkedin: 'https://www.linkedin.com/in/guilherme-neves-067065380/',
  email: '',
  // TODO: adicionar o PDF real antes de preencher este caminho.
  resume: '',
};

// Conteúdo aprovado no PRD. URLs ausentes não produzem botões.
export const projects = [
  {
    name: 'Bichinho Feliz', slug: 'bichinho-feliz',
    category: ['Pet shop', 'Pet shop'],
    description: ['Site institucional e catálogo de produtos e serviços para pet shop.', 'A business website and a catalogue of pet shop products and services.'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://bichinho-feliz.vercel.app/',
    github: 'https://github.com/Guilhermeneves10/Site-de-pet-shop',
    image: 'assets/images/bichinho-feliz-1200.jpg', imageSmall: 'assets/images/bichinho-feliz-600.jpg',
    alt: ['Página inicial do Bichinho Feliz, com produtos e agendamento de serviços para pets.', 'Bichinho Feliz homepage, with pet products and service booking.'],
  },
  {
    name: 'Seven Wealth', slug: 'seven-wealth',
    category: ['Finanças pessoais', 'Personal finance'],
    description: ['Planejamento financeiro, metas, aportes e evolução patrimonial em uma experiência digital.', 'Financial planning, goals, contributions and wealth tracking in a digital experience.'],
    technologies: ['HTML', 'CSS', 'JavaScript'], demo: 'https://seven-wealth.vercel.app/', github: '', image: '', imageSmall: '',
    alt: ['Tela inicial do Seven Wealth, projeto de planejamento financeiro e acompanhamento patrimonial.', 'Seven Wealth opening screen, a financial planning and wealth tracking project.'],
  },
  {
    name: 'Seven Menu — Forno & Brasa', slug: 'seven-menu', cover: 'forno-e-brasa',
    category: ['Cardápio digital', 'Digital menu'],
    description: ['Experiência de cardápio digital para restaurantes, com a pizzaria Forno & Brasa como demonstração.', 'A digital menu experience for restaurants, featuring the Forno & Brasa pizzeria demo.'],
    technologies: ['Next.js', 'React', 'CSS'], demo: 'https://seven-menu.vercel.app/', github: '',
    image: 'assets/images/seven-menu-1200.jpg', imageSmall: 'assets/images/seven-menu-600.jpg',
    alt: ['Página inicial do Seven Menu com apresentação do cardápio digital e demonstração da pizzaria Forno & Brasa.', 'Seven Menu homepage introducing its digital menu and the Forno & Brasa pizzeria demo.'],
  },
  {
    name: 'Seven Store', slug: 'seven-store',
    category: ['E-commerce', 'E-commerce'],
    description: ['Loja conceitual de streetwear com catálogo, produtos e identidade premium.', 'A concept streetwear store with a product catalogue and a premium visual identity.'],
    technologies: ['HTML', 'CSS', 'JavaScript'], demo: '', github: '', image: '', imageSmall: '',
    alt: ['Tela inicial da Seven Store, loja conceitual de streetwear.', 'Seven Store opening screen, a concept streetwear store.'],
  },
];

export const otherProjects = [
  { name: ['Lista de Tarefas', 'Task List'], description: ['Organização e interatividade com JavaScript.', 'Organisation and interaction with JavaScript.'], url: 'https://github.com/Guilhermeneves10/Lista-de-tarefas' },
  { name: ['Página de Filmes com API', 'Movie Page with API'], description: ['Consumo de API e conteúdo dinâmico.', 'API integration and dynamic content.'], url: 'https://github.com/Guilhermeneves10/pagina-de-filmes-com-API' },
  { name: ['Netflix Copy', 'Netflix Copy'], description: ['Estudo de interface de streaming.', 'A study of streaming interface design.'], url: 'https://github.com/Guilhermeneves10/Netflixcopy' },
];
