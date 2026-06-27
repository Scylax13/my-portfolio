import { useEffect, useRef, useState } from 'react';

const coarse = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Global effects: scroll-reveal, card spotlight, 3D tilt, magnetic buttons.
   Scans the DOM (incl. lazily-mounted nodes) and binds once per element. */
export function useGlobalFX() {
  useEffect(() => {
    /* ---- reveal ---- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = e.target.getAttribute('data-delay');
            if (d) e.target.style.transitionDelay = `${d}ms`;
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    const seenReveal = new WeakSet();

    /* ---- spotlight ---- */
    const spotMove = (el) => (ev) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${ev.clientX - r.left}px`);
      el.style.setProperty('--my', `${ev.clientY - r.top}px`);
    };
    const seenSpot = new WeakSet();

    /* ---- tilt ---- */
    const seenTilt = new WeakSet();
    const bindTilt = (el) => {
      const MAX = 6;
      const move = (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * MAX * 2}deg) rotateY(${(px - 0.5) * MAX * 2}deg) translateY(-6px)`;
      };
      const leave = () => { el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
    };

    /* ---- magnetic ---- */
    const seenMag = new WeakSet();
    const bindMag = (el) => {
      const move = (ev) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(ev.clientX - (r.left + r.width / 2)) * 0.25}px, ${(ev.clientY - (r.top + r.height / 2)) * 0.35}px)`;
      };
      const leave = () => { el.style.transform = 'translate(0,0)'; };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
    };

    const allowMotion = !coarse() && !reduce();

    const scan = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (!seenReveal.has(el)) { seenReveal.add(el); io.observe(el); }
      });
      document.querySelectorAll('.spot').forEach((el) => {
        if (!seenSpot.has(el)) { seenSpot.add(el); el.addEventListener('mousemove', spotMove(el)); }
      });
      if (allowMotion) {
        document.querySelectorAll('.tilt').forEach((el) => {
          if (!seenTilt.has(el)) { seenTilt.add(el); bindTilt(el); }
        });
        document.querySelectorAll('.magnetic').forEach((el) => {
          if (!seenMag.has(el)) { seenMag.add(el); bindMag(el); }
        });
      }
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const iv = setInterval(scan, 600);
    const stop = setTimeout(() => clearInterval(iv), 7000);

    return () => { io.disconnect(); mo.disconnect(); clearInterval(iv); clearTimeout(stop); };
  }, []);
}

/* Animated count-up that triggers when the element enters the viewport. */
export function useCountUp(end, duration = 1500, suffix = '') {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        if (reduce()) { setVal(end); return; }
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(end * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(node);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end, duration]);

  const display = Number.isInteger(end) ? Math.round(val) : val.toFixed(1);
  return [ref, `${display}${suffix}`];
}
