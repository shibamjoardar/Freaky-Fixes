// Scroll reveal — safe fallback if JS fails (body never gets js-reveal, so CSS rule never hides content)
document.body.classList.add('js-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('main section[id]').forEach((s) => revealObserver.observe(s));

// Guided breathing exercise
const breathBtn = document.getElementById('breathing-toggle');
const breathPhase = document.getElementById('breath-phase');
const circles = document.querySelectorAll('.breathing-circle');
let breathTimer = null;
let breathing = false;

const PHASES = [
  { label: 'Breathe in', duration: 4000, scale: 1.12 },
  { label: 'Hold',       duration: 4000, scale: 1.12 },
  { label: 'Breathe out', duration: 6000, scale: 0.85 },
];

function stepBreath(i = 0) {
  const phase = PHASES[i % PHASES.length];
  breathPhase.textContent = phase.label;
  circles.forEach((c) => {
    c.style.animation = 'none';
    c.style.transition = `transform ${phase.duration}ms ease-in-out`;
    c.style.transform = `scale(${phase.scale})`;
  });
  breathTimer = setTimeout(() => stepBreath(i + 1), phase.duration);
}

function stopBreath() {
  clearTimeout(breathTimer);
  breathPhase.textContent = '';
  circles.forEach((c) => {
    c.style.animation = '';
    c.style.transition = '';
    c.style.transform = '';
  });
}

if (breathBtn) {
  breathBtn.addEventListener('click', () => {
    breathing = !breathing;
    if (breathing) {
      stepBreath();
      breathBtn.innerHTML = '<i class="fa-solid fa-stop" aria-hidden="true"></i> Stop';
    } else {
      stopBreath();
      breathBtn.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i> Start a guided breath';
    }
  });
}

// Session notify toggles (stored locally — not sent anywhere)
document.querySelectorAll('.notify-btn').forEach((btn) => {
  const key = `ff-notify-${btn.dataset.session}`;
  const setState = (on) => {
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Notified ✓' : 'Notify me';
  };
  setState(localStorage.getItem(key) === '1');
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') === 'true';
    if (on) { localStorage.removeItem(key); } else { localStorage.setItem(key, '1'); }
    setState(!on);
  });
});
