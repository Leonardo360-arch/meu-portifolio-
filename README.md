# Portfólio — Leonardo Marson Coral

Portfólio pessoal de Leonardo Marson Coral, estudante de Desenvolvimento de Software Multiplataforma na Fatec Araras, com experiência em suporte técnico escolar. Apresenta projetos e aprendizados em evolução; o perfil do GitHub é o destino profissional confirmado nesta versão.

## Experiência interativa

- À esquerda da apresentação, linguagens flutuantes podem ser arrastadas com mouse ou toque e movimentadas pelo teclado.
- À direita, cartões dos projetos abrem os respectivos detalhes. O catálogo completo mantém filtros por área.
- O controle “Pausar animações” interrompe o movimento e passa a exibir “Ativar animações”; a preferência de movimento reduzido do sistema também é respeitada.
- O conteúdo permanece acessível por navegação convencional, sem depender da interação de arrastar.

Nos controles de linguagens, use `Tab` para focar uma peça e as setas para movê-la. `Escape` restaura a posição da peça; o botão de reorganização restaura o conjunto. No celular, arraste diretamente a peça; as áreas ao redor continuam disponíveis para rolar a página. Os diálogos podem ser fechados pelo botão de fechar ou por `Escape`, com retorno do foco ao cartão acionador.

## Executar localmente

Abra `dist/index.html` no navegador ou, na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --directory dist
```

Acesse `http://localhost:8000`. Não é necessário instalar dependências ou executar uma etapa de compilação.

## Arquitetura e atualização

O site é estático: HTML organiza o conteúdo, CSS define a apresentação e JavaScript controla as interações. Não há backend nem banco de dados.

- `dist/index.html`: apresentação, seções, templates dos cartões e das capas e conteúdo alternativo sem JavaScript.
- `dist/assets/styles.css`: estilos, responsividade e estados visuais.
- `dist/assets/projects.js`: catálogo central de projetos em `window.PORTFOLIO_PROJECTS`.
- `dist/assets/app.js`: renderização do catálogo, cartões da apresentação, filtros, menu, diálogos e interações.
- `dist/assets/favicon.svg`: ícone do site.

Para adicionar ou atualizar um projeto, edite uma entrada em `dist/assets/projects.js`. Os cartões e os detalhes são preenchidos a partir desse catálogo. A apresentação exibe as três primeiras entradas do array; reordene o catálogo para mudar essa seleção. O campo `featured` controla somente o formato largo do cartão na galeria. Uma capa personalizada pode usar um template em `dist/index.html`; sem um template correspondente, o projeto recebe uma capa tipográfica. Mantenha também o conteúdo alternativo de `<noscript>` atualizado.

O catálogo é mantido manualmente. Não há sincronização automática, consulta à API do GitHub no navegador ou estimativa de domínio baseada na quantidade de código. Para a estrutura dos dados, critérios de conteúdo e evolução do portfólio, consulte [Estrutura do portfólio](docs/ESTRUTURA-PORTFOLIO.md).

As imagens dos projetos são composições ilustrativas feitas em HTML/CSS, identificadas na página. Não são capturas reais dos sistemas. As descrições e tecnologias foram conferidas nos respectivos READMEs. Mon Glacé e Design Patterns têm repositórios privados e podem exigir permissão de acesso.

## Critérios de qualidade

- Manter títulos hierárquicos, navegação por teclado e foco visível.
- Usar nomes acessíveis em controles, contraste legível e conteúdo utilizável no celular.
- Respeitar a preferência por movimento reduzido.
- Manter conteúdo e links dos projetos disponíveis mesmo sem JavaScript.
- Publicar somente informações pessoais necessárias e autorizadas.
- Evitar dados reais de alunos, clientes, credenciais e outros conteúdos privados em textos ou imagens.

O JavaScript usa APIs nativas do navegador e preenche o conteúdo com `textContent`. Não há dependências externas, backend, banco de dados, analytics, armazenamento local ou formulário de envio nesta versão.

## Antes de tornar público

- [ ] Confirmar biografia, formação, experiência e objetivo profissional.
- [ ] Conferir os links e a disponibilidade dos projetos apresentados.
- [ ] Confirmar a participação de Leonardo em cada projeto e os créditos aos demais integrantes.
- [ ] Conferir direitos de uso de imagens, marcas e demais materiais.
- [ ] Manter a identificação das composições ilustrativas.
- [ ] Verificar navegação por teclado, leitura no celular e links.
- [ ] Adicionar e-mail, LinkedIn e currículo somente após Leonardo fornecer os dados corretos.

E-mail, LinkedIn e currículo ainda não foram fornecidos. O único destino profissional confirmado nesta versão é `https://github.com/Leonardo360-arch`.

O `noindex` evita solicitar indexação nesta fase, mas não controla acesso. A privacidade da prévia depende das configurações de hospedagem. Para uma publicação pública definitiva, revisar também a política de indexação e os cabeçalhos HTTP disponíveis no provedor.
