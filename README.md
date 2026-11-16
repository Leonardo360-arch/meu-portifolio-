# Portfólio — Leonardo Marson Coral

Portfólio pessoal para apresentar formação, experiência em suporte técnico e projetos de desenvolvimento de software. A primeira versão utiliza o perfil do GitHub como destino profissional.

## Executar localmente

Abra `dist/index.html` no navegador ou, na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --directory dist
```

Acesse `http://localhost:8000`. Não é necessário instalar dependências ou executar uma etapa de compilação.

## Arquitetura e atualização

O site é estático: HTML organiza o conteúdo, CSS define a apresentação e JavaScript controla as interações. Não há backend nem banco de dados.

- `dist/index.html`: apresentação, seções, cartões de projetos e links.
- `dist/assets/styles.css`: estilos, responsividade e estados visuais.
- `dist/assets/app.js`: filtros, menu, diálogos e informações complementares dos projetos.
- `dist/assets/favicon.svg`: ícone do site.

Para adicionar ou atualizar um projeto, revise o conteúdo em `dist/index.html` e sua correspondência em `dist/assets/app.js`. Mantenha título, tecnologias, descrição, estágio e links consistentes. Descreva a contribuição de Leonardo após confirmá-la, sem atribuir a ele trabalho de outros integrantes.

As imagens dos projetos são composições ilustrativas feitas em HTML/CSS, identificadas na página. Não são capturas reais dos sistemas. As descrições e tecnologias foram conferidas nos respectivos READMEs. Mon Glacé e Design Patterns têm repositórios privados e podem exigir permissão de acesso.

## Critérios de qualidade

- Manter títulos hierárquicos, navegação por teclado e foco visível.
- Usar nomes acessíveis em controles, contraste legível e conteúdo utilizável no celular.
- Respeitar a preferência por movimento reduzido.
- Manter conteúdo e links dos projetos disponíveis mesmo sem JavaScript.
- Publicar somente informações pessoais necessárias e autorizadas.
- Evitar dados reais de alunos, clientes, credenciais e outros conteúdos privados em textos ou imagens.

O JavaScript usa APIs nativas do navegador e preenche os detalhes com `textContent`. Não há analytics, armazenamento local nem formulário de envio nesta versão.

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
