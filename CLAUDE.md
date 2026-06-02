# CLAUDE.md — Guia do projeto

Contexto para o Claude Code (e para qualquer pessoa) ao trabalhar neste
repositório. Leia antes de editar.

## O que é

Apresentação interativa de slides em **HTML/CSS/JS puro** (sem framework,
sem build) sobre **Aplicação de Inteligência Artificial nas Finanças
Públicas**. Estilo TEDx, voltada a **Fiscais de Tributos Municipais**,
auditores e equipes das Secretarias da Fazenda. Duração-alvo: ~15 min.

São **20 slides**. A apresentação roda inteiramente no navegador.

## Links

- **Publicação (Netlify):** https://apresentacao-ia-fiscal-2026.netlify.app
- **Repositório (GitHub):** https://github.com/lorduakiti/apresentacao-ia-fiscal-2026

## Estrutura de arquivos

```
projeto/
├── index.html        # marcação dos 20 slides + HUD de navegação
├── css/style.css      # todo o estilo e o tema visual
├── js/app.js          # navegação, demo consolidada e gestos de toque
├── imgs/              # diagramas SVG + teia animada de fundo
│   ├── connection-web.svg   # teia animada (fundo do slide 1)
│   ├── cockpit.svg          # slide 7  — papel do fiscal
│   ├── w2h.svg              # slide 8  — 5W2H
│   ├── venn-limits.svg      # slide 9  — limites máquina x humano
│   ├── ladder.svg           # slide 10 — níveis de uso
│   ├── ontology.svg         # slide 13 — camada ontológica
│   ├── cost-curves.svg      # slide 17 — custos / token
│   └── lightbulb-grid.svg   # slide 18 — revoluções
├── README.md
└── CLAUDE.md          # este arquivo
```

## Como rodar (IMPORTANTE)

NÃO abra o `index.html` por duplo-clique. Como CSS, JS e imagens são
arquivos externos, o protocolo `file://` bloqueia o carregamento dos SVGs.
Sempre sirva por HTTP:

```bash
python3 -m http.server   # depois acesse http://localhost:8000
```

## Como navegar

- **← / →** (teclado) ou **deslize** (mobile): troca de slide.
- **Clique / toque** (parado): revela a próxima animação do slide.
- No **slide 14 (demonstração consolidada)**, as setas percorrem as
  **6 etapas** internas antes de avançar para o próximo slide; as abas no
  topo saltam direto para uma etapa.

## Arquitetura do front-end

- **Sem dependências externas de runtime.** Fontes vêm do Google Fonts via
  `<link>` no `<head>`. Todo o resto é local.
- **Tema** definido por variáveis CSS em `:root` (`--ink`, `--gold`,
  `--rust`, `--teal`, etc.). Reuse essas variáveis; não introduza cores
  soltas.
- **Slides** são `<section class="slide" id="sN">`. A navegação em
  `app.js` opera por POSIÇÃO no DOM, não pelo número do id — reordenar
  slides funciona desde que se mantenham as seções na ordem desejada.
- **Animações por clique**: elementos com a classe `.reveal` aparecem um a
  cada clique/toque. Slides com revelações exibem a pista `.clickcue`.
- **HUD**: barra de progresso, contador `NN / 20` e dots de navegação são
  gerados/atualizados em `app.js`.

## Convenções e armadilhas (NÃO repita erros já resolvidos)

- **SVGs externos não enxergam variáveis CSS nem web fonts.** Por isso:
  - As cores dentro dos SVGs estão como valores **hex/rgba reais**, não
    `var(--...)`. Se editar um SVG, use o valor real da paleta.
  - Os textos dos diagramas foram **convertidos em contornos vetoriais**
    (`<path>`), não são mais `<text>`. Isso preserva a fonte exata em
    qualquer ambiente. Se precisar editar um rótulo, reconverta o texto a
    path com a fonte correta (Fraunces / Archivo / JetBrains Mono) em vez
    de inserir `<text>` cru.
- **Teia animada (`connection-web.svg`)**: usa animação nativa SMIL
  (`<animateTransform>`). O ciclo de cada nó **deve fechar** (primeiro
  keyframe == último), senão há um "salto" visível no loop. Já corrigido —
  preserve essa propriedade ao mexer.
- **iframes das demos**: cada etapa da demo usa um `data-src` de exemplo,
  carregado de forma preguiçosa só quando a etapa fica ativa. Troque os
  `data-src` pelos sistemas reais antes de apresentar e confirme que o
  serviço permite ser exibido em iframe (alguns bloqueiam via
  `X-Frame-Options`).
- **Mobile**: `touchstart`/`touchend` distinguem *tap* (revela) de *swipe*
  (navega). Há uma trava `suppressClick` para anular o "clique fantasma"
  pós-toque — não remova.

## Conteúdo dos 20 slides (ordem atual)

1. Abertura  2. Agenda  3. Cenário  4. Evolução das interfaces
5. Complexidade tributária  6. Prova social (manchetes + mapa de IA)
7. Papel do fiscal  8. 5W2H  9. Limites máquina x humano
10. Níveis de uso  11. Eficiência x eficácia  12. Governança/LGPD
13. Camada ontológica  14. Demonstração (6 etapas: chat com anexo → MCP →
agente autônomo → busca RAG+Ledger → dashboard Superset → enxame de
agentes)  15. Proposta (IA + machine learning)  16. Roadmap/POC
17. Custos da IA (token)  18. Revoluções  19. Perguntas/contato
20. Frase de impacto final.

## Antes de apresentar (checklist)

- [ ] Trocar `data-src` dos iframes pelos sistemas reais e testar embedding.
- [ ] Preencher os campos `[ Seu nome ]`, `[ Instituição ]`, contato.
- [ ] Conferir os números do slide 5 (IBPT, Banco Mundial) e preços de
      token do slide 17, que mudam com frequência.
- [ ] Confirmar as manchetes/links do slide 6 (título e data exatos).
- [ ] Rodar em tela cheia (F11) servindo por HTTP.

## Publicação

Site estático. Funciona em GitHub Pages, Netlify (Drop ou via repositório),
Vercel ou Cloudflare Pages sem ajustes. Para GitHub Pages: Settings → Pages
→ branch `main`, pasta raiz.

## Documentos de apoio (fora deste repositório)

Existem três artefatos de texto que acompanham a apresentação:
`estrutura (versão 1).md`, `apresentação versão 1.md` (conteúdo dos slides)
e `palestra (versão 1).md` (roteiro falado do apresentador, estilo TEDx).
Mantê-los em sincronia com a ordem dos slides se o deck mudar.
