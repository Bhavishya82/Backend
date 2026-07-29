// ---- Terminal typing animation ----
const codeLines = [
  "const developer = {",
  "  name: 'Alex Rivera',",
  "  role: 'Software Developer',",
  "  focus: ['backend', 'dev tooling'],",
  "  status: 'building something new',",
  "};",
  "",
  "export default developer;"
];

const typedEl = document.getElementById('typed-code');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeTerminal() {
  if (!typedEl) return;

  if (reduceMotion) {
    typedEl.textContent = codeLines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let display = '';

  function step() {
    if (lineIndex >= codeLines.length) {
      // brief pause, then restart
      setTimeout(() => {
        display = '';
        lineIndex = 0;
        charIndex = 0;
        typedEl.textContent = '';
        step();
      }, 2200);
      return;
    }

    const currentLine = codeLines[lineIndex];

    if (charIndex <= currentLine.length) {
      typedEl.textContent = display + currentLine.slice(0, charIndex);
      charIndex++;
      setTimeout(step, 22);
    } else {
      display += currentLine + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }

  step();
}

typeTerminal();

// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const siteHeader = document.querySelector('.site-header');

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Contact form (front-end only demo) ----
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();

    // NOTE: this is a static front-end demo. To actually receive messages,
    // wire this up to a backend endpoint, a service like Formspree, or
    // your own serverless function, then replace this block with a fetch() call.
    status.textContent = `Thanks${name ? ', ' + name : ''} — message captured (demo only, not sent anywhere yet).`;
    form.reset();
  });
}
