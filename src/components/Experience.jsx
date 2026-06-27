import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  const experiences = [
    {
      role: 'Senior AI Developer',
      company: 'HCLTech',
      duration: 'Current',
      period: 'Nov 2025 - Present',
      description: [
        'Designed and deployed a production-grade multi-agent AI system for an enterprise client, enabling autonomous task decomposition, delegation, and execution across specialized agents.',
        'Integrated Model Context Protocol (MCP) as the communication layer between agents and external tools/services within a microservices ecosystem.',
        'Engineered end-to-end RAG pipelines — ingestion, chunking, embedding, and retrieval — to deliver accurate, document-grounded LLM responses for high-stakes use cases.',
        'Applied systematic prompt and context engineering to govern LLM behavior across agents, improving output consistency and reducing hallucinations in production.',
      ],
      icon: 'HCL',
      color: '#c9a66b'
    },
    {
      role: 'Application Development Associate',
      company: 'Accenture',
      duration: '2 years',
      period: 'Nov 2023 - Nov 2025',
      description: [
        'Built a production-ready Generative AI chatbot using Azure OpenAI and LangChain, implementing a full RAG architecture from dataset preparation to cloud deployment on Azure.',
        'Designed and developed an IVR-based chatbot on Dialogflow CX to automate customer interaction flows and reduce dependency on live agents.',
        'Owned CI/CD pipeline management and daily deployments, maintaining release reliability through automation testing.',
        'Partnered with design and product teams to translate business requirements into AI-driven features across the full delivery lifecycle.',
      ],
      icon: 'ACN',
      color: '#7fa99b'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const expSection = document.getElementById('experience');
    if (expSection) observer.observe(expSection);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-5">
      <Container>
        <div className="text-center mb-5 reveal">
          <div className="section-tag font-mono">experience<span className="caret" /></div>
          <h2 className="gradient-text display-4 fw-bold mb-3">Experience</h2>
          <p className="lead">Professional journey and impactful roles</p>
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="timeline position-relative">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className={`timeline-item mb-5 fade-in reveal ${isVisible ? 'visible' : ''}`}
                  data-reveal-delay={idx * 120}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <span className="project-icon me-3" style={{ color: exp.color }}>{exp.icon}</span>
                    <h4 className="mb-0 fw-bold">{exp.role} <span className="fw-normal">@ {exp.company}</span></h4>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge me-2" style={{ backgroundColor: `${exp.color}20`, color: exp.color }}>{exp.duration}</span>
                    <span className="text-muted small">{exp.period}</span>
                  </div>
                  <ul className="mb-0">
                    {exp.description.map((point, i) => (
                      <li key={i} className="mb-2">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="position-absolute top-0 start-0 w-1 h-100" style={{ left: '18px', background: 'var(--accent)', opacity: 0.18, zIndex: 0 }} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;
