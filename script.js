// Elementos compartidos: logotipo, aviso inicial y navegación móvil.
const logoWordmark = document.querySelector('.bios-wordmark');
const liquidCore = document.querySelector('.bios-liquid-core');
const welcomeAlert = document.getElementById('welcomeAlert');
const welcomeAlertClose = document.getElementById('welcomeAlertClose');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// El logo es un video: se quitan los controles flotantes del navegador (PiP, pantalla completa, descarga).
document.querySelectorAll('video.site-logo').forEach((video) => {
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.setAttribute('controlslist', 'nofullscreen nodownload noremoteplayback');
  video.setAttribute('disablepictureinpicture', '');
});

// Trazos SVG de los iconos de línea usados por las páginas.
const lineIconPaths = {
  drop: '<path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z"/><path d="M9.5 15.5a2.8 2.8 0 0 0 2.5 2"/>',
  shield: '<path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
  people: '<circle cx="12" cy="8" r="3"/><path d="M5 20c.5-3.2 2.8-5 7-5s6.5 1.8 7 5"/><path d="M5 11a2.5 2.5 0 0 0-2 2.5M19 11a2.5 2.5 0 0 1 2 2.5"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3.5L14 9V3"/><path d="M8 15h8"/>',
  team: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.5-3.5 2.5-5 5.5-5s5 1.5 5.5 5M15 15c2.8 0 4.5 1.3 5 4"/>',
  report: '<path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  care: '<path d="m12 20-6.5-6.5a4.2 4.2 0 0 1 6-6L12 8l.5-.5a4.2 4.2 0 0 1 6 6z"/><path d="M8 13h2l1-2 2 4 1-2h2"/>',
  food: '<path d="M5 3v7M8 3v7M5 7h3M6.5 10v11M17 3v18M17 3c3 2 3 7 0 8"/>',
};

document.querySelectorAll('.bios-line-icon').forEach((icon) => {
  const iconName = [...icon.classList].find((className) => className.startsWith('bios-line-icon--'))?.replace('bios-line-icon--', '');
  if (!lineIconPaths[iconName]) return;
  icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${lineIconPaths[iconName]}</svg>`;
});

// Reactiva los GIF del logotipo al volver a la pestaña.
function resumeLogoAnimation() {
  if (document.visibilityState !== 'visible') return;
  document.querySelectorAll('img[src^="definitivo.gif"]').forEach((logo) => {
    const source = logo.getAttribute('src');
    logo.setAttribute('src', '');
    logo.setAttribute('src', source);
  });
}

window.addEventListener('pageshow', resumeLogoAnimation);
document.addEventListener('visibilitychange', resumeLogoAnimation);

// Navegación por clic y teclado en las tarjetas del directorio de servicios.
document.querySelectorAll('.services-directory__card').forEach((card) => {
  const link = card.querySelector('.services-directory__link');
  if (!link) return;
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  const openService = () => { window.location.href = link.href; };
  card.addEventListener('click', (event) => { if (!event.target.closest('a')) openService(); });
  card.addEventListener('keydown', (event) => {
  const chatbotKnowledge = [
    { keywords: ['analisis microbiologico de alimentos', 'microbiologico de alimentos'], answer: 'El análisis microbiológico de alimentos apoya la liberación de lotes, el control interno, la verificación de limpieza y la evaluación de vida útil. Según el producto puede incluir coliformes, aerobios mesófilos, mohos, levaduras y búsqueda de patógenos como Salmonella, Listeria o Escherichia coli.' },
    { keywords: ['analisis fisicoquimico de alimentos', 'fisicoquimico de alimentos'], answer: 'El análisis fisicoquímico de alimentos caracteriza propiedades del producto según su tipo, formulación y especificaciones. Los parámetros se definen con la ficha técnica y el objetivo del cliente; consulta con BIOS el alcance disponible para cada matriz.' },
    { keywords: ['ambientes por impacto', 'muestreo por impacto', 'impacto de ambientes'], answer: 'El análisis de ambientes por impacto es un monitoreo microbiológico del aire mediante captura activa en puntos seleccionados. Ayuda a estimar microorganismos suspendidos y revisar zonas que puedan requerir controles de higiene o ventilación.' },
    { keywords: ['ambientes de areas', 'analisis de ambientes', 'ambientes de produccion'], answer: 'El monitoreo de ambientes de áreas observa la carga microbiana en espacios de elaboración, manipulación o almacenamiento. Se describe sedimentación con cajas de Petri expuestas durante 20 minutos, seguida de incubación y evaluación.' },
    { keywords: ['frotis de manos', 'frotis manos', 'hisopado de manos'], answer: 'El frotis de manos ayuda a revisar la higiene de manipuladores. La toma considera palmas, espacios entre los dedos y uñas con un escobillón estéril humedecido en solución salina con Tween 80; luego se analiza la muestra para evaluar indicadores de higiene.' },
    { keywords: ['frotis de superficies', 'frotis superficies', 'hisopado de superficies'], answer: 'El frotis de superficies evalúa utensilios, equipos o superficies en contacto con alimentos para verificar limpieza y desinfección y detectar posibles reservorios de contaminación. Los puntos y microorganismos dependen del proceso y del plan de muestreo.' },
    { keywords: ['vida util', 'fecha de vencimiento', 'fecha vencimiento', 'estudio de vida util'], answer: 'El estudio de vida útil estima durante cuánto tiempo un alimento conserva condiciones aceptables bajo condiciones acordadas. Se toman muestras en distintos momentos del almacenamiento y se combinan análisis microbiológicos y fisicoquímicos. Se requiere definir producto, formulación, empaque y almacenamiento.' },
    { keywords: ['analisis microbiologico de aguas', 'microbiologico de aguas'], answer: 'El análisis microbiológico de aguas evalúa indicadores según la fuente y el uso final. Puede incluir coliformes totales y fecales, Escherichia coli, Pseudomonas aeruginosa y aerobios mesófilos. Aplica, según alcance, a agua potable, embotellada, agrícola, recreativa y de piscinas.' },
    { keywords: ['aguas de suministro', 'agua de suministro', 'agua de red', 'agua de pozo'], answer: 'El análisis de aguas de suministro aplica a agua de redes, pozos u otras fuentes para consumo, uso doméstico o procesos. El alcance puede integrar parámetros físicos, químicos y microbiológicos, definidos según la fuente y el uso previsto.' },
    { keywords: ['aguas de piscinas', 'agua de piscina', 'analisis de piscina', 'piscina'], answer: 'El análisis de agua de piscinas puede incluir parámetros fisicoquímicos como pH, turbidez y desinfectante residual, además de indicadores microbiológicos como heterótrofos, Escherichia coli, Pseudomonas y coliformes. El panel depende del tipo de piscina y los requisitos aplicables.' },
    { keywords: ['agua para uso agricola', 'agua agricola', 'agua de riego', 'riego'], answer: 'El análisis de agua para uso agrícola considera el origen del agua, el cultivo y el sistema de riego. Puede incluir indicadores microbiológicos como coliformes totales y fecales y parámetros fisicoquímicos seleccionados para el uso.' },
    { keywords: ['agua para uso recreativo', 'agua recreativa', 'uso recreativo'], answer: 'El análisis de agua para uso recreativo se define según el cuerpo de agua, el tipo de contacto y la frecuencia de exposición. El alcance puede integrar parámetros microbiológicos y fisicoquímicos de acuerdo con los requisitos aplicables.' },
    { keywords: ['aguas embotelladas', 'agua embotellada', 'agua envasada'], answer: 'El análisis de aguas embotelladas revisa características del producto tratado y envasado. Puede incluir parámetros microbiológicos y fisicoquímicos; el panel se determina según el tipo de agua, el tratamiento y la normativa vigente aplicable.' },
    { keywords: ['analisis fisicoquimico de aguas', 'fisicoquimico de aguas'], answer: 'El análisis fisicoquímico de aguas caracteriza el agua según su procedencia y uso: suministro, piscinas, agua embotellada o riego. Los parámetros y criterios de aceptación se definen para cada matriz y regulación aplicable.' },
    { keywords: ['toma de item', 'item de ensayo', 'toma de muestra', 'muestreo'], answer: 'La toma de ítem de ensayo y muestreo organiza el punto de toma y los datos para identificar la muestra. El recipiente, la conservación, el transporte y la disponibilidad de toma en sitio se confirman con BIOS para cada análisis.' },
    { keywords: ['esterilidad comercial'], answer: 'La esterilidad comercial evalúa productos procesados y envasados para verificar su estabilidad bajo las condiciones previstas de conservación. La muestra, el plan y los microorganismos se definen según el alimento y el envase.' },
    { keywords: ['kelsey maurer', 'kelsey-maurer'], answer: 'La prueba de Kelsey-Maurer evalúa la actividad bactericida y fungicida de un desinfectante bajo condiciones controladas. El ensayo considera el producto, su concentración y el tiempo de contacto definidos.' },
    { keywords: ['reaccion en cadena de la polimerasa', 'analisis pcr', 'pcr'], answer: 'La PCR es una técnica molecular que detecta secuencias genéticas específicas. El microorganismo objetivo, la matriz compatible, el método y el tiempo se confirman con BIOS antes de enviar la muestra.' },
    { keywords: ['e coli stec', 'escherichia coli stec', 'coli stec', 'o157'], answer: 'El análisis de E. coli STEC busca cepas productoras de toxina Shiga, incluido el serotipo O157:H7. La matriz y el método se definen según el alimento y el alcance solicitado.' },
    { keywords: ['campylobacter'], answer: 'El análisis de Campylobacter spp. detecta bacterias de ese género en matrices definidas. Puede ser pertinente en aves, carnes, leche no pasteurizada o agua; BIOS confirma muestra, conservación y método disponible.' },
    { keywords: ['listeria monocytogenes', 'listeria'], answer: 'El análisis de Listeria monocytogenes busca este patógeno en alimentos o ambientes asociados a la producción, especialmente productos listos para consumo y áreas de proceso. La matriz define el método y la toma.' },
    { keywords: ['salmonella'], answer: 'El análisis de Salmonella spp. detecta este género en alimentos y otras matrices de interés. La técnica, el tamaño de muestra y los criterios dependen del producto y del objetivo del análisis.' },
    { keywords: ['analisis de cosmeticos', 'analisis microbiologico de cosmeticos', 'cosmeticos'], answer: 'El análisis microbiológico de cosméticos puede incluir recuentos de aerobios, mohos y levaduras y microorganismos de interés como E. coli, Staphylococcus aureus, Pseudomonas aeruginosa y Candida albicans. El plan depende del producto y su uso.' },
    { keywords: ['servicios para agua y piscina', 'analisis de aguas y piscinas'], answer: 'BIOS realiza análisis microbiológicos y físicos para agua potable y piscinas. Según el alcance, se revisan indicadores como coliformes, Escherichia coli, Pseudomonas y aerobios mesófilos; también pueden solicitarse parámetros como pH e índice de Langelier.' },
    { keywords: ['servicios para centros', 'centros penitenciarios', 'centros carcelarios', 'centro penitenciario'], answer: 'Para centros penitenciarios y carcelarios se ofrecen análisis microbiológicos de alimentos preparados, ensaladas, jugos, quesos y leche en polvo, además de análisis microbiológicos, físicos y químicos de agua potable. También se revisa higiene con frotis de manos y superficies y monitoreo de ambientes.' },
    { keywords: ['servicios para industrias', 'industria panificadora', 'industrias panificadoras', 'galletas y bizcochos', 'panaderia', 'analisis de pan', 'pan'], answer: 'Para pan, galletas y bizcochos se ofrecen análisis microbiológicos y físicos; para galletas y bizcochos también análisis de empaque y migración global y específica. Se puede estudiar la vida útil según producto, empaque y condiciones de almacenamiento.' },
    { keywords: ['servicios para plantas', 'plantas envasadoras', 'planta envasadora', 'beneficio animal', 'plantas de beneficio', 'planta'], answer: 'Para plantas envasadoras y de beneficio animal se ofrecen verificaciones de higiene con frotis de manos y superficies, monitoreo de ambientes y análisis de empaque. Se evalúan mesófilos, coliformes totales, Staphylococcus aureus, mohos y levaduras; para beneficio animal se consideran bovinos, porcinos, bufalinos y aves.' },
  ];

    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openService(); }
  });
});

// Navegación por teclado y clic en las tarjetas de vistas previas.
const servicePreviewLinks = [
  'services-para-plantas-y-piscinas.html',
  'services-para-centros.html',
  'services-para-industriales.html',
];

document.querySelectorAll('.index-page .analysis-preview__grid article').forEach((card, index) => {
  const href = servicePreviewLinks[index];
  if (!href) return;
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  const openService = () => { window.location.href = href; };
  card.addEventListener('click', openService);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openService(); }
  });
});

// Carga prioritaria de imágenes visibles y carga diferida del resto (incluidas las ocultas, que no deben competir).
document.querySelectorAll('img:not(.site-logo):not(.chatbot-bee)').forEach((image) => {
  const isRendered = image.getClientRects().length > 0;
  const imageBounds = image.getBoundingClientRect();
  const nearInitialViewport = isRendered && imageBounds.top < window.innerHeight * 1.25 && imageBounds.bottom > -100;
  image.loading = nearInitialViewport ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.fetchPriority = nearInitialViewport ? 'high' : 'low';
});

// Revelado progresivo de texto, respetando la preferencia de movimiento reducido.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const textElements = document.querySelectorAll('h1, h2, h3, h4, p, li, a, button, label, strong, small, span');
  const textRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('text-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  textElements.forEach((element, index) => {
    if (!element.textContent.trim()) return;
    element.classList.add('text-reveal');
    element.style.setProperty('--text-reveal-delay', `${(index % 4) * 35}ms`);
    textRevealObserver.observe(element);
  });
}

// Refuerzo de navegación accesible en las tarjetas del directorio.
document.querySelectorAll('.services-directory__card').forEach((card) => {
  const link = card.querySelector('.services-directory__link');
  if (!link) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');

  const openService = (event) => {
    if (event.target.closest('a')) return;
    window.location.href = link.href;
  };

  card.addEventListener('click', openService);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = link.href;
    }
  });
});

// Cierre manual y automático del aviso de bienvenida.
if (welcomeAlert) {
  welcomeAlertClose?.addEventListener('click', () => {
    welcomeAlert.classList.add('hidden');
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      welcomeAlert.classList.add('hidden');
    }, 3000);
  });
}

// Interacción táctil y de puntero para el logotipo líquido.
function resetLiquidMotion() {
  if (!liquidCore) return;
  liquidCore.style.setProperty('--tx', '0px');
  liquidCore.style.setProperty('--ty', '0px');
  liquidCore.style.setProperty('--scale', '1');
  liquidCore.style.backgroundPosition = '50% 50%';
  liquidCore.style.filter = 'saturate(1.2) contrast(1.08)';
}

if (logoWordmark && liquidCore) {
  const moveFluid = (x, y) => {
    const rect = logoWordmark.getBoundingClientRect();
    const offsetX = ((x - rect.left) / rect.width - 0.5) * 26;
    const offsetY = ((y - rect.top) / rect.height - 0.5) * 22;
    liquidCore.style.setProperty('--tx', `${offsetX}px`);
    liquidCore.style.setProperty('--ty', `${offsetY}px`);
    liquidCore.style.setProperty('--scale', `${1 + Math.abs(offsetX) / 90}`);
    liquidCore.style.backgroundPosition = `${50 + offsetX * 1.4}% ${50 + offsetY * 1.4}%`;
    liquidCore.style.filter = `saturate(${1.3 + Math.abs(offsetX) / 90}) contrast(1.08) brightness(${1.04 + Math.abs(offsetY) / 120})`;
  };

  logoWordmark.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    moveFluid(event.clientX, event.clientY);
  });

  logoWordmark.addEventListener('pointerleave', resetLiquidMotion);

  logoWordmark.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (touch) {
      moveFluid(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  logoWordmark.addEventListener('touchend', resetLiquidMotion);
  logoWordmark.addEventListener('click', () => {
    liquidCore.style.setProperty('--scale', '1.12');
    setTimeout(resetLiquidMotion, 260);
  });
}

// Apertura y cierre del menú responsive.
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Modal de servicios y modal institucional: apertura, cierre y Escape.
const servicesModal = document.getElementById('servicesModal');
const servicesModalClose = document.getElementById('servicesModalClose');
const servicesTriggers = document.querySelectorAll('[data-services-open]');

function closeServicesModal() {
  if (!servicesModal) return;
  servicesModal.classList.remove('is-open');
  servicesModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (servicesModal) {
  servicesTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      servicesModal.classList.add('is-open');
      servicesModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      servicesModalClose?.focus();
    });
  });

  servicesModalClose?.addEventListener('click', closeServicesModal);

  servicesModal.addEventListener('click', (event) => {
    if (event.target === servicesModal) {
      closeServicesModal();
    }
  });

  servicesModal.querySelectorAll('a[href="#contacto"]').forEach((link) => {
    link.addEventListener('click', closeServicesModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && servicesModal.classList.contains('is-open')) {
      closeServicesModal();
    }
  });
}

const institutionModal = document.getElementById('institutionModal');
const institutionModalClose = document.getElementById('institutionModalClose');
const institutionTriggers = document.querySelectorAll('[data-institution-open]');

function closeInstitutionModal() {
  if (!institutionModal) return;
  institutionModal.classList.remove('is-open');
  institutionModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (institutionModal) {
  institutionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      institutionModal.classList.add('is-open');
      institutionModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      institutionModalClose?.focus();
    });
  });

  institutionModalClose?.addEventListener('click', closeInstitutionModal);
  institutionModal.addEventListener('click', (event) => {
    if (event.target === institutionModal) closeInstitutionModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && institutionModal.classList.contains('is-open')) {
      closeInstitutionModal();
    }
  });
}

// Envío asíncrono del formulario y mensajes de resultado.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formStatus = document.createElement('p');
  formStatus.className = 'contact-form-status';
  formStatus.setAttribute('role', 'status');
  formStatus.setAttribute('aria-live', 'polite');
  contactForm.append(formStatus);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'contact-form-status';

    try {
      const response = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('No se pudo enviar la solicitud.');
      contactForm.reset();
      formStatus.textContent = 'Solicitud enviada. Te contactaremos pronto.';
      formStatus.classList.add('is-success');
    } catch (error) {
      formStatus.textContent = 'No pudimos enviar la solicitud. Intenta nuevamente.';
      formStatus.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}

// Orden, duplicación y avance automático de las galerías del equipo.
document.querySelectorAll('main .team-slider__track').forEach((track) => {
  if (track.hasAttribute('data-manual-train')) return;

  const requestedSlides = [
    { src: 'assets/fondo.webp', alt: 'Personal de BIOS realizando un análisis' },
    { src: 'IMG_7258.webp', alt: 'Personal de BIOS en el laboratorio' },
  { src: 'd4cb3e2d-de51-416a-9eef-e53cda7818f0.webp', alt: 'Personal de BIOS en el laboratorio' },
    { src: 'nueva1.jpg', alt: 'Personal de BIOS en el laboratorio' },
    { src: 'nueva2.jpg', alt: 'Personal de BIOS realizando un análisis' },
  ];

  [...requestedSlides].reverse().forEach(({ src, alt }) => {
    if (track.querySelector(`.team-slider__image[src="${src}"]`)) return;
    const slide = document.createElement('img');
    slide.className = 'team-slider__image';
    slide.loading = 'lazy';
    slide.decoding = 'async';
    slide.src = src;
    slide.alt = alt;
    track.prepend(slide);
  });

  const excludedSources = document.querySelector('#equipo')
    ? ['fondo%20(3).jpg', 'IMG_7182.webp', 'nueva1.jpg', 'd4cb3e2d-de51-416a-9eef-e53cda7818f0.webp', 'IMG_7153.webp', 'IMG_7170.webp', 'IMG_7269.webp']
    : ['fondo%20(3).jpg', 'IMG_7182.webp', 'nueva1.jpg', 'IMG_7269.webp'];
  const allTeamSlides = [...track.querySelectorAll('.team-slider__image')];
  allTeamSlides
    .filter((slide) => excludedSources.includes(slide.getAttribute('src')))
    .forEach((slide) => { slide.style.display = 'none'; });
  const teamSlides = allTeamSlides.filter((slide) => !excludedSources.includes(slide.getAttribute('src')));
  if (teamSlides.length < 2) return;

  const preferredSlides = teamSlides.filter((slide) => ['assets/fondo.webp', 'IMG_7258.webp', 'd4cb3e2d-de51-416a-9eef-e53cda7818f0.webp', 'nueva1.jpg', 'IMG_7186.webp', 'nueva2.jpg', 'IMG_7182.webp'].includes(slide.getAttribute('src')));
  const orderedSlides = [...preferredSlides, ...teamSlides.filter((slide) => !preferredSlides.includes(slide))];
  orderedSlides.forEach((slide) => track.appendChild(slide));
  orderedSlides.forEach((slide, index) => {
    slide.loading = index === 0 ? 'eager' : 'lazy';
    slide.decoding = 'async';
    slide.fetchPriority = index === 0 ? 'high' : 'low';
  });
  orderedSlides.forEach((slide) => slide.classList.remove('is-active'));
  orderedSlides[0].classList.add('is-active');

  if (document.querySelector('#equipo') && !track.dataset.trainCloned) {
    orderedSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.classList.remove('is-active');
      clone.classList.add('team-slider__image--clone');
      clone.loading = 'lazy';
      track.appendChild(clone);
    });
    track.dataset.trainCloned = 'true';
  }

  let currentSlide = 0;

  setInterval(() => {
    orderedSlides[currentSlide].classList.remove('is-active');
    currentSlide = (currentSlide + 1) % orderedSlides.length;
    orderedSlides[currentSlide].classList.add('is-active');
  }, 2600);
});

// Asistente: mensajes, respuestas por intención y derivación a WhatsApp.
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

function pushChatMessage(text, type = 'bot') {
  const bubble = document.createElement('div');
  bubble.className = `chatbot__bubble chatbot__bubble--${type}`;
  bubble.textContent = text;
  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatConversation() {
  const messages = [...chatbotMessages.querySelectorAll('.chatbot__bubble')];
  return messages.map((message) => {
    const sender = message.classList.contains('chatbot__bubble--user') ? 'Cliente' : 'BIOS';
    return `${sender}: ${message.textContent.trim()}`;
  }).join('\n');
}

function pushWhatsAppQuoteAction() {
  if (chatbotMessages.querySelector('.chatbot__whatsapp-link')) return;

  const link = document.createElement('a');
  const conversation = getChatConversation();
  link.className = 'chatbot__whatsapp-link';
  link.href = `https://wa.me/573202511640?text=${encodeURIComponent(`Hola BIOS, quiero solicitar una cotización.\n\n${conversation}`)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Enviar cotización por WhatsApp';
  chatbotMessages.appendChild(link);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function pushWhatsAppAdvisorAction() {
  if (chatbotMessages.querySelector('.chatbot__advisor-link')) return;

  const link = document.createElement('a');
  const conversation = getChatConversation();
  link.className = 'chatbot__whatsapp-link chatbot__advisor-link';
  link.href = `https://wa.me/573202511640?text=${encodeURIComponent(`Hola BIOS, necesito ayuda de un asesor. Esta es mi consulta:\n\n${conversation}`)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Enviar duda al asesor por WhatsApp';
  chatbotMessages.appendChild(link);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function normalizeChatText(message) {
  return message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Respuestas construidas con los alcances publicados en el catálogo y las páginas de servicio.
const chatbotKnowledge = [
  { keywords: ['servicios para agua y piscina', 'analisis de aguas y piscinas'], answer: 'BIOS realiza análisis microbiológicos y físicos para agua potable y piscinas. Según el alcance, se revisan indicadores como coliformes, Escherichia coli, Pseudomonas y aerobios mesófilos; también pueden solicitarse parámetros fisicoquímicos como pH e índice de Langelier. El panel y los criterios dependen del uso y la normativa aplicable.' },
  { keywords: ['servicios para centros', 'centros penitenciarios', 'centros carcelarios', 'centro penitenciario'], answer: 'Para centros penitenciarios y carcelarios se ofrecen análisis microbiológicos de alimentos preparados, ensaladas, jugos, quesos y leche en polvo, además de análisis microbiológicos, físicos y químicos de agua potable. También se puede revisar higiene con frotis de manos y superficies y monitoreo de ambientes.' },
  { keywords: ['servicios para industrias', 'industria panificadora', 'industrias panificadoras', 'galletas y bizcochos', 'panaderia'], answer: 'Para pan, galletas y bizcochos se ofrecen análisis microbiológicos y físicos; para galletas y bizcochos también análisis de empaque y migración global y específica. El catálogo incluye estudios de vida útil; el plan se define según producto, empaque y condiciones de almacenamiento.' },
  { keywords: ['servicios para plantas', 'plantas envasadoras', 'planta envasadora', 'beneficio animal', 'plantas de beneficio'], answer: 'Para plantas envasadoras y de beneficio animal se ofrecen verificaciones de higiene con frotis de manos y superficies, monitoreo de ambientes y análisis de empaque. En empaques se listan mesófilos, coliformes totales, Staphylococcus aureus, mohos y levaduras. Para beneficio animal se consideran bovinos, porcinos, bufalinos y aves.' },
  { keywords: ['vida util', 'fecha de vencimiento', 'fecha vencimiento', 'estudio de vida util'], answer: 'El estudio de vida útil estima durante cuánto tiempo un alimento conserva condiciones aceptables bajo condiciones acordadas. Se toman muestras en distintos momentos del almacenamiento y se combinan análisis microbiológicos y fisicoquímicos. Se requiere definir producto, formulación, empaque y almacenamiento.' },
  { keywords: ['frotis de manos', 'frotis manos', 'hisopado de manos'], answer: 'El frotis de manos ayuda a revisar la higiene de manipuladores. La toma considera palmas, espacios entre los dedos y uñas con un escobillón estéril humedecido en solución salina con Tween 80; luego se analiza la muestra para evaluar indicadores de higiene.' },
  { keywords: ['frotis de superficies', 'frotis superficies', 'hisopado de superficies'], answer: 'El frotis de superficies evalúa utensilios, equipos o superficies en contacto con alimentos para verificar limpieza y desinfección y detectar posibles reservorios de contaminación. Los puntos y microorganismos a evaluar dependen del proceso y del plan de muestreo.' },
  { keywords: ['ambientes por impacto', 'muestreo por impacto', 'impacto de ambientes'], answer: 'El análisis de ambientes por impacto es un monitoreo microbiológico del aire mediante captura activa en puntos seleccionados. Ayuda a estimar microorganismos suspendidos y revisar zonas que puedan requerir controles de higiene o ventilación.' },
  { keywords: ['ambientes de areas', 'analisis de ambientes', 'ambientes de produccion'], answer: 'El monitoreo de ambientes de áreas observa la carga microbiana en espacios de elaboración, manipulación o almacenamiento. En las páginas de servicio se describe sedimentación con cajas de Petri expuestas durante 20 minutos, seguida de incubación y evaluación.' },
  { keywords: ['analisis microbiologico de alimentos', 'microbiologico de alimentos'], answer: 'El análisis microbiológico de alimentos apoya la liberación de lotes, el control interno, la verificación de limpieza y la evaluación de vida útil. Según el producto puede incluir coliformes, aerobios mesófilos, mohos, levaduras y búsqueda de patógenos como Salmonella, Listeria o Escherichia coli.' },
  { keywords: ['analisis fisicoquimico de alimentos', 'fisicoquimico de alimentos'], answer: 'El análisis fisicoquímico de alimentos caracteriza propiedades del producto según su tipo, formulación y especificaciones. Los parámetros se definen con la ficha técnica y el objetivo del cliente; consulta con BIOS el alcance disponible para cada matriz.' },
  { keywords: ['analisis microbiologico de aguas', 'microbiologico de aguas'], answer: 'El análisis microbiológico de aguas evalúa indicadores según la fuente y uso final. Puede incluir coliformes totales y fecales, Escherichia coli, Pseudomonas aeruginosa y aerobios mesófilos. Aplica, según alcance, a agua potable, embotellada, agrícola, recreativa y de piscinas.' },
  { keywords: ['aguas de suministro', 'agua de suministro', 'agua de red', 'agua de pozo'], answer: 'El análisis de aguas de suministro aplica a agua de redes, pozos u otras fuentes para consumo, uso doméstico o procesos. El alcance puede integrar parámetros físicos, químicos y microbiológicos, definidos según la fuente y el uso previsto.' },
  { keywords: ['aguas de piscinas', 'agua de piscina', 'analisis de piscina', 'piscina'], answer: 'El análisis de agua de piscinas puede incluir parámetros fisicoquímicos como pH, turbidez y desinfectante residual, además de indicadores microbiológicos como heterótrofos, Escherichia coli, Pseudomonas y coliformes. El panel depende del tipo de piscina y los requisitos aplicables.' },
  { keywords: ['agua para uso agricola', 'agua agricola', 'agua de riego', 'riego'], answer: 'El análisis de agua para uso agrícola considera el origen del agua, el cultivo y el sistema de riego. Puede incluir indicadores microbiológicos como coliformes totales y fecales y parámetros fisicoquímicos seleccionados para el uso.' },
  { keywords: ['agua para uso recreativo', 'agua recreativa', 'uso recreativo'], answer: 'El análisis de agua para uso recreativo se define según el cuerpo de agua, el tipo de contacto y la frecuencia de exposición. El alcance puede integrar parámetros microbiológicos y fisicoquímicos de acuerdo con los requisitos aplicables.' },
  { keywords: ['aguas embotelladas', 'agua embotellada', 'agua envasada'], answer: 'El análisis de aguas embotelladas revisa características del producto tratado y envasado. Puede incluir parámetros microbiológicos y fisicoquímicos; el panel se determina según el tipo de agua, el tratamiento y la normativa vigente aplicable.' },
  { keywords: ['analisis fisicoquimico de aguas', 'fisicoquimico de aguas'], answer: 'El análisis fisicoquímico de aguas caracteriza el agua según su procedencia y uso, por ejemplo suministro, piscinas, agua embotellada o riego. Los parámetros y criterios de aceptación se definen para cada matriz y regulación aplicable.' },
  { keywords: ['toma de item', 'item de ensayo', 'toma de muestra', 'muestreo'], answer: 'La toma de ítem de ensayo y muestreo organiza el punto de toma y los datos para identificar la muestra. El recipiente, la conservación, el transporte y la disponibilidad de toma en sitio se confirman con BIOS para cada análisis.' },
  { keywords: ['esterilidad comercial', 'esterilidad'], answer: 'La esterilidad comercial evalúa productos procesados y envasados para verificar su estabilidad bajo las condiciones previstas de conservación. La muestra, el plan y los microorganismos se definen según el alimento y el envase.' },
  { keywords: ['kelsey maurer', 'kelsey-maurer'], answer: 'La prueba de Kelsey-Maurer evalúa la actividad bactericida y fungicida de un desinfectante bajo condiciones controladas. El ensayo considera el producto, su concentración y el tiempo de contacto definidos.' },
  { keywords: ['reaccion en cadena de la polimerasa', 'pcr', 'analisis pcr'], answer: 'La PCR es una técnica molecular que detecta secuencias genéticas específicas. El microorganismo objetivo, la matriz compatible, el método y el tiempo se confirman con BIOS antes de enviar la muestra.' },
  { keywords: ['e coli stec', 'escherichia coli stec', 'coli stec', 'o157'], answer: 'El análisis de E. coli STEC busca cepas productoras de toxina Shiga, incluido el serotipo O157:H7. La matriz y el método se definen según el alimento y el alcance solicitado.' },
  { keywords: ['campylobacter'], answer: 'El análisis de Campylobacter spp. detecta bacterias de ese género en matrices definidas. Puede ser pertinente en aves, carnes, leche no pasteurizada o agua; BIOS confirma muestra, conservación y método disponible.' },
  { keywords: ['listeria monocytogenes', 'listeria'], answer: 'El análisis de Listeria monocytogenes busca este patógeno en alimentos o ambientes asociados a la producción, especialmente productos listos para consumo y áreas de proceso. La matriz define el método y la toma.' },
  { keywords: ['salmonella'], answer: 'El análisis de Salmonella spp. detecta este género en alimentos y otras matrices de interés. La técnica, tamaño de muestra y criterios dependen del producto y del objetivo del análisis.' },
  { keywords: ['analisis de cosmeticos', 'analisis microbiologico de cosmeticos', 'cosmeticos'], answer: 'El análisis microbiológico de cosméticos puede incluir recuentos de aerobios, mohos y levaduras y microorganismos de interés como E. coli, Staphylococcus aureus, Pseudomonas aeruginosa y Candida albicans. El plan depende del producto y su uso.' },
];

function handleBotReply(message) {
  const lower = normalizeChatText(message);

  if (/\b(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|saludos)\b/.test(lower)) {
    pushChatMessage('¡Hola! Soy el asistente virtual de BIOS. Puedo orientarte sobre nuestros servicios, análisis, ubicación, horarios y cotizaciones.', 'bot');
    return;
  }

  if (lower.includes('cotiz') || lower.includes('presupuesto') || lower.includes('precio')) {
    pushChatMessage('Claro. Pulsa el botón para enviar toda esta conversación a WhatsApp y solicitar tu cotización.', 'bot');
    pushWhatsAppQuoteAction();
    return;
  }

  const matchedKnowledge = chatbotKnowledge.find((entry) => entry.keywords.some((keyword) => lower.includes(keyword)));
  if (matchedKnowledge) {
    pushChatMessage(matchedKnowledge.answer, 'bot');
    return;
  }

  if (lower.includes('ubic') || lower.includes('direc') || lower.includes('donde')) {
    pushChatMessage('Estamos en Calle 33 B 36-37, barrio Barzal, Villavicencio - Meta. Puedes llamarnos al 608 660 7400 o al 320 251 1640, escribir a info@biosaguasyalimentos.com y visitarnos de 8:00 a 17:00.', 'bot');
    return;
  }

  if (lower.includes('tel') || lower.includes('llamar') || lower.includes('correo') || lower.includes('email') || lower.includes('horario')) {
    pushChatMessage('Puedes llamarnos al 608 660 7400 o al 320 251 1640. También puedes escribir a info@biosaguasyalimentos.com. Atendemos de 8:00 a 17:00.', 'bot');
    return;
  }

  if (lower.includes('catalogo') || lower.includes('analisis disponibles') || lower.includes('pruebas disponibles') || lower.includes('que analisis ofrecen') || lower.includes('que analisis hacen') || lower.includes('que pruebas ofrecen')) {
    pushChatMessage('El catálogo incluye análisis de alimentos (microbiológicos, fisicoquímicos, ambientes, frotis de manos y superficies y vida útil); análisis de aguas (microbiológicos, fisicoquímicos, suministro, piscinas, uso agrícola, recreativo y embotellada); y otros análisis como muestreo, esterilidad comercial, ambientes por impacto, Kelsey-Maurer, PCR, patógenos y cosméticos. Pregúntame por uno para darte su alcance.', 'bot');
    return;
  }

  if (lower.includes('agua')) {
    pushChatMessage('El catálogo de aguas incluye análisis microbiológicos y fisicoquímicos, agua de suministro, piscinas, uso agrícola, uso recreativo y aguas embotelladas. El alcance depende de la fuente y el uso previsto.', 'bot');
    return;
  }

  if (lower.includes('alimento')) {
    pushChatMessage('El catálogo de alimentos incluye análisis microbiológicos y fisicoquímicos, ambientes de áreas, frotis de manos y superficies y estudios de vida útil. Para pan, galletas y bizcochos también se describen análisis físicos, de empaque y migración.', 'bot');
    return;
  }

  if (lower.includes('servicio') || lower.includes('hacen') || lower.includes('ofrecen') || lower.includes('que hace') || lower.includes('quienes son') || lower.includes('informacion')) {
    pushChatMessage('BIOS ofrece análisis microbiológicos y fisicoquímicos para alimentos y aguas; atiende agua y piscinas, centros penitenciarios y carcelarios, industrias panificadoras y plantas envasadoras y de beneficio animal. También ofrece análisis de higiene, empaques, ambientes y estudios de vida útil. Pregúntame por un servicio o revisa el catálogo de análisis.', 'bot');
    return;
  }

  if (lower.includes('asesor') || lower.includes('contact') || lower.includes('pqr')) {
    pushChatMessage('Puedes escribirnos por el formulario de contacto o llamarnos al teléfono de la página para hablar con un asesor.', 'bot');
    return;
  }

  pushChatMessage('No tengo una respuesta para esa consulta. La enviaré a un asesor para que pueda ayudarte. Pulsa el botón para compartir tu duda por WhatsApp.', 'bot');
  pushWhatsAppAdvisorAction();
}

if (chatbotToggle && chatbot && chatbotClose && chatbotMessages && chatbotInput && chatbotSend) {
  chatbotToggle.addEventListener('click', () => {
    const isOpen = chatbot.classList.toggle('open');
    chatbotToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      chatbotInput.focus();
    }
  });

  chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('open');
    chatbotToggle.setAttribute('aria-expanded', 'false');
  });

  chatbotSend.addEventListener('click', () => {
    const value = chatbotInput.value.trim();
    if (!value) return;
    pushChatMessage(value, 'user');
    chatbotInput.value = '';
    setTimeout(() => handleBotReply(value), 400);
  });

  chatbotInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      chatbotSend.click();
    }
  });

  document.querySelectorAll('.chatbot__chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const value = chip.dataset.question || '';
      if (!value) return;
      pushChatMessage(value, 'user');
      setTimeout(() => handleBotReply(value), 400);
    });
  });
}
