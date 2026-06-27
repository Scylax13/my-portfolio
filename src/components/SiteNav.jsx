import React, { useEffect, useState } from 'react';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#work', label: 'work' },
  { href: '#path', label: 'path' },
  { href: '#contact', label: 'contact' },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand magnetic">
        <span className="mk">A</span>
        <span>Abhinav<span className="gtext">.</span></span>
      </a>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hide-sm">{l.label}</a>
        ))}
        <a
          href={`${import.meta.env.BASE_URL}Abhinav_resume.pdf`}
          download="Abhinav_Pratap_Singh_Resume.pdf"
          className="btn"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
        >
          résumé
        </a>
      </div>
    </nav>
  );
};

export default SiteNav;
