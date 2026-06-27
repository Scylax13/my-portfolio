import React, { useEffect, useRef } from 'react';

// Cursor-reactive neural network: drifting nodes connected by lines that
// brighten near the pointer. Pure canvas, no dependencies.
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    let nodes = [];
    let raf = 0;

    const palette = () => {
      const isLight = document.querySelector('.app')?.classList.contains('light');
      return isLight
        ? { line: '13, 148, 136', dot: '15, 118, 110', glow: '124, 58, 237' }
        : { line: '45, 212, 191', dot: '94, 234, 212', glow: '167, 139, 250' };
    };
    let colors = palette();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(90, Math.floor((width * height) / 17000));
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
      }));
    };

    const link = 132;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      colors = palette();

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // gentle pull toward pointer
        const pdx = pointer.x - n.x;
        const pdy = pointer.y - n.y;
        const pd = Math.hypot(pdx, pdy);
        if (pd < 180) {
          n.x += (pdx / pd) * 0.35;
          n.y += (pdy / pd) * 0.35;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < link) {
            const a = (1 - dist / link) * 0.5;
            ctx.strokeStyle = `rgba(${colors.line}, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        const near = pd < 180;
        ctx.fillStyle = near ? `rgba(${colors.glow}, 0.95)` : `rgba(${colors.dot}, 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // connect pointer to nearby nodes
      if (pointer.x > 0) {
        for (const n of nodes) {
          const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (d < 180) {
            ctx.strokeStyle = `rgba(${colors.glow}, ${(1 - d / 180) * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
};

export default NeuralBackground;
