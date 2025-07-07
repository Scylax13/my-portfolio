import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';
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
import vibeLogo from '../assets/tech/vibecoding.png';

const Skills = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { 
      name: 'MERN Stack', 
      level: 80, 
      description: 'MongoDB, Express, React, Node.js',
      logo: mernLogo,
      color: '#61dafb'
    },
    { 
      name: 'Node.js', 
      level: 80, 
      description: 'Node.js, Express',
      logo: nodeLogo,
      color: '#43853d'
    },
    { 
      name: 'Python Scripting', 
      level: 85, 
      description: 'Automation & Data Processing',
      logo: pythonLogo,
      color: '#3776ab'
    },
    { 
      name: 'Dialogflow CX', 
      level: 95, 
      description: 'Chatbot Development',
      logo: dialogflowLogo,
      color: '#ff9800'
    },
    { 
      name: 'Generative AI', 
      level: 75, 
      description: 'Azure OpenAI, Langchain, RAG',
      logo: aiLogo,
      color: '#ff6b6b'
    },
    { 
      name: 'Vibe Coding', 
      level: 90, 
      description: 'Coding with Passion & Consistency',
      logo: vibeLogo,
      color: '#8b5cf6'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills one by one
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, skill.name]);
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
  }, []);

  const SkillCard = ({ skill, index }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (animatedSkills.includes(skill.name)) {
        const timer = setTimeout(() => {
          setProgress(skill.level);
        }, index * 100);
        return () => clearTimeout(timer);
      }
    }, [animatedSkills, skill, index]);

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
    { name: 'React', logo: reactLogo },
    { name: 'MongoDB', logo: mongoLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Twilio', logo: twilioLogo },
    { name: 'Google Cloud', logo: gcpLogo },
    { name: 'Dialogflow CX', logo: dialogflowLogo },
    { name: 'Generative AI', logo: aiLogo },
    { name: 'Vibe Coding', logo: vibeLogo },
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
            <SkillCard key={index} skill={skill} index={index} />
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
                      <span style={{ color: isDarkMode ? '#f9fafb' : '#1a202c', fontSize: '0.95rem', fontWeight: 500 }}>{tech.name}</span>
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
