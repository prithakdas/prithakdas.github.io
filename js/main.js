// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============ Achievements page tabs ============
const credTabs = document.querySelectorAll('.cred-tab');
credTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    credTabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cred-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// Open CTF tab by default
if (credTabs.length) {
  document.querySelector('[data-target="panel-ctf"]').click();
}

// ============ Certificate / deck view modal ============
const certModal = document.getElementById('certModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.cert-view-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    modalTitle.textContent = trigger.dataset.title || 'Certificate';
    certModal.classList.add('open');
  });
});

function closeModal() {
  certModal.classList.remove('open');
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (certModal) {
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============ CTF category filter chips ============
const ctfFilters = document.querySelectorAll('#ctfFilters .filter-chip');
const trophyCards = document.querySelectorAll('#ctfList .trophy-card');
ctfFilters.forEach(chip => {
  chip.addEventListener('click', () => {
    ctfFilters.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    trophyCards.forEach(card => {
      const cats = (card.dataset.cat || '').split(' ');
      card.style.display = (filter === 'all' || cats.includes(filter)) ? 'flex' : 'none';
    });
  });
});

// ============ Contact form ============
// NOTE: This is a static site with no backend. By default this opens the
// visitor's email client via a mailto: link pre-filled with their message.
// To receive submissions directly without the visitor needing a mail client,
// sign up for a free form endpoint (e.g. Formspree or EmailJS) and swap the
// logic below for a fetch() POST to that endpoint. See README.md.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'form-status err';
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `mailto:prithakpdas@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    formStatus.textContent = 'Opening your email client to send this message…';
    formStatus.className = 'form-status ok';
  });
}

// ============ Copy email button ============
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = document.getElementById('emailValue').textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = 'Copied';
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
        copyEmailBtn.classList.remove('copied');
      }, 1800);
    } catch {
      // Clipboard API unavailable — fail silently, email is still visible to select/copy manually.
    }
  });
}

// ============ Scroll-reveal animation ============
const revealSelectors = '.project-card, .cert-card, .cred-item, .trophy-card, .telemetry-stat, .link-card, .skill-group, .about-stats .stat';
const revealEls = document.querySelectorAll(revealSelectors);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============ Scrollspy: highlight active nav link ============
const sections = document.querySelectorAll('main section[id], section[id]');
const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && spyLinks.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        spyLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(section => spyObserver.observe(section));
}

// ============ Back to top button ============
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const typingText = document.getElementById("typing-text");

if (typingText) {

    const words = [
        "Penetration Tester & Security Researcher",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 3000);
                return;
            }

        } else {

            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

        }

        setTimeout(typeEffect, deleting ? 40 : 80);
    }

    typeEffect();
}
/* =====================================
   Cursor Spotlight
===================================== */

const spotlightCards = document.querySelectorAll(
  '.project-card, .cred-item, .cert-card, .link-card, .telemetry-stat, .trophy-card'
  );
  
  spotlightCards.forEach(card=>{
  
      card.classList.add("spotlight");
  
      card.addEventListener("mousemove",(e)=>{
  
          const rect = card.getBoundingClientRect();
  
          const x = e.clientX - rect.left;
  
          const y = e.clientY - rect.top;
  
          card.style.setProperty("--x", `${x}px`);
  
          card.style.setProperty("--y", `${y}px`);
  
      });
  
  });

  document.addEventListener("mousemove",(e)=>{

    document.body.style.setProperty("--mouse-x",`${e.clientX}px`);

    document.body.style.setProperty("--mouse-y",`${e.clientY}px`);

});