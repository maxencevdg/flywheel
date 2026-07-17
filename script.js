
  // Nav scroll state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Count-up numbers
  const counters = document.querySelectorAll('.counter');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const dur = 1200;
        const start = performance.now();
        function tick(now){
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(target * eased);
          el.textContent = val + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countIO.observe(el));