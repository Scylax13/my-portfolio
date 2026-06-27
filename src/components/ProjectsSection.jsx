import React, { useEffect, useState } from 'react';

const PROJECTS = [
  {
    title: 'Multi-Agent AI System',
    blurb: 'Autonomous agents that decompose, delegate, and execute complex enterprise workflows — coordinated over MCP.',
    tags: ['Multi-Agent', 'MCP', 'LangChain', 'Microservices'],
    detail:
      'Architected and deployed a production-grade multi-agent system for an enterprise client. Specialized agents autonomously decompose tasks, delegate to one another, and execute — dramatically reducing manual intervention in complex workflows. The Model Context Protocol serves as the communication layer between agents and external tools, giving the architecture a scalable, maintainable backbone inside a microservices ecosystem.',
    features: [
      'Autonomous task decomposition, delegation & execution',
      'MCP as the agent-to-tool communication layer',
      'Scalable agentic architecture in microservices',
      'Prompt & context engineering for low-hallucination output',
    ],
  },
  {
    title: 'Generative AI RAG Chatbot',
    blurb: 'Knowledge-grounded conversational AI with a full retrieval-augmented generation pipeline on Azure.',
    tags: ['Azure OpenAI', 'LangChain', 'RAG', 'Python'],
    detail:
      'A production Generative AI chatbot built on Azure OpenAI and LangChain, implementing a complete RAG architecture from dataset preparation through cloud deployment. It delivers context-aware, document-grounded answers for high-stakes use cases, with custom prompt engineering for reliability and a scalable Azure deployment.',
    features: [
      'End-to-end RAG: ingestion, chunking, embedding, retrieval',
      'Context-aware, document-grounded responses',
      'Custom prompt engineering for reliability',
      'Scalable cloud deployment on Azure',
    ],
  },
  {
    title: 'Dialogflow CX IVR Chatbot',
    blurb: 'Conversational IVR automation that handles customer flows and reduces dependency on live agents.',
    tags: ['Dialogflow CX', 'Google Cloud', 'IVR', 'Python'],
    detail:
      'An IVR-based conversational chatbot designed on Dialogflow CX to automate customer interaction flows. It understands natural-language queries, drives multi-turn conversations, and routes intelligently — cutting live-agent dependency for routine requests while integrating with telephony and backend services.',
    features: [
      'Natural-language understanding for customer queries',
      'Automated multi-turn interaction flows',
      'Reduced live-agent dependency for routine queries',
      'Integration with telephony & backend services',
    ],
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);

  const p = active !== null ? PROJECTS[active] : null;

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">/ selected work</span>
          <h2 className="section-title">Production AI, shipped</h2>
          <p className="section-sub">Real systems I've designed and deployed. Tap any card for the full story.</p>
        </div>

        <div className="bento">
          {PROJECTS.map((proj, i) => (
            <div
              className={`card spot tilt reveal proj ${i === 0 ? 'b6' : 'b3'}`}
              data-delay={i * 90}
              key={proj.title}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setActive(i); }}
            >
              <div className="idx">0{i + 1} / agentic</div>
              <h3>{proj.title}</h3>
              <p>{proj.blurb}</p>
              <div className="tags">
                {proj.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              <span className="open">open case study →</span>
            </div>
          ))}
        </div>
      </div>

      {p && (
        <div className="modal-bg" onMouseDown={() => setActive(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setActive(null)} aria-label="Close">✕</button>
            <div className="mono" style={{ color: 'var(--c4)', fontSize: '0.8rem' }}>case study</div>
            <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0 1rem' }}>{p.title}</h3>
            <p className="muted">{p.detail}</p>
            <div className="mono" style={{ color: 'var(--c4)', fontSize: '0.8rem', margin: '1.4rem 0 0.7rem' }}>// highlights</div>
            <ul style={{ color: 'var(--ink-soft)', paddingLeft: '1.1rem', margin: 0 }}>
              {p.features.map((f, j) => <li key={j} style={{ marginBottom: '0.4rem' }}>{f}</li>)}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
