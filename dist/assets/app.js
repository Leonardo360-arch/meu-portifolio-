(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const menuToggle = document.querySelector('#menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  const closeMenu = () => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open', !expanded);
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });

    const desktopViewport = window.matchMedia('(min-width: 769px)');
    desktopViewport.addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  const filterButtons = [...document.querySelectorAll('button[data-filter]')];
  const projectCards = [...document.querySelectorAll('article[data-category]')];
  const projectCount = document.querySelector('#project-count');

  const filterProjects = (selectedFilter) => {
    let visibleCount = 0;

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter));
    });

    projectCards.forEach((card) => {
      const visible = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (projectCount) {
      projectCount.textContent = visibleCount === 1
        ? '1 projeto exibido'
        : `${visibleCount} projetos exibidos`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => filterProjects(button.dataset.filter));
  });

  if (filterButtons.length && projectCards.length) filterProjects('all');

  const projects = {
    'mon-glace': {
      title: 'Mon Glacé',
      summary: 'Sistema web para pedidos de geladinhos artesanais, desenvolvido com PHP e MySQL. Reúne catálogo, administração e acompanhamento de pedidos. A implantação pública e a homologação operacional estão pendentes.',
      features: [
        'Catálogo e carrinho para a solicitação de pedidos.',
        'Área administrativa para gerenciar produtos e pedidos.',
        'Acompanhamento do pedido por token, sem GPS.',
      ],
      technologies: ['PHP 8.4', 'MySQL 8', 'Docker', 'HTML', 'CSS', 'JavaScript'],
      url: 'https://github.com/Leonardo360-arch/Mon-Glace',
      privateRepository: true,
    },
    saa: {
      title: 'SAA — Sistema de Ausência de Alunos',
      summary: 'Projeto em equipe para apoiar a comunicação de ausências escolares. O MVP usa PHP e SQLite; a versão com MongoDB está em homologação, com a troca operacional ainda pendente.',
      features: [
        'Registro de ausências e comunicação por e-mail.',
        'Registro de justificativas pelos responsáveis por link individual.',
        'Painel para acompanhamento pela coordenação.',
      ],
      technologies: ['PHP', 'SQLite', 'MongoDB em homologação', 'E-mail', 'Git', 'GitHub'],
      url: 'https://github.com/Grupo-EVITUS/PI3-2026',
      privateRepository: false,
    },
    'factory-method': {
      title: 'Factory Method — Entregas',
      summary: 'Projeto de estudo em Java que aplica Factory Method à criação de entregadores por bicicleta e moto. Executado no terminal, mantém os dados em memória. Os cenários são exemplos didáticos para explicar o padrão.',
      features: [
        'Subclasses de logística escolhem o entregador a ser criado.',
        'O método criarEntregador() varia a criação e preserva o fluxo comum.',
        'Exemplo didático de orientação a objetos e Design Patterns.',
      ],
      technologies: ['Java — JDK 17 ou superior', 'Orientação a objetos', 'Factory Method'],
      url: 'https://github.com/Leonardo360-arch/Design-Patterns',
      privateRepository: true,
    },
  };

  const dialog = document.querySelector('#project-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogSummary = document.querySelector('#dialog-summary');
  const dialogFeatures = document.querySelector('#dialog-features');
  const dialogTech = document.querySelector('#dialog-tech');
  const dialogLink = document.querySelector('#dialog-link');
  let dialogTrigger = null;

  const replaceList = (list, values) => {
    const items = values.map((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    });
    list.replaceChildren(...items);
  };

  if (dialog && dialogTitle && dialogSummary && dialogFeatures && dialogTech && dialogLink) {
    document.querySelectorAll('button[data-project]').forEach((button) => {
      button.addEventListener('click', () => {
        const project = projects[button.dataset.project];
        if (!project || dialog.open) return;

        dialogTrigger = button;
        dialogTitle.textContent = project.title;
        dialogSummary.textContent = project.summary;
        replaceList(dialogFeatures, project.features);
        replaceList(dialogTech, project.technologies);
        dialogLink.href = project.url;
        dialogLink.textContent = project.privateRepository
          ? 'Ver repositório (pode exigir acesso)'
          : 'Ver repositório';
        dialogLink.target = '_blank';
        dialogLink.rel = 'noopener noreferrer';
        dialog.showModal();
        document.body.classList.add('dialog-open');
      });
    });

    dialog.querySelectorAll('[data-close-dialog]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });

    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outsideDialog = event.clientX < bounds.left
        || event.clientX > bounds.right
        || event.clientY < bounds.top
        || event.clientY > bounds.bottom;
      if (outsideDialog) dialog.close();
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      if (dialogTrigger && dialogTrigger.isConnected) dialogTrigger.focus();
      dialogTrigger = null;
    });
  }

  const currentYear = document.querySelector('#current-year');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
