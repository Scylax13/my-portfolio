import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';

const Experience = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  const experiences = [
    {
      role: 'Software Engineer',
      company: 'Accenture',
      duration: 'close to 2 years',
      period: '2022 - Present',
      description: [
        'Developed IVR-based Chatbot using Dialogflow CX for customer interaction flows.',
        'Built a Generative AI Chatbot using Azure OpenAI, Langchain & RAG approach, including prompt engineering and dataset preparation.',
        'Deployed and managed solutions on Azure Cloud (familiarity, not expertise).',
        'Worked on automation testing, daily deployments, and pipeline management.',
      ],
      icon: '💼',
      color: '#3b82f6'
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
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Experience</h2>
          <p className="lead">Professional journey and impactful roles</p>
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="timeline position-relative">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`timeline-item mb-5 fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="d-flex align-items-center mb-2">
                    <span className="fs-2 me-3" style={{ color: exp.color }}>{exp.icon}</span>
                    <h4 className="mb-0 fw-bold">{exp.role} <span className="fw-normal">@ {exp.company}</span></h4>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge me-2" style={{ backgroundColor: exp.color + '20', color: exp.color }}>{exp.duration}</span>
                    <span className="text-muted small">{exp.period}</span>
                  </div>
                  <ul className="mb-0">
                    {exp.description.map((point, i) => (
                      <li key={i} className="mb-2">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* Timeline vertical line */}
              <div className="position-absolute top-0 start-0 w-1 h-100" style={{ left: '18px', background: isDarkMode ? '#3b82f6' : '#8b5cf6', opacity: 0.2, zIndex: 0 }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;
