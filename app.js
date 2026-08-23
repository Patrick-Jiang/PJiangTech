(() => {
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  if (header && nav) {
    header.classList.add('site-header');
    nav.classList.add('site-nav');
    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main-content';
      skip.textContent = 'Skip to main content';
      document.body.prepend(skip);
    }
    const main = document.querySelector('main, .hero, section, .services-container');
    if (main && !main.id) main.id = 'main-content';

    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '\u2630';
    header.querySelector('.header-right')?.prepend(toggle) || header.append(toggle);
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '\u00d7' : '\u2630';
    });
    nav.querySelectorAll('a').forEach((link) => {
      const current = new URL(link.href, location.href).pathname.split('/').pop() || 'index.html';
      const page = location.pathname.split('/').pop() || 'index.html';
      if (current === page) link.setAttribute('aria-current', 'page');
      if (current === 'contact.html') link.classList.add('nav-cta');
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  document.querySelectorAll('.mode-toggle').forEach((button) => {
    button.type = 'button';
    button.setAttribute('aria-label', 'Toggle light and dark theme');
    button.title = 'Toggle light and dark theme';
  });

  document.querySelectorAll('.accordion').forEach((oldControl, index) => {
    let control = oldControl;
    if (oldControl.tagName !== 'BUTTON') {
      control = document.createElement('button');
      control.className = oldControl.className;
      control.innerHTML = oldControl.innerHTML;
      oldControl.replaceWith(control);
    }
    control.type = 'button';
    const panel = control.nextElementSibling;
    if (!panel) return;
    const panelId = panel.id || `faq-panel-${index + 1}`;
    panel.id = panelId;
    panel.setAttribute('role', 'region');
    control.setAttribute('aria-controls', panelId);
    control.setAttribute('aria-expanded', 'false');
    control.addEventListener('click', () => {
      const open = control.getAttribute('aria-expanded') === 'true';
      control.setAttribute('aria-expanded', String(!open));
      control.classList.toggle('active', !open);
      panel.style.maxHeight = open ? '0px' : `${panel.scrollHeight}px`;
    });
  });
})();
