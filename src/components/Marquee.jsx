import React from 'react';

const ITEMS = [
  'LangChain', 'Multi-Agent Systems', 'RAG', 'Model Context Protocol',
  'Azure OpenAI', 'Prompt Engineering', 'Agentic Workflows', 'Python',
  'Microservices', 'OpenAI API',
];

const Marquee = () => {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((it, i) => (
          <span className="marquee-item" key={i}>
            {it}<span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
