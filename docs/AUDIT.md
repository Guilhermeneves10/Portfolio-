# Auditoria e decisões

## Estado inicial

- Branch `main`, sincronizada com `origin/main` na auditoria inicial.
- Arquivos rastreados: `index.html`, `style.css`, `script.js`.
- PRD fornecido pelo usuário, não rastreado: `portfolio-guilherme-design-system-prd.md`; preservado sem alterações.
- Nenhum framework, configuração de build, imagem, currículo ou mockup raster no repositório. A referência visual disponível é a descrição do mockup no PRD.
- CSS antigo: interface azul escura, fontes externas Manrope/Space Grotesk e componentes arredondados.
- JavaScript antigo: IntersectionObserver com conteúdo invisível por padrão e mensagem no console.

## Classificação

| Parte | Decisão |
| --- | --- |
| Histórico Git e PRD do usuário | Preservar |
| GitHub, LinkedIn e quatro URLs de repositórios | Preservar integralmente |
| Biografia e objetivo de primeira oportunidade | Adaptar ao texto aprovado, sem atribuir experiência profissional |
| HTML e hierarquia | Substituir por duas páginas estáticas PT/EN |
| CSS e script antigos | Substituir em `assets/`; remover arquivos antigos após confirmar ausência de referências |
| Animação que esconde conteúdo | Remover; conteúdo sempre visível |
| Fontes externas | Substituir por Anton, Inter variável e Caveat locais com licenças |
| Fotos e screenshots ausentes | Placeholder SVG local identificado, sem rosto artificial |
| Número, e-mail e currículo ausentes | Não renderizar ações; manter TODO na configuração |
| React/TypeScript e idioma único sugeridos no PRD | Não aplicar: pedido atual exige HTML/CSS/JS e duas línguas |

## Links existentes preservados

- https://github.com/Guilhermeneves10
- https://www.linkedin.com/in/guilherme-neves-067065380/
- https://github.com/Guilhermeneves10/Lista-de-tarefas
- https://github.com/Guilhermeneves10/pagina-de-filmes-com-API
- https://github.com/Guilhermeneves10/Site-de-pet-shop
- https://github.com/Guilhermeneves10/Netflixcopy

Consulta à API pública do GitHub confirmou esses repositórios e a homepage `https://bichinho-feliz.vercel.app` para `Site-de-pet-shop`. Seven Wealth, Forno & Brasa e Seven Store não foram encontrados na listagem pública; os textos vêm do PRD e suas URLs ficam vazias.

Uma captura real do site público Bichinho Feliz foi obtida com Chrome em 1200×750 e 600×375. Os arquivos são locais, com `srcset`, carregamento tardio e dimensões reservadas. Não foi inventada uma tela para os demais projetos.

Atualização: o usuário forneceu `https://seven-menu.vercel.app/`, cuja página identifica Forno & Brasa como sua demonstração. O card passou a se chamar “Seven Menu — Forno & Brasa”, com descrição bilíngue atualizada, link real e capturas locais nas mesmas duas resoluções. O HTML publicado usa Next.js/React; as tecnologias desse card foram corrigidas sem alterar a stack estática do portfólio.

## Arquitetura

HTML final entregue diretamente ao navegador, sem renderização de conteúdo por JavaScript. `tools/build.mjs` é um gerador opcional em Node que mantém as duas traduções e metadados consistentes. O deploy precisa somente das páginas, assets, robots e sitemap; nenhuma dependência de Node em produção.

O domínio não foi presumido a partir do GitHub. Sem `site.url`, os metadados relativos são provisórios, o sitemap permanece sem URLs e a indexação fica bloqueada. Ao configurar uma URL HTTPS e gerar novamente, são produzidos canonical/hreflang absolutos e indexação liberada.

O tema segue o sistema por CSS; a preferência explícita é aplicada por um script mínimo antes da renderização. Sem JavaScript, todo o conteúdo, navegação e troca de idioma continuam disponíveis. WhatsApp e currículo somente aparecem com dados válidos.
