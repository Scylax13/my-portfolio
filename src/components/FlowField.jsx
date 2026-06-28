import React, { useEffect, useRef } from 'react';

// Generative flow-field: gradient particles drift along a smooth pseudo-noise
// vector field, leaving soft trails. Cursor gently bends the flow nearby.
const FlowField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const COLORS = ['#22d3ee', '#6366f1', '#a855f7', '#ec4899'];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(260, Math.floor((w * h) / 6500));
      particles = Array.from({ length: count }, () => spawn());
      ctx.clearRect(0, 0, w, h);
    };

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      sp: Math.random() * 0.6 + 0.4,
      life: Math.random() * 200 + 60,
    });

    // smooth angle field from cheap trig noise
    const field = (x, y, t) => {
      const a = Math.sin(x * 0.0023 + t) + Math.cos(y * 0.0021 - t * 0.8) + Math.sin((x + y) * 0.0013 + t * 0.4);
      return a * 1.4;
    };

    let t = 0;
    const draw = () => {
      if (!visible) return;
      t += 0.0016;
      // fade previous frame for trails
      ctx.fillStyle = 'rgba(7, 6, 15, 0.075)';
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        let ang = field(p.x, p.y, t);
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pd = Math.hypot(pdx, pdy);
        if (pd < 150) ang += (Math.atan2(pdy, pdx)) * (1 - pd / 150) * 1.2;

        p.x += Math.cos(ang) * p.sp * 1.4;
        p.y += Math.sin(ang) * p.sp * 1.4;
        p.life -= 1;

        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          Object.assign(p, spawn());
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    // Pause the animation loop when the hero scrolls out of view (saves CPU/battery).
    const vis = new IntersectionObserver(([e]) => {
      const wasVisible = visible;
      visible = e.isIntersecting;
      if (visible && !wasVisible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    }, { threshold: 0 });
    vis.observe(canvas);

    if (reduce) {
      // single static frame
      ctx.fillStyle = 'rgba(7,6,15,1)';
      ctx.fillRect(0, 0, w, h);
      for (const p of particles) {
        ctx.fillStyle = p.c; ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      vis.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="flow" aria-hidden="true" />;
};

export default FlowField;
