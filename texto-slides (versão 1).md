# Texto dos slides (versão 1)

Transcrição fiel de todos os textos da apresentação **Inteligência Artificial
nas Finanças Públicas**, na ordem em que os slides aparecem (23 slides).
Antes de cada texto vem o **tipo** do elemento.

> Convenções: **negrito** = trecho em `<strong>`/`<b>`; *itálico* = trecho
> destacado (`em.hl`). Quebras de linha de layout (`<br>`) foram preservadas
> como texto contínuo. Imagens são indicadas pelo seu texto alternativo (alt).

---

## Slide 1 — Abertura · `#s1`

- **Pré-título:** Workshop · Secretaria da Fazenda
- **Título (h1):** Inteligência Artificial nas Finanças Públicas
- **Subtítulo:** A IA a serviço da fiscalização da Secretaria da Fazenda Municipal.
- **Assinatura/rodapé:** Uákiti Pires · N2AI · Jun/26
- **Imagem de fundo (alt):** *(teia de conexões — decorativa)*

---

## Slide 2 — Cronograma · `#s2`

- **Pré-título:** O caminho de hoje
- **Título (h2):** Cronograma
- **Item de agenda 01:** Por que a IA importa — e por que agora
- **Item de agenda 02:** Quem já trilha esse caminho
- **Item de agenda 03:** A escada de conceitos: do chat ao agente
- **Item de agenda 04:** Demonstrações ao vivo
- **Item de agenda 05:** Como implementar a IA

---

## Slide 3 — A evolução do trabalho · `#s3`

- **Pré-título:** As mudanças do mundo
- **Título (h2):** A evolução do trabalho
- **Carrossel — imagem 1 (alt):** Datilógrafa à máquina de escrever
- **Carrossel — imagem 2 (alt):** Analista ao computador
- **Carrossel — imagem 3 (alt):** Programadora trabalhando com IA

---

## Slide 4 — A mesma tarefa, cinco linguagens · `#s4`

- **Pré-título:** 70 anos de história
- **Título (h2):** A mesma tarefa, cinco linguagens

Caixas de código (mesma consulta em cinco linguagens):

- **Linguagem — Binário:**
  `01001000 01001001 00100000 10101010 10100001 00111100 01001000 11011011`
- **Linguagem — COBOL:**
  `READ ISS-FILE PERFORM UNTIL EOF IF VALOR-ISS-ABERTO > 0 ADD VALOR-ISS-ABERTO TO TOTAL-ISS(CONTRIBUINTE) END-IF READ ISS-FILE END-PERFORM SORT TABELA-CONTRIBUINTES DESCENDING KEY TOTAL-ISS PERFORM VARYING WS-INDICE FROM 1 BY 1 UNTIL WS-INDICE > 10 DISPLAY CONTRIBUINTE(WS-INDICE) TOTAL-ISS(WS-INDICE) END-PERFORM`
- **Linguagem — Python:**
  `df_iss.filter(col("valor_iss_aberto") > 0).groupBy("contribuinte").agg(sum("valor_iss_aberto").alias("total_iss_aberto")).orderBy(desc("total_iss_aberto")).limit(10)`
- **Linguagem — SQL:**
  `SELECT contribuinte, SUM(valor_iss_aberto) FROM tb_iss WHERE valor_iss_aberto > 0 GROUP BY contribuinte ORDER BY 2 DESC LIMIT 10;`
- **Linguagem — IA · Prompt (destaque):**
  `"mostre os 10 principais contribuintes com ISS em aberto"`

---

## Slide 5 — Os dados crescem · `#s5`

- **Pré-título:** O descompasso
- **Título (h2):** Os dados crescem · A equipe, não
- **Parágrafo 1:** Mais notas fiscais de serviço, mais inscrições em dívida ativa, mais processos — e a mesma quantidade de fiscais. Ao mesmo tempo, a **Lei de Acesso à Informação** e a **Lei de Responsabilidade Fiscal** vigiam cada passo.
- **Parágrafo 2:** A análise ainda é feita, hoje, *contribuinte por contribuinte*. A IA não substitui o exercício do poder de polícia. Ela amplia o alcance dos seus olhos.
- **Imagem (alt):** Fiscal tributário ao trabalho

---

## Slide 6 — O oceano em que vocês nadam · `#s6`

- **Pré-título:** A complexidade brasileira
- **Título (h2):** O oceano em que vocês nadam
- **Número 1 — figura:** +541 mil · **legenda:** normas tributárias criadas desde a Constituição de 1988 (IBPT)
- **Número 2 — figura:** ~R$ 5,69 tri · **legenda:** contencioso tributário estimado em 2020 (Insper)
- **Número 3 — figura:** 1.500 h · **legenda:** por ano para uma empresa cumprir obrigações fiscais — entre as piores do mundo (Banco Mundial)
- **Parágrafo:** Antes mesmo de absorver a Reforma da **Emenda Constitucional nº 132/2023**. Nenhum ser humano consegue manter esse volume de informações apenas na memória enquanto cruza milhões de lançamentos.

---

## Slide 7 — A IA é o seu copiloto · `#s7`

- **Pré-título:** O papel do fiscal
- **Título (h2):** A IA é o seu copiloto
- **Parágrafo 1:** A IA tira o trabalho mecânico e devolve o que define a profissão: análise, interpretação da norma, juízo.
- **Parágrafo 2:** A decisão de autuar e o lançamento do crédito tributário são exercício do **poder de polícia** — e o poder de polícia, por lei e por natureza, é *indelegável*. A máquina não tem, e não pode ter, essa competência. Ela é de vocês.
- **Imagem (alt):** A IA como copiloto do fiscal

---

## Slide 8 — Não é futuro, é notícia de jornal · `#s8`

- **Pré-título:** Quem já está nessa estrada
- **Título (h2):** Não é futuro · É notícia de jornal
- **Carrossel de notícias (legenda = link com o nome do site):**
  1. SEFAZ-CE — https://www.ce.gov.br/sefaz/2025/02/19/sefaz-utiliza-inteligencia-artificial-para-detectar-empresas-noteiras/
  2. Serpro — http://serpro.gov.br/menu/noticias/noticias-2025/ia-contra-fraudes-congresso-febraban/
  3. Contec — https://contec.org.br/contra-golpes-virtuais-veja-como-bancos-usam-ia-para-rastrear-acoes-suspeitas-e-barrar-ameacas/
  4. Feedzai — https://www.feedzai.com/pt-br/pressrelease/tendencias-de-fraude-com-ia-2025/
  5. MGI · gov.br — https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/abril/mgi-institui-politica-de-governanca-de-inteligencia-artificial-no-ambito-do-ministerio
  6. MGI · gov.br (E-IA) — https://www.gov.br/gestao/pt-br/central-de-conteudo/publicacoes/planos/e-ia
  7. Receita Federal — https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/fevereiro/receita-federal-publica-politica-de-inteligencia-artificial-com-foco-em-responsabilidade-transparencia-e-supervisao-humana
  8. Min. da Fazenda — https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/junho/regulacao-equilibrada-da-inteligencia-artificial-ajudara-a-fortalecer-o-novo-ciclo-de-desenvolvimento-do-pais
  9. Correio da Manhã — https://www.correiodamanha.com.br/nacional/brasil/2026/05/285198-governo-defende-regulacao-da-ia-por-nivel-de-risco.html
  10. Fazenda RS — https://fazenda.rs.gov.br/uso-de-ia-no-servico-publico-e-tema-de-workshop
  11. Febraban Tech — https://febrabantech.febraban.org.br/temas/inteligencia-artificial/febraban-tech-2026-destaca-parceria-entre-ia-autonoma-e-lideranca-humana
  12. Febraban — https://portal.febraban.org.br/noticia/4396/pt-br/
  13. InvestNews — https://investnews.com.br/financas/tentativas-golpes-financeiros-usam-ia/
- **Legenda (abaixo do carrossel):** Casos reais de adoção de IA no setor público e privado.

---

## Slide 9 — O que a máquina responde? · `#s9`

- **Pré-título:** O que a IA já faz
- **Título (h2):** O que a máquina responde?
- **Parágrafo:** Por décadas o computador só respondia perguntas fáceis como: *o que, quem, quando, onde e quanto*. Bastava consultar um banco de dados. O salto da IA está no difícil — o *por quê* e o *como*.
- **Diagrama (rótulo central):** 5W2H
- **Diagrama — círculo esquerdo:** PC
- **Diagrama — círculo direito:** IA
- **Diagrama — linhas do 5W2H:**
  - What (o quê) – descreve
  - Why (por quê) – explica
  - Who (quem) – identifica
  - When (quando) – data
  - Where (onde) – localiza
  - How (como) – executa
  - How much (quanto) – estima

---

## Slide 10 — A imprecisão da IA · `#s10`

- **Pré-título:** Errar é humano?
- **Título (h2):** A imprecisão da IA
- **Parágrafo:** Hoje a IA *alucina, delira, esquece* e até pode inventar um artigo de lei com cara de verdade, afirmando categoricamente que está certa mesmo estando errada. Já os humanos, além de poderem cometer *os mesmos erros*, ainda se cansam, se distraem, têm vieses e não conseguem ler nem lembrar milhões de registros.
- **Imagem (alt):** Calculadora e dados — precisão e imprecisão

---

## Slide 11 — IA x Humanos · `#s11`

- **Pré-título:** Limites — de máquinas e de humanos
- **Título (h2):** IA x Humanos
- **Parágrafo:** Então a solução é não confiar cegamente em nenhum dos dois. Precisamos planejar uma forma de trabalho conjunto para que um corrija o outro: a máquina amplia o alcance e a velocidade; o humano valida o juízo e a veracidade. Os erros de um não são os erros do outro.
- **Imagem (alt):** Humano e IA em colaboração

---

## Slide 12 — Eficiência não é eficácia · `#s12`

- **Pré-título:** A distinção que muda tudo
- **Título (h2):** Eficiência não é eficácia
- **Caixa 1 — título:** Eficiência · **texto:** Fazer a tarefa do jeito certo — com menos esforço e menos tempo.
- **Caixa 2 — título:** Eficácia · **texto:** Fazer a tarefa *certa* — aquela que realmente produz resultado.
- **Destaque (multiplicador):** 10×
- **Parágrafo:** O profissional **sênior**, que já sabe qual é a tarefa certa, multiplica a produtividade ao delegar a execução à IA. Nas mãos erradas, a IA só acelera o erro.
- **Ícone com link (foguete → modal):** https://horariomundial.lorduakiti.com.br/about.html

---

## Slide 13 — Governança não é freio · `#s13`

- **Pré-título:** Dados, governança & LGPD
- **Título (h2):** Governança não é freio · É a condição
- **Parágrafo 1:** Sem dado de qualidade, não há IA confiável. No setor público, ela opera sob a **LGPD** e o **sigilo fiscal**, com controle de acesso e supervisão humana.
- **Parágrafo 2:** Se a IA aponta um contribuinte, ela precisa explicar por que apontou aquele contribuinte com as devidas justificativas dos motivos da indicação — como um auto de infração precisa de *motivação*. IA sem fundamentação não se sustenta num processo. Assim como um lançamento sem motivação não se sustenta.
- **Carrossel (imagens, alt):** Fluxo de dados — etapas 1 a 5

---

## Slide 14 — A camada ontológica · `#s14`

- **Pré-título:** A fundação invisível
- **Título (h2):** A camada ontológica
- **Parágrafo 1:** A camada ontológica, ou informações de metadados dos processos, é um mapa de significados que ensina à máquina o que é um **contribuinte**, um **fato gerador**, o que separa um débito *suspenso* de um em *dívida ativa*.
- **Parágrafo 2:** É para a IA o que as definições do Código Tributário são para o Direito. Sem o mapa, a IA adivinha. Com ele, ela raciocina sobre a realidade jurídica do município.
- **Nuvem de palavras — centro (destaque):** CONTEXTO
- **Nuvem de palavras — nível 1:** SEFAZ, ICMS, ISS, IOF, CAT, PAT, ITBI, IPTU, IPVA, Fazenda, FISCO, DIFAL, NFe
- **Nuvem de palavras — nível 2:** Federal, Estadual, Municipal, DTe, AR, Lei 192/2022, Lei 116/2003, Lei 87/1996, Lei 8.137/1990, Lei 8.429/1992, Lei 12.527/2011, Lei 13.709/2018, Lei 5.172/1966, Lei 11.101/2005
- **Nuvem de palavras — nível 3:** Constituição Federal 1988, LGPD, LAI, Lei Estadual 104/2013, Lei Estadual 16469/2009, Lei Estadual 13800/2001, CTE 11651/1991, Decreto RCTE 4852/1997, IN I99/2022-SRE, Anexo XII, Anexo XVIII, Ajuste SINIEF 7/2005, Ajuste SINIEF 19/2016, Ajuste SINIEF 21/2010, Lei Municipal 01/1998, Lei Municipal 1.488/2010, Lei Complementar Municipal 101/2000, Emenda Constitucional 132/2023, FICG, FIEG, FAEG, CRA, CRC, CRE, ADI, ADC, ADPF, RE-RG, PETEL, Fudeinfra, PROGOIÁS, FOMENTAR, PRODUZIR
- **Nuvem de palavras — nível 4:** Fiscalização, Infrações, Tributos, Ativo, Passivo, Receita, Despesa, Dívida, CPF, CNPJ, Intimação, Ampla Defesa, Contraditório, Imposto Interestadual, Base de Cálculo, Alíquota Estadual, Alíquota Municipal, Fato Gerador, Créditos Tributários
- **Nuvem de palavras — nível 5:** Contribuinte, Não Contribuinte, Dias Úteis, Impugnação, Conselheiros, Presidente, Notórios Conhecimentos, Representação Fazendária, Recorrer, Prazos, Súmula Vinculante, Local, Consumo, Crédito, Débito, Denúncia Espontânea, Denúncia, Embargo, Fiscalização, Ordem de Serviço, Nulidade Absoluta, Princípios, Elisão Fiscal, Arrendamento Mercantil, Isenção, Responsável, Solidário, Transporte, Mercadoria, Comunicação, Transferência, Responsabilidade Tributária, Sujeição Passiva, Contabilidade, Incidência, Vigência, Aplicação, Integração, Interpretação, Aspectos, Supervisão, Orientação, Controle, Arrecadação Tributária, Economia, Ética, Servidor Público, Direito Administrativo, Improbidade Administrativa, Administração Pública, Direito Tributário, Legislação, Repartição Constitucional, Pessoal, Terceiros, Sucessores, Plano de Contas, Demonstrações Contábeis, Plurianual, Diretrizes Orçamentárias, Licitação, Empenho, Liquidação, Pagamento, Poder de Polícia, Auto de Infração, Execução Fiscal, Responsabilidade Fiscal, Natureza Jurídica, Competência Tributária, Imunidade, Fato Imponível, Ano Calendário, Limites, Certidões, Bens, Fraude, Alienação, Ilimitado, Limitado, Quotas, Sociedades, Sócios, Falência, Cobrança, Preferências, Garantias, Privilégios, Modalidades, Suspensão, Extinção, Recuperação Judicial, Crimes, Relações de Consumo, Súmula Vinculante, Emenda Constitucional, Meios de Atuação, Ciclo, Período

---

## Slide 15 — 4 Níveis de uso · `#s15`

- **Pré-título:** Níveis de maturidade
- **Título (h2):** 4 Níveis de uso
- **Parágrafo:** IA não é só um chat interessante. Esse é apenas o primeiro degrau. No topo estão os *sistemas baseados em agentes*: que possuem agentes autônomos que planejam, dividem o trabalho e colaboram entre si. Dessa forma não é mais necessário desenvolver apenas sistemas corporativos com lógica determinística, para solucionar todos os problemas de negócio ou otimizar os processos empresariais e governamentais.
- **Diagrama (círculos concêntricos, do centro para fora):**
  - Chat simples
  - Contexto Real
  - Automação
  - Agêntico

---

## Slide 16 — Do chat ao enxame de agentes (demonstrações) · `#s16`

- **Pré-título:** Demonstrações ao vivo
- **Título (h2):** Do chat ao enxame de agentes

O slide tem duas colunas: à **esquerda**, um acordeão com as descrições
conceituais (7 etapas); à **direita**, um acordeão com os iframes das
demonstrações (vídeos) e um painel de **Links**.

**Coluna esquerda — acordeão de descrições (7 etapas):**

- **01 · Chat com anexo:** **Chat com anexo.** O primeiro degrau: o fiscal anexa um documento — uma declaração, um parecer, uma lei — e conversa com a IA sobre ele em linguagem natural. [arquivos] (https://drive.google.com/drive/folders/1F2jCWln__IEJ64niq7a7_uvQHp2KHBFM)
- **02 · MCP:** **MCP (Protocolo de Contexto de Modelo)** são servidores que permitem a conexão de serviços, plataformas ou appscom a IA, como consultar a hora atual, pesquisar a previsão do tempo ou cotações de ações ao vivo, que geram uma recomendação fundamentada. A mesma mecânica pode ler a base de arrecadação, com acesso **controlado e rastreável**. Recomendação, não ordem.
- **03 · Skills:** Em vez de apenas gerar texto, com os **Skills** a IA ganha superpoderes para ler arquivos, rodar códigos, interpretar textos complexos e usar aplicativos como se fosse um usuário humano.
- **04 · Agente autônomo:** **Agente autônomo.** Um agente lê dezenas de declarações em **PDF**, extrai os dados e preenche uma planilha sozinho. O que tirava um dia de digitação acontece enquanto você fala.
- **05 · Busca RAG + Ledger:** **Busca inteligente: RAG + Ledger.** **RAG** consulta a lei (CTN, Código do Município); **Ledger** guarda o dado auditável. Em volta: **harness** (fluxo), **guardrails** (mecanismos de segurança e sigilo) e **agents** (agentes especializados). Resposta com a base legal citada.
- **06 · Relatórios e Dashboards:** **Dashboard em tempo real · Superset.** Arrecadação, inadimplência e dívida ativa viram painéis vivos. O fiscal aplica um filtro — ISS por setor — e o painel responde **na hora**, sem chamado para a TI.
- **07 · Enxame de agentes:** **Enxame de agentes.** O topo da escada: vários agentes especializados atuam em paralelo — um extrai, outro concilia, outro busca inconsistências — e entregam ao fiscal o resultado consolidado para validação.

**Coluna direita — acordeão de demonstrações (títulos das abas):**

- IA Integrada aos Apps *(iframe de vídeo)*
- Chat Customizado *(iframe de vídeo)*
- Consultas de Dados Dinâmicas *(iframe de vídeo)*
- Análise de Dados Dinâmica *(iframe de vídeo)*
- **Links** *(painel com atalhos):*
  - Chat Google Drive — https://drive.google.com/drive/project/1i_Z-mcezEMxY0O2OnQ4vJL5gPYqhjg75
  - Chat Customizado — https://librechat.n2ai.org
  - Dremio — https://app.dremio.cloud/project/940a38d4-f1a3-4e8a-a021-abf36ec23f97
  - Metabase — https://finest-craft.metabaseapp.com
  - [dashboard inicial] — https://finest-craft.metabaseapp.com/public/dashboard/29016466-63ab-4ad4-b4ce-68df8768c18f
  - [dashboard gerencial] — https://finest-craft.metabaseapp.com/public/dashboard/33ea74e6-4a30-4049-9208-a8b8f064e4cf
  - [base de dados] — https://supabase.com/dashboard/sign-in?schema=public&returnTo=%2Fproject%2Fiwdyddskkhktwfkbpxac%2Fsql%2F3e3d1f8c-2be3-48cf-8f3c-9cf8abec9615

---

## Slide 17 — IA Generativa + Machine Learning · `#s17`

- **Pré-título:** Implementação otimizada e precisa
- **Título (h2):** IA Generativa + Machine Learning
- **Parágrafo:** A IA generativa raciocina estatisticamente por meio de modelos de linguagem (LLMs), e por isso é imprecisa com números ou referências exatas. Combinada a *modelos estatísticos e de machine learning*, treinados com os dados históricos, a seleção de um contribuinte vem com uma **probabilidade calculada, mensurável e auditável**, deixando de ser apenas um palpite. A máquina indica e fundamenta; quem lança o crédito é o fiscal.
- **Intro da lista:** Exemplos de projetos beneficiados por arquiteturas avançadas:
- **Item de lista 1:** **Detecção de inconsistências**
- **Item de lista 2:** **Análise preditiva** de arrecadação e inadimplência
- **Item de lista 3:** **Auditoria assistida** por risco
- **Imagem (alt):** Animação de Máquina de Vetores de Suporte (SVM) em machine learning

---

## Slide 18 — O mercado mundial de IA · `#s18`

- **Pré-título:** IA no mundo
- **Título (h2):** O mercado mundial de IA
- **Parágrafo:** O ecossistema mundial se divide em duas camadas: empresas *horizontais* (a fundação, os grandes modelos) e *verticais* (especializadas — jurídico, contábil, fiscal). Então o desafio de empresas, instituições e órgãos públicos não é construir modelos de IA, mas sim escolher as melhores soluções de empresas da camada vertical, que especializaram seu serviço para resolver bem um único problema.
- **Diagrama — rótulo 1:** ANI · IA Limitada
- **Diagrama — rótulo 2:** AGI · IA Geral
- **Diagrama — rótulo 3:** ASI · Super IA
- **Imagem (alt):** MAD Landscape 2025 — mapa de empresas de IA, Machine Learning e Dados
- **Link da imagem (→ modal):** Mapa interativo do mercado de IA — mad.firstmark.com (https://mad.firstmark.com)

---

## Slide 19 — Comece pequeno (POC) · `#s19`

- **Pré-título:** Da POC à escala
- **Título (h2):** Comece pequeno
- **Parágrafo:** A **POC** (Prova de Conceito) deve ser o teste de bancada antes de pensar em comprar a fábrica. Aplicar IA em um caso real, de alto valor e baixo risco, como a triagem de inadimplência de ISS, pode ser o segredo do sucesso. Principais erros dos projetos de IA:
- **Alerta ×1:** Querer fazer tudo de uma vez
- **Alerta ×2:** Escolher um caso sem dor real
- **Alerta ×3:** Aplicar IA sobre dados sujos
- **Alerta ×4:** Esquecer de treinar as pessoas
- **Alerta ×5:** Não definir claramente como medir o sucesso com KPIs ou ROI
- **Destaque (coluna direita):** Utilizar IA pra tudo é um delírio coletivo!

---

## Slide 20 — Mais barato e melhor (custos) · `#s20`

- **Pré-título:** Os custos da IA
- **Título (h2):** Mais barato · E melhor
- **Ícone com link ($ → modal):** Ver preços de LLMs (https://aimultiple.com/pt/llm-pricing)
- **Parágrafo 1:** A IA cobra por *token* — o "pedágio" da era da IA. Um token é um pedaço de texto, cerca de **4 letras**, ou **¾ de uma palavra**. Você paga pelo que envia e pelo que recebe.
- **Parágrafo 2:** Duas curvas se cruzaram: o **preço por token despencou** em ordens de grandeza, enquanto a **capacidade disparou** — modelos que leem centenas de páginas de uma vez. Tarefas inviáveis há 3 anos hoje custam *centavos*. Assim como ocorreu com o armazenamento de dados e com a energia solar: eles se transformaram em commodities e a barreira deixou de ser o custo.
- **Imagem 1 (alt):** Evolução da janela de contexto dos LLMs (2025)
- **Imagem 2 (alt):** Tendência do custo de inferência dos LLMs (2025)
- **Imagem 3 (alt):** Fluxo de RAG (Retrieval-Augmented Generation) em LLMs

---

## Slide 21 — De novidade a infraestrutura · `#s21`

- **Pré-título:** Uma nova revolução
- **Título (h2):** De novidade a infraestrutura
- **Linha do tempo — 1ª revolução:** Máquina a vapor
- **Linha do tempo — 2ª revolução:** Energia elétrica
- **Linha do tempo — 3ª revolução:** Computador e Internet
- **Linha do tempo — Agora:** Inteligência Artificial
- **Parágrafo:** Adotar a IA cedo, com governança, é como ter sido uma das primeiras cidades com luz elétrica: uma vantagem que se acumula. A pergunta não é *se* — é *quando*.
- **Imagem (alt):** Chip de inteligência artificial

---

## Slide 22 — Frase de impacto (síntese) · `#s22`

- **Pré-título:** A síntese
- **Citação:** "A **Inteligência Artificial** não substitui o **fiscal**, ela *amplia seu alcance*, *fundamenta seu juízo* e *devolve o tempo* que o trabalho burocrático tomou."

---

## Slide 23 — Perguntas? / Contato · `#s23`

- **Pré-título:** Obrigado
- **Título (h1):** Perguntas?
- **Parágrafo:** Vamos continuar a conversa.
- **Contato — nome:** Uákiti Pires
- **Contato — cargo:** Engenheiro de Dados e Especialista em IA
- **Contato — instituição:** N2AI (https://n2ai.org)
- **Contato — e-mail:** uakiti.nascimento@n2ai.org
- **Contato — WhatsApp:** (11) 99799-7783
- **Contato — LinkedIn:** linkedin.com/in/uakiti
- **QR code (alt):** QR code do WhatsApp de Uákiti Pires
