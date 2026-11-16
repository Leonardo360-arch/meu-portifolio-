# Estrutura e evolução do portfólio

Referência de conteúdo e manutenção — 16/11/2026.

O portfólio apresenta uma trajetória em construção: formação em Desenvolvimento de Software Multiplataforma, experiência com suporte técnico e projetos que permitem demonstrar aplicação prática. A evolução deve acompanhar trabalhos reais, com descrição proporcional ao que foi implementado e validado.

## Organização da experiência

| Área | Função |
| --- | --- |
| Apresentação | Explicar quem é Leonardo e sua atuação. Linguagens à esquerda permitem exploração por arraste; cartões à direita abrem os projetos. |
| Projetos selecionados | Reunir os trabalhos existentes e permitir comparação por problema, tecnologias e estágio. Os filtros facilitam a exploração. |
| Sobre e formação | Conectar a formação na Fatec Araras e a experiência em suporte técnico ao percurso de desenvolvimento. |
| Conhecimentos | Mostrar tecnologias estudadas ou utilizadas, sem percentuais de domínio ou títulos de senioridade sem fundamento. |
| Próximo passo | Levar ao perfil profissional confirmado. LinkedIn, currículo e contato direto entram quando seus dados forem fornecidos. |

Mon Glacé, SAA e Factory Method são os projetos atualmente selecionados. Projetos ainda não iniciados não devem ser apresentados como entregues ou como cartões funcionais. É possível ampliar o catálogo aos poucos, mantendo os trabalhos mais representativos em destaque.

## Catálogo central de projetos

`dist/assets/projects.js` contém o array `window.PORTFOLIO_PROJECTS`. O JavaScript de interação usa esse array para renderizar o catálogo, os cartões da apresentação e os detalhes. A apresentação exibe as três primeiras entradas, na ordem do array; para mudar essa seleção, reordene as entradas. Os dados permanecem locais ao site; não existe consulta automática aos repositórios durante a visita.

| Campo | Conteúdo esperado |
| --- | --- |
| `id` | Identificador único e estável, como `mon-glace`. |
| `title` | Nome legível do projeto. |
| `category` | Categoria de filtro disponível: `web` ou `java`. |
| `categoryLabel` | Contexto legível, como `WEB / EDUCAÇÃO`. |
| `summary` | Problema e solução apresentados de forma objetiva. |
| `status` | Estágio real: estudo executável, MVP, homologação ou outra situação comprovada. |
| `features` | Lista de funcionalidades ou decisões que podem ser demonstradas. |
| `technologies` | Lista de tecnologias efetivamente presentes no projeto. |
| `url` | Endereço do repositório. |
| `privateRepository` | `true` quando o acesso ao código exige permissão. |
| `coverTemplate` | ID opcional de um template de capa em `index.html`. Sem correspondência, há uma capa tipográfica padrão. |
| `featured` | Controla o formato largo do cartão na galeria; não seleciona os cartões da apresentação. |
| `shortLabel` | Sigla ou rótulo curto para a identificação visual. |

Ao adicionar um projeto:

1. Acrescente uma entrada com ID único ao catálogo.
2. Preencha resumo, estágio, tecnologias, funcionalidades e link com evidências do projeto.
3. Posicione o projeto entre as três primeiras entradas se ele deve aparecer na apresentação. Use `featured: true` somente para aplicar o formato largo na galeria e confira a composição em telas pequenas.
4. Se necessário, crie uma capa própria como template HTML. Identifique uma composição ilustrativa como tal.
5. Atualize o conteúdo alternativo de `<noscript>` para que os links continuem úteis sem JavaScript.
6. Verifique filtros, abertura dos detalhes, teclado e links de acesso.

Adicionar outra categoria de filtro exige incluir o respectivo controle na interface e validar o resultado; escrever um novo valor no catálogo não cria esse controle automaticamente.

## Conteúdo que torna um projeto avaliável

Cada projeto deve permitir que o visitante entenda:

- **Problema:** qual necessidade motivou o trabalho e quem seria atendido.
- **Participação pessoal:** o que Leonardo realizou; em trabalhos em equipe, separar sua contribuição das entregas coletivas. As atribuições individuais ainda precisam ser confirmadas.
- **Solução:** qual fluxo ou funcionalidade foi implementado e como pode ser demonstrado.
- **Tecnologias e decisões:** quais ferramentas foram usadas e por que foram adequadas ao contexto.
- **Validação:** quais testes ou verificações foram realmente executados e seus limites.
- **Próximos passos e estágio:** o que ainda depende de implementação, revisão ou homologação.

Resultados numéricos, uso em produção, volume de clientes, ganhos de desempenho e depoimentos só devem aparecer quando houver evidência. A quantidade de projetos não substitui a clareza dessas informações.

## Base das linguagens exibidas

A seleção foi fundamentada nos arquivos e na documentação dos projetos consultados:

| Repositório | Evidências de tecnologias |
| --- | --- |
| `Leonardo360-arch/Mon-Glace` | Arquivos PHP, JavaScript, CSS e SQL; documentação e páginas PHP com marcação HTML. |
| `Leonardo360-arch/Design-Patterns` | Arquivos Java no exemplo de Factory Method. |
| `Grupo-EVITUS/PI3-2026` | Arquivos PHP, CSS e SQL; documentação do MVP web e templates de interface. |

Essas evidências mostram utilização de linguagens; não medem proficiência. O registro é uma fotografia da revisão de 16/11/2026 e deve ser atualizado conforme os projetos evoluírem.

## Movimento e acessibilidade

O arraste é uma forma adicional de exploração, não um requisito para conhecer o conteúdo. As linguagens têm foco por teclado e movimento por setas; os projetos abrem por clique ou ativação do teclado. O controle “Pausar animações” interrompe o movimento e muda para “Ativar animações”. Esse controle e a preferência por movimento reduzido evitam impor animações contínuas.

Na manutenção, verificar:

- Ausência de rolagem horizontal e sobreposição de controles em telas pequenas.
- Arraste limitado à área das linguagens e possibilidade de rolar a página ao redor dela.
- Retorno do foco ao fechar os detalhes de um projeto.
- Legibilidade e identificação de estado dos filtros e do controle de movimento.
- Disponibilidade do conteúdo quando a animação estiver pausada ou reduzida.
- Dados fictícios nas ilustrações escolares e ausência de credenciais ou dados privados nas imagens.

## Referências de inspiração

As referências abaixo orientaram conceitos de navegação, interação e organização. Código, imagens, identidade visual e textos desses autores não foram copiados.

| Referência | Ideia aplicada ao contexto deste portfólio |
| --- | --- |
| [Bruno Simon](https://bruno-simon.com/) | Exploração lúdica como convite à interação; aqui, restrita às peças de linguagens e aos cartões dos projetos. |
| [Rauno Freiberg](https://rauno.me/) | Cuidado com resposta dos controles, acabamento e consistência entre os estados de interação. |
| [Brittany Chiang](https://brittanychiang.com/) | Clareza na apresentação de experiência, projetos e tecnologias. |
| [Cyd Stumpel](https://cydstumpel.nl/) | Movimento como complemento da experiência, associado à preocupação com acessibilidade. |

## Planejamento de evolução

A próxima etapa de conteúdo é confirmar biografia, objetivo profissional e participação nos trabalhos atuais, acrescentando evidências reais quando disponíveis. Depois, cada projeto novo pode entrar pelo mesmo catálogo. Temas de estudo e ideias futuras devem ser mantidos como planejamento até existirem entregas demonstráveis.

A prévia continua privada. A decisão de torná-la pública deve acompanhar a revisão das informações pessoais, dos links e dos direitos de uso dos materiais. `noindex` orienta mecanismos de busca, mas não substitui controle de acesso.
