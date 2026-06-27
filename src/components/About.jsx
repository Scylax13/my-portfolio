import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import reactLogo from '../assets/react.svg';
import nodeLogo from '../assets/tech/node.png';
import mongoLogo from '../assets/tech/mongodb.svg';
import pythonLogo from '../assets/tech/python.svg';
import dialogflowLogo from '../assets/tech/dialogflowcx.png';
import aiLogo from '../assets/tech/ai.png';
import gcpLogo from '../assets/tech/googlecloud.svg';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  const education = [
    { degree: 'Master of Computer Applications (MCA)', institution: 'Chandigarh University · 2021 – 2023', gpa: 'CGPA 8.0' },
    { degree: 'Bachelor of Computer Applications (BCA)', institution: 'Dr. VSICS, Kanpur · 2018 – 2021', gpa: '71.77%' }
  ];

  const achievements = [
    'Designed and deployed a production-grade multi-agent AI system for an enterprise client',
    'Integrated Model Context Protocol (MCP) as the agent-to-tool communication layer in a microservices ecosystem',
    'Engineered end-to-end RAG pipelines — ingestion, chunking, embedding, and retrieval — for document-grounded LLM responses',
    'Built a production Generative AI chatbot on Azure OpenAI + LangChain with full RAG architecture',
    'Applied systematic prompt and context engineering to improve output consistency and reduce hallucinations'
  ];

  const competencies = [
    { name: 'Generative AI', logo: aiLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Dialogflow CX', logo: dialogflowLogo },
    { name: 'Google Cloud', logo: gcpLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodeLogo },
    { name: 'MongoDB', logo: mongoLogo },
  ];

  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-5 reveal">
          <div className="section-tag font-mono">about<span className="caret" /></div>
          <h2 className="gradient-text display-4 fw-bold mb-3">About Me</h2>
          <p className="lead">Senior AI Engineer building production-grade Generative AI and agentic systems</p>
        </div>
        <Row className="align-items-center g-4">
          <Col lg={12}>
            <div className={`slide-in-right ${isVisible ? 'visible' : ''}`}>
              <div className="glass p-4 mb-4 text-start reveal tilt">
                <h4 className="mb-3">Hello there</h4>
                <p className="mb-3">
                  I am <strong>Abhinav Pratap Singh</strong>, a <strong>Senior AI Engineer</strong> with 2.5 years of experience
                  designing and deploying production-grade Generative AI systems. I build multi-agent architectures, RAG
                  pipelines, and agentic workflows using <strong>LangChain</strong>, <strong>Azure OpenAI</strong>, and the
                  <strong> Model Context Protocol (MCP)</strong>.
                </p>
                <p className="mb-0">
                  I focus on prompt and context engineering to optimize LLM behavior at scale and on integrating AI capabilities
                  into microservices-based backends. A complementary full-stack background in <strong>Python</strong> and the
                  <strong> MERN stack</strong> lets me deliver intelligent products end to end.
                </p>
              </div>
              <Row className="g-3">
                <Col md={6}>
                  <Card className="h-100 glass text-start reveal tilt" data-reveal-delay="80">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center">Education</h5>
                      {education.map((edu, index) => (
                        <div key={index} className="mb-3">
                          <h6 className="mb-1 fw-bold">{edu.degree}</h6>
                          <p className="mb-1 text-muted">{edu.institution}</p>
                          {edu.gpa && (
                            <Badge
                              bg="primary"
                              className="fw-normal"
                              style={{ backgroundColor: 'rgba(201, 166, 107, 0.16)', color: 'var(--accent-strong)' }}
                            >
                              {edu.gpa}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100 glass text-start reveal tilt" data-reveal-delay="160">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center">Key Achievements</h5>
                      <ul className="list-unstyled">
                        {achievements.map((achievement, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start">
                            <span className="me-2" style={{ color: 'var(--accent)' }}>-</span>
                            <span className="small">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.6s' }}>
              <Card className="glass reveal">
                <Card.Body className="p-4">
                  <h4 className="text-center mb-4">Core Competencies</h4>
                  <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                    {competencies.map((competency) => (
                      <div key={competency.name} className="text-center p-3">
                        <img src={competency.logo} alt={competency.name} style={{ width: 48, height: 48 }} />
                        <h6 className="mt-2">{competency.name}</h6>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
