import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Placeholder logos
import reactLogo from '../assets/react.svg';
import mernLogo from '../assets/tech/mern.png';
import nodeLogo from '../assets/tech/nodejs.svg';
import mongoLogo from '../assets/tech/mongodb.svg';
import pythonLogo from '../assets/tech/python.svg';
import dialogflowLogo from '../assets/tech/dialogflowcx.png';
import aiLogo from '../assets/tech/ai.png';
import twilioLogo from '../assets/tech/twilio.svg';
import gcpLogo from '../assets/tech/googlecloud.svg';

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState([]);

  const skills = useMemo(() => [
    {
      name: 'Generative AI & LLMs',
      level: 90,
      description: 'Azure OpenAI, LLM Integration, Prompt Engineering',
      logo: aiLogo,
      color: '#b98f7c'
    },
    {
      name: 'Agentic Systems & MCP',
      level: 88,
      description: 'Multi-Agent Systems, Model Context Protocol, Orchestration',
      logo: aiLogo,
      color: '#c9a66b'
    },
    {
      name: 'RAG Pipelines',
      level: 88,
      description: 'Ingestion, Chunking, Embedding, Retrieval',
      logo: aiLogo,
      color: '#7898a5'
    },
    {
      name: 'LangChain',
      level: 85,
      description: 'Chains, Agents, Tooling, Memory',
      logo: aiLogo,
      color: '#7fa99b'
    },
    {
      name: 'Python',
      level: 88,
      description: 'AI Pipelines, Backends, Automation',
      logo: pythonLogo,
      color: '#8fae82'
    },
    {
      name: 'Conversational AI',
      level: 92,
      description: 'Dialogflow CX, IVR, Chatbots',
      logo: dialogflowLogo,
      color: '#9d8f74'
    },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => (
                prev.includes(skill.name) ? prev : [...prev, skill.name]
              ));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, [skills]);

  const SkillCard = ({ skill }) => {
    const progress = animatedSkills.includes(skill.name) ? skill.level : 0;

    return (
      <Col lg={6} md={12} className="mb-4">
        <Card className="h-100 glass skill-card">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-3">
              <img src={skill.logo} alt={skill.name} style={{ width: 32, height: 32, marginRight: 12 }} />
              <div>
                <h5 className="mb-1 fw-bold">{skill.name}</h5>
                <p className="text-muted mb-0 small">{skill.description}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">Proficiency</span>
                <span className="fw-bold" style={{ color: skill.color }}>
                  {progress}%
                </span>
              </div>
              
              <div className="progress-container">
                <div 
                  className="progress-bar-custom"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: skill.color,
                    height: '8px',
                    borderRadius: '4px',
                    transition: 'width 1s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    className="progress-shine"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'shine 2s infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="skill-tags">
              {skill.description.split(', ').map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="badge me-2 mb-2"
                  style={{
                      backgroundColor: `${skill.color}20`,
                      color: skill.color,
                      border: `1px solid ${skill.color}33`,
                      fontSize: '0.75rem',
                    padding: '0.5rem 0.75rem'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  // Other Technologies with logos
  const otherTechs = [
    { name: 'Azure OpenAI', logo: aiLogo },
    { name: 'Google Cloud', logo: gcpLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Dialogflow CX', logo: dialogflowLogo },
    { name: 'Twilio', logo: twilioLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodeLogo },
    { name: 'MongoDB', logo: mongoLogo },
    { name: 'MERN Stack', logo: mernLogo },
  ];

  return (
    <section id="skills" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Skills & Expertise</h2>
          <p className="lead">Technologies and tools I work with</p>
        </div>

        <Row>
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </Row>

        {/* Other Technologies with logos */}
        <Row className="mt-5">
          <Col md={12}>
            <Card className="glass">
              <Card.Body className="p-4">
                <h4 className="text-center mb-4">Other Technologies</h4>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {otherTechs.map((tech, index) => (
                    <div key={index} className="d-flex flex-column align-items-center p-2">
                      <img src={tech.logo} alt={tech.name} style={{ width: 36, height: 36, marginBottom: 6 }} />
                      <span style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 500 }}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Skills;
