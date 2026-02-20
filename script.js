document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS
  AOS.init({ duration: 800, offset: 100, once: true });

  // 2. Initialize GLightbox
  const lightbox = GLightbox({ selector: '.glightbox' });

  // 3. Dark Mode Logic
  const themeToggle = document.getElementById('dark-mode-toggle');
  const themeIcon = themeToggle.querySelector('i');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  });

  // 4. Navigation Logic
  const navLinks = document.querySelectorAll('.nav-links a, .btn, .logo');
  const sections = document.querySelectorAll('.section');
  const navList = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');

  const showSection = (targetId) => {
    const waIcon = document.querySelector(".whatsapp-float");
    if (waIcon) {
      if (targetId === "contact") {
        waIcon.classList.add("show");
      } else {
        waIcon.classList.remove("show");
      }
    }
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetId) {
        section.classList.add('active');
        window.scrollTo(0, 0);
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === targetId) {
        link.classList.add('active');
      }
    });

    if (navList.classList.contains('mobile-active')) {
      navList.classList.remove('mobile-active');
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-section');
      if (targetId) {
        e.preventDefault();
        showSection(targetId);
      }
    });
  });

  
  // Initial WhatsApp visibility check
  const initSection = document.querySelector(".section.active");
  if (initSection) {
    showSection(initSection.id);
  }
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('mobile-active');
  });
});





