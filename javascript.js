// set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('open');
});

// Skills animation on scroll (IntersectionObserver)
const skillItems = document.querySelectorAll('.skill-item');

function animateSkill(item) {
  const percent = parseInt(item.dataset.percent, 10) || 0;
  const bar = item.querySelector('.bar');
  const percentText = item.querySelector('.skill-percent');

  // animate width
  bar.style.width = percent + '%';

  // count up text
  let start = 0;
  const duration = 800; // ms
  const stepTime = Math.max(10, Math.floor(duration / Math.max(1, percent)));
  const timer = setInterval(() => {
    start++;
    percentText.textContent = start + '%';
    if (start >= percent) clearInterval(timer);
  }, stepTime);
}

if ('IntersectionObserver' in window && skillItems.length) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  skillItems.forEach(i => obs.observe(i));
} else {
  // fallback: animate immediately
  skillItems.forEach(i => animateSkill(i));
}
