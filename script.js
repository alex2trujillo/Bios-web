const logoWordmark = document.querySelector('.bios-wordmark');
const liquidCore = document.querySelector('.bios-liquid-core');
const welcomeAlert = document.getElementById('welcomeAlert');
const welcomeAlertClose = document.getElementById('welcomeAlertClose');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

document.querySelectorAll('img:not(.site-logo):not(.chatbot-bee)').forEach((image) => {
  image.loading = 'lazy';
  image.decoding = 'async';
  image.fetchPriority = 'low';
});

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

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
  });
}

document.querySelectorAll('main .team-slider__track').forEach((track) => {
  const requestedSlides = [
    { src: 'nueva1.jpg', alt: 'Personal de BIOS en el laboratorio' },
    { src: 'nueva2.jpg', alt: 'Personal de BIOS realizando un análisis' },
  ];

  [...requestedSlides].reverse().forEach(({ src, alt }) => {
    if (track.querySelector(`.team-slider__image[src="${src}"]`)) return;
    const slide = document.createElement('img');
    slide.className = 'team-slider__image';
    slide.src = src;
    slide.alt = alt;
    track.prepend(slide);
  });

  const excludedSources = document.querySelector('#equipo')
    ? ['fondo%20(3).jpg', 'fondo.jpg', 'IMG_7153.jpg', 'IMG_7170.jpg', 'IMG_7269.jpg']
    : ['fondo%20(3).jpg', 'fondo.jpg', 'IMG_7269.jpg'];
  const allTeamSlides = [...track.querySelectorAll('.team-slider__image')];
  allTeamSlides
    .filter((slide) => excludedSources.includes(slide.getAttribute('src')))
    .forEach((slide) => { slide.style.display = 'none'; });
  const teamSlides = allTeamSlides.filter((slide) => !excludedSources.includes(slide.getAttribute('src')));
  if (teamSlides.length < 2) return;

  const preferredSlides = teamSlides.filter((slide) => ['IMG_7182.jpg', 'IMG_7186.jpg', 'nueva1.jpg', 'nueva2.jpg'].includes(slide.getAttribute('src')));
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

  if (lower.includes('ubic') || lower.includes('direc') || lower.includes('donde')) {
    pushChatMessage('Estamos en Calle 33 B 36-37, barrio Barzal, Villavicencio - Meta. Puedes llamarnos al 608 660 7400 o al 320 251 1640, escribir a info@biosaguasyalimentos.com y visitarnos de 8:00 a 17:00.', 'bot');
    return;
  }

  if (lower.includes('tel') || lower.includes('llamar') || lower.includes('correo') || lower.includes('email') || lower.includes('horario')) {
    pushChatMessage('Puedes llamarnos al 608 660 7400 o al 320 251 1640. También puedes escribir a info@biosaguasyalimentos.com. Atendemos de 8:00 a 17:00.', 'bot');
    return;
  }

  if (lower.includes('agua')) {
    pushChatMessage('Podemos ayudarte con análisis microbiológicos y fisicoquímicos de agua potable, residual y de procesos.', 'bot');
    return;
  }

  if (lower.includes('alimento')) {
    pushChatMessage('Contamos con análisis para alimentos, cumplimiento normativo y control de calidad en producción.', 'bot');
    return;
  }

  if (lower.includes('piscin') || lower.includes('planta')) {
    pushChatMessage('En plantas y piscinas realizamos análisis microbiológicos, físicos y químicos de agua, controles de higiene, análisis de empaques y apoyo para plantas de beneficio animal.', 'bot');
    return;
  }

  if (lower.includes('centro') || lower.includes('penitenci') || lower.includes('carcel')) {
    pushChatMessage('Para centros penitenciarios y carcelarios analizamos alimentos preparados, ensaladas, jugos, quesos, leche en polvo y agua potable.', 'bot');
    return;
  }

  if (lower.includes('industr') || lower.includes('pan') || lower.includes('galleta') || lower.includes('bizcocho')) {
    pushChatMessage('Para industrias panificadoras ofrecemos análisis microbiológicos, físicos, de empaques y de migración para pan, galletas y bizcochos.', 'bot');
    return;
  }

  if (lower.includes('servicio') || lower.includes('hacen') || lower.includes('ofrecen') || lower.includes('que hace') || lower.includes('quienes son') || lower.includes('informacion')) {
    pushChatMessage('BIOS es un laboratorio de control de calidad especializado en análisis microbiológicos y fisicoquímicos de aguas y alimentos. Atendemos plantas y piscinas, centros penitenciarios y carcelarios, plantas de beneficio animal e industrias panificadoras.', 'bot');
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
