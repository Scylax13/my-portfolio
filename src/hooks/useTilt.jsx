import { useEffect } from 'react';

// Attaches 3D tilt + glare to all `.tilt` elements within the document.
// Pointer-position drives rotateX/rotateY; resets smoothly on leave.
const useTilt = () => {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const MAX = 7; // degrees
    const bound = new WeakSet();

    const attach = (el) => {
      if (bound.has(el)) return;
      bound.add(el);

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * MAX * 2;
        const rx = (0.5 - py) * MAX * 2;
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      };
      const onLeave = () => {
        el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    };

    const scan = () => document.querySelectorAll('.tilt').forEach(attach);
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const stop = setTimeout(() => mo.disconnect(), 6000);

    return () => {
      mo.disconnect();
      clearTimeout(stop);
    };
  }, []);
};

export default useTilt;
