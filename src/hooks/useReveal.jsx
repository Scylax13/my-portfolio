import { useEffect } from 'react';

// Global cinematic reveal: watches for any element with the `.reveal` class
// (including lazily-mounted ones) and adds `.in-view` when it enters the
// viewport, with an optional stagger via the `data-reveal-delay` attribute.
const useReveal = () => {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-reveal-delay');
            if (delay) entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    const observed = new WeakSet();
    const scan = () => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    scan();
    // Re-scan as Suspense-lazy sections mount in.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const interval = setInterval(scan, 600);
    const stop = setTimeout(() => clearInterval(interval), 6000);

    return () => {
      observer.disconnect();
      mo.disconnect();
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);
};

export default useReveal;
