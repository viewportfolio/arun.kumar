/* ==========================================================================
   GANTA ARUNKUMAR — PORTFOLIO INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Light / Dark Theme Switcher
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('arun_portfolio_theme');

  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme', !isLight);
    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('arun_portfolio_theme', isLight ? 'light' : 'dark');
  });

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });

  // 4. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      workCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Auto-play muted reel preview on hover
  document.querySelectorAll('.reel-card').forEach((card) => {
    const vid = card.querySelector('video');
    if (!vid) return;
    card.addEventListener('mouseenter', () => {
      vid.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      vid.pause();
    });
  });

  // 6. Lightbox Preview Modal (Images + Video Reels)
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const closeBg = document.getElementById('lightboxCloseBg');

  function openLightbox(card) {
    const type = card.getAttribute('data-type');
    const src = card.getAttribute('data-src');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');

    lightboxMedia.innerHTML = '';
    if (type === 'video') {
      const videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.controls = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      lightboxMedia.appendChild(videoEl);
    } else {
      const imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.alt = title;
      lightboxMedia.appendChild(imgEl);
    }

    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxMedia.innerHTML = '';
    document.body.style.overflow = '';
  }

  workCards.forEach((card) => {
    const thumb = card.querySelector('.work-thumb');
    thumb.addEventListener('click', () => openLightbox(card));
  });

  closeBtn.addEventListener('click', closeLightbox);
  closeBg.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  // 7. Contact Form — Direct Email & WhatsApp Dispatch
  const contactForm = document.getElementById('contactForm');
  const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('projectType').value;
    const message = document.getElementById('senderMessage').value.trim();

    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} — from ${name}`);
    const mailBody = encodeURIComponent(
      `Hi Ganta Arunkumar,

Name: ${name}
Email: ${email}
Inquiry: ${subject}

Message:
${message}`
    );
    window.location.href = `mailto:gantaarun1@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  });

  sendWhatsappBtn.addEventListener('click', () => {
    const name = document.getElementById('senderName').value.trim() || 'Visitor';
    const subject = document.getElementById('projectType').value;
    const message = document.getElementById('senderMessage').value.trim() || 'Hi Arunkumar, I would like to connect regarding your design & media work.';

    const waText = encodeURIComponent(
      `Hi Arunkumar, I'm ${name}.
Regarding: ${subject}

${message}`
    );
    window.open(`https://wa.me/917989946429?text=${waText}`, '_blank', 'noopener,noreferrer');
  });

  // 8. Scroll Reveal Animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
});
