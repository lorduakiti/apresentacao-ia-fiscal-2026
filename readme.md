# Apresentação — IA nas Finanças Públicas (2026)

Apresentação interativa em HTML/CSS/JS sobre a aplicação de Inteligência
Artificial nas Finanças Públicas, voltada a Fiscais de Tributos Municipais.

## Como rodar localmente
Por serem arquivos separados, **não** abra o `index.html` por duplo-clique
(o navegador bloqueia o carregamento das imagens). Sirva a pasta:

```bash
python3 -m http.server
# acesse http://localhost:8000
```

## Navegação
- **← →** (ou deslize no celular): troca de slide
- **Clique / toque**: revela animações
- Na demonstração consolidada, as setas percorrem as 6 etapas

## Estrutura
- `index.html` — marcação
- `css/style.css` — estilo do tema
- `js/app.js` — navegação, demo e gestos
- `imgs/` — diagramas SVG (texto vetorizado) e teia animada de fundo

## Publicação no GitHub Pages
Após o push, em **Settings → Pages**, selecione a branch `main` e a pasta
raiz (`/root`). A URL pública será gerada automaticamente.
