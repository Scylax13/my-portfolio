import React, { useEffect, useState } from 'react';

const Progress = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setW(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" style={{ width: `${w}%` }} aria-hidden="true" />;
};

export default Progress;
