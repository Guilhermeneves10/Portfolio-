# Portfólio Guilherme Neves

## Design System, especificação do mockup e PRD de implementação

**Versão:** 1.0  
**Status:** aprovado para desenvolvimento  
**Produto:** portfólio pessoal de Guilherme Neves  
**Referência visual:** mockup aprovado com estética editorial, colagem de papel, paleta creme/preto/laranja e fotografia recortada sobre o título “PORTFÓLIO”.

---

# Parte 1 — Design System

## 1. Conceito visual

O portfólio deve comunicar criatividade, capacidade técnica e evolução profissional. A interface mistura um grid editorial contemporâneo com materiais físicos — papel rasgado, fita adesiva, fotografia impressa e rabiscos — sem perder clareza, profissionalismo ou legibilidade.

### Princípios

1. **Conteúdo antes do efeito:** animações e texturas nunca podem prejudicar leitura ou navegação.
2. **Contraste editorial:** alternar seções claras e escuras para criar ritmo.
3. **Profundidade controlada:** foto, título e recortes podem se sobrepor, mas cada seção deve continuar fácil de entender.
4. **Personalidade consistente:** usar somente a identidade e os projetos de Guilherme; não copiar nomes, contatos ou trabalhos das referências.
5. **Responsividade real:** o design deve ser recomposto no celular, não apenas reduzido.

## 2. Paleta de cores

| Token | Valor | Uso |
|---|---:|---|
| `--color-bg` | `#F3EEE4` | Fundo principal creme |
| `--color-surface` | `#FFF9EF` | Cartões e papéis claros |
| `--color-ink` | `#15110D` | Texto principal e seções escuras |
| `--color-ink-soft` | `#2A241E` | Superfícies escuras secundárias |
| `--color-accent` | `#FF9F0A` | Botões, sublinhados e destaques |
| `--color-accent-hover` | `#E88900` | Hover do laranja |
| `--color-text-muted` | `#6F675E` | Textos secundários em fundo claro |
| `--color-text-dark-muted` | `#C8BFB4` | Textos secundários em fundo escuro |
| `--color-border` | `#D8CFC3` | Bordas sutis |
| `--color-success` | `#29B765` | Indicador “disponível” |

### Regras de cor

- O laranja deve ocupar no máximo cerca de 10% da composição visível.
- Texto corrido nunca deve ser laranja.
- Em seções escuras, usar creme como texto principal e cinza quente como secundário.
- Não usar azul, vermelho ou roxo como cores dominantes. Eles podem aparecer apenas dentro das imagens dos projetos.

## 3. Tipografia

### Famílias sugeridas

- **Display:** `Anton` ou `Bebas Neue` — títulos grandes e números dos projetos.
- **Interface e texto:** `Inter` — navegação, botões, descrições e metadados.
- **Anotações manuais:** `Caveat` — rabiscos curtos e legendas decorativas.

### Escala desktop

| Estilo | Tamanho | Altura de linha | Peso |
|---|---:|---:|---:|
| Hero | `clamp(5.5rem, 13vw, 12rem)` | `0.82` | 400 display |
| H1 de seção | `clamp(3rem, 6vw, 6rem)` | `0.9` | 400 display |
| H2 | `clamp(2rem, 4vw, 3.5rem)` | `1` | 400 display |
| H3 | `1.5rem` | `1.15` | 700 |
| Corpo grande | `1.125rem` | `1.65` | 400 |
| Corpo | `1rem` | `1.6` | 400 |
| Label | `0.75rem` | `1.2` | 700, caixa alta |
| Anotação | `1.1rem` | `1.1` | 600 handwritten |

## 4. Grid, largura e espaçamento

- Conteúdo máximo: `1280px`.
- Padding horizontal desktop: `clamp(24px, 5vw, 72px)`.
- Grid desktop: 12 colunas, gap de `24px`.
- Grid tablet: 8 colunas, gap de `20px`.
- Grid mobile: 4 colunas, gap de `16px`.
- Espaço vertical entre seções: `96–144px` desktop; `72–96px` tablet; `56–72px` mobile.

### Escala de espaçamento

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`

## 5. Formas, bordas e sombras

- Cards digitais: raio entre `12px` e `18px`.
- Botões principais: raio `10px`; versão pill somente para badges.
- Papel físico: bordas irregulares por SVG/CSS mask; evitar imagens raster pesadas.
- Fita adesiva: textura translúcida com `opacity: 0.7–0.85`.
- Sombra de papel: `0 16px 40px rgba(21, 17, 13, 0.16)`.
- Sombra de card: `0 12px 32px rgba(21, 17, 13, 0.10)`.
- Linhas: `1px solid var(--color-border)`.

## 6. Iconografia e elementos gráficos

- Usar Lucide Icons ou Phosphor Icons com traço consistente.
- Ícones de tecnologia podem usar Simple Icons com cores oficiais, sem exagero.
- Rabiscos devem ser SVG próprios: seta, estrela, sublinhado, círculo imperfeito e raio.
- Limite recomendado: até três rabiscos decorativos simultâneos por viewport.
- Todos os elementos puramente decorativos devem receber `aria-hidden="true"`.

## 7. Componentes

### 7.1 Cabeçalho

- Monograma `GN` à esquerda.
- Links: Início, Sobre, Projetos, Habilidades e Contato.
- Controle de tema à direita.
- Fixo após 80px de rolagem, com fundo translúcido e `backdrop-filter`.
- No celular, botão de menu com painel acessível e bloqueio de scroll.

### 7.2 Botões

**Primário:** fundo laranja, texto preto, ícone de seta.  
**Secundário:** transparente, borda preta/creme conforme o fundo.  
**Icon button:** circular, mínimo `44×44px`.

Estados obrigatórios: default, hover, focus-visible, active e disabled.

### 7.3 Badge de disponibilidade

- Texto: “Disponível para oportunidades”.
- Ponto verde e fundo neutro.
- Permitir ocultar ou alterar por configuração.

### 7.4 Foto hero recortada

- Usar uma fotografia real de Guilherme em PNG/WebP com transparência.
- A pessoa deve passar à frente de parte das letras de “PORTFÓLIO”.
- Usar sombra suave e uma pincelada laranja atrás do recorte.
- Não gerar ou substituir o rosto com IA sem solicitação explícita.

### 7.5 Polaroid “Sobre mim”

- Mesma identidade fotográfica da hero.
- Rotação visual entre `-3deg` e `3deg`.
- Moldura creme, fita adesiva superior e legenda manuscrita.
- Em mobile, reduzir a rotação para evitar corte.

### 7.6 Card de tecnologia

- Ícone, nome e tooltip opcional.
- Fundo transparente ou creme muito claro.
- Hover: deslocamento de `-4px` e borda laranja.
- Tecnologias iniciais: HTML, CSS, JavaScript, Java, Python, Git e GitHub.

### 7.7 Card de projeto

Campos obrigatórios:

- número;
- nome;
- categoria;
- resumo curto;
- imagem de capa;
- tecnologias;
- URL da demonstração;
- URL do GitHub, quando público;
- texto alternativo.

Interação:

- imagem com zoom leve no hover;
- seta circular muda de fundo;
- card inteiro pode abrir o detalhe, preservando links separados e acessíveis;
- sem efeito 3D exagerado.

### 7.8 Papel de contato

- Lista de GitHub, LinkedIn, e-mail e WhatsApp.
- Botão “Baixar currículo”.
- Dados reais devem vir de um arquivo de configuração.
- Não publicar telefone ou e-mail fictício.

## 8. Motion system

| Movimento | Duração | Curva |
|---|---:|---|
| Microinteração | `160ms` | `ease-out` |
| Botões/cards | `240ms` | `cubic-bezier(.2,.8,.2,1)` |
| Entrada de seção | `500ms` | `cubic-bezier(.2,.8,.2,1)` |
| Hero | `700ms` | `cubic-bezier(.16,1,.3,1)` |

Animações recomendadas:

- título da hero surge por máscara;
- foto entra alguns pixels de baixo para cima;
- sublinhados são “desenhados” por SVG;
- cards aparecem com pequeno stagger;
- textura e rabiscos não devem usar parallax agressivo.

Respeitar integralmente `prefers-reduced-motion: reduce`.

## 9. Responsividade

### Desktop — `≥ 1200px`

- Hero com título gigante e foto sobreposta.
- Projetos em grid 2×2.
- Sobre mim em três áreas: texto, Polaroid e informações.

### Tablet — `768–1199px`

- Hero ainda sobreposto, com redução do título.
- Sobre mim em duas colunas.
- Projetos em duas colunas.

### Mobile — `< 768px`

- Navegação por menu.
- Título “PORTFÓLIO” pode quebrar em duas linhas.
- Foto posicionada abaixo ou parcialmente sobre o título, sem cobrir nome e botões.
- Seções em coluna única.
- Projetos empilhados.
- Contatos com alvos de toque de no mínimo `44px`.

## 10. Acessibilidade

- Contraste mínimo WCAG AA.
- HTML semântico com um único `h1`.
- Navegação completa por teclado.
- Foco visível em todos os elementos interativos.
- `alt` descritivo nas imagens de projeto; `alt=""` nos elementos apenas decorativos.
- Link “Pular para o conteúdo”.
- Menu mobile com `aria-expanded` e foco controlado.
- Não depender somente de cor para indicar estado.

---

# Parte 2 — PRD

## 11. Visão do produto

Criar um portfólio pessoal responsivo que apresente Guilherme Neves como estudante de Análise e Desenvolvimento de Sistemas e desenvolvedor front-end em evolução. O site deve fortalecer sua candidatura a oportunidades de tecnologia, apresentar projetos reais e facilitar contato profissional e contratação de serviços freelance.

## 12. Objetivos

- Comunicar claramente quem é Guilherme em até 10 segundos.
- Destacar seus quatro melhores projetos.
- Demonstrar domínio de design responsivo e front-end.
- Levar recrutadores a baixar o currículo ou acessar LinkedIn/GitHub.
- Levar potenciais clientes ao WhatsApp ou e-mail.
- Oferecer uma experiência marcante sem comprometer desempenho.

## 13. Público-alvo

1. Recrutadores e gestores de tecnologia.
2. Empresas buscando profissionais júnior ou estágio.
3. Pequenos negócios interessados em sites e automações.
4. Desenvolvedores interessados em conhecer os projetos e o GitHub.

## 14. Escopo da versão 1

### Incluído

- Landing page de página única.
- Navegação por âncoras com scroll suave.
- Hero, Sobre, Habilidades, Projetos e Contato.
- Quatro projetos iniciais.
- Links externos configuráveis.
- Download do currículo.
- Tema claro/escuro com preferência persistida.
- Animações leves.
- SEO básico e metadados sociais.
- Layout responsivo e acessível.

### Fora do escopo inicial

- CMS ou painel administrativo.
- Login de usuário.
- Blog.
- Banco de dados.
- Formulário com backend próprio.
- Dashboard de analytics dentro do site.
- Internacionalização completa.

## 15. Arquitetura da informação

1. **Início** — proposta de valor e CTAs.
2. **Sobre** — história, formação, experiência atual e objetivo.
3. **Habilidades** — tecnologias realmente utilizadas.
4. **Projetos** — quatro cases principais.
5. **Contato** — redes, currículo e disponibilidade.
6. **Rodapé** — autoria, ano dinâmico e links rápidos.

## 16. Conteúdo inicial

### Hero

- Eyebrow: “Olá, eu sou”.
- Nome: “Guilherme Neves”.
- Cargo: “Desenvolvedor Front-end”.
- Mensagem sugerida: “Transformando ideias em interfaces que conectam pessoas e soluções.”
- CTA principal: “Ver projetos”.
- CTA secundário: “Falar comigo”.

### Sobre

Texto inicial sugerido:

> Sou estudante de Análise e Desenvolvimento de Sistemas e apaixonado por tecnologia. Crio experiências digitais que unem design, funcionalidade e propósito. Estou em constante evolução, transformando cada projeto em aprendizado e cada desafio em uma oportunidade de crescimento.

Blocos:

- Formação: ADS — Análise e Desenvolvimento de Sistemas, em andamento.
- Experiência: projetos pessoais e acadêmicos com foco em desenvolvimento web.
- Objetivo: conquistar uma oportunidade em desenvolvimento front-end e crescer como desenvolvedor.

### Projetos iniciais

| Projeto | Categoria | Descrição resumida | Tecnologias iniciais |
|---|---|---|---|
| Bichinho Feliz | Pet shop | Site institucional e catálogo de produtos e serviços para pet shop | HTML, CSS, JavaScript |
| Seven Wealth | Finanças pessoais | Plataforma de planejamento financeiro, metas, aportes e evolução patrimonial | HTML, CSS, JavaScript |
| Forno & Brasa | Gastronomia | Site de pizzaria artesanal com cardápio visual e experiência responsiva | HTML, CSS, JavaScript |
| Seven Store | E-commerce | Loja conceitual de streetwear com catálogo, produtos e identidade premium | HTML, CSS, JavaScript |

> Os textos, tecnologias e links deverão ser atualizados conforme o estado real de cada repositório.

## 17. Requisitos funcionais

### RF-01 — Navegação

- Links devem levar às respectivas seções.
- Seção ativa deve ser indicada no menu.
- Logo deve retornar ao topo.

### RF-02 — Tema

- Permitir alternância entre claro e escuro.
- Iniciar pela preferência do sistema.
- Persistir escolha em `localStorage`.
- Evitar flash do tema incorreto.

### RF-03 — Projetos

- Renderizar projetos a partir de uma coleção tipada.
- Cada projeto deve aceitar demo, GitHub, imagem, tecnologias e descrição.
- Links ausentes não devem gerar botões quebrados.

### RF-04 — Contato

- Exibir somente dados configurados.
- Links externos devem abrir com segurança usando `rel="noopener noreferrer"`.
- WhatsApp deve usar mensagem inicial configurável.

### RF-05 — Currículo

- Botão deve apontar para um PDF real em `/public`.
- Enquanto o arquivo não existir, manter o botão oculto ou desabilitado com indicação clara no código.

### RF-06 — Imagens

- Suportar WebP/AVIF quando possível.
- Imagens de projetos devem usar carregamento tardio.
- Imagem principal deve ter dimensões reservadas para evitar layout shift.

### RF-07 — Dados configuráveis

Centralizar conteúdo em arquivos como:

- `src/data/profile.ts`;
- `src/data/projects.ts`;
- `src/data/skills.ts`;
- `src/data/socials.ts`.

## 18. Requisitos não funcionais

- Lighthouse desejado: Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95 e SEO ≥ 95.
- LCP desejado abaixo de 2,5 segundos em conexão móvel razoável.
- CLS abaixo de 0,1.
- Sem erros no console em produção.
- TypeScript em modo estrito.
- Interface utilizável a partir de 320px de largura.
- Compatibilidade com versões atuais de Chrome, Edge, Firefox e Safari.

## 19. Stack recomendada

- React 19 ou versão estável disponível no projeto.
- TypeScript.
- Vite.
- CSS Modules ou CSS organizado com tokens globais; evitar dependência obrigatória de Tailwind.
- Framer Motion apenas se já estiver disponível ou se justificar o peso; preferir CSS para microinterações simples.
- Lucide React para ícones.
- ESLint e Prettier.

Se o repositório já possuir outra stack, o Codex deve inspecioná-la e preservar sua arquitetura, adotando somente os conceitos compatíveis.

## 20. Estrutura sugerida

```text
src/
  assets/
    images/
    doodles/
    textures/
  components/
    Header/
    Button/
    ProjectCard/
    SkillCard/
    PaperPanel/
    Polaroid/
    SocialLink/
  sections/
    Hero/
    About/
    Skills/
    Projects/
    Contact/
  data/
    profile.ts
    projects.ts
    skills.ts
    socials.ts
  styles/
    tokens.css
    globals.css
    utilities.css
  App.tsx
  main.tsx
public/
  projects/
  guilherme-neves-curriculo.pdf
```

## 21. SEO e compartilhamento

- Título sugerido: `Guilherme Neves | Desenvolvedor Front-end`.
- Description: resumo profissional objetivo entre 140 e 160 caracteres.
- Open Graph e Twitter Card.
- `canonical` configurável.
- `sitemap.xml` e `robots.txt` quando publicado.
- JSON-LD do tipo `Person`, somente com dados reais.
- Favicon e ícone do monograma GN.

## 22. Analytics e privacidade

- Analytics é opcional e deve ser adicionado somente após escolha do provedor.
- Não incluir rastreadores ou cookies por padrão.
- Nunca publicar informações pessoais além das aprovadas por Guilherme.

## 23. Estados e tratamento de falhas

- Imagem ausente: placeholder neutro que preserve proporção.
- Link ausente: não renderizar ação.
- Currículo ausente: ocultar ou desabilitar download.
- JavaScript desativado: conteúdo essencial deve continuar semanticamente disponível quando viável.

## 24. Critérios de aceite

- [ ] O visual corresponde ao mockup aprovado: creme, preto, laranja e colagem editorial.
- [ ] A hero contém “PORTFÓLIO”, foto recortada, nome, cargo e dois CTAs.
- [ ] Nenhum nome, rosto, contato ou projeto das referências aparece no produto.
- [ ] Apenas uma identidade fotográfica é usada no site.
- [ ] Os quatro projetos corretos aparecem com imagens e metadados próprios.
- [ ] Tema claro/escuro funciona e persiste.
- [ ] Navegação por teclado e foco visível funcionam.
- [ ] Layout funciona em 320px, 768px, 1024px e 1440px.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] Nenhum link vazio ou dado pessoal fictício é exibido.
- [ ] Build, lint e checagem de tipos passam.
- [ ] Não existem erros no console.

## 25. Etapas de implementação

1. Inspecionar o repositório e documentar a stack existente.
2. Criar tokens, fontes e estilos globais.
3. Criar dados tipados de perfil, tecnologias, projetos e contatos.
4. Implementar Header e Hero.
5. Implementar Sobre e Polaroid.
6. Implementar Habilidades.
7. Implementar Projetos.
8. Implementar Contato e Footer.
9. Adicionar tema, animações e responsividade.
10. Otimizar imagens, SEO e acessibilidade.
11. Executar lint, typecheck, build e revisão visual.

---

# Parte 3 — Prompt pronto para o Codex

```text
Quero que você implemente meu novo portfólio pessoal seguindo integralmente o Design System e o PRD deste documento.

Antes de editar qualquer arquivo:
1. inspecione toda a estrutura do repositório, package.json, stack, estilos e assets existentes;
2. informe de maneira curta o que encontrou e apresente um plano de implementação;
3. preserve configurações e funcionalidades válidas do projeto;
4. não invente links, contatos, experiências profissionais ou dados pessoais;
5. use placeholders claramente identificados quando algum conteúdo real ainda não tiver sido fornecido.

Objetivo visual:
- portfólio editorial moderno com estética de colagem;
- paleta creme #F3EEE4, preto #15110D e laranja #FF9F0A;
- hero com a palavra PORTFÓLIO em tamanho gigante e uma fotografia recortada passando entre as letras;
- papel rasgado, fita adesiva, Polaroid, rabiscos SVG e textura discreta;
- aparência profissional, organizada e responsiva, sem ficar infantil ou carregada.

Seções obrigatórias:
- Header;
- Hero;
- Sobre mim;
- Habilidades;
- Projetos selecionados;
- Contato;
- Footer.

Projetos iniciais:
1. Bichinho Feliz;
2. Seven Wealth;
3. Forno & Brasa;
4. Seven Store.

Requisitos técnicos:
- componentes reutilizáveis e dados separados da interface;
- TypeScript estrito;
- HTML semântico e acessibilidade WCAG AA;
- tema claro/escuro persistido;
- responsividade completa de 320px a telas grandes;
- animações sutis e suporte a prefers-reduced-motion;
- imagens otimizadas e sem layout shift;
- SEO e metadados sociais;
- nenhum erro no console;
- não adicionar dependências sem necessidade.

Implemente em etapas pequenas. Após cada etapa importante, valide o resultado. Ao finalizar, execute lint, typecheck e build, corrija os problemas encontrados e entregue um resumo dos arquivos alterados, decisões tomadas e campos que ainda precisam dos meus dados reais.
```

---

## 26. Dados ainda necessários antes da publicação

- fotografia principal recortável em boa resolução;
- fotografia secundária para a Polaroid, ou autorização para reutilizar a principal;
- URL do LinkedIn;
- URL do GitHub;
- e-mail profissional;
- número/URL do WhatsApp, caso queira exibi-lo;
- PDF atualizado do currículo;
- URL de demonstração e repositório de cada projeto;
- screenshots finais dos projetos;
- instituição e período do curso de ADS, caso queira mostrar essas informações.

