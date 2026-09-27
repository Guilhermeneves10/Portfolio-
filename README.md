# Guilherme Neves — portfólio

Portfólio estático bilíngue, em HTML, CSS e JavaScript. Sem framework nem dependências de execução no navegador.

## Executar localmente

Com Node.js 22 ou superior instalado:

```sh
npm run dev
```

Abra http://127.0.0.1:3000 (PT) ou http://127.0.0.1:3000/en/ (EN). Não é preciso instalar pacotes para servir ou gerar as páginas.

## Editar

- `site.config.mjs`: domínio, links sociais, e-mail, currículo e projetos.
- `tools/build.mjs`: conteúdo e template bilíngue.
- `assets/js/config.js`: disponibilidade e WhatsApp, com mensagens por idioma.
- `assets/css/style.css`: fontes, tokens e layout mobile first.
- `assets/js/script.js`: menu acessível, seção ativa, tema, âncoras, WhatsApp e ano.
- `assets/images/`: imagens locais. `imageSmall` permite `srcset` de 600/1200 pixels nos projetos. Com imagens reais, fornecer alt nos dois idiomas.

Depois de editar configuração ou template:

```sh
npm run build
```

`index.html` e `en/index.html` são arquivos gerados completos; funcionam sem JavaScript. Alterações diretas neles serão sobrescritas pelo gerador.

## Validar

```sh
npm ci
npm run check
node tools/browser-check.mjs
node tools/lighthouse.mjs
node tools/lighthouse.mjs --configured-preview
```

Os testes de navegador e Lighthouse precisam do servidor local ativo e do Google Chrome instalado. Os relatórios e screenshots ficam em `reports/` (não versionados). As dependências de desenvolvimento não são usadas pelo site.

`--configured-preview` testa apenas SEO com o endereço local real como origem temporária, e restaura os arquivos sem domínio em `finally`. Isso permite validar a geração de URLs absolutas sem inventar um domínio de produção. Não execute outros builds ou edições nos HTML gerados durante esse teste.

## Antes de publicar

1. Informar `site.url` com a URL HTTPS definitiva, incluindo subdiretório se existir, e executar `npm run build`. Isso gera canonical/hreflang absolutos, sitemap válido e libera indexação. Sem domínio, a versão de preparação usa `noindex` e `Disallow: /` deliberadamente.
2. Informar telefone real com país e DDD em `assets/js/config.js`. Sem ele, os links de WhatsApp ficam ocultos. Confirmar o destinatário antes de publicar; testes locais não enviam mensagens.
3. Substituir o placeholder de fotografia por foto real autorizada e inserir as capturas reais dos projetos. Não há foto de Guilherme gerada por IA.
4. Confirmar tecnologias e descrição de Seven Wealth, Forno & Brasa e Seven Store e preencher suas URLs reais. Botões ausentes são omitidos.
5. Se desejar, informar e-mail e colocar o PDF em `assets/documents/`, preenchendo `site.resume`. O gerador verifica se o PDF existe antes de criar o link.
6. Adicionar uma imagem social definitiva e suas tags `og:image`/`twitter:image` no template se desejar prévia com imagem. Os metadados de texto já estão presentes.
7. Reexecutar Lighthouse na hospedagem real. INP e Core Web Vitals de campo precisam de tráfego real; um teste de laboratório não os certifica.

## Hospedagem

Na Vercel, `vercel.json` executa `node tools/build-vercel.mjs` e publica a pasta `dist/`, com apenas os arquivos públicos do site. Essa configuração substitui o diretório de saída definido no painel. Para verificar localmente, execute `node tools/build-vercel.mjs`.

Publicar `index.html`, `en/`, `assets/`, `robots.txt` e `sitemap.xml`, preservando a estrutura. Não publicar `node_modules/`, `reports/`, `tools/` ou documentos de auditoria. Nenhum commit, push ou deploy é feito automaticamente.

Veja `docs/AUDIT.md` para a auditoria e `docs/VALIDATION.md` para os resultados da implementação.
