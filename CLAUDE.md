# CLAUDE.md — Guia do projeto

Contexto para o Claude Code (e para qualquer pessoa) ao trabalhar neste
repositório. Leia antes de editar.

## O que é

Apresentação interativa de slides em **HTML/CSS/JS puro** (sem framework,
sem build) sobre **Aplicação de Inteligência Artificial nas Finanças
Públicas**. Estilo TEDx, voltada a **Fiscais de Tributos Municipais**,
auditores e equipes das Secretarias da Fazenda. Duração-alvo: ~15 min.

São **23 slides**. A apresentação roda inteiramente no navegador.

## Links

- **Publicação (Netlify):** https://apresentacao-ia-fiscal-2026.netlify.app
- **Repositório (GitHub):** https://github.com/lorduakiti/apresentacao-ia-fiscal-2026

## Estrutura de arquivos

```
projeto/
├── index.html         # marcação dos 23 slides + HUD de navegação
├── css/style.css      # todo o estilo e o tema visual
├── js/app.js          # navegação, demo, carrosséis, modais e gestos de toque
├── imgs/              # imagens raster (PNG/JPG/GIF) + alguns SVGs
│   ├── connection-web.svg     # teia animada (fundo do slide 1) — SVG externo ainda em uso
│   ├── qr-code-whatsapp.svg   # QR do WhatsApp (slide 23)
│   ├── fluxo_dados_1..5.jpg   # legado: imagens DIKW que o slide 13 usava antes (não mais referenciadas)
│   ├── evolucao-*.png         # carrossel (slide 3)
│   ├── noticia_*.png          # carrossel de notícias (slide 8)
│   └── …                      # demais fotos/diagramas/GIFs usados pelos slides
├── *.md               # documentos de apoio (ver última seção)
├── README.md
└── CLAUDE.md          # este arquivo
```

> **A maioria dos diagramas é SVG _inline_ dentro de `index.html`** (slides 9,
> 11, 13, 14, 15, 18 e o "GitHub corner" do slide 23), e não arquivos em
> `imgs/`. Os SVGs `cockpit/w2h/venn-limits/ladder/ontology/cost-curves/lightbulb-grid`
> em `imgs/` são **legados** e não são mais referenciados. Veja a armadilha
> sobre SVG inline × externo abaixo antes de mexer.

## Como rodar (IMPORTANTE)

NÃO abra o `index.html` por duplo-clique. Como CSS, JS e imagens são
arquivos externos, o protocolo `file://` bloqueia o carregamento dos SVGs.
Sempre sirva por HTTP:

```bash
python3 -m http.server   # depois acesse http://localhost:8000
```

## Como navegar

- **← / →** (teclado) ou **deslize** (mobile): troca de slide.
- **Clique / toque** (parado): revela a próxima animação do slide (`.reveal`).
- **Espaço:** revela a próxima animação sem trocar de slide.
- **Home / End:** primeiro / último slide. Dots na HUD: salto direto.
- No **slide 16 (demonstrações)** o conteúdo está em dois acordeões
  (descrições à esquerda; iframes/links à direita). Clique nos títulos para
  abrir cada item — as setas apenas trocam de slide.

## Arquitetura do front-end

- **Sem dependências externas de runtime.** Fontes vêm do Google Fonts via
  `<link>` no `<head>`. Todo o resto é local.
- **Tema** definido por variáveis CSS em `:root` (`--ink`, `--gold`,
  `--rust`, `--teal`, etc.). Reuse essas variáveis; não introduza cores
  soltas (exceção justificada: cores semânticas de status — verde "ok",
  vermelho `#e0564d` "não" — como na tabela do slide 11 e nos alertas do
  slide 19).
- **Slides** são `<section class="slide" id="sN">`. A navegação em
  `app.js` opera por POSIÇÃO no DOM, não pelo número do id — reordenar
  slides funciona desde que se mantenham as seções na ordem desejada.
- **Animações por clique**: elementos com a classe `.reveal` aparecem um a
  cada clique/toque. Slides com revelações exibem a pista `.clickcue`.
- **HUD**: barra de progresso, contador `NN / 23` e dots de navegação são
  gerados/atualizados em `app.js`.

## Convenções e armadilhas (NÃO repita erros já resolvidos)

- **SVG inline × externo (regra crítica).** Um SVG carregado via
  `<img src="...svg">` é tratado como imagem e **não** carrega recursos
  externos (outras imagens, web fonts, CSS) nem enxerga as variáveis do
  tema. Portanto:
  - Diagramas que precisam de web fonts (`<text>`), de variáveis CSS ou que
    **referenciam imagens raster** (`<image href="...">`) **têm de ser inline**
    no `index.html`: um SVG externo via `<img>` não busca esses recursos.
  - SVGs **externos** em `imgs/` só servem para arte autocontida (ex.:
    `connection-web.svg`). Neles, use cores **hex/rgba reais** (não
    `var(--...)`) e converta rótulos de texto em **contornos vetoriais**
    (`<path>`) com a fonte correta (Fraunces / Archivo / JetBrains Mono),
    em vez de `<text>` cru.
  - SVGs **inline** podem usar `<text>` com as fontes do deck normalmente.
- **Teia animada (`connection-web.svg`)**: usa animação nativa SMIL
  (`<animateTransform>`). O ciclo de cada nó **deve fechar** (primeiro
  keyframe == último), senão há um "salto" visível no loop. Já corrigido —
  preserve essa propriedade ao mexer.
- **Fluxo DIKW animado (slide 13):** SVG inline **autocontido** (sem imagens),
  desenhado com `<circle>`/`<line>`/`<polyline>`. Cinco etapas reveladas por
  `<animate>` de `opacity` (SMIL): círculos vazios (Dados) → preenchidos
  azul/rosa (Informação) → linhas pontilhadas (Conhecimento) → dois círculos
  verde-neon via filtro `#neon` (Insight) → caminho neon entre eles (Sabedoria).
  Ciclo de 12,5 s = **2,5 s por etapa**; os `keyTimes`/`values` (frações do
  ciclo) voltam a 0 em t=0 e t=1 para o loop não dar salto. Para mudar a
  duração por etapa, basta ajustar o `dur` de todos os `<animate>` — as
  frações dos `keyTimes` continuam válidas. Preserve isso ao editar.
- **Tabela Humano × IA (slide 11):** SVG inline; os ícones ficam **sempre
  visíveis** e as palavras são "digitadas" letra a letra (cada `<tspan>` é uma
  `.fl-letter`), com a marca ✔/✘ (`.fl-mark`) surgindo ~0,5 s após cada
  palavra. A sequência é só CSS, **disparada quando o slide fica `.active`**
  (`#s11.active .fl-letter`/`.fl-mark`); o atraso de cada elemento vem do
  `animation-delay` inline. Por isso esse SVG **não** usa a classe `.reveal`.
- **GitHub corner (slide 23):** octocat em SVG inline dentro de um `<a>` que
  abre o repositório em nova aba; o braço (`.octo-arm`) acena no hover via
  `@keyframes octocat-wave`. O `<a>` colapsa para 0×0 (o SVG é
  `position:absolute`) — isso é esperado e o clique continua funcionando.
- **iframes das demos**: cada item do acordeão de iframes usa um `data-src`
  de exemplo, carregado de forma preguiçosa só quando o item fica ativo.
  Troque os `data-src` pelos sistemas reais antes de apresentar e confirme
  que o serviço permite ser exibido em iframe (alguns bloqueiam via
  `X-Frame-Options`).
- **Mobile**: `touchstart`/`touchend` distinguem *tap* (revela) de *swipe*
  (navega). Há uma trava `suppressClick` para anular o "clique fantasma"
  pós-toque — não remova.

## Conteúdo dos 23 slides (ordem atual)

1. Abertura  2. Cronograma (agenda)  3. A evolução do trabalho
4. A mesma tarefa, cinco linguagens  5. Os dados crescem / a equipe não
6. O oceano em que vocês nadam (números IBPT/Insper/Banco Mundial)
7. A IA é o seu copiloto  8. Não é futuro, é notícia de jornal (prova social)
9. O que a máquina responde? (5W2H)  10. A imprecisão da IA
11. IA × Humanos (tabela comparativa animada em SVG)  12. Eficiência não é eficácia
13. Governança não é freio (LGPD + fluxo DIKW animado)
14. A camada ontológica (nuvem de palavras)  15. 4 Níveis de uso
16. Do chat ao enxame de agentes (demonstrações, dois acordeões)
17. IA Generativa + Machine Learning  18. O mercado mundial de IA
19. Comece pequeno (POC)  20. Mais barato e melhor (custos / token)
21. De novidade a infraestrutura (revoluções)  22. Frase de impacto (síntese)
23. Perguntas? / Contato (com GitHub corner).

## Antes de apresentar (checklist)

- [ ] Trocar `data-src` dos iframes (slide 16) pelos sistemas reais e testar
      embedding.
- [ ] Conferir os números do slide 6 (IBPT, Insper, Banco Mundial) e os
      preços de token do slide 20, que mudam com frequência.
- [ ] Confirmar as manchetes/links do slide 8 (título e data exatos).
- [ ] Conferir dados de contato e o QR do slide 23.
- [ ] Rodar em tela cheia (F11) servindo por HTTP.

## Publicação

Site estático. Funciona em GitHub Pages, Netlify (Drop ou via repositório),
Vercel ou Cloudflare Pages sem ajustes. Para GitHub Pages: Settings → Pages
→ branch `main`, pasta raiz.

## Documentos de apoio (na raiz do repositório)

Acompanham a apresentação quatro artefatos de texto:
`estrutura (versão 1).md`, `apresentação (versão 1).md` (conteúdo dos
slides), `palestra (versão 1).md` (roteiro falado, estilo TEDx) e
`texto-slides (versão 1).md` (transcrição fiel de todos os textos do deck,
na ordem dos slides). Mantenha-os em sincronia com a ordem dos slides se o
deck mudar.
