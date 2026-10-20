(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const recipient = 'hello@spinofit.com.au'; // Replace with the verified business email before launch.
      const subject = 'SPINOFIT website enquiry';
      const body = [
        'New enquiry from the SPINOFIT website',
        '',
        'Name: ' + (data.get('name') || ''),
        'Email: ' + (data.get('email') || ''),
        'Topic: ' + (data.get('topic') || 'Not specified'),
        '',
        'Message:',
        data.get('message') || '',
        '',
        'Consent: Contact requested through the website form.'
      ].join('\n');
      const mailto = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Your email app should open with the enquiry ready to send. If it does not, email ' + recipient + ' directly.';
      window.location.href = mailto;
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();