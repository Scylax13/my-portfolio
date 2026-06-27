import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);

  const certifications = [
    {
      title: 'Claude Certified Architect – Foundations',
      issuer: 'Anthropic',
      badge: 'CCA-F',
      color: '#c9a66b',
      details: ['Designing reliable Claude-powered applications']
    },
    {
      title: 'Microsoft Azure AI Engineer Associate',
      issuer: 'Microsoft',
      badge: 'AI-103',
      color: '#7898a5',
      details: ['Building, deploying, and managing AI solutions on Azure']
    },
    {
      title: 'OpenAI Badges',
      issuer: 'OpenAI',
      badge: 'AI',
      color: '#7fa99b',
      details: ['Codex Deployment', 'API Deployment', 'Foundational']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const section = document.getElementById('certifications');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Certifications</h2>
          <p className="lead">Credentials validating my AI and cloud expertise</p>
        </div>
        <Row className="justify-content-center">
          {certifications.map((cert, idx) => (
            <Col lg={4} md={6} className="mb-4" key={idx}>
              <Card
                className={`h-100 glass fade-in ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <span className="project-icon me-3" style={{ color: cert.color }}>{cert.badge}</span>
                    <div>
                      <h5 className="mb-1 fw-bold">{cert.title}</h5>
                      <p className="text-muted mb-0 small">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {cert.details.map((detail, i) => (
                      <span
                        key={i}
                        className="badge"
                        style={{
                          backgroundColor: `${cert.color}20`,
                          color: cert.color,
                          border: `1px solid ${cert.color}33`,
                          fontSize: '0.75rem',
                          padding: '0.5rem 0.75rem'
                        }}
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Certifications;
