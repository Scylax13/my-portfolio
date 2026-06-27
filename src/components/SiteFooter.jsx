import React from 'react';

const SiteFooter = () => (
  <footer className="footer">
    <div className="wrap">
      <span className="gtext">{'<'} Abhinav Pratap Singh {'/>'}</span>
      <div style={{ marginTop: '0.5rem', opacity: 0.7 }}>
        designed &amp; built from scratch · react + vite · {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
