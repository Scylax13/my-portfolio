import React from 'react';

const ROLES = [
  {
    when: 'Nov 2025 — Present',
    role: 'Senior AI Developer',
    co: 'HCLTech',
    points: [
      'Architected and deployed a production multi-agent AI system enabling autonomous task decomposition, delegation, and execution across specialized agents.',
      'Integrated the Model Context Protocol (MCP) as the communication layer between agents and external tools within a microservices ecosystem.',
      'Engineered end-to-end RAG pipelines — ingestion, chunking, embedding, retrieval — for accurate, document-grounded LLM responses.',
      'Applied systematic prompt and context engineering to improve consistency and reduce hallucinations in production.',
    ],
  },
  {
    when: 'Nov 2023 — Nov 2025',
    role: 'Application Development Associate',
    co: 'Accenture',
    points: [
      'Built a production Generative AI chatbot with Azure OpenAI and LangChain, implementing a full RAG architecture from dataset prep to Azure deployment.',
      'Designed an IVR chatbot on Dialogflow CX to automate customer interaction flows and cut live-agent dependency.',
      'Owned CI/CD pipeline management and daily deployments, maintaining release reliability through automation testing.',
      'Partnered with design and product teams to translate business needs into AI-driven features.',
    ],
  },
];

const ExperienceSection = () => (
  <section className="section" id="path">
    <div className="wrap">
      <div className="section-head reveal">
        <span className="kicker">/ experience</span>
        <h2 className="section-title">The path so far</h2>
      </div>
      <div className="tl">
        {ROLES.map((r, i) => (
          <div className="tl-item reveal" data-delay={i * 100} key={r.co}>
            <div className="when mono">{r.when}</div>
            <div className="role">{r.role} <span className="gtext">@ {r.co}</span></div>
            <ul>
              {r.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
