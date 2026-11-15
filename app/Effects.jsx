'use client';

import { useEffect } from 'react';

// Page behaviour: nav background on scroll, product-story highlight, stat count-up.
export default function Effects() {
  useEffect(() => {
    const nav = document.querySelector('.nav');
    const screens = [...document.querySelectorAll('.story .screen')];
    const items = [...document.querySelectorAll('.story-list button')];

    // The screen crossing the middle of the viewport is the active step;
    // how far it has travelled past that line drives the running highlight (--p, 0 to 1).
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      const line = window.innerHeight / 2;
      let active = 0;
      let progress = 0;
      screens.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top <= line) {
          active = i;
          progress = Math.min(1, (line - r.top) / r.height);
        }
      });
      items.forEach((b, n) => {
        b.classList.toggle('on', n === active);
        b.style.setProperty('--p', n === active ? progress : 0);
        if (n === active) b.setAttribute('aria-current', 'step');
        else b.removeAttribute('aria-current');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Clicking a phrase scrolls its screen to the middle of the viewport.
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onPick = (e) => {
      screens[items.indexOf(e.currentTarget)].scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    };
    items.forEach((b) => b.addEventListener('click', onPick));

    // Hero carousel. Its position is driven here (not by the CSS animation) so it can drift on its own
    // and also be dragged, swiped, wheeled sideways, or stepped with the two buttons.
    const marquee = document.querySelector('.marquee');
    const track = document.querySelector('.marquee-track');
    const products = [...document.querySelectorAll('.product')];
    const steps = [...document.querySelectorAll('.marquee-nav button')];
    let frame;
    let offset = 0;       // how far the track has moved left, in px; wraps at one set of products
    let glide = 0;        // distance still to travel after a button press
    let dragging = false;
    let lastX = 0;
    let lastTime = 0;
    let resumeAt = 0;     // auto-drift holds off until this time after the user lets go
    const hold = () => { resumeAt = performance.now() + 2500; };
    const onDown = (e) => { dragging = true; lastX = e.clientX; glide = 0; marquee.setPointerCapture(e.pointerId); marquee.classList.add('is-dragging'); };
    const onMove = (e) => { if (!dragging) return; offset -= e.clientX - lastX; lastX = e.clientX; };
    const onUp = () => { if (!dragging) return; dragging = false; marquee.classList.remove('is-dragging'); hold(); };
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // leave vertical scrolling to the page
      e.preventDefault();
      offset += e.deltaX;
      glide = 0;
      hold();
    };
    const onStep = (e) => { glide += (e.currentTarget.dataset.dir === 'next' ? 1 : -1) * (track.scrollWidth / products.length); hold(); };

    const spotlight = (now) => {
      const setWidth = track.scrollWidth / 3; // the products are rendered three times
      const dt = lastTime ? Math.min(now - lastTime, 100) : 0;
      lastTime = now;
      if (glide) {
        const move = Math.abs(glide) < 1 ? glide : glide * 0.14;
        offset += move;
        glide -= move;
      } else if (!dragging && now > resumeAt) {
        offset += (setWidth / 70000) * dt; // one full set every 70 seconds
      }
      offset = ((offset % setWidth) + setWidth) % setWidth;
      track.style.transform = `translateX(${-offset}px)`;

      const mid = window.innerWidth / 2;
      products.forEach((el) => {
        const r = el.getBoundingClientRect();
        // 1 when the product is dead centre, falling to 0 one product-width away.
        const near = Math.max(0, 1 - Math.abs(r.left + r.width / 2 - mid) / r.width);
        const ease = near * near * (3 - 2 * near);
        el.style.transform = `scale(${1 + 0.4 * ease})`;
        el.style.opacity = 0.5 + 0.5 * ease;
      });
      frame = requestAnimationFrame(spotlight);
    };
    if (!reduce && products.length) {
      track.style.animation = 'none';
      marquee.addEventListener('pointerdown', onDown);
      marquee.addEventListener('pointermove', onMove);
      marquee.addEventListener('pointerup', onUp);
      marquee.addEventListener('pointercancel', onUp);
      marquee.addEventListener('wheel', onWheel, { passive: false });
      steps.forEach((b) => b.addEventListener('click', onStep));
      frame = requestAnimationFrame(spotlight);
    }

    let countIO;
    if (!reduce) {
      countIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countIO.unobserve(e.target);
          const el = e.target, target = +el.dataset.count, start = performance.now();
          (function tick(now) {
            const t = Math.min((now - start) / 1200, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(tick);
          })(start);
        });
      }, { threshold: 1 });
      document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      items.forEach((b) => b.removeEventListener('click', onPick));
      if (countIO) countIO.disconnect();
      cancelAnimationFrame(frame);
      if (marquee) {
        marquee.removeEventListener('pointerdown', onDown);
        marquee.removeEventListener('pointermove', onMove);
        marquee.removeEventListener('pointerup', onUp);
        marquee.removeEventListener('pointercancel', onUp);
        marquee.removeEventListener('wheel', onWheel);
      }
      steps.forEach((b) => b.removeEventListener('click', onStep));
    };
  }, []);

  return null;
}
