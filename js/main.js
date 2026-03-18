/* EMBALATEC — main.js */
document.addEventListener('DOMContentLoaded', () => {

  /* header scroll */
  const hdr = document.getElementById('hdr');
  const tick = () => hdr.classList.toggle('on', scrollY > 55);
  window.addEventListener('scroll', tick, {passive:true});
  tick();

  /* hamburger */
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mobNav');
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      hbg.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hbg.classList.remove('open');
      mob.classList.remove('open');
    }));
  }

  /* active nav */
  const pg = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(a => {
    if (a.getAttribute('href') === pg) a.classList.add('active');
  });

  /* scroll reveal */
  const revEls = document.querySelectorAll('[data-r]');
  if (revEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = +e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add('vis'), d);
          io.unobserve(e.target);
        }
      });
    }, {threshold: .11});
    revEls.forEach(el => io.observe(el));
  }

  /* stagger children */
  document.querySelectorAll('[data-stagger]').forEach(g => {
    g.querySelectorAll('[data-r]').forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 90;
    });
  });

  /* counters */
  const cnts = document.querySelectorAll('[data-count]');
  if (cnts.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el  = e.target;
        const tgt = +el.dataset.count;
        const suf = el.dataset.suffix || '';
        const pre = el.dataset.prefix || '';
        let cur = 0;
        const step = Math.ceil(tgt / 55);
        const t = setInterval(() => {
          cur = Math.min(cur + step, tgt);
          el.textContent = pre + cur + suf;
          if (cur >= tgt) clearInterval(t);
        }, 26);
        cio.unobserve(el);
      });
    }, {threshold: .5});
    cnts.forEach(el => cio.observe(el));
  }

  /* forms */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1500));
      form.reset();
      btn.textContent = orig;
      btn.disabled = false;
      const ok = form.querySelector('.form-ok');
      if (ok) { ok.classList.add('show'); setTimeout(() => ok.classList.remove('show'), 6000); }
    });
  });
});
