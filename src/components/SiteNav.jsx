import React, { useEffect, useState } from 'react';

const LINKS = [
  { href: '#about', label: 'about', id: 'about' },
  { href: '#skills', label: 'skills', id: 'skills' },
  { href: '#work', label: 'work', id: 'work' },
  { href: '#path', label: 'path', id: 'path' },
  { href: '#contact', label: 'contact', id: 'contact' },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= mid) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand magnetic" onClick={(e) => go(e, '#top')}>
        <span className="mk">A</span>
        <span>Abhinav<span className="gtext">.</span></span>
      </a>

      <div className="nav-links">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`hide-sm ${active === l.id ? 'active' : ''}`}
            onClick={(e) => go(e, l.href)}
          >
            {l.label}
          </a>
        ))}
        <a
          href={`${import.meta.env.BASE_URL}Abhinav_resume.pdf`}
          download="Abhinav_Pratap_Singh_Resume.pdf"
          className="btn hide-sm"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
        >
          résumé
        </a>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={open ? 'x' : ''} />
          <span className={open ? 'x' : ''} />
        </button>
      </div>

      <div className={`nav-sheet ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <div className="nav-sheet-inner" onClick={(e) => e.stopPropagation()}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.id ? 'active' : ''} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}Abhinav_resume.pdf`}
            download="Abhinav_Pratap_Singh_Resume.pdf"
            className="btn"
            style={{ justifyContent: 'center', marginTop: '0.4rem' }}
          >
            download résumé
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
