# Validação da reconstrução

Atualização após envio dos links pelo usuário: Seven Menu identificado como plataforma com demonstração Forno & Brasa. Card atualizado nos dois idiomas, URL `https://seven-menu.vercel.app/` adicionada e capturas reais de 1200×750 e 600×375 salvas. O HTML público confirma Next.js/React; as tags desse projeto foram corrigidas. URL do Bichinho Feliz normalizada para `https://bichinho-feliz.vercel.app/`. Permanecem pendentes imagens/URLs de Seven Wealth e Seven Store e a URL do repositório do Seven Menu.

Executada em 25/09/2026, com Chrome local e Lighthouse 13.5.0. Relatórios completos e capturas estão em `reports/`, ignorado pelo Git.

## Resultado funcional

- `npm run build`: gera HTML PT/EN completo, robots e sitemap sem dependências de produção.
- `npm run check`: HTML validado com html-validate, CSS analisado com css-tree, um H1 por página, IDs únicos, âncoras e assets existentes, JSON-LD válido e todos os links originais preservados.
- Chrome: PT e EN testados a 320, 360, 390, 430, 768, 1024 e 1440 px, sem rolagem horizontal.
- Menu mobile: abertura, foco no primeiro link, fechamento com Escape, retorno de foco ao botão e navegação para seção aprovados.
- Teclado: skip link acessível e foco transferido para o conteúdo principal.
- Idiomas: links reais e navegação PT → EN → PT preservando `#projetos`.
- Tema: alternância e persistência após recarregar aprovadas.
- Sem JavaScript: conteúdo, quatro cards, navegação e troca de idioma disponíveis nas duas línguas, inclusive em 320 px.
- WhatsApp sem número: nenhuma ação visível nem URL fictícia.
- WhatsApp configurado: mensagens PT/EN, codificação de URL, alvo mínimo de 44 px e ocultação do atalho flutuante na seção de contato aprovados com fixture sintética isolada no navegador. Nenhuma mensagem enviada e nenhum número de teste gravado na configuração do site. Destinatário real ainda não testável.
- Ampliação: reflow equivalente a 200% em tela de 1280 px validado com viewport CSS de 640 px. Isso **não substitui** uma confirmação manual do zoom nativo do navegador.
- Nenhum erro de página ou console nas 14 combinações de idioma e largura.
- Revisão visual: hero e página completa em desktop e mobile, incluindo capturas de ambos os idiomas. Anotação lateral do hero ocultada em mobile após revisão para evitar sobreposição; regressão responsiva repetida.
- Imagem LCP identificada pelo Lighthouse, sem lazy loading e com `fetchpriority="high"`. Imagens abaixo da dobra com lazy loading, decoding async e dimensões reservadas. Captura real do Bichinho Feliz em duas resoluções e `srcset`.

## Lighthouse mobile

Última medição completa, antes do ajuste decorativo final da anotação mobile:

| Métrica | PT | EN |
| --- | ---: | ---: |
| Performance | 98 | 98 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO — versão sem domínio | 54 | 54 |
| LCP | 2,2 s | 2,3 s |
| CLS | 0,003 | 0,003 |
| Total Blocking Time | 0 ms | 0 ms |

O SEO da versão sem domínio é deliberadamente reduzido por `noindex`, robots bloqueado e URLs relativas provisórias. **SEO 100/100 em PT e EN** no teste separado de origem configurada, usando o próprio endereço local (não um domínio inventado). O teste restaurou automaticamente os arquivos provisórios. Definir `site.url` e executar `npm run build` prepara as URLs de produção.

INP não é medido por este teste de navegação; TBT não equivale a INP. LCP, CLS e INP de campo precisam ser confirmados após publicação com usuários reais. As notas de laboratório não garantem desempenho em qualquer hospedagem.

O Chrome terminou após as auditorias, mas o Windows reteve alguns diretórios temporários de perfil do Lighthouse. Os relatórios foram salvos normalmente; nenhuma limpeza recursiva externa foi realizada.

## Links

| Destino | Resultado HTTP |
| --- | --- |
| Perfil GitHub | 200 |
| Repositório Site-de-pet-shop | 200 |
| Bichinho Feliz publicado | 200 |
| Lista-de-tarefas | 200 |
| pagina-de-filmes-com-API | 200 |
| Netflixcopy | 200 |
| LinkedIn original | 999 — bloqueio de acesso automatizado; link preservado, confirmação manual pendente |

## Arquivos

**Modificado:** `index.html`.

**Substituídos e removidos após conferir as referências:** `style.css` → `assets/css/style.css`; `script.js` → `assets/js/script.js`.

**Criados:**

- `en/index.html`, `robots.txt`, `sitemap.xml`.
- `assets/css/style.css`, `assets/js/script.js`, `assets/js/config.js`.
- `assets/icons/favicon.svg`.
- `assets/images/portrait-placeholder.svg`, `project-placeholder.svg`, `bichinho-feliz-1200.jpg`, `bichinho-feliz-600.jpg`.
- Três fontes WOFF2 locais (Anton, Inter variável e Caveat) e suas três licenças em `assets/fonts/`.
- `site.config.mjs`, `package.json`, `package-lock.json`, `.gitignore`.
- `tools/build.mjs`, `serve.mjs`, `check.mjs`, `browser-check.mjs`, `check-links.mjs`, `capture-project.mjs`, `lighthouse.mjs`.
- `README.md`, `docs/AUDIT.md`, `docs/VALIDATION.md`.
- Relatórios HTML/JSON e screenshots de teste em `reports/` (não fazem parte da publicação).

PRD original e histórico Git preservados. Nenhum commit, push ou deploy realizado.

## Pendências reais para publicação

1. Domínio final.
2. Fotografia autorizada de Guilherme; placeholder utilizado no hero e na Polaroid.
3. Screenshots, URLs e confirmação das tecnologias de Seven Wealth e Seven Store; descrições e tecnologias atuais desses dois projetos vieram do PRD. URL do repositório do Seven Menu ainda ausente.
4. Número de WhatsApp real.
5. E-mail e currículo PDF, caso queira disponibilizá-los.
6. Mockup em imagem, se for necessária comparação visual exata além da especificação textual já aplicada.
7. Confirmação manual do LinkedIn e do zoom nativo de 200%; testes pós-publicação na hospedagem definitiva.
