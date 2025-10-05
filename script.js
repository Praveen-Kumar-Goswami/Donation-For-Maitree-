(function () {
  const header = document.getElementById('header');
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const presetButtons = document.querySelectorAll('.preset');
  const customAmount = document.getElementById('customAmount');
  const donateBtn = document.getElementById('donateBtn');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu(open) {
    const isOpen = typeof open === 'boolean' ? open : mobileMenu.classList.contains('hidden') === true;
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      mobileToggle.setAttribute('aria-expanded', 'true');
      hamburgerIcon.innerHTML = '<path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      mobileMenu.classList.add('hidden');
      mobileToggle.setAttribute('aria-expanded', 'false');
      hamburgerIcon.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18"/>';
    }
  }

  mobileToggle.addEventListener('click', () => toggleMobileMenu());

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMobileMenu(false)));

  function onScroll() {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    // highlight nav link
    let fromTop = window.scrollY + 90;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;
      if (section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
        link.classList.add('text-blue-600');
        link.classList.remove('text-gray-700');
      } else {
        link.classList.remove('text-blue-600');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('section, .hero-content, .p-6').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Preset amount selection
  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const amountText = e.currentTarget.textContent.replace(/[^\d]/g, '');
      customAmount.value = amountText;
      // quick visual feedback
      presetButtons.forEach(b => b.classList.remove('ring-2','ring-blue-200'));
      e.currentTarget.classList.add('ring-2','ring-blue-200');
    });
  });

  // Donate click
  donateBtn.addEventListener('click', () => {
    const val = parseFloat(customAmount.value);
    if (!val || val <= 0) {
      alert('Please enter a valid donation amount (₹).');
      customAmount.focus();
      return;
    }
    const proceed = confirm(`You are about to donate ₹${val.toFixed(2)}. Proceed to payment gateway?`);
    if (proceed) {
      alert('Payment flow would start here. Integrate your payment gateway.');
      customAmount.value = '';
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobileMenu(false);
  });

})();
