import { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import markup from './landing/markup.html?raw';
import './App.css';

export default function App() {
  const page = useRef(null);

  useEffect(() => {
    const container = page.current;
    const controller = new AbortController();
    const options = { signal: controller.signal };
    const observers = [];
    const root = document.documentElement;
    const nav = container.querySelector('#site-nav');
    const toggle = container.querySelector('#menu-toggle');
    root.classList.add('js-enabled');
    const intro = container.querySelector('.site-intro');
    const introTimer = window.setTimeout(() => intro?.remove(), 1800);
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    };
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    }, options);
    nav.addEventListener('click', closeMenu, options);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    }, options);
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    }, options);
    const filters = container.querySelector('.project-filters');
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      let count = 0;
      container.querySelectorAll('.project-card').forEach((card) => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden) count++;
      });
      filters.querySelectorAll('button').forEach((item) => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      container.querySelector('#work-count').textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'PROJECT' : 'PROJECTS'} IN FOCUS`;
    }, options);

    const copy = container.querySelector('.copy-email');
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const status = container.querySelector('.clipboard-status');
      try {
        await navigator.clipboard.writeText('bwithanage327@gmail.com');
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Please copy: bwithanage327@gmail.com';
      }
    }, options);

    const form = container.querySelector('#contact-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = container.querySelector('#form-status');
      const button = form.querySelector('[type="submit"]');
      const values = Object.fromEntries(new FormData(form));
      if (Object.values(values).some((value) => !value.trim())) {
        status.textContent = 'Please complete all fields.';
        return;
      }
      button.disabled = true;
      status.textContent = 'Sending your message…';
      try {
        await emailjs.send('service_wvl4rol', 'template_skfae0d', values, 'kdbLgmYxD-Ja8RWC1');
        if (controller.signal.aborted) return;
        form.reset();
        status.textContent = 'Message sent successfully. Thank you!';
      } catch {
        if (controller.signal.aborted) return;
        status.textContent = 'Your message could not be sent. Please email bwithanage327@gmail.com directly. Your draft is still here.';
      } finally {
        button.disabled = false;
      }
    }, options);

    if ('IntersectionObserver' in window) {
      const sections = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          nav.querySelectorAll('a').forEach((link) => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-15% 0px -65% 0px' });
      container.querySelectorAll('main > section[id]').forEach((section) => sections.observe(section));
      observers.push(sections);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const reveal = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            reveal.unobserve(entry.target);
          });
        }, { threshold: 0.08 });
        container.querySelectorAll('.chapter,.section-heading,.project-card,.about-visual,.about-copy,.service,.tool,.philosophy-inner,.contact-copy,.form-panel').forEach((element) => {
          element.setAttribute('data-reveal', '');
          reveal.observe(element);
        });
        container.classList.add('motion-ready');
        observers.push(reveal);
      }
    }
    const hero = container.querySelector('.hero');
    const name = container.querySelector('.liquid-name');
    const zone = name.querySelector('feImage');
    const displacement = name.querySelector('feDisplacementMap');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let liquidFrame = 0;
    let strength = 0;
    let targetStrength = 0;
    let x = 632;
    let y = 155;
    let targetX = x;
    let targetY = y;
    const animateName = () => {
      x += (targetX - x) * .16;
      y += (targetY - y) * .16;
      strength += (targetStrength - strength) * .12;
      const mask = `<svg xmlns="http://www.w3.org/2000/svg" width="1264" height="310" viewBox="0 0 1264 310"><defs><radialGradient id="fade"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="180" fill="url(#fade)"/></svg>`;
      zone.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(mask)}`);
      displacement.setAttribute('scale', strength);
      if (Math.abs(targetStrength - strength) > .05 || Math.abs(targetX - x) + Math.abs(targetY - y) > .1) {
        liquidFrame = requestAnimationFrame(animateName);
      } else {
        displacement.setAttribute('scale', targetStrength);
        liquidFrame = 0;
      }
    };
    const startLiquid = () => {
      if (!liquidFrame) liquidFrame = requestAnimationFrame(animateName);
    };
    const resetLiquid = () => { targetStrength = 0; startLiquid(); };
    hero.addEventListener('pointermove', (event) => {
      if (motion.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const bounds = name.getBoundingClientRect();
      targetX = (event.clientX - bounds.left) / bounds.width * 1264;
      targetY = (event.clientY - bounds.top) / bounds.height * 310;
      targetStrength = targetY >= -30 && targetY <= 340 ? 65 : 0;
      startLiquid();
    }, { ...options, passive: true });
    hero.addEventListener('pointerleave', resetLiquid, options);
    const updateMotion = () => {
      if (motion.matches || !finePointer.matches) {
        cancelAnimationFrame(liquidFrame);
        liquidFrame = 0;
        strength = targetStrength = 0;
        displacement.setAttribute('scale', '0');
      }
    };
    motion.addEventListener('change', updateMotion, options);
    finePointer.addEventListener('change', updateMotion, options);

    const progress = container.querySelector('.scroll-progress');
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = root.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
      });
    };
    window.addEventListener('scroll', updateProgress, { ...options, passive: true });
    window.addEventListener('resize', updateProgress, options);
    updateProgress();
    return () => {
      cancelAnimationFrame(liquidFrame);
      window.clearTimeout(introTimer);
      controller.abort();
      observers.forEach((observer) => observer.disconnect());
      cancelAnimationFrame(frame);
      root.classList.remove('js-enabled');
      container.classList.remove('motion-ready');
    };
  }, []);

  return <div ref={page} dangerouslySetInnerHTML={{ __html: `<div class="site-intro" aria-hidden="true"><div class="intro-mark">BV<span>.</span></div><span class="intro-label">IDEAS. CODE. IMPACT.</span><span class="intro-line"></span></div><div class="scroll-progress" aria-hidden="true"></div>${markup}` }} />;
}
