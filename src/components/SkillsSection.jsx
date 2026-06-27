import React, { useEffect, useRef, useState } from 'react';

const CORE = [
  { name: 'Generative AI & LLMs', meta: 'Azure OpenAI · OpenAI API', level: 92 },
  { name: 'Agentic Systems & MCP', meta: 'Multi-agent · orchestration', level: 90 },
  { name: 'RAG Pipelines', meta: 'ingest · embed · retrieve', level: 88 },
  { name: 'LangChain', meta: 'chains · agents · tools', level: 86 },
  { name: 'Prompt & Context Engineering', meta: 'reliability at scale', level: 90 },
  { name: 'Python', meta: 'backends · automation', level: 88 },
];

const STACK = [
  'Azure AI Services', 'OpenAI API', 'Google Cloud', 'Dialogflow CX',
  'Microservices', 'REST APIs', 'Agile', 'MERN Stack', 'CI/CD',
];

const SkillsSection = () => {
  const [shown, setShown] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">/ skills</span>
          <h2 className="section-title">The AI stack I build with</h2>
          <p className="section-sub">From first prompt to production deployment — the tools and disciplines behind every system I ship.</p>
        </div>

        <div className="grid-2" ref={ref}>
          <div className="card spot reveal">
            {CORE.map((s, i) => (
              <div className="skill-row" key={s.name}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="name">{s.name}</span>
                    <span className="meta">{s.meta}</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: shown ? `${s.level}%` : 0, transitionDelay: `${i * 110}ms` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card spot reveal" data-delay="120">
            <div className="mono" style={{ color: 'var(--c4)', fontSize: '0.8rem', marginBottom: '1rem' }}>// also in the toolkit</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
              {STACK.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
            <div style={{ marginTop: '1.6rem', paddingTop: '1.2rem', borderTop: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--c4)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>// approach</div>
              <p className="muted" style={{ margin: 0, fontSize: '0.96rem' }}>
                I treat LLMs as systems, not magic: measurable, observable, and grounded.
                Every agent is governed by deliberate prompt and context engineering so behaviour
                stays consistent in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
