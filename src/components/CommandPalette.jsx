import React, { useEffect, useMemo, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home', hint: 'top' },
  { id: 'about', label: 'About', hint: 'profile' },
  { id: 'skills', label: 'Skills', hint: 'ai stack' },
  { id: 'experience', label: 'Experience', hint: 'timeline' },
  { id: 'projects', label: 'Projects', hint: 'work' },
  { id: 'certifications', label: 'Certifications', hint: 'credentials' },
  { id: 'contact', label: 'Contact', hint: 'reach out' },
];

const ACTIONS = [
  { id: 'resume', label: 'Download Resume', hint: 'pdf', href: `${import.meta.env.BASE_URL}Abhinav_resume.pdf` },
  { id: 'github', label: 'Open GitHub', hint: 'external', href: 'https://github.com/Scylax13' },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'external', href: 'https://www.linkedin.com/in/abhinav1311/' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const all = [
      ...SECTIONS.map((s) => ({ ...s, type: 'go' })),
      ...ACTIONS.map((a) => ({ ...a, type: 'action' })),
    ];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const run = (item) => {
    setOpen(false);
    if (!item) return;
    if (item.type === 'action') {
      window.open(item.href, item.id === 'resume' ? '_self' : '_blank');
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(items[active]); }
  };

  return (
    <>
      <button className="cmdk-fab" onClick={() => setOpen(true)} aria-label="Open command palette">
        <span>⌘</span> jump to… <kbd>K</kbd>
      </button>

      {open && (
        <div className="cmdk-backdrop" onMouseDown={() => setOpen(false)}>
          <div className="cmdk" onMouseDown={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              className="cmdk-input"
              placeholder="› type a section or action…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={onListKey}
            />
            <div className="cmdk-list">
              {items.length === 0 && (
                <div className="cmdk-item" style={{ opacity: 0.6 }}>no matches</div>
              )}
              {items.map((item, i) => (
                <button
                  key={item.id}
                  className={`cmdk-item ${i === active ? 'active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(item)}
                >
                  <span className="idx">{item.type === 'action' ? '→' : '#'}</span>
                  <span>{item.label}</span>
                  <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.72rem' }}>{item.hint}</span>
                </button>
              ))}
            </div>
            <div className="cmdk-hint">
              <kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
