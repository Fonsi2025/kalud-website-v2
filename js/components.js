/* ============================================================
   KALUD — Shared Nav & Footer Components
   Injected dynamically to keep all pages in sync
   ============================================================ */

// Detect base path: '' for root pages, '../' for subdirectory pages (blog/)
const _base = (() => {
  const path = window.location.pathname.replace(/\\/g, '/');
  // Check if we're inside a subdirectory like /blog/
  const isSubDir = /\/blog\//i.test(path) || /\/[^/]+\/[^/]+\.html$/i.test(
    path.replace(/.*\/Kalud\//i, '/')
  );
  return isSubDir ? '../' : '';
})();

const NAV_HTML = `
<nav class="nav" aria-label="Navegación principal">
  <div class="nav__inner">
    <a href="${_base}index.html" class="nav__logo" aria-label="Kalud - Inicio">
      <img src="${_base}content/img/logo-celeste-y-blanco.png" alt="Kalud" style="height:52px;width:auto;">
    </a>
    <div class="nav__links">
      <div class="nav__dropdown">
        <button class="nav__dropdown-toggle">
          Servicios
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav__dropdown-menu">
          <a href="${_base}quiropraxia-deportiva.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Quiropraxia Deportiva</a>
          <a href="${_base}kinesiologia.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Kinesiología</a>
          <a href="${_base}entrenamiento-personalizado.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Entrenamiento Personalizado</a>
          <a href="${_base}nutricion-deportiva.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Nutrición Deportiva</a>
          <a href="${_base}recovery-masaje-deportivo.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Recovery & Masaje</a>
        </div>
      </div>
      <div class="nav__dropdown">
        <button class="nav__dropdown-toggle">
          Sedes
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav__dropdown-menu">
          <a href="${_base}vitacura.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>Vitacura — Lo Beltrán</a>
          <a href="${_base}linderos.html" class="nav__dropdown-item"><span class="nav__dropdown-item-dot"></span>BOA Park Linderos, Buin</a>
        </div>
      </div>
      <a href="${_base}equipo.html" class="nav__link">Equipo</a>
      <a href="${_base}corporativo.html" class="nav__link">Corporativo</a>
      <a href="${_base}blog.html" class="nav__link">Blog</a>
    </div>
    <a href="https://reserva.kalud.cl/agendar" target="_blank" rel="noopener" class="btn btn--primary btn--sm nav__cta" data-track="nav_agendar">Agendar Hora</a>
    <button class="nav__hamburger" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<nav class="nav__mobile" aria-label="Menú móvil">
  <span class="nav__mobile-label">Servicios</span>
  <a href="${_base}quiropraxia-deportiva.html" class="nav__mobile-link">Quiropraxia Deportiva</a>
  <a href="${_base}kinesiologia.html" class="nav__mobile-link">Kinesiología</a>
  <a href="${_base}entrenamiento-personalizado.html" class="nav__mobile-link">Entrenamiento Personalizado</a>
  <a href="${_base}nutricion-deportiva.html" class="nav__mobile-link">Nutrición Deportiva</a>
  <a href="${_base}recovery-masaje-deportivo.html" class="nav__mobile-link">Recovery & Masaje</a>
  <span class="nav__mobile-label">Sedes</span>
  <a href="${_base}vitacura.html" class="nav__mobile-link">Vitacura — Lo Beltrán</a>
  <a href="${_base}linderos.html" class="nav__mobile-link">BOA Park Linderos, Buin</a>
  <span class="nav__mobile-label">Empresa</span>
  <a href="${_base}equipo.html" class="nav__mobile-link">Nuestro Equipo</a>
  <a href="${_base}corporativo.html" class="nav__mobile-link">Corporativo</a>
  <a href="${_base}blog.html" class="nav__mobile-link">Blog</a>
  <div class="nav__mobile-cta">
    <a href="https://reserva.kalud.cl/agendar" target="_blank" rel="noopener" class="btn btn--primary" style="width:100%;justify-content:center;" data-track="mobile_nav_agendar">Agendar Hora</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="${_base}content/img/logo-celeste-y-blanco.png" alt="Kalud" style="height:44px;width:auto;margin-bottom:16px;">
        <p>Centro de rehabilitación y rendimiento especializado en quiropraxia, kinesiología, entrenamiento y nutrición. Vitacura y BOA Park Linderos, Buin.</p>
        <div class="footer__sedes">
          <div class="footer__sede"><strong>Vitacura</strong><a href="https://www.google.com/maps/place/Lo+Beltr%C3%A1n+1946,+7640558+Vitacura,+Regi%C3%B3n+Metropolitana/@-33.3857857,-70.5695703,17z/" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">Lo Beltrán 1946</a><br>Lun–Vie 08–20 · Sáb 09–14</div>
          <div class="footer__sede"><strong>BOA Park Linderos, Buin</strong>BOA Club Linderos<br>Según agenda</div>
        </div>
        <div class="footer__social">
          <a href="https://instagram.com/kalud.cl" target="_blank" rel="noopener" class="footer__social-link" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/56987376068" target="_blank" rel="noopener" class="footer__social-link" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://tiktok.com/@kalud" target="_blank" rel="noopener" class="footer__social-link" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.81 1.55V6.79a4.85 4.85 0 01-1.04-.1z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Servicios</h4>
        <nav class="footer__links" aria-label="Servicios">
          <a href="${_base}quiropraxia-deportiva.html" class="footer__link">Quiropraxia Deportiva</a>
          <a href="${_base}kinesiologia.html" class="footer__link">Kinesiología Deportiva</a>
          <a href="${_base}kinesiologia.html#piso-pelvico" class="footer__link">Kinesiología Piso Pélvico</a>
          <a href="${_base}entrenamiento-personalizado.html" class="footer__link">Entrenamiento</a>
          <a href="${_base}nutricion-deportiva.html" class="footer__link">Nutrición Deportiva</a>
          <a href="${_base}recovery-masaje-deportivo.html" class="footer__link">Recovery & Masaje</a>
        </nav>
      </div>
      <div class="footer__col">
        <h4>Empresa</h4>
        <nav class="footer__links" aria-label="Empresa">
          <a href="${_base}equipo.html" class="footer__link">Nuestro Equipo</a>
          <a href="${_base}vitacura.html" class="footer__link">Sede Vitacura</a>
          <a href="${_base}linderos.html" class="footer__link">Sede Linderos, Buin</a>
          <a href="${_base}corporativo.html" class="footer__link">Corporativo</a>
          <a href="${_base}blog.html" class="footer__link">Blog Deportivo</a>
        </nav>
      </div>
      <div class="footer__col">
        <h4>Contacto</h4>
        <div class="footer__links">
          <a href="tel:+56987376068" class="footer__link">+56 9 8737 6068</a>
          <a href="mailto:inaki@kalud.cl" class="footer__link">inaki@kalud.cl</a>
          <a href="https://reserva.kalud.cl/agendar" target="_blank" rel="noopener" class="footer__link">Agendar en línea →</a>
          <a href="https://wa.me/56987376068" target="_blank" rel="noopener" class="footer__link">WhatsApp →</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 Kalud. Todos los derechos reservados.</p>
      <div class="footer__bottom-links">
        <a href="#">Política de Privacidad</a>
        <a href="#">Términos de Uso</a>
      </div>
    </div>
  </div>
</footer>`;

// Inject nav and footer if placeholders exist
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;
});
