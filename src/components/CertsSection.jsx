import React from 'react';

const CERTS = [
  { badge: 'CCA-F', title: 'Claude Certified Architect — Foundations', iss: 'Anthropic' },
  { badge: 'AI-103', title: 'Azure AI Engineer Associate', iss: 'Microsoft' },
  { badge: 'OpenAI', title: 'OpenAI Badges', iss: 'Codex Deployment · API Deployment · Foundational' },
];

const CertsSection = () => (
  <section className="section" id="certs" style={{ paddingTop: 0 }}>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="kicker">/ credentials</span>
        <h2 className="section-title">Certified &amp; validated</h2>
      </div>
      <div className="bento">
        {CERTS.map((c, i) => (
          <div className="card spot tilt reveal b2 cert" data-delay={i * 90} key={c.title}>
            <div className="badge">{c.badge}</div>
            <div>
              <h4>{c.title}</h4>
              <div className="iss">{c.iss}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CertsSection;
