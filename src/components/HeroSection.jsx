import React from 'react';
import FlowField from './FlowField';
import useTypingEffect from '../hooks/useTypingEffect';

const ROLES = [
  'Senior AI Engineer',
  'Multi-Agent Architect',
  'RAG Systems Builder',
  'Generative AI Engineer',
];

const HeroSection = () => {
  const typed = useTypingEffect(ROLES, 90);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero" id="top">
      <FlowField />
      <div className="hero-inner">
        <span className="avail reveal in"><i /> available for senior AI roles</span>
        <h1>
          I build <span className="gtext">intelligent</span><br />
          systems that <span className="gtext">think</span>.
        </h1>
        <div className="role mono">
          <span className="b">{'>'}</span> {typed}<span style={{ opacity: 0.6 }}>|</span>
        </div>
        <p className="muted" style={{ maxWidth: '60ch', margin: '1.6rem auto 0' }}>
          I'm <strong style={{ color: 'var(--ink)' }}>Abhinav Pratap Singh</strong> — a Senior AI Engineer
          designing production-grade generative AI: multi-agent architectures, RAG pipelines, and agentic
          workflows powered by LangChain, Azure OpenAI, and the Model Context Protocol.
        </p>
        <div className="cta">
          <button className="btn magnetic" onClick={() => scrollTo('work')}>view my work →</button>
          <button className="btn btn-ghost magnetic" onClick={() => scrollTo('contact')}>get in touch</button>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => scrollTo('about')}>SCROLL</button>
    </header>
  );
};

export default HeroSection;
