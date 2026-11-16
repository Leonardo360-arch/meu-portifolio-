(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS : [];
  const projectById = new Map(projects.map((project) => [project.id, project]));

  const replaceList = (list, values) => {
    if (!list) return;
    list.replaceChildren(...values.map((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    }));
  };

  const safeProjectUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.href : null;
    } catch {
      return null;
    }
  };

  /* A mesma fonte de dados alimenta a galeria, o destaque e os detalhes. */
  const grid = document.querySelector('#project-grid');
  const cardTemplate = document.querySelector('#project-card-template');
  if (grid && cardTemplate instanceof HTMLTemplateElement && projects.length) {
    const cards = projects.map((project, index) => {
      const fragment = cardTemplate.content.cloneNode(true);
      const card = fragment.querySelector('article');
      if (!card) return fragment;
      card.dataset.category = project.category;
      card.classList.toggle('project-featured', Boolean(project.featured));
      const fields = {
        category: project.categoryLabel,
        number: String(index + 1).padStart(2, '0'),
        title: project.title,
        summary: project.summary,
        status: project.status,
      };
      Object.entries(fields).forEach(([field, value]) => {
        const node = card.querySelector(`[data-field="${field}"]`);
        if (node) node.textContent = value;
      });
      replaceList(card.querySelector('[data-field="tech"]'), project.technologies);
      const visualSlot = card.querySelector('.project-visual-slot');
      const cover = document.getElementById(project.coverTemplate);
      if (visualSlot && cover instanceof HTMLTemplateElement) {
        visualSlot.replaceWith(cover.content.cloneNode(true));
      } else if (visualSlot) {
        visualSlot.className = 'project-visual visual-generic';
        const label = document.createElement('span');
        label.className = 'visual-label';
        label.textContent = 'PROJETO EM DESTAQUE';
        const initials = document.createElement('span');
        initials.className = 'generic-cover-title';
        initials.textContent = project.shortLabel || project.title;
        visualSlot.replaceChildren(label, initials);
        visualSlot.setAttribute('role', 'img');
        visualSlot.setAttribute('aria-label', `Composição tipográfica de ${project.title}`);
      }
      const detail = card.querySelector('button.project-detail');
      if (detail) {
        detail.dataset.project = project.id;
        detail.setAttribute('aria-label', `Explorar projeto ${project.title}`);
      }
      const source = card.querySelector('a.project-source');
      const url = safeProjectUrl(project.url);
      if (source && url) {
        source.href = url;
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
        source.setAttribute('aria-label', `Código de ${project.title}${project.privateRepository ? ', repositório privado' : ''}`);
      } else if (source) {
        source.remove();
      }
      const accessNote = card.querySelector('.access-note');
      if (accessNote) {
        accessNote.hidden = !project.privateRepository;
        accessNote.textContent = project.privateRepository
          ? 'Repositório privado · acesso mediante permissão' : '';
      }
      return fragment;
    });
    grid.replaceChildren(...cards);
  }

  const heroProjects = document.querySelector('#hero-projects');
  if (heroProjects) {
    const heroCards = projects.slice(0, 3).map((project, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'hero-project-card';
      button.dataset.project = project.id;
      button.dataset.theme = project.id;
      button.dataset.cardIndex = String(index);
      button.style.setProperty('--card-index', String(index));
      button.setAttribute('aria-label', `Explorar projeto ${project.title}`);
      const icon = document.createElement('span');
      icon.className = 'hero-card-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = project.shortLabel;
      const copy = document.createElement('span');
      copy.className = 'hero-card-copy';
      const category = document.createElement('span');
      category.className = 'hero-card-category';
      category.textContent = project.categoryLabel;
      const title = document.createElement('span');
      title.className = 'hero-card-title';
      title.textContent = project.title;
      const status = document.createElement('span');
      status.className = 'hero-card-status';
      status.textContent = project.status;
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('class', 'hero-card-arrow arrow-icon');
      arrow.setAttribute('viewBox', '0 0 24 24');
      arrow.setAttribute('aria-hidden', 'true');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrowPath.setAttribute('d', 'M5 19 19 5M5 5h14v14');
      arrow.append(arrowPath);
      copy.append(category, title, status);
      button.append(icon, copy, arrow);
      return button;
    });
    heroProjects.replaceChildren(...heroCards);
  }

  /* Menu móvel. */
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
    window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  /* Filtros após a criação dos cartões. */
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
        ? '1 projeto exibido' : `${visibleCount} projetos exibidos`;
    }
  };
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => filterProjects(button.dataset.filter));
  });
  if (filterButtons.length && projectCards.length) filterProjects('all');

  /* Detalhes compartilhados entre o destaque e a galeria. */
  const dialog = document.querySelector('#project-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogSummary = document.querySelector('#dialog-summary');
  const dialogFeatures = document.querySelector('#dialog-features');
  const dialogTech = document.querySelector('#dialog-tech');
  const dialogLink = document.querySelector('#dialog-link');
  let dialogTrigger = null;
  if (dialog && dialogTitle && dialogSummary && dialogFeatures && dialogTech && dialogLink) {
    document.querySelectorAll('button[data-project]').forEach((button) => {
      button.addEventListener('click', () => {
        const project = projectById.get(button.dataset.project);
        if (!project || dialog.open) return;
        dialogTrigger = button;
        dialogTitle.textContent = project.title;
        dialogSummary.textContent = project.summary;
        replaceList(dialogFeatures, project.features);
        replaceList(dialogTech, project.technologies);
        const url = safeProjectUrl(project.url);
        dialogLink.hidden = !url;
        if (url) dialogLink.href = url;
        dialogLink.textContent = project.privateRepository
          ? 'Ver repositório (pode exigir acesso)' : 'Ver repositório';
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
      if (event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      if (dialogTrigger?.isConnected) dialogTrigger.focus();
      dialogTrigger = null;
    });
  }

  /* Preferência de movimento: o ajuste do sistema sempre é respeitado. */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionToggle = document.querySelector('#toggle-motion');
  let motionPaused = false;
  const updateMotion = () => {
    root.classList.toggle('motion-reduced', reducedMotion.matches);
    root.classList.toggle('motion-paused', motionPaused);
    if (motionToggle) {
      const paused = motionPaused || reducedMotion.matches;
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.disabled = reducedMotion.matches;
      const label = motionToggle.querySelector('.motion-button-label') || motionToggle;
      label.textContent = reducedMotion.matches
        ? 'Movimento reduzido pelo dispositivo'
        : (paused ? 'Ativar animações' : 'Pausar animações');
    }
    if (motionPaused || reducedMotion.matches) {
      document.querySelectorAll('.hero-project-card').forEach((card) => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    }
  };
  motionToggle?.addEventListener('click', () => {
    motionPaused = !motionPaused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();

  document.querySelectorAll('.hero-project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || reducedMotion.matches || motionPaused) return;
      const rect = card.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      card.style.setProperty('--tilt-x', `${-y * 4}deg`);
      card.style.setProperty('--tilt-y', `${x * 5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });

  /* Peças de tecnologia: arraste com mouse/toque ou mova com as setas. */
  const playground = document.querySelector('[data-tech-playground]');
  const feedback = document.querySelector('#tech-feedback');
  const resetTech = document.querySelector('#reset-tech');
  const tokens = [...document.querySelectorAll('.tech-token[data-tech]')];
  const positions = new Map(tokens.map((token) => [token, { x: 0, y: 0 }]));
  let activeDrag = null;
  const announce = (message) => {
    if (feedback) feedback.textContent = message;
  };
  const clampPosition = (token, x, y) => {
    if (!playground) return { x: 0, y: 0 };
    const area = playground.getBoundingClientRect();
    const box = token.getBoundingClientRect();
    const previous = positions.get(token);
    const baseLeft = box.left - previous.x;
    const baseTop = box.top - previous.y;
    const inset = 8;
    return {
      x: Math.max(area.left + inset - baseLeft,
        Math.min(area.right - inset - box.width - baseLeft, x)),
      y: Math.max(area.top + inset - baseTop,
        Math.min(area.bottom - inset - box.height - baseTop, y)),
    };
  };
  const moveToken = (token, x, y) => {
    const position = clampPosition(token, x, y);
    positions.set(token, position);
    token.style.setProperty('--drag-x', `${position.x}px`);
    token.style.setProperty('--drag-y', `${position.y}px`);
  };
  const finishDrag = (cancelled = false) => {
    if (!activeDrag) return;
    const { token, pointerId, startX, startY, moved } = activeDrag;
    activeDrag = null;
    token.classList.remove('is-dragging');
    if (cancelled) moveToken(token, startX, startY);
    if (token.hasPointerCapture(pointerId)) token.releasePointerCapture(pointerId);
    if (moved) token.dataset.suppressClick = 'true';
    announce(`${token.dataset.tech}: ${cancelled ? 'movimento cancelado' : 'posição atualizada'}.`);
  };
  if (playground && tokens.length) {
    tokens.forEach((token) => {
      token.addEventListener('pointerdown', (event) => {
        if (!event.isPrimary || event.button !== 0 || activeDrag) return;
        const position = positions.get(token);
        token.dataset.suppressClick = 'false';
        activeDrag = {
          token, pointerId: event.pointerId,
          clientX: event.clientX, clientY: event.clientY,
          startX: position.x, startY: position.y, moved: false,
        };
        token.classList.add('is-dragging');
        token.setPointerCapture(event.pointerId);
        token.focus({ preventScroll: true });
      });
      token.addEventListener('pointermove', (event) => {
        if (!activeDrag || activeDrag.token !== token || activeDrag.pointerId !== event.pointerId) return;
        const dx = event.clientX - activeDrag.clientX;
        const dy = event.clientY - activeDrag.clientY;
        if (Math.hypot(dx, dy) > 5) activeDrag.moved = true;
        moveToken(token, activeDrag.startX + dx, activeDrag.startY + dy);
      });
      token.addEventListener('pointerup', (event) => {
        if (activeDrag?.pointerId === event.pointerId) finishDrag();
      });
      token.addEventListener('pointercancel', (event) => {
        if (activeDrag?.pointerId === event.pointerId) finishDrag(true);
      });
      token.addEventListener('lostpointercapture', () => {
        if (activeDrag?.token === token) finishDrag(true);
      });
      token.addEventListener('click', (event) => {
        if (token.dataset.suppressClick === 'true') {
          event.preventDefault();
          event.stopPropagation();
          token.dataset.suppressClick = 'false';
        }
      });
      token.addEventListener('keydown', (event) => {
        const directions = {
          ArrowLeft: [-12, 0], ArrowRight: [12, 0],
          ArrowUp: [0, -12], ArrowDown: [0, 12],
        };
        if (directions[event.key]) {
          event.preventDefault();
          const position = positions.get(token);
          const [dx, dy] = directions[event.key];
          moveToken(token, position.x + dx, position.y + dy);
          announce(`${token.dataset.tech}: posição atualizada com o teclado.`);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          if (activeDrag?.token === token) finishDrag(true);
          else {
            moveToken(token, 0, 0);
            announce(`${token.dataset.tech}: posição inicial restaurada.`);
          }
        }
      });
    });
    resetTech?.addEventListener('click', () => {
      if (activeDrag) finishDrag(true);
      tokens.forEach((token) => moveToken(token, 0, 0));
      announce('Todas as tecnologias voltaram às posições iniciais.');
    });
    const clampAll = () => tokens.forEach((token) => {
      const position = positions.get(token);
      moveToken(token, position.x, position.y);
    });
    if ('ResizeObserver' in window) new ResizeObserver(clampAll).observe(playground);
    else window.addEventListener('resize', clampAll);
  }

  const currentYear = document.querySelector('#current-year');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
