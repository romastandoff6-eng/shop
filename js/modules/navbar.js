export function initNavbar() {
  const navbar = document.querySelector('.navbar-main');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 40) navbar.classList.add('navbar-scrolled');
    else navbar.classList.remove('navbar-scrolled');

    if (current > lastScroll && current > 100)
      navbar.classList.add('navbar-hidden');
    else
      navbar.classList.remove('navbar-hidden');

    lastScroll = current;
  });
}
