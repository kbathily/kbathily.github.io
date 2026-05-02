// Shared page behavior for BB's Bundles project pages.
(function () {
  function normalize(path) {
    return path.replace(/\\/g, '/').split('/').pop() || 'index.html';
  }

  function markCurrentNavLink() {
    var current = normalize(window.location.pathname);
    var navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (normalize(href) === current) {
        link.classList.add('current-page');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setValidationLinks() {
    var pageUrl = window.location.href;
    var htmlLink = document.getElementById('validation-html');
    var cssLink = document.getElementById('validation-css');
    var wcagLink = document.getElementById('validation-wcag');

    if (window.location.protocol === 'file:') {
      return;
    }

    if (htmlLink) {
      htmlLink.href = 'https://validator.w3.org/nu/?doc=' + encodeURIComponent(pageUrl);
    }

    if (cssLink) {
      cssLink.href = 'https://jigsaw.w3.org/css-validator/validator?uri=' + encodeURIComponent(pageUrl);
    }

    if (wcagLink) {
      wcagLink.href = 'https://wave.webaim.org/report#/' + pageUrl;
    }
  }

  function setupContactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');

    if (!form || !status) {
      return;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = 'Please complete all required fields before submitting.';
        return;
      }

      status.textContent = 'Thanks. Your request has been captured for follow-up.';
      form.reset();
    });
  }

  // Delay nav/form setup to allow HTMLInclude to inject shared components.
  window.addEventListener('load', function () {
    markCurrentNavLink();
    setValidationLinks();
    setupContactForm();
  });
})();
