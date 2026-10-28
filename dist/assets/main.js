const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

if (menuButton && navigation) {
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
    navigation.classList.toggle('is-open', open);
  };

  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  navigation.addEventListener('focusout', () => {
    // Keep an open mobile menu from disappearing while keyboard focus is inside it.
    requestAnimationFrame(() => {
      if (!navigation.contains(document.activeElement) && document.activeElement !== menuButton) {
        setMenu(false);
      }
    });
  });
  document.documentElement.classList.add('js');
}

// Section highlighting is optional; native anchor navigation works without JavaScript.
const chapterLinks = [...document.querySelectorAll('.case-nav a[href^="#"]')];
const chapters = chapterLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if (chapters.length && 'IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    const first = chapters.find((chapter) => visible.has(chapter.id));
    chapterLinks.forEach((link) => {
      if (first && link.hash === `#${first.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px' });
  chapters.forEach((chapter) => observer.observe(chapter));
}
