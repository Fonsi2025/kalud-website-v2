/* ============================================================
   KALUD  Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /*    NAV SCROLL                                             */
  const onScroll = () => {
    const nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /*    MOBILE NAV — init after components.js injects the nav  */
  function initMobileNav() {
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileNav = document.querySelector('.nav__mobile');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when navigating to another page
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
  document.addEventListener('DOMContentLoaded', initMobileNav);

  /*    SCROLL REVEAL                                          */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /*    COUNTER ANIMATION                                      */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    const duration = 1800;
    const start = performance.now();
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString('es-CL') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach(el => {
      el.dataset.target = el.textContent.replace(/[^0-9]/g, '');
      counterObserver.observe(el);
    });
  }

  /*    FAQ ACCORDION                                          */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq__item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq__answer').style.maxHeight = '';
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
      }
    });
  });

  /*    SMOOTH SCROLL (anchors)                                */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset - 16,
          behavior: 'smooth'
        });
      }
    });
  });

  /*    ACTIVE NAV LINK                                        */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__dropdown-item, .footer__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && currentPath.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });

  /*    GOOGLE ANALYTICS EVENT HELPERS                        */
  window.trackEvent = function (category, action, label) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  };

  function attachAnalyticsListeners() {
    // Track CTA clicks
    document.querySelectorAll('[data-track]:not([data-analytics-attached])').forEach(el => {
      el.setAttribute('data-analytics-attached', 'true');
      el.addEventListener('click', () => {
        window.trackEvent('CTA', 'click', el.dataset.track);
      });
    });

    // Track WhatsApp and Booking clicks
    document.querySelectorAll('a[href*="wa.me"]:not([data-analytics-attached]), a[href*="whatsapp"]:not([data-analytics-attached])').forEach(el => {
      el.setAttribute('data-analytics-attached', 'true');
      el.addEventListener('click', () => window.trackEvent('Contact', 'whatsapp_click', document.title));
    });
    document.querySelectorAll('a[href*="kalud-agenda"]:not([data-analytics-attached])').forEach(el => {
      el.setAttribute('data-analytics-attached', 'true');
      el.addEventListener('click', () => window.trackEvent('Booking', 'booking_click', document.title));
    });
  }

  attachAnalyticsListeners();
  document.addEventListener('DOMContentLoaded', attachAnalyticsListeners);

  /*    TABS                                                    */
  document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const tabGroup = trigger.closest('[data-tabs]');
      if (!tabGroup) return;
      const container = tabGroup.parentElement;
      if (!container) return;
      const target = trigger.dataset.tabTrigger;
      tabGroup.querySelectorAll('[data-tab-trigger]').forEach(t => {
        t.classList.remove('active');
        t.style.borderBottomColor = 'transparent';
        t.style.color = 'var(--gray)';
      });
      container.querySelectorAll('[data-tab-content]').forEach(c => c.style.display = 'none');
      trigger.classList.add('active');
      trigger.style.borderBottomColor = 'var(--blue)';
      trigger.style.color = 'var(--white)';
      const content = container.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.style.display = '';
    });
  });

  // Initialize tabs: show first tab content, hide others
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const container = tabGroup.parentElement;
    if (!container) return;
    const triggers = tabGroup.querySelectorAll('[data-tab-trigger]');
    const contents = container.querySelectorAll('[data-tab-content]');
    if (triggers.length && contents.length) {
      contents.forEach((c, i) => { if (i > 0) c.style.display = 'none'; });
      triggers[0].classList.add('active');
    }
  });

  /*    EXPERTISE CAROUSEL                                     */
  const expertiseScroll = document.getElementById('expertise-scroll');
  if (expertiseScroll) {
    const getCardWidth = () => {
      const card = expertiseScroll.querySelector('.expertise-card');
      return card ? card.offsetWidth + 1 : 320;
    };
    const btnNext = document.querySelector('.expertise-nav__btn--next');
    const btnPrev = document.querySelector('.expertise-nav__btn--prev');
    if (btnNext) btnNext.addEventListener('click', () => {
      expertiseScroll.scrollBy({ left: getCardWidth() * 3, behavior: 'smooth' });
    });
    if (btnPrev) btnPrev.addEventListener('click', () => {
      expertiseScroll.scrollBy({ left: -getCardWidth() * 3, behavior: 'smooth' });
    });
  }

  /*    TEAM CAROUSEL                                         */
  const teamScroll = document.getElementById('team-scroll');
  if (teamScroll) {
    const getTeamCardWidth = () => {
      const card = teamScroll.querySelector('.team-photo-card');
      return card ? card.offsetWidth + 2 : 240;
    };
    const teamBtnNext = document.querySelector('.team-nav__btn--next');
    const teamBtnPrev = document.querySelector('.team-nav__btn--prev');
    if (teamBtnNext) teamBtnNext.addEventListener('click', () => {
      teamScroll.scrollBy({ left: getTeamCardWidth() * 2, behavior: 'smooth' });
    });
    if (teamBtnPrev) teamBtnPrev.addEventListener('click', () => {
      teamScroll.scrollBy({ left: -getTeamCardWidth() * 2, behavior: 'smooth' });
    });
  }

  /*    REVIEWS CAROUSEL                                      */
  const reviewsRoot = document.querySelector('[data-reviews]');
  if (reviewsRoot) {
    const track = reviewsRoot.querySelector('[data-reviews-track]');
    const prevBtn = reviewsRoot.querySelector('[data-reviews-prev]');
    const nextBtn = reviewsRoot.querySelector('[data-reviews-next]');
    const bar = reviewsRoot.querySelector('[data-reviews-bar]');

    const getStep = () => {
      const card = track.querySelector('.review-card');
      if (!card) return track.clientWidth;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    const updateState = () => {
      const max = track.scrollWidth - track.clientWidth;
      const pct = max > 0 ? track.scrollLeft / max : 0;
      if (bar) bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, pct)) + ')';
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 1;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 1;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -getStep(), behavior: 'smooth' }); }
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: getStep(), behavior: 'smooth' }); }
    });

    updateState();
  }

  document.querySelectorAll('.sede-card').forEach(card => {
    const bg = card.querySelector('.sede-card__bg');
    if (!bg) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      bg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });
    card.addEventListener('mouseleave', () => {
      bg.style.transform = '';
    });
  });

  /*    SERVICES DRAWER                                        */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.drawer-trigger');
    if (!trigger) return;
    const card = trigger.closest('.service-card');
    if (!card) return;
    const isOpen = card.classList.contains('drawer-open');
    document.querySelectorAll('.services-grid--carousel .service-card').forEach(c => c.classList.remove('drawer-open'));
    if (!isOpen) card.classList.add('drawer-open');
  });

})();
