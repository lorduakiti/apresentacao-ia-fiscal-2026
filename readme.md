# Apresentação — IA nas Finanças Públicas (2026)

Apresentação interativa em HTML/CSS/JS sobre a aplicação de Inteligência
Artificial nas Finanças Públicas, voltada a Fiscais de Tributos Municipais.

🔗 **Link Oficial:** https://aifiscal2026.presentations.lorduakiti.com.br  
🔗 **Apresentação publicada:** https://apresentacao-ia-fiscal-2026.netlify.app  
📦 **Repositório:** https://github.com/lorduakiti/apresentacao-ia-fiscal-2026  

## Como rodar localmente
Por serem arquivos separados, **não** abra o `index.html` por duplo-clique
(o navegador bloqueia o carregamento das imagens). Sirva a pasta:

```bash
python3 -m http.server
# acesse http://localhost:8000
```

## Navegação
- **← →** (ou deslize no celular): troca de slide
- **Clique / toque** (ou **espaço**): revela as animações do slide
- **Home / End**: primeiro / último slide
- No slide 16 (demonstrações), o conteúdo está em dois acordeões — clique
  nos títulos para abrir cada item

São **23 slides** no total.

## Estrutura
- `index.html` — marcação dos slides (a maioria dos diagramas é **SVG inline**)
- `css/style.css` — estilo do tema
- `js/app.js` — navegação, demo, carrosséis, modais e gestos
- `imgs/` — imagens (PNG/JPG/GIF), a teia animada de fundo (`connection-web.svg`)
  e o QR do WhatsApp

> Diagramas que usam web fonts (`<text>`) ou referenciam imagens são SVG
> **inline** no `index.html`: um SVG externo carregado via `<img>` não
> consegue carregar esses recursos. O fluxo de dados animado do slide 13 é
> 100% desenhado em SVG (círculos, linhas e brilho neon), sem imagens.

## Publicação no GitHub Pages
Após o push, em **Settings → Pages**, selecione a branch `main` e a pasta
raiz (`/root`). A URL pública será gerada automaticamente.
