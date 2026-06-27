import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'exp' },
  { id: 'projects', label: 'work' },
  { id: 'certifications', label: 'certs' },
  { id: 'contact', label: 'contact' },
];

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const mid = scrollTop + window.innerHeight / 2;
      let current = 'home';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) current = s.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <nav className="section-rail" aria-label="Section navigation">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`rail-dot ${activeId === s.id ? 'active' : ''}`}
            onClick={() => go(s.id)}
            aria-label={`Go to ${s.label}`}
          >
            <span className="label">{s.label}</span>
            <span className="dot" />
          </button>
        ))}
      </nav>
    </>
  );
};

export default ScrollProgress;
