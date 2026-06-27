import React, { useEffect, useState } from 'react';

const BOOT_LINES = [
  { t: 'initializing agent runtime', d: 250 },
  { t: 'loading neural network', d: 650 },
  { t: 'mounting RAG pipeline', d: 1050 },
  { t: 'connecting MCP tools', d: 1450 },
  { t: 'portfolio ready', d: 1800, ok: true },
];

const Preloader = ({ onDone }) => {
  const [visible, setVisible] = useState(BOOT_LINES.map(() => false));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 400 : 2300;
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, reduce ? i * 60 : line.d)
    );
    const finish = setTimeout(() => setDone(true), total);
    const unmount = setTimeout(() => onDone && onDone(), total + 650);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
      clearTimeout(unmount);
    };
  }, [onDone]);

  return (
    <div className={`preloader ${done ? 'done' : ''}`} aria-hidden="true">
      <div className="preloader-terminal">
        <div className="preloader-bar-dots"><span /><span /><span /></div>
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className="preloader-line"
            style={{ opacity: visible[i] ? 1 : 0, transition: 'opacity 0.25s ease' }}
          >
            <span className="prompt">$</span> {line.t}
            {visible[i] && (
              <span className={line.ok ? 'ok' : ''}>
                {' '}{line.ok ? '✓ done' : '... ok'}
              </span>
            )}
          </div>
        ))}
        <div className="preloader-progress"><i /></div>
      </div>
    </div>
  );
};

export default Preloader;
