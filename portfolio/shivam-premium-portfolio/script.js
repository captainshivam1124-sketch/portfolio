(() => {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const projects = [
    {
      title: 'Brand360 Website',
      url: 'project-pages/brand360.html',
      displayUrl: 'project / brand360.html',
      meta: 'Frontend Developer — Personal Project\nHTML · CSS · JavaScript · Font Awesome',
      details: 'Responsive business landing page built to practice modern layout, UI composition, and smooth interactions.'
    },
    {
      title: 'DriveBharat',
      url: 'project-pages/drivebharat.html',
      displayUrl: 'project / drivebharat.html',
      meta: 'UI/UX + Frontend — Practice Project\nHTML · CSS · JavaScript',
      details: 'Responsive car rental concept built to practice structured content, fleet cards, and a booking interface.'
    },
    {
      title: 'Velora',
      url: 'project-pages/velora.html',
      displayUrl: 'project / velora.html',
      meta: 'UI/UX + Frontend — Practice Project\nHTML · CSS · JavaScript',
      details: 'Fashion landing page built to practice editorial composition, layered visuals, and cinematic scroll presentation.'
    },
    {
      title: 'GlowUp Salon',
      url: 'project-pages/glowup.html',
      displayUrl: 'project / glowup.html',
      meta: 'Frontend Developer — Personal Project\nHTML · CSS · JavaScript',
      details: 'Salon website built to practice service presentation, responsive sections, and a simple appointment flow.'
    },
    {
      title: 'Radiant Glow',
      url: 'project-pages/radiant-glow.html',
      displayUrl: 'project / radiant-glow.html',
      meta: 'UI/UX + Frontend — Practice Project\nHTML · CSS · JavaScript',
      details: 'Skincare landing page built to practice visual storytelling, product sections, and smooth scroll interactions.'
    },
    {
      title: 'Ecommerce',
      url: 'project-pages/ecommerce.html',
      displayUrl: 'project / ecommerce.html',
      meta: 'Frontend Developer — Personal Project\nHTML · CSS · JavaScript',
      details: 'E-commerce interface built to practice product discovery, UI states, and interactive shopping flows.'
    }
  ];

  const html = document.documentElement;
  const loader = qs('#loader');
  const loaderBar = qs('#loaderBar');
  const hideLoader = () => loader?.classList.add('is-done');

  if (loaderBar && !reducedMotion) {
    if (window.gsap) {
      window.gsap.to(loaderBar, { width: '100%', duration: 1.1, ease: 'power2.inOut', onComplete: hideLoader });
    } else {
      loaderBar.style.transition = 'width 1.1s cubic-bezier(.2,.78,.2,1)';
      requestAnimationFrame(() => { loaderBar.style.width = '100%'; });
      setTimeout(hideLoader, 1250);
    }
  } else {
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(hideLoader, reducedMotion ? 80 : 300);
  }
  window.addEventListener('load', () => setTimeout(hideLoader, 200), { once: true });
  setTimeout(hideLoader, 1800);

  const menuToggle = qs('#menuToggle');
  const siteNav = qs('#siteNav');
  menuToggle?.addEventListener('click', () => {
    const open = siteNav?.classList.toggle('is-open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  qsa('#siteNav a').forEach(link => link.addEventListener('click', () => {
    siteNav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  }));

  let lenis = null;
  if (!reducedMotion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, smoothTouch: false, lerp: 0.1 });
    lenis.on('scroll', () => window.ScrollTrigger?.update());
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  const smoothLinks = qsa('a[href^="#"]').filter(link => link.getAttribute('href') !== '#');
  smoothLinks.forEach(link => {
    link.addEventListener('click', event => {
      const target = qs(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const revealElements = qsa('.reveal-up, .reveal-fade');
  const reveal = element => element.classList.add('is-revealed');

  if (window.gsap && window.ScrollTrigger && !reducedMotion) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    revealElements.forEach((el, index) => {
      window.gsap.fromTo(el,
        { y: el.classList.contains('reveal-fade') ? 0 : 30, opacity: 0, scale: el.classList.contains('reveal-fade') ? .985 : 1 },
        { y: 0, opacity: 1, scale: 1, duration: .75, ease: 'power3.out', delay: index < 6 ? index * .06 : 0,
          scrollTrigger: { trigger: el, start: 'top 87%', once: true } }
      );
    });
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); } });
    }, { threshold: .12 });
    revealElements.forEach(el => io.observe(el));
  } else {
    revealElements.forEach(reveal);
  }

  // Hero-only motion system: staged entrance, subtle parallax, scroll transition and magnetic CTAs.
  const hero = qs('#home');
  const heroVisual = qs('.hero__visual', hero);
  const heroPortrait = qs('.hero__portrait', hero);
  const heroFrame = qs('.hero__frame', hero);
  const heroSweep = qs('.hero__sweep', hero);
  const heroMagnetic = qsa('.hero__actions [data-magnetic]', hero);

  if (hero && window.gsap && !reducedMotion) {
    const heroTl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero__meta', { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: .55 })
      .fromTo('.hero__title-line:first-child', { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .85, ease: 'power4.out' }, '-=.12')
      .fromTo('.hero__title-line--indent', { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .9, ease: 'power4.out' }, '-=.62')
      .fromTo('.hero__role', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .58 }, '-=.25')
      .fromTo('.hero__lead', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .58 }, '-=.38')
      .fromTo('.hero__actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, '-=.36')
      .fromTo('.hero__socials', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5 }, '-=.34')
      .fromTo(heroVisual, { clipPath: 'inset(8% 0 8% 12%)', scale: .94, opacity: 0 }, { clipPath: 'inset(0% 0 0% 0%)', scale: 1, opacity: 1, duration: 1.15, ease: 'power4.out' }, '-=.85')
      .fromTo('.hero__floating, .hero__code-label', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .08 }, '-=.55')
      .fromTo('.hero__orbit', { scale: .88, opacity: 0 }, { scale: 1, opacity: 1, duration: .8, stagger: .1 }, '-=.65')
      .fromTo('.hero__foot', { opacity: 0 }, { opacity: 1, duration: .5 }, '-=.3');

    window.gsap.to(heroSweep, { x: '240%', duration: 1.25, delay: .95, ease: 'power2.inOut' });
    window.gsap.to('.hero__scanline', { y: '-100%', duration: 1.8, delay: 1.15, ease: 'sine.inOut', repeat: -1, repeatDelay: 3.2 });

    if (window.ScrollTrigger) {
      window.gsap.to('.hero__title', { y: -42, opacity: .84, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
      window.gsap.to(heroVisual, { y: 52, scale: .94, rotate: -1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } });
      window.gsap.to('.hero__gridline', { y: 70, opacity: .45, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.4 } });
      window.gsap.to('.hero__orbit--one', { rotation: 22, x: -18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.5 } });
    }
  }

  if (hero && finePointer && !reducedMotion) {
    let heroX = 0, heroY = 0;
    const heroPointer = event => {
      const x = (event.clientX / window.innerWidth - .5);
      const y = (event.clientY / window.innerHeight - .5);
      heroX = x; heroY = y;
      if (window.gsap) {
        window.gsap.to(heroFrame, { x: x * 7, y: y * 5, rotateY: x * 2.2, rotateX: -y * 1.8, duration: .9, ease: 'power3.out', overwrite: true });
        window.gsap.to(heroPortrait, { x: x * 5, y: y * 4, scale: 1.035, duration: 1, ease: 'power3.out', overwrite: true });
      }
    };
    window.addEventListener('pointermove', heroPointer, { passive: true });
    hero.addEventListener('pointerleave', () => {
      if (!window.gsap) return;
      window.gsap.to(heroFrame, { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: .8, ease: 'power3.out' });
      window.gsap.to(heroPortrait, { x: 0, y: 0, scale: 1.025, duration: .8, ease: 'power3.out' });
    });

    heroMagnetic.forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const mx = (event.clientX - (rect.left + rect.width / 2)) * .12;
        const my = (event.clientY - (rect.top + rect.height / 2)) * .18;
        if (window.gsap) window.gsap.to(button, { x: mx, y: my, duration: .35, ease: 'power3.out', overwrite: true });
      });
      button.addEventListener('pointerleave', () => {
        if (window.gsap) window.gsap.to(button, { x: 0, y: 0, duration: .45, ease: 'elastic.out(1,.55)' });
      });
    });
  }

  // Signature interaction: active project index + single live preview.
  const projectFrame = qs('#projectFrame');
  const browserUrl = qs('#browserUrl');
  const browserOpen = qs('#browserOpen');
  const projectTitle = qs('#projectTitle');
  const projectMeta = qs('#projectMeta');
  const projectDetails = qs('#projectDetails');
  const browserLoading = qs('#browserLoading');
  const projectButtons = qsa('.project-item');
  let currentProject = -1;

  const setProject = index => {
    const project = projects[index];
    if (!project || !projectFrame || index === currentProject) return;
    currentProject = index;
    projectButtons.forEach((button, i) => button.classList.toggle('is-active', i === index));
    if (browserLoading) browserLoading.classList.remove('is-hidden');
    if (browserUrl) browserUrl.textContent = project.displayUrl;
    if (browserOpen) { browserOpen.href = project.url; browserOpen.setAttribute('aria-label', `Open ${project.title} project`); }
    if (projectTitle) projectTitle.textContent = project.title;
    if (projectMeta) projectMeta.innerHTML = project.meta.replace(/\n/g, '<br>');
    if (projectDetails) projectDetails.textContent = project.details;
    projectFrame.title = `${project.title} project preview`;
    projectFrame.src = project.url;
  };

  projectButtons.forEach(button => button.addEventListener('click', () => setProject(Number(button.dataset.project))));
  projectFrame?.addEventListener('load', () => browserLoading?.classList.add('is-hidden'));
  setProject(0);

  if (window.gsap && window.ScrollTrigger && !reducedMotion) {
    const indexTrigger = qs('#projectIndex');
    if (indexTrigger) {
      qsa('.project-item', indexTrigger).forEach((button, index) => {
        window.ScrollTrigger.create({ trigger: button, start: 'top 68%', end: 'bottom 30%', onEnter: () => setProject(index), onEnterBack: () => setProject(index) });
      });
    }
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setProject(Number(visible.target.dataset.project));
    }, { threshold: [.45,.65,.8] });
    projectButtons.forEach(button => io.observe(button));
  }

  const journeyLine = qs('#journeyLine');
  if (journeyLine) {
    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
      window.gsap.to(journeyLine, { width: '100%', ease: 'none', scrollTrigger: { trigger: '#journey', start: 'top 75%', end: 'bottom 55%', scrub: true } });
    } else {
      const updateJourneyLine = () => {
        const section = qs('#journey');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * .25)));
        journeyLine.style.width = `${progress * 100}%`;
      };
      window.addEventListener('scroll', updateJourneyLine, { passive: true });
      updateJourneyLine();
    }
  }

  const scrollProgress = qs('#scrollProgress');
  const updateScrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    if (scrollProgress) scrollProgress.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  const parallax = qs('[data-parallax]');
  if (parallax && finePointer && !reducedMotion) {
    const move = event => {
      const px = (event.clientX / window.innerWidth - .5) * 8;
      const py = (event.clientY / window.innerHeight - .5) * 6;
      if (window.gsap) window.gsap.to(parallax, { x: px, y: py, duration: .6, ease: 'power3.out', overwrite: true });
      else parallax.style.transform = `translate3d(${px}px,${py}px,0)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
  }

  if (finePointer && !reducedMotion) {
    const cursor = qs('.cursor');
    let targetX = -100, targetY = -100, currentX = -100, currentY = -100;
    window.addEventListener('pointermove', event => {
      targetX = event.clientX; targetY = event.clientY; cursor?.classList.add('is-visible');
    }, { passive: true });
    qsa('a,button,.project-item,.browser-open').forEach(el => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor?.classList.remove('is-hover'));
    });
    const tickCursor = () => {
      currentX += (targetX - currentX) * .18;
      currentY += (targetY - currentY) * .18;
      if (cursor) cursor.style.transform = `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(tickCursor);
    };
    tickCursor();
    document.addEventListener('mouseleave', () => cursor?.classList.remove('is-visible'));
  }

  // Keep the first screen responsive even if remote animation libraries fail to load.
  window.setTimeout(() => revealElements.filter(el => !el.classList.contains('is-revealed')).slice(0, 6).forEach(reveal), 1800);

  // Avoid a stale top navigation on manual focus/keyboard navigation.
  window.addEventListener('hashchange', () => siteNav?.classList.remove('is-open'));
  html.classList.add('js-ready');
})();
