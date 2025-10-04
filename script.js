// Navbar scroll color change
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('transparent-nav');
  } else {
    navbar.classList.add('transparent-nav');
    navbar.classList.remove('scrolled');
  }
});
