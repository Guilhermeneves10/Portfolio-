import { mkdir, writeFile, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { site, projects, otherProjects } from '../site.config.mjs';

const root = resolve(import.meta.dirname, '..');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const star = '<svg class="star" viewBox="0 0 90 90" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m45 2 5 30 25-18-18 25 31 6-31 5 18 25-25-18-5 31-6-31-25 18 18-25L2 45l30-6-18-25 25 18Z"/></svg>';
const external = (url, label, cls = '') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
const words = [
  {
    lang: 'pt-BR', title: 'Guilherme Neves | Desenvolvedor Front-end',
    description: 'Portfólio de Guilherme Neves, estudante de ADS e desenvolvedor front-end, com projetos em HTML, CSS, JavaScript e desenvolvimento web.',
    nav: ['Início', 'Sobre', 'Projetos', 'Habilidades', 'Contato'], skip: 'Pular para o conteúdo', menu: 'Abrir menu', close: 'Fechar menu', navigation: 'Navegação principal', language: 'Selecionar idioma', theme: 'Tema escuro',
    portfolio: 'PORTFÓLIO', edition: 'DESIGN + CÓDIGO + PROPÓSITO', hello: 'Olá, eu sou', role: 'Desenvolvedor Front-end',
    pitch: 'Transformando ideias em interfaces que conectam pessoas e soluções.', projects: 'Ver projetos', talk: 'Falar comigo', available: 'Disponível para oportunidades',
    photo: 'Fotografia em breve', portraitAlt: 'Placeholder para fotografia de Guilherme Neves, com monograma GN.', note: 'Sempre em construção. Sempre evoluindo.', scroll: 'Role para conhecer',
    aboutLabel: '01 / UM POUCO SOBRE MIM', about: 'QUEM É<br>GUILHERME?',
    aboutText: 'Sou estudante de Análise e Desenvolvimento de Sistemas e apaixonado por tecnologia. Crio experiências digitais que unem design, funcionalidade e propósito.',
    aboutMore: 'Estou em constante evolução, transformando cada projeto em aprendizado e cada desafio em uma oportunidade de crescimento.',
    photoCaption: 'Muito prazer, Guilherme.', facts: [
      ['Formação', 'Análise e Desenvolvimento de Sistemas', 'Em andamento'],
      ['Experiência', 'Aprendizado que vira prática', 'Projetos pessoais e acadêmicos com foco em desenvolvimento web.'],
      ['Objetivo', 'O próximo passo é em equipe', 'Conquistar uma oportunidade em front-end e crescer como desenvolvedor.'],
    ],
    skillsLabel: '02 / MINHA CAIXA DE FERRAMENTAS', skills: 'IDEIAS BOAS.<br>FERRAMENTAS CERTAS.', skillsText: 'Tecnologias que fazem parte da minha jornada de aprendizado e criação.',
    selectedLabel: '03 / DO CONCEITO À INTERFACE', selected: 'PROJETOS<br>SELECIONADOS', selectedText: 'Uma seleção de ideias transformadas em experiências digitais.', projectNote: 'Feitos para fazer a diferença.',
    screenshot: 'Captura de tela em breve', screenshotAlt: 'Placeholder de captura de tela do projeto', demo: 'Ver site', code: 'GitHub', others: 'OUTROS PROJETOS', othersText: 'Experimentos, estudos e mais um pouco de código.',
    contactLabel: '04 / O PRÓXIMO PROJETO', contact: 'VAMOS CRIAR<br>ALGO <em>JUNTOS?</em>', contactText: 'Uma ideia, um projeto ou uma oportunidade? Vamos conversar sobre o que podemos construir.', contactNote: 'Boas conversas viram boas ideias.', githubText: 'Código, projetos e aprendizado', linkedinText: 'Conexões e oportunidades', email: 'E-mail', resume: 'Baixar currículo', whatsapp: 'Conversar pelo WhatsApp',
    footer: 'Feito com intenção. E um pouco de código.', top: 'Voltar ao topo', tech: 'HTML, CSS e JavaScript',
  },
  {
    lang: 'en', title: 'Guilherme Neves | Front-end Developer',
    description: 'Portfolio of Guilherme Neves, an Information Systems Development student and front-end developer building responsive web experiences.',
    nav: ['Home', 'About', 'Projects', 'Skills', 'Contact'], skip: 'Skip to content', menu: 'Open menu', close: 'Close menu', navigation: 'Main navigation', language: 'Select language', theme: 'Dark theme',
    portfolio: 'PORTFOLIO', edition: 'DESIGN + CODE + PURPOSE', hello: "Hello, I’m", role: 'Front-end Developer', pitch: 'Turning ideas into interfaces that connect people and solutions.', projects: 'View projects', talk: 'Let’s talk', available: 'Available for opportunities',
    photo: 'Photograph coming soon', portraitAlt: 'Placeholder for a photograph of Guilherme Neves, with the GN monogram.', note: 'Always building. Always growing.', scroll: 'Scroll to explore',
    aboutLabel: '01 / A LITTLE ABOUT ME', about: 'WHO IS<br>GUILHERME?', aboutText: 'I’m an Information Systems Development student with a passion for technology. I create digital experiences that bring together design, functionality and purpose.', aboutMore: 'I’m constantly learning, turning every project into a lesson and every challenge into an opportunity to grow.', photoCaption: 'Nice to meet you. Guilherme.',
    facts: [['Education', 'Information Systems Development', 'In progress'], ['Experience', 'Learning through building', 'Personal and academic projects focused on web development.'], ['Goal', 'Taking the next step together', 'Finding a front-end opportunity and growing as a developer.']],
    skillsLabel: '02 / MY TOOLBOX', skills: 'GOOD IDEAS.<br>THE RIGHT TOOLS.', skillsText: 'Technologies that are part of my journey of learning and creating.', selectedLabel: '03 / FROM CONCEPT TO INTERFACE', selected: 'SELECTED<br>PROJECTS', selectedText: 'A selection of ideas turned into digital experiences.', projectNote: 'Made to make a difference.', screenshot: 'Screenshot coming soon', screenshotAlt: 'Screenshot placeholder for', demo: 'Live site', code: 'GitHub', others: 'OTHER PROJECTS', othersText: 'Experiments, studies and a little more code.',
    contactLabel: '04 / THE NEXT PROJECT', contact: 'LET’S CREATE<br>SOMETHING <em>TOGETHER.</em>', contactText: 'An idea, a project or an opportunity? Let’s talk about what we can build.', contactNote: 'Great conversations spark great ideas.', githubText: 'Code, projects and learning', linkedinText: 'Connections and opportunities', email: 'Email', resume: 'Download résumé', whatsapp: 'Chat on WhatsApp', footer: 'Made with intention. And a little code.', top: 'Back to top', tech: 'HTML, CSS and JavaScript',
  },
];

// Domain is never guessed. Relative metadata is a draft until site.url is configured.
const configuredUrl = process.env.PORTFOLIO_SITE_URL || site.url;
if (configuredUrl) {
  const url = new URL(configuredUrl);
  const isLocalTest = process.env.PORTFOLIO_SITE_URL && ['127.0.0.1', 'localhost'].includes(url.hostname);
  if (url.protocol !== 'https:' && !isLocalTest) throw new Error('site.url must be an HTTPS URL.');
}
const base = configuredUrl ? configuredUrl.replace(/\/$/, '') + '/' : '';
const absolute = path => base ? new URL(path, base).href : path || './';
if (site.resume) {
  if (!site.resume.toLowerCase().endsWith('.pdf')) throw new Error('The résumé must be a PDF.');
  await access(resolve(root, site.resume));
}
for (const [i, t] of words.entries()) {
  const prefix = i ? '../' : './';
  const pagePath = i ? 'en/' : '';
  const canonical = base ? absolute(pagePath) : './';
  const pt = base ? absolute('') : prefix;
  const en = base ? absolute('en/') : i ? './' : './en/';
  const ids = ['inicio', 'sobre', 'projetos', 'skills', 'contato'];
  const cards = projects.map((p, index) => {
    const cover = `assets/images/projects/${p.cover || p.slug}.webp`;
    const captured = existsSync(resolve(root, cover));
    const image = captured ? cover : p.image || 'assets/images/project-placeholder.svg';
    const imageSmall = captured ? cover.replace('.webp', '-720.webp') : p.imageSmall;
    const hasImage = captured || Boolean(p.image);
    const width = captured ? 1440 : 1200;
    const height = captured ? 900 : 750;
    const alt = hasImage ? p.alt[i] : `${t.screenshotAlt} ${p.name}.`;
    const responsive = imageSmall && existsSync(resolve(root, imageSmall)) ? ` srcset="${prefix}${esc(imageSmall)} ${captured ? 720 : 600}w, ${prefix}${esc(image)} ${width}w" sizes="(min-width: 768px) 45vw, 90vw"` : '';
    return `<article class="project-card" aria-labelledby="project-${index}">
      <figure class="project-image"><img src="${prefix}${esc(image)}"${responsive} alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async"><span class="project-number" aria-hidden="true">0${index + 1}</span>${!hasImage ? `<figcaption>${t.screenshot}</figcaption>` : ''}</figure>
      <div class="project-heading"><h3 id="project-${index}">${esc(p.name)}</h3><span class="category">${esc(p.category[i])}</span></div>
      <p>${esc(p.description[i])}</p><ul class="tags" aria-label="${t.tech}">${p.technologies.map(tech => `<li>${esc(tech)}</li>`).join('')}</ul>
      ${p.demo || p.github ? `<div class="project-links">${p.demo ? external(p.demo, `<span>${t.demo}<span class="sr-only"> — ${esc(p.name)}</span></span>`) : ''}${p.github ? external(p.github, `<span>${t.code}<span class="sr-only"> — ${esc(p.name)}</span></span>`) : ''}</div>` : ''}
    </article>`;
  }).join('\n');
  const schema = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, ...(base ? { url: absolute(pagePath) } : {}), sameAs: [site.github, site.linkedin] };
  const html = `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${t.title}</title>
  <meta name="description" content="${t.description}">
  <meta name="theme-color" content="#F3EEE4">
  ${!base ? '<!-- TODO: configure site.url and run npm run build before publishing. -->\n  <meta name="robots" content="noindex, follow">' : ''}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="pt-BR" href="${pt}">
  <link rel="alternate" hreflang="en" href="${en}">
  <link rel="alternate" hreflang="x-default" href="${pt}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${i ? 'en_US' : 'pt_BR'}">
  <meta property="og:locale:alternate" content="${i ? 'pt_BR' : 'en_US'}">
  <meta property="og:site_name" content="Guilherme Neves">
  <meta property="og:title" content="${t.title}">
  <meta property="og:description" content="${t.description}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${t.title}">
  <meta name="twitter:description" content="${t.description}">
  <link rel="icon" type="image/svg+xml" href="${prefix}assets/icons/favicon.svg">
  <link rel="preload" href="${prefix}assets/fonts/anton-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
  <script>document.documentElement.classList.add('js');window.addEventListener('error',()=>document.documentElement.classList.remove('js'),true);try{const t=localStorage.getItem('gn-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch{}</script>
  <script src="${prefix}assets/js/config.js" defer></script>
  <script src="${prefix}assets/js/script.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head>
<body>
  <a class="skip-link" href="#main">${t.skip}</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="GN — Guilherme Neves — ${t.nav[0]}">GN<span aria-hidden="true">.</span></a>
      <nav id="navigation" class="navigation" aria-label="${t.navigation}">${ids.map((id, index) => `<a href="#${id}"${index === 0 ? ' aria-current="location"' : ''}>${t.nav[index]}</a>`).join('')}</nav>
      <div class="header-controls">
        <div class="languages" role="group" aria-label="${t.language}"><a href="${prefix}" lang="pt-BR" hreflang="pt-BR" aria-label="PT — Português${!i ? ' — idioma ativo' : ''}"${!i ? ' aria-current="page"' : ' data-language-link'}>PT</a><span aria-hidden="true">/</span><a href="${i ? './' : './en/'}" lang="en" hreflang="en" aria-label="EN — English${i ? ' — current language' : ''}"${i ? ' aria-current="page"' : ' data-language-link'}>EN</a></div>
        <button class="theme-toggle icon-button" type="button" aria-label="${t.theme}" aria-pressed="false" hidden><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/></svg></button>
        <button class="menu-toggle icon-button" type="button" aria-controls="navigation" aria-expanded="false" aria-label="${t.menu}" data-open-label="${t.menu}" data-close-label="${t.close}" hidden><span></span><span></span></button>
      </div>
    </div>
  </header>
  <main id="main" tabindex="-1">
    <section class="hero container" id="inicio" aria-labelledby="hero-heading">
      <div class="hero-topline"><span>${t.edition}</span><span>GUILHERME NEVES © <span data-year>2026</span></span></div>
      <div class="hero-stage">
        <div class="hero-display" aria-hidden="true">${t.portfolio}</div>
        <div class="hero-portrait"><span class="brush" aria-hidden="true"></span><figure class="portrait"><img src="${prefix}assets/images/portrait-placeholder.svg" width="600" height="720" alt="${t.portraitAlt}" fetchpriority="high" decoding="async"><figcaption>${t.photo}</figcaption></figure><span class="handwritten hero-note">${t.note}</span></div>
        ${star}
      </div>
      <div class="hero-bottom"><div class="hero-intro"><p class="hello">${t.hello}</p><h1 id="hero-heading">Guilherme Neves<span>${t.role}</span></h1></div><div class="hero-message"><p>${t.pitch}</p><div class="actions"><a class="button primary" href="#projetos">${t.projects}${arrow}</a><a class="button secondary" href="#contato">${t.talk}${arrow}</a></div></div></div>
      <div class="hero-foot"><span class="availability" data-availability><span aria-hidden="true"></span>${t.available}</span><a class="scroll-link" href="#sobre">${t.scroll}<span aria-hidden="true">↓</span></a></div>
    </section>
    <section class="about dark-section" id="sobre" aria-labelledby="about-heading">
      <div class="container about-grid"><div class="about-copy"><p class="eyebrow">${t.aboutLabel}</p><h2 id="about-heading">${t.about}</h2><p class="body-large">${t.aboutText}</p><p>${t.aboutMore}</p></div>
        <figure class="polaroid"><span class="tape" aria-hidden="true"></span><img src="${prefix}assets/images/portrait-placeholder.svg" width="600" height="720" loading="lazy" decoding="async" alt="${t.portraitAlt}"><figcaption><span class="handwritten">${t.photoCaption}</span><small>${t.photo}</small></figcaption></figure>
        <div class="facts">${t.facts.map((f, index) => `<article><span class="fact-index" aria-hidden="true">0${index + 1}</span><div><p class="eyebrow">${f[0]}</p><h3>${f[1]}</h3><p>${f[2]}</p></div></article>`).join('')}</div>
      </div>
    </section>
    <section class="skills section container" id="skills" aria-labelledby="skills-heading"><div class="section-heading"><div><p class="eyebrow">${t.skillsLabel}</p><h2 id="skills-heading">${t.skills}</h2></div><p>${t.skillsText}</p></div>
      <ul class="skill-grid">${[['HTML', '&lt;/&gt;'], ['CSS', '#'], ['JavaScript', 'JS'], ['Java', '{ }'], ['Python', 'Py'], ['Git', '⑂'], ['GitHub', 'GH']].map(([name, symbol]) => `<li><span class="skill-symbol" aria-hidden="true">${symbol}</span><span>${name}</span></li>`).join('')}</ul>
    </section>
    <section class="projects section container" id="projetos" aria-labelledby="projects-heading"><div class="section-heading"><div><p class="eyebrow">${t.selectedLabel}</p><h2 id="projects-heading">${t.selected}</h2></div><div><p>${t.selectedText}</p><span class="handwritten project-note">${t.projectNote}</span></div></div>
      <div class="projects-grid">${cards}</div>
      <div class="other-projects"><div class="other-heading"><h3>${t.others}</h3><p>${t.othersText}</p></div><ul>${otherProjects.map((p, index) => `<li>${external(p.url, `<span class="other-index" aria-hidden="true">0${index + 5}</span><span><strong>${p.name[i]}</strong><span class="other-description">${p.description[i]}</span></span>`)}</li>`).join('')}</ul></div>
    </section>
    <section class="contact dark-section" id="contato" aria-labelledby="contact-heading"><div class="container contact-grid"><div><p class="eyebrow">${t.contactLabel}</p><h2 id="contact-heading">${t.contact}</h2><p class="contact-description">${t.contactText}</p><span class="availability" data-availability><span aria-hidden="true"></span>${t.available}</span></div><div class="contact-paper"><span class="tape" aria-hidden="true"></span><p class="handwritten">${t.contactNote}</p>${external(site.github, `<span><strong>GitHub</strong><small>${t.githubText}</small></span>`, 'contact-link')}${external(site.linkedin, `<span><strong>LinkedIn</strong><small>${t.linkedinText}</small></span>`, 'contact-link')}${site.email ? `<a class="contact-link" href="mailto:${esc(site.email)}"><span><strong>${t.email}</strong><small>${esc(site.email)}</small></span>${arrow}</a>` : ''}<a class="contact-link" data-whatsapp hidden><span><strong>WhatsApp</strong><small>${t.whatsapp}</small></span>${arrow}</a>${site.resume ? `<a class="button primary" href="${prefix}${esc(site.resume)}" download>${t.resume}${arrow}</a>` : ''}<span class="paper-signature" aria-hidden="true">GN.</span></div></div></section>
  </main>
  <footer class="site-footer"><div class="container footer-inner"><p>© <span data-year>2026</span> Guilherme Neves.<span>${t.footer}</span></p><span class="footer-tech">${t.tech}</span><a href="#inicio">${t.top}<span aria-hidden="true">↑</span></a></div></footer>
  <a class="whatsapp-float" data-whatsapp hidden><span class="sr-only">${t.whatsapp}</span><svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M27 15.5a11 11 0 0 1-16 10L5 27l1.5-6A11 11 0 1 1 27 15.5Z"/><path d="M12 10c-4 2 4 12 8 10l1-3-4-1-1 2-3-4 1-1Z"/></svg></a>
</body>
</html>
`;
  const directory = i ? resolve(root, 'en') : root;
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html.replace(/[ \t]+$/gm, ''));
}
await writeFile(resolve(root, 'robots.txt'), base ? `User-agent: *\nAllow: /\nSitemap: ${absolute('sitemap.xml')}\n` : '# TODO: configure site.url and run npm run build before publishing.\nUser-agent: *\nDisallow: /\n');
await writeFile(resolve(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base ? ['', 'en/'].map(p => `\n  <url><loc>${esc(absolute(p))}</loc></url>`).join('') : '\n  <!-- TODO: URLs will be generated when site.url is configured. -->'}\n</urlset>\n`);
console.log(`Generated PT/EN HTML, robots.txt and sitemap.xml.${base ? '' : ' Domain pending: indexing disabled in this draft.'}`);
