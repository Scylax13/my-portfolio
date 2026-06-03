import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import reactLogo from '../assets/react.svg';
import nodeLogo from '../assets/tech/node.png';
import mongoLogo from '../assets/tech/mongodb.svg';
import pythonLogo from '../assets/tech/python.svg';
import dialogflowLogo from '../assets/tech/dialogflowcx.png';
import aiLogo from '../assets/tech/ai.png';
import twilioLogo from '../assets/tech/twilio.svg';
import gcpLogo from '../assets/tech/googlecloud.svg';
import vibeLogo from '../assets/tech/vibecoding.png';

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
    { degree: 'MCA', institution: 'Chandigarh University', gpa: '8.0 GPA' },
    { degree: 'BCA', institution: 'Dr. VSICS', gpa: '' },
    { degree: '12th', institution: 'Army Public School', gpa: '88.88%' }
  ];

  const achievements = [
    'Built a MERN stack Expense Tracker app for personal finance management',
    'Developed IVR-based chatbot handling 1000+ daily interactions',
    'Implemented RAG approach reducing response time by 40%',
    'Deployed applications on Azure Cloud Platform (familiarity)',
    'Achieved 95% customer satisfaction with chatbot solutions'
  ];

  const competencies = [
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodeLogo },
    { name: 'MongoDB', logo: mongoLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Dialogflow CX', logo: dialogflowLogo },
    { name: 'Generative AI', logo: aiLogo },
    { name: 'Twilio', logo: twilioLogo },
    { name: 'Google Cloud', logo: gcpLogo },
    { name: 'Vibe Coding', logo: vibeLogo },
  ];

  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">About Me</h2>
          <p className="lead">Passionate software engineer with expertise in modern technologies</p>
        </div>
        <Row className="align-items-center g-4">
          <Col lg={12}>
            <div className={`slide-in-right ${isVisible ? 'visible' : ''}`}>
              <div className="glass p-4 mb-4 text-start">
                <h4 className="mb-3">Hello there</h4>
                <p className="mb-3">
                  I am <strong>Abhinav Singh</strong>, a passionate Software Engineer with close to 2 years of experience building
                  innovative solutions using cutting-edge technologies. I specialize in creating intelligent chatbots,
                  developing full-stack applications, and implementing AI-powered solutions that solve real-world problems.
                </p>
                <p className="mb-0">
                  With expertise in <strong>MERN Stack</strong>, <strong>Generative AI</strong>, <strong>Dialogflow CX</strong>, and <strong>Python</strong>,
                  I enjoy experimenting with modern technologies and turning complex ideas into elegant, user-friendly applications.
                </p>
              </div>
              <Row className="g-3">
                <Col md={6}>
                  <Card className="h-100 glass text-start">
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
                  <Card className="h-100 glass text-start">
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
              <Card className="glass">
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
